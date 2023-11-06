export interface IFriendlistService {
  sendRequest(user_id: string, target_id: string);
  acceptRequest(user_id: string, target_id: string);
  removeRequest(user_id: string, target_id: string);
  blockFriend(user_id: string, target_id: string);
  unblockFriend(user_id: string, target_id: string);
}
