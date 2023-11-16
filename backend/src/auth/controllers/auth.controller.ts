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
    @Inject(Services.Auth)
    private readonly authService: IAuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Handle the initiation of Google OAuth login.
   */
  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  handleGoogleLogin() {}

  /**
   * Handle the redirection after successful Google OAuth login.
   * @param req The HTTP request object.
   * @param res The HTTP response object.
   * @param state The state parameter from the OAuth process.
   * @returns A redirection to the home page.
   */
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

  /**
   * Handle the initiation of Discord OAuth login.
   */
  @Get('discord/login')
  @UseGuards(DiscordOAuthGuard)
  handleDiscordLogin() {}

  /**
   * Handle the redirection after successful Discord OAuth login.
   * @param req The HTTP request object.
   * @param res The HTTP response object.
   * @param state The state parameter from the OAuth process.
   * @returns A redirection to the home page.
   */
  @Get('discord/redirect')
  @UseGuards(DiscordOAuthGuard)
  @Redirect('/', 302)
  async discordRedirect(@Req() req, @Res() res, @Query('state') state: string) {
    return this.authService.signIn(req, res, state);
  }

  /**
   * Handle the initiation of 42 OAuth login.
   */
  @Get('42/login')
  @UseGuards(FourtyTwoOAuthGuard)
  handleFourtyTwoLogin() {}

  /**
   * Handle the redirection after successful 42 OAuth login.
   * @param req The HTTP request object.
   * @param res The HTTP response object.
   * @param state The state parameter from the OAuth process.
   * @returns A redirection to the home page.
   */
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

  /**
   * Handle user logout by clearing the access token cookie.
   * @param res The HTTP response object.
   * @returns A redirection to the login page.
   */
  @Get('logout')
  @Redirect('/', 302)
  handleLogout(@Res() res) {
    res.clearCookie('access_token');
    return { url: `${this.configService.get('CLIENT_URL')}/login` };
  }
}
