import { Module } from '@nestjs/common';
import { MeController } from './controllers/me.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Profile } from 'src/typeorm/profile.entity';
import { UsersService } from './services/users.service';

/**
 * The `MeModule` encapsulates functionality related to the current user's profile and actions.
 * It includes controllers, services, and database models for managing the user's data.
 */
@Module({
  imports: [
    // Configures TypeORM to work with the `User` and `Profile` entities.
    TypeOrmModule.forFeature([User, Profile]),
  ],
  controllers: [MeController], // Contains the controller for user-specific actions.
  providers: [UsersService], // Provides services for managing user-related data.
})
export class MeModule {}
