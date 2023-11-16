import { CreateChannelArgs } from './../../utils/types';
import { User } from '../../typeorm/user.entity';
import { Channel } from '../../typeorm/channel.entity';

export interface IChannelsService {
  create(args: CreateChannelArgs): Promise<Channel>;
  findOne(id: number): Promise<Channel>;
  findAll(): Promise<Channel[]>;
  update(id: string, channel: Channel): Promise<Channel>;
  delete(id: string): Promise<Channel>;

  join(id: string, user: User): Promise<Channel>;
  leave(id: string, user: User): Promise<Channel>;

  banUser(id: string, user: User): Promise<Channel>;
  unbanUser(id: string, user: User): Promise<Channel>;
  muteUser(id: string, user: User): Promise<Channel>;
  unmuteUser(id: string, user: User): Promise<Channel>;
  addAdmin(id: string, user: User): Promise<Channel>;
  removeAdmin(id: string, user: User): Promise<Channel>;

  isMember(id: string, user: User): Promise<boolean>;
  isBanned(id: string, user: User): Promise<boolean>;
  isMuted(id: string, user: User): Promise<boolean>;
  isOwner(id: string, user: User): Promise<boolean>;
  isAdmin(id: string, user: User): Promise<boolean>;
}
