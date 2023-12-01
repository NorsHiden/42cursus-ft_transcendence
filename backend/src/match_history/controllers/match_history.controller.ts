import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/consts';
import { IMatchHistoryService } from '../interfaces/match_history.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { paramDto } from '../dto/param.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller(Routes.MATCH_HISTORY)
@UseGuards(JwtAuthGuard)
export class MatchHistoryController {
  constructor(
    @Inject(Services.MatchHistory)
    private readonly matchHistoryService: IMatchHistoryService,
  ) {}

  @Get()
  async getUserMatchHistories(@Req() req, @Query('page') page: number) {
    return await this.matchHistoryService.getUserMatches(req.user.sub, page);
  }

  @Get(':id')
  async getUserMatchHistoriesById(
    @Param() params: paramDto,
    @Query('page') page: number,
  ) {
    return await this.matchHistoryService.getUserMatches(params.id, page);
  }

  @Get(':id/highlights')
  async getHighlightsMatchHistories(
    @Param() params: paramDto,
    @Query('page') page: number,
  ) {
    return await this.matchHistoryService.getUserHighlightsMatches(params.id);
  }

  @Get(':id/wins')
  async getWinMatchHistories(
    @Param() params: paramDto,
    @Query('page') page: number,
  ) {
    return await this.matchHistoryService.getUserWinMatches(params.id, page);
  }

  @Get(':id/losses')
  async getLossMatchHistories(
    @Param() params: paramDto,
    @Query('page') page: number,
  ) {
    return await this.matchHistoryService.getUserLossMatches(params.id, page);
  }
}
