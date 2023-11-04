import {
  Controller,
  Get,
  Inject,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { GoogleOAuthGuard } from '../guards/google-auth.guard';
import { DiscordOAuthGuard } from '../guards/discord-auth.guard';
import { FourtyTwoOAuthGuard } from '../guards/42-auth.guard';
import { Routes, Services } from 'src/utils/consts';
import { IAuthService } from '../interfaces/IAuthService.interface';
import { ConfigService } from '@nestjs/config';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.Auth) private readonly authService: IAuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  handleGoogleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  @Redirect('/', 302)
  async googleRedirect(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Query('state') state: string,
  ) {
    return this.authService.signIn(req, res, state);
  }

  @Get('discord/login')
  @UseGuards(DiscordOAuthGuard)
  handleDiscordLogin() {}

  @Get('discord/redirect')
  @UseGuards(DiscordOAuthGuard)
  @Redirect('/', 302)
  async discordRedirect(@Req() req, @Res() res, @Query('state') state: string) {
    return this.authService.signIn(req, res, state);
  }

  @Get('42/login')
  @UseGuards(FourtyTwoOAuthGuard)
  handleFourtyTwoLogin() {}

  @Get('42/redirect')
  @UseGuards(FourtyTwoOAuthGuard)
  @Redirect('/', 302)
  async fourtyTwoRedirect(
    @Req() req,
    @Res() res,
    @Query('state') state: string,
  ) {
    return this.authService.signIn(req, res, state);
  }

  @Get('logout')
  @Redirect('/', 302)
  handleLogout(@Res() res) {
    res.clearCookie('access_token');
    return { url: `${this.configService.get('CLIENT_URL')}/login` };
  }
}
