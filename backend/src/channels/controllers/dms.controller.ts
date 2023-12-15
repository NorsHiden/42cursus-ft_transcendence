import {
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes, Services } from 'src/utils/consts';
import { IDmsService } from '../interfaces/IDmsService.interface';
import { AuthUser } from 'src/utils/decorators';
import { JwtUser } from 'src/utils/types';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller(Routes.DMS)
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class DmsController {
  constructor(@Inject(Services.Dms) private readonly dmsService: IDmsService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery, @AuthUser() user: JwtUser) {
    return this.dmsService.findAll(query, user);
  }

  @Get(':recipientId')
  findOne(
    @Param('recipientId', ParseIntPipe) recipientId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.dmsService.findOne(recipientId, user);
  }

  @Post(':recipientId')
  create(
    @Param('recipientId', ParseIntPipe) recipientId: string,
    @AuthUser() user: JwtUser,
  ) {
    return this.dmsService.create(recipientId, user);
  }
}
