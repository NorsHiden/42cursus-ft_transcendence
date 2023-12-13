import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFiles,
  ParseIntPipe,
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

  @Get('me')
  findMeChannels(@AuthUser() user: JwtUser, @Paginate() query: PaginateQuery) {
    return this.channelsService.findMeChannels(user, query);
  }

  @Get(':channelId')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('channelId', ParseIntPipe) channelId: number) {
    return this.channelsService.findOne(channelId);
  }

  @Patch(':channelId')
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor(imagesFileFields),
  )
  update(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Body() updateChannelDto: UpdateChannelDto,
    @UploadedFiles() files: ImagesFiles,
    @AuthUser() user: JwtUser,
  ) {
    const details: UpdateChannelDetails = {
      ...updateChannelDto,
      avatar: files?.avatar?.[0],
      banner: files?.banner?.[0],
    };
    return this.channelsService.update(channelId, details, user);
  }

  @Delete(':channelId')
  @UseInterceptors(ClassSerializerInterceptor)
  remove(
    @Param('channelId', ParseIntPipe) channelId: number,
    @AuthUser() user: JwtUser,
  ) {
    return this.channelsService.remove(channelId, user);
  }

  @Post(':channelId/join')
  @UseInterceptors(ClassSerializerInterceptor)
  join(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Body('password') password: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.channelsService.join(channelId, user, password);
  }

  @Delete(':channelId/leave')
  @UseInterceptors(ClassSerializerInterceptor)
  leave(
    @Param('channelId', ParseIntPipe) channelId: number,
    @AuthUser() user: JwtUser,
  ) {
    return this.channelsService.leave(channelId, user);
  }

  @Post(':channelId/invite/:userId')
  @UseInterceptors(ClassSerializerInterceptor)
  invite(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Param('userId', ParseIntPipe) userId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.channelsService.invite(channelId, userId, user);
  }
}
