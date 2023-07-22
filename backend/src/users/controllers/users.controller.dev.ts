import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AchievementsService } from 'src/achievements/services/achievements.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(
    private readonly usersService: UsersService,
    private readonly AchievementsService: AchievementsService,
  ) {}

  @Post('/achievement/:id')
  async addAchievementToUser(@Req() req, @Param('id') id: string) {
    const user = await this.usersService.getUserById(req.user.id);
    const achievement = user.achievements.find(
      (achievement) => achievement.id === id || achievement.name === id,
    );
    if (achievement) return { message: 'Achievment already exists.' };
    const newAchievement = await this.AchievementsService.getAchievementById(
      id,
    );
    if (!newAchievement) return { message: 'Achievment does not exist.' };
    user.achievements.push(newAchievement);
    await this.usersService.updateUser(user);
    return { message: 'Achievment added to user.' };
  }
}
