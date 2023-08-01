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
import { User } from 'src/typeorm/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Services } from 'src/utils/consts';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
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
  ],
})
export class AuthModule {}
