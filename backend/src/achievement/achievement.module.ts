import { Module } from '@nestjs/common';
import { AchievementService } from './services/achievement.service';
import { AchievementController } from './controllers/achievement.controller';
import { Services } from 'src/utils/consts';

@Module({
  imports: [],
  controllers: [AchievementController],
  providers: [
    {
      provide: Services.Achievement,
      useClass: AchievementService,
    },
  ],
})
export class AchievementModule {}
