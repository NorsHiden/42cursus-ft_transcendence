import { User } from 'src/typeorm/user.entity';

export interface IFriendlistService {
  sendRequest(user_id: string, target_id: string): Promise<void>;
  acceptRequest(user_id: string, target_id: string): Promise<void>;
  removeRequest(user_id: string, target_id: string): Promise<void>;
  blockFriend(user_id: string, target_id: string): Promise<void>;
  unblockFriend(user_id: string, target_id: string): Promise<void>;
  getFriendListState(
    user_id: string,
    target_id: string,
  ): Promise<{ state: string }>;
  getFriends(user_id: string): Promise<User>;
  getPending(user_id: string): Promise<User>;
  getBlocked(user_id: string): Promise<User>;
}
