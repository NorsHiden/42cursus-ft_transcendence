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
@Controller(Routes.MEMBERS)
export class MembersController {
  constructor(
    @Inject(Services.Members)
    private readonly membersService: IMembersService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Paginate() query: PaginateQuery,
  ) {
    return this.membersService.findAll(id, query);
  }

  @Get(':userId')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: string,
  ) {
    return this.membersService.findOne(id, userId.toString());
  }

  @Delete(':userId')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.membersService.kick(id, userId.toString(), user);
  }

  @Patch('ban/:userId')
  ban(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.membersService.ban(id, userId.toString(), user);
  }

  @Patch('mute/:userId')
  mute(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.membersService.mute(id, userId.toString(), user);
  }

  @Patch('elevate/:userId')
  elevateToAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.membersService.elevateToAdmin(id, userId.toString(), user);
  }
}
