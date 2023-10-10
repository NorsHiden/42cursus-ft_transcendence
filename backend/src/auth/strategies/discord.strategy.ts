import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-discord';
import { UserDto } from 'src/users/dto/userDto';

/**
 * Discord Strategy
 * @extends PassportStrategy
 * @example @UseGuards(DiscordStrategy)
 * @example @Get('discord/login')
 * @example @Get('discord/redirect')
 * @see https://docs.nestjs.com/security/authentication#implementing-passport-strategies
 */
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

  /**
   * @description Validate Discord OAuth
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
    const user: UserDto = {
      username: profile.username,
      display_name: profile.global_name,
      email: profile.email,
      profile: {
        avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`,
      },
    };
    done(null, user);
  }
}
