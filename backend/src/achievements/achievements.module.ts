import { Module } from '@nestjs/common';
import { AchievementsController } from './controllers/achievements.controller';
import { AchievementsService } from './services/achievements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'src/typeorm/Achievement';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement])],
  controllers: [AchievementsController],
  providers: [AchievementsService]
})
export class AchievementsModule {}
