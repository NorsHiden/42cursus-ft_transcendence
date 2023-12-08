import { ForbiddenException, Module } from '@nestjs/common';
import { ChannelsService } from './services/channels.service';
import { ChannelsController } from './controllers/channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Channel } from 'src/typeorm/channel.entity';
import { UserChannel } from 'src/typeorm/userchannel.entity';
import { Services } from 'src/utils/consts';
import { UsersService } from 'src/users/services/users.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/multer/multer.service';
import { NotificationService } from 'src/notification/services/notification.service';
import { NotificationModule } from 'src/notification/notification.module';
import { Notification } from 'src/typeorm/notification.entity';
import { MembersController } from './controllers/members.controller';
import { MembersService } from './services/members.service';
import { Message } from 'src/typeorm/message.entity';
import { MessagesService } from './services/messages.service';
import { MessagesController } from './controllers/messages.controller';
import { DmsController } from './controllers/dms.controller';
import { DmsService } from './services/dms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel,
      UserChannel,
      User,
      Notification,
      Message,
    ]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    NotificationModule,
  ],
  controllers: [
    ChannelsController,
    MembersController,
    MessagesController,
    DmsController,
  ],
  providers: [
    {
      provide: Services.Channels,
      useClass: ChannelsService,
    },
    {
      provide: Services.Users,
      useClass: UsersService,
    },
    {
      provide: Services.Members,
      useClass: MembersService,
    },
    {
      provide: Services.Messages,
      useClass: MessagesService,
    },
    {
      provide: Services.Dms,
      useClass: DmsService,
    },
  ],
  exports: [
    {
      provide: Services.Channels,
      useClass: ChannelsService,
    },
    {
      provide: Services.Members,
      useClass: MembersService,
    },
    {
      provide: Services.Messages,
      useClass: MessagesService,
    },
    {
      provide: Services.Dms,
      useClass: DmsService,
    },
  ],
})
export class ChannelsModule {}
