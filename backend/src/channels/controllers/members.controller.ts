import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes, Services } from 'src/utils/consts';
import { IMembersService } from '../interfaces/IMembersService.interface';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

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
}
