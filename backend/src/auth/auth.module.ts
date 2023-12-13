import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { GoogleOAuthGuard } from './guards/google-auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { DiscordOAuthGuard } from './guards/discord-auth.guard';
import { DiscordStrategy } from './strategies/discord.strategy';
import { FourtyTwoOAuthGuard } from './guards/42-auth.guard';
import { FourtyTwoStrategy } from './strategies/42.strategy';
import { User } from 'src/typeorm/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Services } from 'src/utils/consts';
import { Profile } from 'src/typeorm/profile.entity';
import { Friendlist } from 'src/typeorm/friendlist.entity';
import { UsersModule } from 'src/users/users.module';
import { AchievementModule } from 'src/achievement/achievement.module';

/**
 * The `AuthModule` encapsulates the authentication-related functionality of the application.
 * It includes controllers, guards, strategies, and services to manage user authentication
 * using various providers, such as Google, Discord, and custom JWT.
 */
@Module({
  imports: [
    // Configures the JWT module for token-based authentication.
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),

    // Configures TypeORM to work with the `User` and `Profile` entities.
    TypeOrmModule.forFeature([User, Friendlist, Profile]),

    UsersModule,
    AchievementModule,
  ],
  controllers: [AuthController],
  providers: [
    // Authentication guards for Google OAuth.
    GoogleOAuthGuard,
    GoogleStrategy,

    // Authentication guards for Discord OAuth.
    DiscordOAuthGuard,
    DiscordStrategy,

    // Authentication guards for custom 42 OAuth.
    FourtyTwoOAuthGuard,
    FourtyTwoStrategy,

    // Authentication guard for JWT-based authentication.
    JwtAuthGuard,
    JwtStrategy,

    // The primary authentication service responsible for user authentication.
    {
      provide: Services.Auth,
      useClass: AuthService,
    },
  ],
  exports: [
    {
      provide: Services.Auth,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
