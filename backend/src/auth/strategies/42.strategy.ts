import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, verifyCallBack } from 'passport-42';

export class FourtyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
    super({
      clientID: process.env.FOURTYTWO_CLIENT_ID,
      clientSecret: process.env.FOURTYTWO_CLIENT_SECRET,
      callbackURL: process.env.FOURTYTWO_CALLBACK_URL,
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
      picture: profile._json.image.link,
    };
    done(null, user);
  }
}
