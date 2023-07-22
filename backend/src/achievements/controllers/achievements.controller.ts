import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AchievementsService } from '../services/achievements.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('achievements')
@UseGuards(JwtAuthGuard)
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get('/')
  async getAchievements() {
    return await this.achievementsService.getAchievements();
  }

  @Get(':id')
  async getAchievementById(@Param('id') id: string) {
    return await this.achievementsService.getAchievementById(id);
  }
}
