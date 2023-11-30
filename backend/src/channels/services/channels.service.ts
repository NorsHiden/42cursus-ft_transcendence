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
import { Brackets, Repository } from 'typeorm';
import { UserChannel } from 'src/typeorm/userchannel.entity';
import { Channel } from 'src/typeorm/channel.entity';
import { Services } from 'src/utils/consts';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import * as bcrypt from 'bcrypt';
import { INotificationService } from 'src/notification/interfaces/notification.interface';
import { Notification } from 'src/typeorm/notification.entity';
import { User } from 'src/typeorm/user.entity';

@Injectable()
export class ChannelsService implements IChannelsService {
  constructor(
    @InjectRepository(UserChannel)
    private userChannelRepository: Repository<UserChannel>,
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
    @Inject(Services.Users) private readonly usersService: IUsersService,
    @Inject(Services.Notification)
    private readonly notificationService: INotificationService,
  ) {}

  public async create(
    details: CreateChannelDetails,
    userId: string,
  ): Promise<Channel> {
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
      user: owner,
      channel: channel,
    });

    this.userChannelRepository.save(userChannel);

    return channel;
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

  public async findOne(id: number): Promise<Channel> {
    const channel = await this.channelRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect('channel.members', 'members')
      .leftJoinAndSelect('members.user', 'user')
      .where('channel.id = :id', { id })
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

  async findMembers(
    id: number,
    query: PaginateQuery,
  ): Promise<Paginated<UserChannel>> {
    const config: PaginateConfig<UserChannel> = {
      searchableColumns: ['user.username', 'user.display_name'],
      select: [
        'id',
        'role',
        'state',
        'timeout',
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

  public async update(
    id: number,
    details: UpdateChannelDetails,
    user: JwtUser,
  ): Promise<Channel> {
    if ((await this.isRole(id, user, 'owner')) === false) {
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
      .where('id = :id', { id })
      .execute();

    let updatedChannel = await this.findOne(id);

    return updatedChannel;
  }

  public async remove(id: number, user: JwtUser): Promise<Channel> {
    if ((await this.isRole(id, user, 'owner')) === false) {
      throw new UnauthorizedException('You cannot delete this channel.');
    }

    const channel = await this.findOne(id);

    const deletedChannel = await this.channelRepository.remove(channel);
    return deletedChannel;
  }

  public async join(
    channelId: number,
    user: JwtUser,
    password?: string,
  ): Promise<Channel> {
    const channel = await this.findOne(channelId);

    if (!channel) throw new NotFoundException('Channel Not Found.');

    const member = await this.userChannelRepository.findOne({
      where: { user: { id: user.sub }, channel: { id: channelId } },
    });

    if (member) {
      if (member.state === 'banned')
        throw new UnauthorizedException('You are banned from this channel.');
      else throw new BadRequestException('You are already in this channel.');
    }

    if (channel.type === 'private') {
      const invite = await this.findInvite(user.sub, channelId);

      if (!invite)
        throw new UnauthorizedException('You are not invited to this channel.');

      invite.status = 'accepted';

      await this.notificationService.setNotification(invite);
    }

    if (channel.protected) {
      console.log(password);
      if (!password) throw new BadRequestException('Password is required.');

      console.log(channel);

      const isPasswordValid = await bcrypt.compare(password, channel.password);

      if (!isPasswordValid) throw new BadRequestException('Invalid Password.');
    }

    const newMember = this.userChannelRepository.create({
      role: 'member',
      user: { id: user.sub },
      channel: { id: channelId },
    });

    await this.userChannelRepository.save(newMember);

    return channel;
  }

  public async leave(channelId: number, user: JwtUser): Promise<Channel> {
    const channel = await this.findOne(channelId);

    if (!channel) throw new NotFoundException('Channel Not Found.');

    const userChannel = await this.userChannelRepository.findOne({
      where: { user: { id: user.sub }, channel: { id: channelId } },
    });

    if (!userChannel)
      throw new UnauthorizedException('You are not in this channel.');

    await this.userChannelRepository.remove(userChannel);

    return channel;
  }

  public async invite(
    channelId: number,
    userId: string,
    user: JwtUser,
  ): Promise<User> {
    if ((await this.isRole(channelId, user, 'owner')) === false) {
      throw new UnauthorizedException('You cannot invite to this channel.');
    }

    const channel = await this.findOne(channelId);

    if (!channel) throw new NotFoundException('Channel Not Found.');

    const invitedUser = await this.usersService.getUser(userId);

    if (!invitedUser) throw new NotFoundException('User Not Found.');

    const userChannel = await this.userChannelRepository.findOne({
      where: { user: { id: invitedUser.id }, channel: { id: channelId } },
    });

    if (userChannel) {
      if (userChannel.state === 'banned')
        throw new UnauthorizedException('User is banned from this channel.');
      else throw new UnauthorizedException('User is already in this channel.');
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
    const channel = await this.channelRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect('channel.members', 'members')
      .leftJoinAndSelect('members.user', 'user')
      .where('channel.id = :id', { id: channelId })
      .getOne();

    console.log(channelId);

    return channel.members.some(
      (member) => member.user.id === user.sub && member.role === role,
    );
  }
}
