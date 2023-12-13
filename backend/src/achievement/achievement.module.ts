import { Module, forwardRef } from '@nestjs/common';
import { AchievementService } from './services/achievement.service';
import { AchievementController } from './controllers/achievement.controller';
import { Services } from 'src/utils/consts';
import { NotificationModule } from 'src/notification/notification.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Achievement } from 'src/typeorm/achievement.entity';
import { Notification } from 'src/typeorm/notification.entity';

@Module({
  imports: [
    NotificationModule,
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([User, Notification, Achievement]),
  ],
  controllers: [AchievementController],
  providers: [
    {
      provide: Services.Achievement,
      useClass: AchievementService,
    },
  ],
  exports: [
    {
      provide: Services.Achievement,
      useClass: AchievementService,
    },
  ],
})
export class AchievementModule {}
