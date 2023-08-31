import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Routes } from 'src/utils/consts';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(Routes.USERS)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('@me')
  async getMe(@Req() req) {
    return await this.usersService.getMe(req.user.id);
  }

  @Get('is-loggedin')
  isLogged() {
    return { statusCode: 200, is_logged_in: true };
  }

  @Get('is-verified')
  isVerified(@Req() req) {
    return this.usersService.isVerified(req.user.id);
  }

  @Post('profile')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadProfileImage(
    @Req() req,
    @UploadedFile() avatar,
    @Body('username') username: string,
    @Body('display_name') display_name: string,
  ) {
    const profileImageUrl = '/avatars/' + avatar.filename;
    const user = await this.usersService.saveUserData(
      req.user.id,
      username,
      display_name,
      profileImageUrl,
    );

    return user;
  }
}
