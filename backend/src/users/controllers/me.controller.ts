import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUsersService } from '../interfaces/IUsersService.interface';
import { Services } from 'src/utils/consts';

@Controller()
@UseGuards(JwtAuthGuard)
export class MeController {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get('is-loggedin')
  isLogged() {
    return { statusCode: 200, is_logged_in: true };
  }

  @Get('is-verified')
  isVerified(@Req() req) {
    return this.usersService.isVerified(req.user.id);
  }

  @Post('complete-login')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadProfileImage(
    @Req() req,
    @UploadedFile() avatar,
    @Body('username') username: string,
    @Body('display_name') display_name: string,
  ) {
    let profileImageUrl = null;
    if (avatar)
      profileImageUrl = `${this.configService.get('CLIENT_URL')}/avatars/${
        req.user.id
      }/${avatar.filename}`;
    const user = await this.usersService.completeLogin(
      req.user.id,
      username,
      display_name,
      profileImageUrl,
    );

    return user;
  }

  @Get('/')
  async getMe(@Req() req) {
    return await this.usersService.getMe(req.user.id);
  }

  @Post('about')
  async updateAbout(@Req() req, @Body('about') about: string) {
    const user = await this.usersService.updateAbout(req.user.id, about);
    return user;
  }
}
