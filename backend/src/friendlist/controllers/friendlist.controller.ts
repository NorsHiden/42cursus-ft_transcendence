import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/consts';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IFriendlistService } from '../interfaces/friendlist.interface';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';

@Controller(Routes.FRIENDLIST)
@UseGuards(JwtAuthGuard)
export class FriendlistController {
  constructor(
    @Inject(Services.Friendlist)
    private readonly friendlistService: IFriendlistService,
    @Inject(Services.Users) private readonly usersService: IUsersService,
  ) {}

  @Get()
  async getFriendList(@Req() req) {
    return await this.usersService.getFriendList(req.user.id);
  }

  @Post(':id/accept')
  async acceptFriendRequest(@Req() req, @Param('id') target_id: string) {
    await this.friendlistService.acceptRequest(req.user.id, target_id);
  }

  @Post(':id/send')
  async sendFriendRequest(@Req() req, @Param('id') target_id: string) {
    await this.friendlistService.sendRequest(req.user.id, target_id);
  }

  @Post(':id/block')
  async blockFriend(@Req() req, @Param('id') target_id: string) {
    await this.friendlistService.blockFriend(req.user.id, target_id);
  }

  @Post(':id/unblock')
  async unblockFriend(@Req() req, @Param('id') target_id: string) {
    await this.friendlistService.unblockFriend(req.user.id, target_id);
  }

  @Delete(':id')
  async removeFriendRequest(@Req() req, @Param('id') target_id: string) {
    await this.friendlistService.removeRequest(req.user.id, target_id);
  }
}
