import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  Sse,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { IUsersService } from '../interfaces/IUsersService.interface';
import { Routes, Services } from 'src/utils/consts';
import { FileInterceptor } from '@nestjs/platform-express';
import { interval, map, switchMap } from 'rxjs';
import { User } from 'src/typeorm/user.entity';

@Controller(Routes.USERS)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get(Routes.ME)
  async getMe(@Req() req) {
    return await this.usersService.getMe(req.user.id);
  }

  @Get(Routes.ME + '/is-loggedin')
  isLogged() {
    return { statusCode: 200, is_logged_in: true };
  }

  @Get(Routes.ME + '/is-verified')
  isVerified(@Req() req) {
    return this.usersService.isVerified(req.user.id);
  }

  @Post(Routes.ME + '/complete-login')
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

  @Post(Routes.ME + '/about')
  async updateAbout(@Req() req, @Body('about') about: string) {
    const user = await this.usersService.updateAbout(req.user.id, about);
    return user;
  }

  @Get('search')
  async search(@Query('s') search_query: string) {
    return await this.usersService.search(search_query);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }
}
