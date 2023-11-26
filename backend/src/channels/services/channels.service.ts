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
import { UpdateChannelDto } from '../dto/update-channel.dto';
import {
  CreateChannelDetails,
  ImagesFiles,
  UpdateChannelDetails,
} from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserChannel } from 'src/typeorm/userchannel.entity';
import { Channel } from 'src/typeorm/channel.entity';
import { Services } from 'src/utils/consts';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import * as bcrypt from 'bcrypt';
import { User } from 'src/typeorm/user.entity';

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

  public async findAll(query: PaginateQuery): Promise<Paginated<Channel>> {
    const config: PaginateConfig<Channel> = {
      sortableColumns: ['id', 'name', 'createdAt'],
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'ASC']],
      filterableColumns: {
        type: [FilterOperator.EQ],
        protected: [FilterOperator.EQ],
      },
      relations: ['members'],
    };

    return paginate(query, this.channelRepository, config);
  }

  public async findOne(id: number): Promise<Channel> {
    const channel: Channel = await this.channelRepository.findOne({
      where: { id },
      relations: ['members', 'members.user'],
    });

    if (!channel) throw new NotFoundException('Channel Not Found.');

    return channel;
  }

  public async update(
    id: number,
    details: UpdateChannelDetails,
    user: User,
  ): Promise<Channel> {
    const channel = await this.findOne(id);

    if (this.isRole(channel, user, 'owner') === false) {
      throw new UnauthorizedException('You cannot delete this channel.');
    }

    const hashedPassword = details.password
      ? await this.hashPassword(details.password)
      : undefined;

    const newChannel = this.channelRepository.create({
      name: details.name,
      type: details.type,
      protected: details.password ? true : undefined,
      password: hashedPassword,
    });

    const updatedChannel = await this.channelRepository
      .createQueryBuilder('channel')
      .update(newChannel)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return updatedChannel.raw[0];
  }

  public async remove(id: number, user: User): Promise<Channel> {
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

  private isRole(channel: Channel, user: User, role: string): boolean {
    return channel.members.some(
      (member) => member.user.id === user.id && member.role === role,
    );
  }
}