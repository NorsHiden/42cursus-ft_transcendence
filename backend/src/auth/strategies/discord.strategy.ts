import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('DISCORD_CLIENT_ID'),
      clientSecret: configService.get<string>('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get<string>('DISCORD_CALLBACK_URL'),
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
      status: 'null',
      achievements: [],
      matchHistory: [],
    };
    done(null, user);
  }
}
