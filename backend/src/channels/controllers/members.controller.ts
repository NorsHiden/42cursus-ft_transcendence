import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes, Services } from 'src/utils/consts';
import { IMembersService } from '../interfaces/IMembersService.interface';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AuthUser } from 'src/utils/decorators';
import { JwtUser } from 'src/utils/types';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(Routes.MEMBERS)
export class MembersController {
  constructor(
    @Inject(Services.Members)
    private readonly membersService: IMembersService,
  ) {}

  @Get()
  findAll(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Paginate() query: PaginateQuery,
  ) {
    return this.membersService.findAll(channelId, query);
  }

  @Get(':userId')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Param('userId', ParseIntPipe) userId: string,
  ) {
    return this.membersService.findOne(channelId, userId.toString());
  }

  @Delete(':userId')
  remove(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Param('userId', ParseIntPipe) userId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.membersService.kick(channelId, userId.toString(), user);
  }

  @Patch('ban/:userId')
  ban(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Param('userId', ParseIntPipe) userId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.membersService.ban(channelId, userId.toString(), user);
  }

  @Patch('mute/:userId')
  mute(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Param('userId', ParseIntPipe) userId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.membersService.mute(channelId, userId.toString(), user);
  }

  @Patch('elevate/:userId')
  elevateToAdmin(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Param('userId', ParseIntPipe) userId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.membersService.elevateToAdmin(
      channelId,
      userId.toString(),
      user,
    );
  }
}
