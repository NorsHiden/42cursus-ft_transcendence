import { ChannelsService } from '../services/channels.service';
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
} from '@nestjs/common';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { UpdateChannelDto } from '../dto/update-channel.dto';
import { Routes, Services, imagesFileFields } from 'src/utils/consts';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IChannelsService } from '../interfaces/IChannelsService.interface';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/typeorm/user.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateChannelArgs, ImagesFiles } from 'src/utils/types';

@UseGuards(JwtAuthGuard)
@Controller(Routes.CHANNELS)
export class ChannelsController {
  constructor(
    @Inject(Services.Channels)
    private readonly channelsService: ChannelsService,
  ) {}

  @Post()
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor(imagesFileFields),
  )
  create(
    @Body() createChannelDto: CreateChannelDto,
    @UploadedFiles() files: ImagesFiles,
    @AuthUser() user: User,
  ) {
    console.log(files);
    const args: CreateChannelArgs = {
      ...createChannelDto,
      avatar: files?.avatar?.[0],
      banner: files?.banner?.[0],
    };
    return this.channelsService.create(args, user.id);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Paginate() query: PaginateQuery) {
    return this.channelsService.findAll(query);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string) {
    return this.channelsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
    @AuthUser() user: User,
  ) {
    return this.channelsService.update(+id, updateChannelDto, user);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string, @AuthUser() user: User) {
    return this.channelsService.remove(+id, user);
  }
}
