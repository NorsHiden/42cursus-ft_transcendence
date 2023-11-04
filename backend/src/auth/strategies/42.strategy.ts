import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, verifyCallBack } from 'passport-42';
import { UserDto } from 'src/users/dto/userDto';

/**
 * 42 Strategy
 * @extends PassportStrategy
 * @example @UseGuards(FourtyTwoStrategy)
 * @example @Get('42/login')
 * @example @Get('42/redirect')
 * @see https://docs.nestjs.com/security/authentication#implementing-passport-strategies
 */
@Injectable()
export class FourtyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('FOURTYTWO_CLIENT_ID'),
      clientSecret: configService.get<string>('FOURTYTWO_CLIENT_SECRET'),
      callbackURL: configService.get<string>('FOURTYTWO_CALLBACK_URL'),
      scope: ['public'],
    });
  }

  /**
   * @description Validate 42 OAuth
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {Profile} profile
   * @param {verifyCallBack} done
   * @returns {object} User
   */
  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: verifyCallBack,
  ) {
    const user: UserDto = {
      email: profile._json.email,
      username: profile._json.login,
      display_name: profile._json.displayname,
      profile: {
        avatar: profile._json.image.link,
      },
    };
    done(null, user);
  }
}
