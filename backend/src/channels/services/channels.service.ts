import {
  PaginateQuery,
  Paginated,
  paginate,
  PaginateConfig,
  FilterOperator,
} from 'nestjs-paginate';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateChannelDetails,
  JwtUser,
  UpdateChannelDetails,
} from 'src/utils/types';
import { IChannelsService } from '../interfaces/IChannelsService.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Not, Repository } from 'typeorm';
import { UserChannel } from 'src/typeorm/userchannel.entity';
import { Channel } from 'src/typeorm/channel.entity';
import { Services } from 'src/utils/consts';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import * as bcrypt from 'bcrypt';
import { INotificationService } from 'src/notification/interfaces/notification.interface';
import { Notification } from 'src/typeorm/notification.entity';
import { User } from 'src/typeorm/user.entity';
import { IAchievementService } from 'src/achievement/interfaces/achievement.interface';

@Injectable()
export class ChannelsService implements IChannelsService {
  constructor(
    @InjectRepository(UserChannel)
    private userChannelRepository: Repository<UserChannel>,
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
    @Inject(Services.Users) private readonly usersService: IUsersService,
    @Inject(Services.Notification)
    private readonly notificationService: INotificationService,
    @Inject(Services.Achievement)
    private readonly achievementsService: IAchievementService,
  ) {}

  public async create(
    details: CreateChannelDetails,
    userId: string,
  ): Promise<Channel> {
    try {
      const owner = await this.usersService.getUser(userId);

      details.password =
        details.type === 'private' ? undefined : details.password;

      const hashedPassword = details.password
        ? await this.hashPassword(details.password)
        : null;

      const newChannel = this.channelRepository.create({
        name: details.name,
        type: details.type,
        protected: details.password ? true : false,
        password: hashedPassword,
        avatar: details.avatar?.path?.slice(2),
        banner: details.banner?.path?.slice(2),
      });

      const channel = await this.channelRepository.save(newChannel);

      const userChannel = this.userChannelRepository.create({
        role: 'owner',
        state: 'active',
        user: owner,
        channel: channel,
      });

      this.userChannelRepository.save(userChannel);

      if ((await this.countOwnedChannels(userId)) === 1)
        await this.achievementsService.setAchievement(
          userId,
          'group_chat_starter',
        );

      return channel;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(
    query: PaginateQuery,
    user: JwtUser,
  ): Promise<Paginated<Channel>> {
    const brackets = new Brackets((qb) => {
      qb.where('channel.type = :public', { public: 'public' });
      qb.orWhere('channel.type = :private', { private: 'private' });
      qb.andWhere('members.user.id = :userId', { userId: user.sub });
    });

    const queryBuilder = this.channelRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect('channel.members', 'members')
      .leftJoinAndSelect('members.user', 'user')
      .where(brackets)
      .select([
        'channel.id',
        'channel.name',
        'channel.type',
        'channel.protected',
        'channel.avatar',
        'channel.banner',
        'channel.createdAt',
        'channel.updatedAt',
      ]);

    const config: PaginateConfig<Channel> = {
      sortableColumns: ['id', 'name', 'createdAt'],
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'ASC']],
      filterableColumns: {
        type: [FilterOperator.EQ],
        protected: [FilterOperator.EQ],
      },
    };

    return await paginate<Channel>(query, queryBuilder, config);
  }

  public async findOne(channelId: number): Promise<Channel> {
    const channel = await this.channelRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect('channel.members', 'members')
      .leftJoinAndSelect('members.user', 'user')
      .where('channel.id = :channelId', { channelId })
      .andWhere(`channel.type != 'dm'`)
      .select([
        'channel.id',
        'channel.name',
        'channel.type',
        'channel.protected',
        'channel.password',
        'channel.avatar',
        'channel.banner',
        'channel.createdAt',
        'channel.updatedAt',
      ])
      .getOne();

    if (!channel) throw new NotFoundException('Channel Not Found.');

    return channel;
  }

  public async findMeChannels(
    user: JwtUser,
    query: PaginateQuery,
  ): Promise<Paginated<UserChannel>> {
    const config: PaginateConfig<UserChannel> = {
      searchableColumns: ['channel.name'],
      select: [
        'id',
        'role',
        'state',
        'channel.id',
        'channel.name',
        'channel.type',
        'channel.protected',
        'channel.password',
        'channel.avatar',
        'channel.banner',
        'channel.createdAt',
        'channel.updatedAt',
      ],
      defaultSortBy: [['channel.updatedAt', 'ASC']],
      sortableColumns: ['channel.updatedAt'],
      relations: ['user', 'channel'],
      where: {
        user: { id: user.sub },
        state: Not('banned'),
        channel: { type: Not('dm') },
      },
    };

    return await paginate<UserChannel>(
      query,
      this.userChannelRepository,
      config,
    );
  }

  public async update(
    channelId: number,
    details: UpdateChannelDetails,
    user: JwtUser,
  ): Promise<Channel> {
    try {
      const channel = await this.findOne(channelId);

      if (!(await this.isRole(channelId, user, 'owner'))) {
        throw new UnauthorizedException('You cannot update this channel.');
      }

      details.password =
        details.type === 'private' ? undefined : details.password;

      const hashedPassword = details.password
        ? await this.hashPassword(details.password)
        : undefined;

      const newChannel = this.channelRepository.create({
        name: details.name,
        type: details.type,
        protected: details.password ? true : undefined,
        password: hashedPassword,
        avatar: details.avatar?.path?.slice(2),
        banner: details.banner?.path?.slice(2),
      });

      await this.channelRepository
        .createQueryBuilder('channel')
        .update(newChannel)
        .where('id = :channelId', { channelId })
        .execute();

      let updatedChannel = await this.findOne(channel.id);

      return updatedChannel;
    } catch (error) {
      throw error;
    }
  }

