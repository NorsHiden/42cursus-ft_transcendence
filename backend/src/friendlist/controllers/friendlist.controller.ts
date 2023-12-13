import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/consts';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IFriendlistService } from '../interfaces/friendlist.interface';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { Observable, interval, map, switchMap } from 'rxjs';
import { Request } from 'express';

@Controller(Routes.FRIENDLIST)
@UseGuards(JwtAuthGuard)
export class FriendlistController {
  constructor(
    @Inject(Services.Friendlist)
    private readonly friendlistService: IFriendlistService,
    @Inject(Services.Users)
    private readonly usersService: IUsersService,
  ) {}

  /**
   * Retrieve the user's entire friend list.
   * @param req The HTTP request object.
   * @returns The user's friend list.
   */
  @Get()
  async getFriendList(@Req() req) {
    return await this.usersService.getFriendList(req.user.sub);
  }

  /**
   * Retrieve the user's list of friends.
   * @param req The HTTP request object.
   * @returns The user's list of friends.
   */
  @Get('/friends')
  async getFriends(@Req() req) {
    return await this.friendlistService.getFriends(req.user.sub);
  }

  /**
   * Retrieve the user's pending friend requests.
   * @param req The HTTP request object.
   * @returns The user's pending friend requests.
   */
  @Get('/pending')
  async getPending(@Req() req) {
    return await this.friendlistService.getPending(req.user.sub);
  }

  /**
   * Retrieve the user's blocked friends.
   * @param req The HTTP request object.
   * @returns The user's blocked friends.
   */
  @Get('/blocked')
  async getBlocked(@Req() req) {
    return await this.friendlistService.getBlocked(req.user.sub);
  }

  /**
   * Accept a friend request from a specified user.
   * @param req The HTTP request object.
   * @param target_id The ID of the user to accept the friend request from.
   */
  @Post(':id/accept')
  async acceptFriendRequest(@Req() req, @Param('id') target_id: string) {
    await this.friendlistService.acceptRequest(req.user.sub, target_id);
  }

  /**
   * Send a friend request to a specified user.
   * @param req The HTTP request object.
   * @param target_id The ID of the user to send the friend request to.
   */
  @Post(':id/send')
  async sendFriendRequest(@Req() req, @Param('id') target_id: string) {
    await this.friendlistService.sendRequest(req.user.sub, target_id);
  }

  /**
   * Block a specified user from the friend list.
   * @param req The HTTP request object.
   * @param target_id The ID of the user to block.
   */
  @Post(':id/block')
  async blockFriend(@Req() req, @Param('id') target_id: string) {
    await this.friendlistService.blockFriend(req.user.sub, target_id);
  }

  /**
   * Unblock a specified user from the friend list.
   * @param req The HTTP request object.
   * @param target_id The ID of the user to unblock.
   */
  @Post(':id/unblock')
  async unblockFriend(@Req() req, @Param('id') target_id: string) {
    await this.friendlistService.unblockFriend(req.user.sub, target_id);
  }

  /**
   * Remove a friend request sent to or received from a specified user.
   * @param req The HTTP request object.
   * @param target_id The ID of the user to remove the friend request with.
   */
  @Delete(':id')
  async removeFriendRequest(@Req() req, @Param('id') target_id: string) {
    await this.friendlistService.removeRequest(req.user.sub, target_id);
  }

  @Sse('sse')
  sse(@Req() req): Observable<any> {
    return interval(1000).pipe(
      switchMap(
        async () => await this.friendlistService.getFriends(req.user.sub),
      ),
      map((user) => ({ data: user.friendlist.friends })),
    );
  }

  @Get(':id')
  async getFriendListState(@Req() req, @Param('id') target_id: string) {
    return await this.friendlistService.getFriendListState(
      req.user.sub,
      target_id,
    );
  }
}
