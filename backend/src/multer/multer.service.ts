import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req: any, file, cb) => {
          // Creates a directory for storing user avatars if it doesn't exist.
          let dir = '../imgs';
          if (file.fieldname == 'avatar' || file.fieldname == 'avatar')
            dir += `/users/${file.fieldname}s/${req.user.sub}`;
          else dir += `/channels/${file.fieldname}`;
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
              null,
            );
          const filename = `${Date.now()}.${file.originalname
            .split('.')
            .pop()}`;
          cb(null, filename);
        },
      }),
    };
  }
}
