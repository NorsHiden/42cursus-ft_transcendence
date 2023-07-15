import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { GoogleOAuthGuard } from './guards/google-auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_FILTER } from '@nestjs/core';
import { TokenErrorFilter } from 'src/exceptions/TokenError';
import { DiscordOAuthGuard } from './guards/discord-auth.guard';
import { DiscordStrategy } from './strategies/discord.strategy';
import { FourtyTwoOAuthGuard } from './guards/42-auth.guard';
import { FourtyTwoStrategy } from './strategies/42.strategy';
import { User } from 'src/typeorm/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'src/typeorm/Achievement';
import { MatchHistory } from 'src/typeorm/MatchHistory';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User, Achievement, MatchHistory]),
  ],
  controllers: [AuthController],
  providers: [
    GoogleOAuthGuard,
    GoogleStrategy,
    DiscordOAuthGuard,
    DiscordStrategy,
    FourtyTwoOAuthGuard,
    FourtyTwoStrategy,
    JwtAuthGuard,
    JwtStrategy,
    AuthService,
    {
      provide: APP_FILTER,
      useClass: TokenErrorFilter,
    },
  ],
})
export class AuthModule {}
