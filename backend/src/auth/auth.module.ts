import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleOAuthGuard } from './guards/auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [GoogleOAuthGuard, GoogleStrategy],
})
export class AuthModule {}