  public async remove(channelId: number, user: JwtUser): Promise<Channel> {
    try {
      const channel = await this.findOne(channelId);

      if (!(await this.isRole(channelId, user, 'owner'))) {
        throw new UnauthorizedException('You cannot delete this channel.');
      }

      const deletedChannel = await this.channelRepository.remove(channel);

      return deletedChannel;
    } catch (error) {
      throw error;
    }
  }

  public async join(
    channelId: number,
    user: JwtUser,
    password?: string,
  ): Promise<Channel> {
    try {
      const channel = await this.findOne(channelId);

      const member = await this.userChannelRepository.findOne({
        where: { user: { id: user.sub }, channel: { id: channelId } },
      });

      const invite = await this.findInvite(user.sub, channelId);

      if (member && member.state === 'banned')
        throw new UnauthorizedException('You are banned from this channel.');

      if (member)
        throw new BadRequestException('You are already in this channel.');

      if (!invite && channel.type === 'private')
        throw new BadRequestException('You are not invited to this channel.');

      if (channel.protected) {
        if (!password) throw new BadRequestException('Password is required.');

        const isPasswordValid = await bcrypt.compare(
          password,
          channel.password,
        );

        if (!isPasswordValid)
          throw new BadRequestException('Invalid Password.');
      }

      if (invite) {
        invite.status = 'accepted';

        await this.notificationService.setNotification(invite);
      }

      const newMember = this.userChannelRepository.create({
        role: 'member',
        state: 'active',
        user: { id: user.sub },
        channel: { id: channelId },
      });

      await this.userChannelRepository.save(newMember);

      if ((await this.countMyChannels(user.sub)) === 10)
        await this.achievementsService.setAchievement(
          user.sub,
          'social_butterfly',
        );

      return channel;
    } catch (error) {
      throw error;
    }
  }

  public async leave(channelId: number, user: JwtUser): Promise<Channel> {
    try {
      const channel = await this.findOne(channelId);

      const userChannel = await this.userChannelRepository.findOne({
        where: { user: { id: user.sub }, channel: { id: channelId } },
      });

      if (!userChannel)
        throw new UnauthorizedException('You are not in this channel.');

      if (userChannel.role === 'owner') {
        const newOwner = await this.userChannelRepository.findOne({
          where: { channel: { id: channelId }, role: Not('owner') },
          order: { id: 'ASC' },
        });

        if (!newOwner) return await this.channelRepository.remove(channel);

        newOwner.role = 'owner';

        await this.userChannelRepository.save(newOwner);
      }

      await this.userChannelRepository.remove(userChannel);

      return channel;
    } catch (error) {
      throw error;
    }
  }

  public async invite(
    channelId: number,
    userId: string,
    user: JwtUser,
  ): Promise<User> {
    try {
      const channel = await this.findOne(channelId);

      if ((await this.isRole(channelId, user, 'owner')) === false) {
        throw new UnauthorizedException('You cannot invite to this channel.');
      }

      const invitedUser = await this.usersService.getUser(userId);

      const userChannel = await this.userChannelRepository.findOne({
        where: { user: { id: invitedUser.id }, channel: { id: channel.id } },
      });

      if (userChannel) {
        if (userChannel.state === 'banned')
          throw new UnauthorizedException('User is banned from this channel.');
        else
          throw new UnauthorizedException('User is already in this channel.');
      }

      const invite = await this.findInvite(invitedUser.id, channelId);

      if (invite)
        throw new UnauthorizedException(
          'User is already invited to this channel.',
        );

      this.notificationService.addNotification(invitedUser.id, {
        action: 'CHANNEL_INVITE',
        recipient: invitedUser,
        sender: null,
        record_id: channelId,
        status: 'pending',
      } as Notification);

      return invitedUser;
    } catch (error) {
      throw error;
    }
  }

  private async findInvite(
    userId: string,
    channelId: number,
  ): Promise<Notification> {
    const notifications = await this.notificationService.getNotifications(
      userId,
    );

    const notification = notifications.find((notification) => {
      if (
        notification.action === 'CHANNEL_INVITE' &&
        notification.record_id === channelId &&
        notification.status === 'pending'
      ) {
        return notification;
      }
    });

    return notification;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private async isRole(
    channelId: number,
    user: JwtUser,
    role: string,
  ): Promise<boolean> {
    const member = await this.userChannelRepository
      .createQueryBuilder('members')
      .leftJoinAndSelect('member.user', 'user')
      .leftJoinAndSelect('member.channel', 'channel')
      .where('user.id = :userId', { userId: user.sub })
      .andWhere('channel.id = :channelId', { channelId })
      .andWhere('uc.role = :role', { role })
      .getOne();

    if (!member) return false;

    return true;
  }

  private async countOwnedChannels(userId: string): Promise<number> {
    const count = await this.userChannelRepository.count({
      where: { user: { id: userId }, role: 'owner' },
    });

    return count;
  }

  private async countMyChannels(userId: string): Promise<number> {
    const count = await this.userChannelRepository.count({
      where: { user: { id: userId } },
    });

    return count;
  }

  public async hasMember(channelId: number, userId: string): Promise<boolean> {
    const member = await this.userChannelRepository.findOne({
      where: { user: { id: userId }, channel: { id: channelId } },
    });

    if (!member) return false;

    return true;
  }
}
