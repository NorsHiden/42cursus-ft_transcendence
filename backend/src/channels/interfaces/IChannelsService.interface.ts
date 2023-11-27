import {
  CreateChannelDetails,
  JwtUser,
  UpdateChannelDetails,
} from './../../utils/types';
import { User } from '../../typeorm/user.entity';
import { Channel } from '../../typeorm/channel.entity';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { UserChannel } from 'src/typeorm/userchannel.entity';

export interface IChannelsService {
  create(details: CreateChannelDetails, userId: string): Promise<Channel>;
  findOne(id: number): Promise<Channel>;
  findAll(query: PaginateQuery, user: JwtUser): Promise<Paginated<Channel>>;
  findMembers(
    id: number,
    query: PaginateQuery,
  ): Promise<Paginated<UserChannel>>;
  update(
    id: number,
    details: UpdateChannelDetails,
    user: JwtUser,
  ): Promise<Channel>;
  remove(id: number, user: JwtUser): Promise<Channel>;
}
