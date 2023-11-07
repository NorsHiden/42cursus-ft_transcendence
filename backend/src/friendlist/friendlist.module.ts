import { Module } from '@nestjs/common';
import { FriendlistController } from './controllers/friendlist.controller';
import { FriendlistService } from './services/friendlist.service';
import { Services } from '../utils/consts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Friendlist } from 'src/typeorm/friendlist.entity';
import { UsersService } from 'src/users/services/users.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [NotificationModule, TypeOrmModule.forFeature([User, Friendlist])],
  controllers: [FriendlistController],
  providers: [
    {
      provide: Services.Users,
      useClass: UsersService,
    },
    {
      provide: Services.Friendlist,
      useClass: FriendlistService,
    },
  ],
})
export class FriendlistModule {}
