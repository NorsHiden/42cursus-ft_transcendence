import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, verifyCallBack } from 'passport-42';

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

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: verifyCallBack,
  ) {
    const user = {
      email: profile._json.email,
      username: profile._json.login,
      fullname: profile._json.displayname,
      picture: profile._json.image.link,
      tfa: false,
      status: 'null',
      achievements: [],
      matchHistory: [],
    };
    done(null, user);
  }
}
