import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  handleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  googleRedirect() {
    return { statusCode: 200 };
  }
}
