import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { Services } from 'src/utils/consts';
import { IFriendlistService } from '../interfaces/friendlist.interface';
import { Notification } from 'src/typeorm/notification.entity';
import { INotificationService } from 'src/notification/interfaces/notification.interface';
import { User } from 'src/typeorm/user.entity';

@Injectable()
export class FriendlistService implements IFriendlistService {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
    @Inject(Services.Notification)
    private readonly notificationService: INotificationService,
  ) {}

  async sendRequest(user_id: string, target_id: string) {
    if (user_id === target_id) throw new ForbiddenException('same ID as user');
    const user = await this.usersService.getFriendList(user_id, [
      'friendlist.friends',
      'friendlist.pending',
      'friendlist.blocked',
      'friendlist.friends.profile',
      'friendlist.pending.profile',
      'friendlist.blocked.profile',
    ]);
    const target = await this.usersService.getFriendList(target_id, [
      'friendlist.friends',
      'friendlist.pending',
      'friendlist.blocked',
      'friendlist.friends.profile',
      'friendlist.pending.profile',
      'friendlist.blocked.profile',
    ]);
    if (
      user.friendlist.friends.find((friendUser) => friendUser.id === target.id)
    )
      throw new ForbiddenException('already friends.');
    if (
      user.friendlist.pending.find(
        (pendingUser) => pendingUser.id === target.id,
      )
    )
      throw new ForbiddenException('cannot send request on both sides.');
    target.friendlist.pending.push(user);
    this.notificationService.addNotification(target.id, {
      action: 'FRIEND',
      recipient: target,
      sender: user,
    } as Notification);
    await this.usersService.saveUser(target);
  }

  async removeRequest(user_id: string, target_id: string) {
    if (user_id === target_id) throw new ForbiddenException('same ID as user');
    const user = await this.usersService.getFriendList(user_id, [
      'friendlist.friends',
      'friendlist.pending',
      'friendlist.blocked',
      'friendlist.friends.profile',
      'friendlist.pending.profile',
      'friendlist.blocked.profile',
    ]);
    const target = await this.usersService.getFriendList(target_id, [
      'friendlist.friends',
      'friendlist.pending',
      'friendlist.blocked',
      'friendlist.friends.profile',
      'friendlist.pending.profile',
      'friendlist.blocked.profile',
    ]);
    user.friendlist.pending = user.friendlist.pending.filter(
      (friend) => friend.id !== target.id,
    );
    user.friendlist.friends = user.friendlist.friends.filter(
      (friend) => friend.id !== target.id,
    );
    await this.usersService.saveUser(user);
  }

  async getFriends(user_id: string): Promise<User> {
    return await this.usersService.getFriendList(user_id, [
      'friendlist.friends',
      'friendlist.friends.profile',
    ]);
  }
  async getPending(user_id: string): Promise<User> {
    return await this.usersService.getFriendList(user_id, [
      'friendlist.pending',
      'friendlist.pending.profile',
    ]);
  }
  async getBlocked(user_id: string): Promise<User> {
    return await this.usersService.getFriendList(user_id, [
      'friendlist.blocked',
      'friendlist.blocked.profile',
    ]);
  }

  async acceptRequest(user_id: string, target_id: string) {
    if (user_id === target_id) throw new ForbiddenException('same ID as user');
    const user = await this.usersService.getFriendList(user_id, [
      'friendlist.friends',
      'friendlist.pending',
      'friendlist.friends.profile',
      'friendlist.pending.profile',
    ]);
    const target = await this.usersService.getFriendList(target_id, [
      'friendlist.friends',
      'friendlist.pending',
      'friendlist.friends.profile',
      'friendlist.pending.profile',
    ]);
    if (
      !user.friendlist.pending.find(
        (pendingUser) => pendingUser.id === target.id,
      )
    )
      throw new NotFoundException('target not found');
    user.friendlist.pending = user.friendlist.pending.filter(
      (friend) => friend.id !== target.id,
    );
    user.friendlist.friends.push(target);
    target.friendlist.friends.push(user);
    await this.usersService.saveUser(user);
    await this.usersService.saveUser(target);
  }

  async blockFriend(user_id: string, target_id: string) {
    if (user_id === target_id) throw new ForbiddenException('same ID as user');
    const user = await this.usersService.getFriendList(user_id, [
      'friendlist.friends',
      'friendlist.blocked',
      'friendlist.friends.profile',
      'friendlist.blocked.profile',
    ]);
    const target = await this.usersService.getFriendList(target_id, [
      'friendlist.friends',
      'friendlist.blocked',
      'friendlist.friends.profile',
      'friendlist.blocked.profile',
    ]);
    if (
      !user.friendlist.friends.find((friendUser) => friendUser.id === target.id)
    )
      throw new NotFoundException('target not found');
    user.friendlist.friends = user.friendlist.friends.filter(
      (friend) => friend.id !== target.id,
    );
    user.friendlist.blocked.push(target);
    await this.usersService.saveUser(user);
  }

  async unblockFriend(user_id: string, target_id: string) {
    if (user_id === target_id) throw new ForbiddenException('same ID as user');
    const user = await this.usersService.getFriendList(user_id, [
      'friendlist.friends',
      'friendlist.blocked',
      'friendlist.friends.profile',
      'friendlist.blocked.profile',
    ]);
    const target = await this.usersService.getFriendList(target_id, [
      'friendlist.friends',
      'friendlist.blocked',
      'friendlist.friends.profile',
      'friendlist.blocked.profile',
    ]);
    if (
      !user.friendlist.blocked.find((friendUser) => friendUser.id === target.id)
    )
      throw new NotFoundException('target not found');
    user.friendlist.blocked = user.friendlist.blocked.filter(
      (blocked) => blocked.id !== target.id,
    );
    user.friendlist.friends.push(target);
    await this.usersService.saveUser(user);
  }
}
