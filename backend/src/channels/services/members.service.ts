import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { UserChannel } from 'src/typeorm/userchannel.entity';
import { Repository } from 'typeorm';
import { IMembersService } from '../interfaces/IMembersService.interface';
import { IChannelsService } from '../interfaces/IChannelsService.interface';
import { Services, chatTimout } from 'src/utils/consts';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { JwtUser } from 'src/utils/types';

@Injectable()
export class MembersService implements IMembersService {
  constructor(
    @InjectRepository(UserChannel)
    private readonly userChannelRepository: Repository<UserChannel>,
    @Inject(Services.Channels)
    private readonly channelsService: IChannelsService,
    private SchedulerRegistry: SchedulerRegistry,
  ) {}

  public async findAll(
    id: number,
    query: PaginateQuery,
  ): Promise<Paginated<UserChannel>> {
    const channel = await this.channelsService.findOne(id);

    if (!channel) throw new NotFoundException('Channel not found');

    const config: PaginateConfig<UserChannel> = {
      searchableColumns: ['user.username', 'user.display_name'],
      select: [
        'id',
        'role',
        'state',
        'user.id',
        'user.username',
        'user.display_name',
        'user.profile.avatar',
        'user.presence',
      ],
      defaultSortBy: [['user.display_name', 'ASC']],
      sortableColumns: ['user.display_name'],
      relations: ['user', 'user.profile', 'channel'],
      where: { channel: { id } },
    };

    return await paginate<UserChannel>(
      query,
      this.userChannelRepository,
      config,
    );
  }

  public async findOne(
    channelId: number,
    memberId: string,
  ): Promise<UserChannel> {
    const channel = await this.channelsService.findOne(channelId);

    if (!channel) throw new NotFoundException('Channel not found');

    const member = await this.userChannelRepository
      .createQueryBuilder('members')
      .leftJoinAndSelect('members.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('members.channel = :channelId', { channelId })
      .andWhere('members.user = :memberId', { memberId })
      .select([
        'members.id',
        'members.role',
        'members.state',
        'user.id',
        'user.username',
        'user.display_name',
        'profile.avatar',
        'user.presence',
      ])
      .getOne();

    if (!member) throw new NotFoundException('Member not found');

    return member;
  }

  public async kick(
    channelId: number,
    memberId: string,
    user: JwtUser,
  ): Promise<UserChannel> {
    try {
      if (user.sub == memberId)
        throw new UnauthorizedException('You cannot kick yourself');

      const authMember = await this.findOne(channelId, user.sub);

      if (authMember.role === 'member')
        throw new UnauthorizedException(
          'You are not authorized to kick members',
        );

      const member = await this.findOne(channelId, memberId);

      if (member.role === 'owner')
        throw new UnauthorizedException('You cannot kick the owner');

      const kickedMember = await this.userChannelRepository.remove(member);

      return kickedMember;
    } catch (error) {
      throw error;
    }
  }

  public async ban(
    channelId: number,
    memberId: string,
    user: JwtUser,
  ): Promise<UserChannel> {
    try {
      if (user.sub == memberId)
        throw new UnauthorizedException('You cannot ban yourself');

      const authMember = await this.findOne(channelId, user.sub);

      if (authMember.role === 'member')
        throw new UnauthorizedException(
          'You are not authorized to ban members',
        );

      const member = await this.findOne(channelId, memberId);

      if (member.role === 'owner')
        throw new UnauthorizedException('You cannot ban the owner');

      member.state = 'banned';

      const updatedMember = await this.userChannelRepository.save(member);

      await this.stateResetJob(
        channelId,
        memberId,
        new Date(Date.now() + chatTimout),
      );

      return updatedMember;
    } catch (error) {
      throw error;
    }
  }

  public async mute(
    channelId: number,
    memberId: string,
    user: JwtUser,
  ): Promise<UserChannel> {
    try {
      if (user.sub == memberId)
        throw new UnauthorizedException('You cannot mute yourself');

      const authMember = await this.findOne(channelId, user.sub);

      if (authMember.role === 'member')
        throw new UnauthorizedException(
          'You are not authorized to mute members',
        );

      const member = await this.findOne(channelId, memberId);

      member.state = 'muted';

      const mutedUser = await this.userChannelRepository.save(member);

      await this.stateResetJob(
        channelId,
        memberId,
        new Date(Date.now() + chatTimout),
      );

      return mutedUser;
    } catch (error) {
      throw error;
    }
  }

  public async elevateToAdmin(
    channelId: number,
    memberId: string,
    user: JwtUser,
  ): Promise<UserChannel> {
    try {
      if (user.sub == memberId)
        throw new UnauthorizedException('You cannot elevate yourself');

      const authMember = await this.findOne(channelId, user.sub);

      if (authMember.role !== 'owner')
        throw new UnauthorizedException(
          'You are not authorized to elevate members',
        );

      const member = await this.findOne(channelId, memberId);

      if (member.role !== 'member')
        throw new UnauthorizedException('You cannot elevate this user');

      member.role = 'admin';

      const elevatedMember = await this.userChannelRepository.save(member);

      return elevatedMember;
    } catch (error) {
      throw error;
    }
  }

  private async resetState(channelId: number, memberId: string): Promise<void> {
    try {
      const member = await this.findOne(channelId, memberId);

      member.state = 'active';

      await this.userChannelRepository.save(member);
    } catch (error) {
      throw error;
    }
  }

  private async stateResetJob(
    channelId: number,
    memberId: string,
    timeout: Date,
  ): Promise<void> {
    const stateResetJob = new CronJob(timeout, async () => {
      await this.resetState(channelId, memberId);

      this.SchedulerRegistry.deleteCronJob(
        `state-reset-${channelId}-${memberId}`,
      );
    });

    this.SchedulerRegistry.addCronJob(
      `state-reset-${channelId}-${memberId}`,
      stateResetJob,
    );

    stateResetJob.start();
  }
}
