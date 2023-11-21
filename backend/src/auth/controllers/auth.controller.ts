import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
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
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { toDataURL } from 'qrcode';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.Auth)
    private readonly authService: IAuthService,
    private readonly configService: ConfigService,
    @Inject(Services.Users) private readonly usersService: IUsersService,
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
   * @description Generate a secret key for two-factor authentication (2FA) and return a QR code URL.
   * @param {any} req - Request object containing the authenticated user information.
   * @param {any} res - Response object for sending the QR code data.
   * @returns {Promise<void>} - Promise with no result.
   * @throws {UnauthorizedException} - If the user is not authenticated.
   */
  @UseGuards(JwtAuthGuard)
  @Post('2fa/generate')
  async generateTwoFactorAuthenticationSecret(
    @Req() req,
    @Res() res,
  ): Promise<void> {
    // Generate 2FA secret and get OTP authentication URL
    const otpauth =
      await this.authService.generateTwoFactorAuthenticationSecret(
        req.user.sub,
      );

    // Convert OTP authentication URL to a QR code data URL
    toDataURL(otpauth, (err, dataUrl) =>
      res.send({
        qrcode: dataUrl,
      }),
    );
  }

  /**
   * @description Turn on two-factor authentication (2FA) for a user after verifying the provided authentication code.
   * @param {any} req - Request object containing the authenticated user information.
   * @param {string} auth_code - Authentication code entered by the user.
   * @param {any} res - Response object for sending the result of the 2FA activation.
   * @returns {Promise<void>} - Promise with no result.
   * @throws {UnauthorizedException} - If the user is not authenticated or the provided authentication code is invalid.
   */
  @UseGuards(JwtAuthGuard)
  @Post('2fa/verify')
  async turnOnTwoFactorAuthentication(
    @Req() req,
    @Body('auth_code') auth_code: string,
    @Res() res,
  ): Promise<void> {
    // Activate 2FA for the user and verify the provided authentication code
    return await this.authService.turnOnTwoFactorAuthentication(
      req.user,
      auth_code,
      res,
    );
  }

  /**
   * @description Turn off two-factor authentication (2FA) for a user.
   * @param {any} req - Request object containing the authenticated user information.
   * @param {any} res - Response object for sending the result of the 2FA deactivation.
   * @returns {Promise<void>} - Promise with no result.
   * @throws {UnauthorizedException} - If the user is not authenticated.
   */
  @UseGuards(JwtAuthGuard)
  @Post('2fa/turn-off')
  async turnOffTwoFactorAuthentication(@Req() req, @Res() res): Promise<void> {
    // Deactivate 2FA for the user
    return await this.authService.turnOffTwoFactorAuthentication(
      req.user.sub,
      res,
    );
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
