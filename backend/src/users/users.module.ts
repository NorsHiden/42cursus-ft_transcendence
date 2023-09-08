import { ForbiddenException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { Profile } from 'src/typeorm/profile.entity';
import { MeModule } from './me.module';

/**
 * The `UsersModule` encapsulates user-related functionality within the application.
 * It includes controllers, services, and database models to manage user data and avatars.
 */
@Module({
  imports: [
    // Configures TypeORM to work with the `User` and `Profile` entities.
    TypeOrmModule.forFeature([User, Profile]),

    // Imports the `MeModule` for user-specific functionality.
    MeModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
