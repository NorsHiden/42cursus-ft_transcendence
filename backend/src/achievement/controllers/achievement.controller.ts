import { Controller, Inject } from '@nestjs/common';
import { Services } from 'src/utils/consts';
import { IAchievementService } from '../interfaces/achievement.interface';

@Controller()
export class AchievementController {
  constructor(
    @Inject(Services.Achievement)
    private readonly achievementService: IAchievementService,
  ) {}
}
