import {
  PaginateQuery,
  Paginated,
  paginate,
  PaginateConfig,
  FilterOperator,
} from 'nestjs-paginate';
import { IChannelsService } from '../interfaces/IChannelsService.interface';
import {
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
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { UserChannel } from 'src/typeorm/userchannel.entity';
import { Channel } from 'src/typeorm/channel.entity';
import { Services } from 'src/utils/consts';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChannelsService implements IChannelsService {
  constructor(
    @InjectRepository(UserChannel)
    private userChannelRepository: Repository<UserChannel>,
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
    @Inject(Services.Users) private readonly usersService: IUsersService,
  ) {}

  public async create(
    details: CreateChannelDetails,
    userId: string,
  ): Promise<Channel> {
    const owner = await this.usersService.getUser(userId);

    details.password =
      details.type === 'private' ? details.password : undefined;

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
    user: any,
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
    const channel: Channel = await this.channelRepository.findOne({
      where: { id },
      relations: ['members', 'members.user'],
    });

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
    const channel = await this.findOne(id);

    if (this.isRole(channel, user, 'owner') === false) {
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

    const updatedChannel = await this.channelRepository
      .createQueryBuilder('channel')
      .update(newChannel)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return updatedChannel.raw[0];
  }

  public async remove(id: number, user: JwtUser): Promise<Channel> {
    const channel = await this.findOne(id);

    if (this.isRole(channel, user, 'owner') === false) {
      throw new UnauthorizedException('You cannot delete this channel.');
    }

    const deletedChannel = await this.channelRepository.remove(channel);
    return deletedChannel;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private isRole(channel: Channel, user: JwtUser, role: string): boolean {
    return channel.members.some(
      (member) => member.user.id === user.sub && member.role === role,
    );
  }
}
