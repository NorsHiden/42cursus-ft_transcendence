import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/consts';
import { IAchievementService } from '../interfaces/achievement.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller(Routes.ACHIEVEMENT)
@UseGuards(JwtAuthGuard)
export class AchievementController {
  constructor(
    @Inject(Services.Achievement)
    private readonly achievementService: IAchievementService,
  ) {}

  @Get()
  async getAchievements(@Req() req) {
    return await this.achievementService.getAchievements(req.user.sub);
  }
}
