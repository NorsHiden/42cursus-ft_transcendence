import {
  CreateChannelDetails,
  UpdateChannelDetails,
} from './../../utils/types';
import { User } from '../../typeorm/user.entity';
import { Channel } from '../../typeorm/channel.entity';
import { PaginateQuery, Paginated } from 'nestjs-paginate';

export interface IChannelsService {
  create(details: CreateChannelDetails, userId: string): Promise<Channel>;
  findOne(id: number): Promise<Channel>;
  //   findAll(query: PaginateQuery): Promise<Paginated<Channel>>;
  //   findMembers(id: number): Promise<ChannelMember[]>;
  update(
    id: number,
    details: UpdateChannelDetails,
    user: User,
  ): Promise<Channel>;
  remove(id: number, user: User): Promise<Channel>;
}
