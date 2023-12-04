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
import { Points } from 'src/typeorm/points.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel, UserChannel, User, Points]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ChannelsController],
  providers: [
    {
      provide: Services.Channels,
      useClass: ChannelsService,
    },
    {
      provide: Services.Users,
      useClass: UsersService,
    },
  ],
})
export class ChannelsModule {}
