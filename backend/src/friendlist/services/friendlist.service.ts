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
import { IAchievementService } from 'src/achievement/interfaces/achievement.interface';

@Injectable()
export class FriendlistService implements IFriendlistService {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
    @Inject(Services.Notification)
    private readonly notificationService: INotificationService,
    @Inject(Services.Achievement)
    private readonly achievementService: IAchievementService,
  ) {}

  /**
   * Send a friend request from the user to the target user.
   * @param user_id The ID of the user sending the request.
   * @param target_id The ID of the user receiving the request.
   */
  async sendRequest(user_id: string, target_id: string) {
    // Ensure the user is not sending a request to themselves.
    if (user_id == target_id) throw new ForbiddenException('Same ID as user.');

    // Retrieve user and target information from the Users service.
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);

    // Check if the users are already friends or have a pending request.
    if (
      user.friendlist.friends.find((friendUser) => friendUser.id === target.id)
    )
      throw new ForbiddenException('Already friends.');
    if (
      user.friendlist.pending.find(
        (pendingUser) => pendingUser.id === target.id,
      )
    )
      throw new ForbiddenException('Cannot send a request on both sides.');
    if (
      target.friendlist.pending.find(
        (pendingUser) => pendingUser.id === user.id,
      )
    )
      throw new ForbiddenException('Request already has been sent.');
    if (
      user.friendlist.blocked.find(
        (blockedUser) => blockedUser.id === target.id,
      )
    )
      throw new ForbiddenException('Cannot send a request to a blocked user.');

    // Add the request to the target's pending list and notify the target.
    target.friendlist.pending.push(user);
    await this.notificationService.addNotification(target.id, {
      action: 'FRIEND_REQUEST',
      recipient: target,
      sender: user,
      description: `Sent a friend request.`,
      status: 'pending',
    } as Notification);

    // Save the updated target information.
    await this.usersService.setUser(target);
  }

  /**
   * Remove a friend request sent to or received from the target user.
   * @param user_id The ID of the user removing the request.
   * @param target_id The ID of the target user involved in the request.
   */
  async removeRequest(user_id: string, target_id: string) {
    // Ensure the user is not removing a request involving themselves.
    if (user_id === target_id) throw new ForbiddenException('Same ID as user.');

    // Retrieve user and target information from the Users service.
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);

    // Filter out the target from the user's pending and friends lists.
    user.friendlist.friends = user.friendlist.friends.filter(
      (friend) => friend.id !== target.id,
    );
    user.friendlist.pending = user.friendlist.pending.filter(
      (friend) => friend.id !== target.id,
    );
    user.friendlist.blocked = user.friendlist.blocked.filter(
      (friend) => friend.id !== target.id,
    );

    target.friendlist.friends = target.friendlist.friends.filter(
      (friend) => friend.id !== user.id,
    );
    target.friendlist.pending = target.friendlist.pending.filter(
      (friend) => friend.id !== user.id,
    );
    target.friendlist.blocked = target.friendlist.blocked.filter(
      (friend) => friend.id !== user.id,
    );

    // Save the updated user information.
    await this.usersService.setUser(user);
    await this.usersService.setUser(target);
  }

  /**
   * Retrieve the list of friends for the user.
   * @param user_id The ID of the user.
   * @returns The user's list of friends.
   */
  async getFriends(user_id: string): Promise<User> {
    return await this.usersService.getFriends(user_id);
  }

  /**
   * Retrieve the list of pending friend requests for the user.
   * @param user_id The ID of the user.
   * @returns The user's list of pending friend requests.
   */
  async getPending(user_id: string): Promise<User> {
    return await this.usersService.getPending(user_id);
  }

  /**
   * Retrieve the list of blocked friends for the user.
   * @param user_id The ID of the user.
   * @returns The user's list of blocked friends.
   */
  async getBlocked(user_id: string): Promise<User> {
    return await this.usersService.getBlocked(user_id);
  }

  async getFriendListState(
    user_id: string,
    target_id: string,
  ): Promise<{ state: string }> {
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);

    if (user.friendlist.friends.find((friend) => friend.id == target_id))
      return { state: 'FRIEND' };
    if (target.friendlist.pending.find((pending) => pending.id == target_id))
      return { state: 'PENDING' };
    if (user.friendlist.blocked.find((blocked) => blocked.id == target_id))
      return { state: 'BLOCKED' };
    return { state: 'NONE' };
  }

  /**
   * Accept a friend request from the target user.
   * @param user_id The ID of the user accepting the request.
   * @param target_id The ID of the target user who sent the request.
   */
  async acceptRequest(user_id: string, target_id: string) {
    // Ensure the user is not accepting a request from themselves.
    if (user_id === target_id) throw new ForbiddenException('Same ID as user.');

    // Retrieve user and target information from the Users service.
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);

    // Check if the target has sent a valid friend request.
    if (
      !user.friendlist.pending.find(
        (pendingUser) => pendingUser.id === target.id,
      )
    )
      throw new NotFoundException('Target not found.');
    if (
      user.friendlist.blocked.find(
        (blockedUser) => blockedUser.id === target.id,
      )
    )
      throw new ForbiddenException(
        'Cannot accept a request from a blocked user.',
      );

    // Remove the target from the user's pending list and add them to the friends list.
    user.friendlist.pending = user.friendlist.pending.filter(
      (friend) => friend.id !== target.id,
    );
    user.friendlist.friends.push(target);

    // Add the user to the target's friends list.
    target.friendlist.friends.push(user);

    // Save the updated user and target information.
    await this.usersService.setUser(user);
    await this.usersService.setUser(target);
    await this.achievementService.setAchievement(user.id, 'social_pioneer');
    await this.achievementService.setAchievement(target.id, 'social_pioneer');
    if (user.friendlist.friends.length > 4)
      await this.achievementService.setAchievement(user.id, 'circle_of_allies');
    if (target.friendlist.friends.length > 4)
      await this.achievementService.setAchievement(
        target.id,
        'circle_of_allies',
      );
  }

  /**
   * Block the target user from the user's friends list.
   * @param user_id The ID of the user.
   * @param target_id The ID of the target user to be blocked.
   */
  async blockFriend(user_id: string, target_id: string) {
    // Ensure the user is not blocking themselves.
    if (user_id === target_id) throw new ForbiddenException('Same ID as user.');

    // Retrieve user and target information from the Users service.
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);

    // Check if the target is a valid friend.
    if (
      !user.friendlist.friends.find((friendUser) => friendUser.id === target.id)
    )
      throw new NotFoundException('Target not found.');

    // Remove the target from the user's friends list and add them to the blocked list.
    user.friendlist.friends = user.friendlist.friends.filter(
      (friend) => friend.id !== target.id,
    );
    user.friendlist.blocked.push(target);

    // Save the updated user information.
    await this.usersService.setUser(user);
  }

  /**
   * Unblock the target user, allowing them to be friends again.
   * @param user_id The ID of the user.
   * @param target_id The ID of the target user to be unblocked.
   */
  async unblockFriend(user_id: string, target_id: string) {
    // Ensure the user is not unblocking themselves.
    if (user_id === target_id) throw new ForbiddenException('Same ID as user.');

    // Retrieve user and target information from the Users service.
    const user = await this.usersService.getFriendList(user_id);
    const target = await this.usersService.getFriendList(target_id);

    // Check if the target is a valid blocked user.
    if (
      !user.friendlist.blocked.find((friendUser) => friendUser.id === target.id)
    )
      throw new NotFoundException('Target not found.');

    // Remove the target from the user's blocked list and add them to the friends list.
    user.friendlist.blocked = user.friendlist.blocked.filter(
      (blocked) => blocked.id !== target.id,
    );
    user.friendlist.friends.push(target);

    // Save the updated user information.
    await this.usersService.setUser(user);
  }
}
