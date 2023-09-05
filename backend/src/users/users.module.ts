import { ForbiddenException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Profile } from 'src/typeorm/profile.entity';
import * as fs from 'fs';
import { MeModule } from './me.module';

/**
 * The `UsersModule` encapsulates user-related functionality within the application.
 * It includes controllers, services, and database models to manage user data and avatars.
 */
@Module({
  imports: [
    // Configures TypeORM to work with the `User` and `Profile` entities.
    TypeOrmModule.forFeature([User, Profile]),

    // Configures Multer for handling file uploads and storing avatars.
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Creates a directory for storing user avatars if it doesn't exist.
          const dir = `../avatars/${req.user.id}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          // Generates a unique filename for uploaded avatars and checks file types.
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
            return cb(
              new ForbiddenException('Only image files are allowed!'),
              false,
            );
          const filename = `${Date.now()}.${file.originalname
            .split('.')
            .pop()}`;
          cb(null, filename);
        },
      }),
    }),

    // Imports the `MeModule` for user-specific functionality.
    MeModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
