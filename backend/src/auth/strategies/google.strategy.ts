import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';

/**
 * Google Strategy
 * @extends PassportStrategy
 * @example @UseGuards(GoogleStrategy)
 * @example @Get('google/login')
 * @example @Get('google/redirect')
 * @see https://docs.nestjs.com/security/authentication#implementing-passport-strategies
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  /**
   * @description Validate Google OAuth
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
    done: VerifyCallback,
  ) {
    const user = {
      email: profile._json.email,
      username: profile._json.name,
      display_name: profile._json.given_name,
      avatar_url: profile._json.picture,
    };
    done(null, user);
  }
}
