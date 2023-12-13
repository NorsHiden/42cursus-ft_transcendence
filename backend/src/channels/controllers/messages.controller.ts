import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/consts';
import { IMessagesService } from '../interfaces/IMessagesService.interface';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AuthUser } from 'src/utils/decorators';
import { JwtUser } from 'src/utils/types';
import { CreateMessageDto } from '../dto/create-message.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.Messages)
    private readonly messagesService: IMessagesService,
  ) {}

  @Get()
  findAll(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Paginate() query: PaginateQuery,
    @AuthUser() user: JwtUser,
  ) {
    return this.messagesService.findAll(channelId, query, user);
  }

  @Post()
  create(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Body() createMessageDto: CreateMessageDto,
    @AuthUser() user: JwtUser,
  ) {
    return this.messagesService.create(channelId, createMessageDto, user);
  }
}
