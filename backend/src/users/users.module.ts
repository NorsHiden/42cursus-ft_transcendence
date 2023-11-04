import { ForbiddenException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import fs from 'fs';
import { Profile } from 'src/typeorm/profile.entity';
import { Services } from 'src/utils/consts';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

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
          // Checks if the user already has an avatar and deletes it if it exists.
          function isDirEmpty(dirname) {
            return fs.promises.readdir(dirname).then((files) => {
              return files.length === 0;
            });
          }
          // Creates a directory for storing user avatars if it doesn't exist.
          const dir = `../avatars/${req.user.id}`;

          // Deletes the user's avatar if it exists.
          if (fs.existsSync(dir)) {
            fs.readdir(dir, (err, files) => {
              if (err) throw err;
              for (const file of files) {
                fs.unlink(path.join(dir, file), (err) => {
                  if (err) throw err;
                });
              }
            });
          }

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
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: Services.Users,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
