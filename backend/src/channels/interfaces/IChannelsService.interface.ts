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
  update(
    id: number,
    details: UpdateChannelDetails,
    user: JwtUser,
  ): Promise<Channel>;
  remove(id: number, user: JwtUser): Promise<Channel>;
  join(channelId: number, user: JwtUser, password?: string): Promise<Channel>;
  leave(channelId: number, user: JwtUser): Promise<Channel>;
  invite(channelId: number, userId: string, user: JwtUser): Promise<User>;
}
