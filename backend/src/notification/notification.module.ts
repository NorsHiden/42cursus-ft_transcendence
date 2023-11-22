import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { Services } from 'src/utils/consts';
import { NotificationController } from './controllers/notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Notification } from 'src/typeorm/notification.entity';
import { EventService } from './events/services/events.service';
import { UsersModule } from 'src/users/users.module';
import { AchievementModule } from 'src/achievement/achievement.module';
import { EventModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Notification]),
    forwardRef(() => UsersModule),
    EventModule,
  ],
  controllers: [NotificationController],
  providers: [
    {
      provide: Services.Notification,
      useClass: NotificationService,
    },
  ],
  exports: [
    {
      provide: Services.Notification,
      useClass: NotificationService,
    },
  ],
})
export class NotificationModule {}
