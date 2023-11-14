import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUsersService } from '../interfaces/IUsersService.interface';
import { Routes, Services } from 'src/utils/consts';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserDto } from '../dto/userDto';

@Controller(Routes.USERS)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
  ) {}

  @Get(Routes.ME)
  async getMe(@Req() req) {
    return await this.usersService.getUser(req.user.id);
  }

  @Put(Routes.ME)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  async updateUser(
    @Req() req,
    @Body() userDto: UserDto,
    @UploadedFiles()
    images: {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    return this.usersService.updateUser(req.user.id, userDto, images);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }

  @Get(Routes.ME + '/is-loggedin')
  isLogged() {
    return { is_logged_in: true };
  }

  @Get(Routes.ME + '/is-verified')
  async isVerified(@Req() req) {
    return {
      verified: await this.usersService.isVerified(req.user.id),
    };
  }

  @Get('search')
  async search(@Query('s') search_query: string) {
    return await this.usersService.getUsers(search_query);
  }
}
