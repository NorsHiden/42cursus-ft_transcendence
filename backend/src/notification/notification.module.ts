import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { Services } from 'src/utils/consts';
import { NotificationController } from './controllers/notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Notification } from 'src/typeorm/notification.entity';
import { UsersService } from 'src/users/services/users.service';
import { EventService } from './services/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification])],
  controllers: [NotificationController],
  providers: [
    EventService,
    {
      provide: Services.Users,
      useClass: UsersService,
    },
    {
      provide: Services.Notification,
      useClass: NotificationService,
    },
  ],
  exports: [EventService],
})
export class NotificationModule {}
