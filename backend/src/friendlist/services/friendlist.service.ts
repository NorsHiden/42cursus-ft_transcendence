import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { Services } from 'src/utils/consts';

@Injectable()
export class FriendlistService {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
  ) {}

  async sendRequest(user_id: string, target_id: string) {
    if (user_id === target_id) throw new ForbiddenException('same ID as user');
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);
    if (
      user.friendlist.friend.find((friendUser) => friendUser.id === target.id)
    )
      throw new ForbiddenException('already friends.');
    if (
      user.friendlist.pending.find(
        (pendingUser) => pendingUser.id === target.id,
      )
    )
      throw new ForbiddenException('cannot send request on both sides.');
    target.friendlist.pending.push(user);
    await this.usersService.saveUser(target);
  }

  async removeRequest(user_id: string, target_id: string) {
    if (user_id === target_id) throw new ForbiddenException('same ID as user');
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);
    user.friendlist.pending = user.friendlist.pending.filter(
      (friend) => friend.id !== target.id,
    );
    user.friendlist.friends = user.friendlist.friends.filter(
      (friend) => friend.id !== target.id,
    );
    await this.usersService.saveUser(user);
  }

  async acceptRequest(user_id: string, target_id: string) {
    if (user_id === target_id) throw new ForbiddenException('same ID as user');
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);
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
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);
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
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);
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
