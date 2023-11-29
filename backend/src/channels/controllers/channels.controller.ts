import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFiles,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { UpdateChannelDto } from '../dto/update-channel.dto';
import { Routes, Services, imagesFileFields } from 'src/utils/consts';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IChannelsService } from '../interfaces/IChannelsService.interface';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AuthUser } from 'src/utils/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  CreateChannelDetails,
  ImagesFiles,
  JwtUser,
  UpdateChannelDetails,
} from 'src/utils/types';

@UseGuards(JwtAuthGuard)
@Controller(Routes.CHANNELS)
export class ChannelsController {
  constructor(
    @Inject(Services.Channels)
    private readonly channelsService: IChannelsService,
  ) {}

  @Post()
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor(imagesFileFields),
  )
  create(
    @Body() createChannelDto: CreateChannelDto,
    @UploadedFiles() files: ImagesFiles,
    @AuthUser() user: JwtUser,
  ) {
    const details: CreateChannelDetails = {
      ...createChannelDto,
      avatar: files?.avatar?.[0],
      banner: files?.banner?.[0],
    };

    return this.channelsService.create(details, user.sub);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Paginate() query: PaginateQuery, @AuthUser() user: JwtUser) {
    return this.channelsService.findAll(query, user);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.channelsService.findOne(id);
  }

  @Get(':id/members')
  @UseInterceptors(ClassSerializerInterceptor)
  findMembers(
    @Param('id', ParseIntPipe) id: number,
    @Paginate() query: PaginateQuery,
  ) {
    return this.channelsService.findMembers(id, query);
  }

  @Patch(':id')
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor(imagesFileFields),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChannelDto: UpdateChannelDto,
    @UploadedFiles() files: ImagesFiles,
    @AuthUser() user: JwtUser,
  ) {
    const details: UpdateChannelDetails = {
      ...updateChannelDto,
      avatar: files?.avatar?.[0],
      banner: files?.banner?.[0],
    };
    return this.channelsService.update(id, details, user);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: JwtUser) {
    return this.channelsService.remove(id, user);
  }

  @Post(':id/join')
  @UseInterceptors(ClassSerializerInterceptor)
  join(
    @Param('id', ParseIntPipe) id: number,
    @Body('password') password: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.channelsService.join(id, user, password);
  }

  @Delete(':id/leave')
  @UseInterceptors(ClassSerializerInterceptor)
  leave(@Param('id', ParseIntPipe) id: number, @AuthUser() user: JwtUser) {
    return this.channelsService.leave(id, user);
  }

  @Post(':id/invite')
  @UseInterceptors(ClassSerializerInterceptor)
  invite(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId') userId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.channelsService.invite(id, userId, user);
  }
}
