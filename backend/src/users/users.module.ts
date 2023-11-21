import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Profile } from 'src/typeorm/profile.entity';
import { Services } from 'src/utils/consts';
import { MulterModule } from '@nestjs/platform-express';
import { Friendlist } from 'src/typeorm/friendlist.entity';
import { Notification } from 'src/typeorm/notification.entity';
import { Achievement } from 'src/typeorm/achievement.entity';
import { MulterConfigService } from 'src/multer/multer.service';

/**
 * The `UsersModule` encapsulates user-related functionality within the application.
 * It includes controllers, services, and database models to manage user data and avatars.
 */
@Module({
  imports: [
    // Configures TypeORM to work with the `User` and `Profile` entities.
    TypeOrmModule.forFeature([
      User,
      Friendlist,
      Profile,
      Notification,
      Achievement,
    ]),

    // Configures Multer for handling file uploads and storing avatars.
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: Services.Users,
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: Services.Users,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
