import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ['identify', 'email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = {
      username: profile.username,
      fullname: profile.global_name,
      email: profile.email,
      picture:
        'https://cdn.discordapp.com/avatars/' +
        profile.id +
        '/' +
        profile.avatar +
        '?size=1024',
      tfa: false,
      status: 'online',
    };
    done(null, user);
  }
}
