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
import { GoogleOAuthGuard } from '../guards/google-auth.guard';
import { DiscordOAuthGuard } from '../guards/discord-auth.guard';
import { FourtyTwoOAuthGuard } from '../guards/42-auth.guard';
import { Routes, Services } from 'src/utils/consts';
import { IAuthService } from '../interfaces/IAuthService.interface';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * The `AuthController` handles authentication-related endpoints and redirects
 * for various OAuth providers and user sign-in/sign-out processes.
 */
@ApiTags('Authentication') // Add a tag for the controller
@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.Auth) private readonly authService: IAuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Handles user sign-in for OAuth providers and redirects to the appropriate URL.
   * It sets an access token as a cookie upon successful sign-in.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @param state - The state parameter passed during OAuth sign-in.
   * @returns Redirects the user to the appropriate URL after sign-in.
   */
  async signIn(req, res, state: string) {
    const token = await this.authService.signIn(req.user);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    console.log(req.user);
    if (!(await this.authService.isVerified(req.user.email)).is_verified)
      return {
        url: `${this.configService.get('CLIENT_URL')}/postlogin?username=${
          req.user.username
        }&display_name=${req.user.display_name}&avatar=${req.user.avatar_url}`,
      };
    return { url: `${this.configService.get('CLIENT_URL')}/${state}` };
  }

  /**
   * Handles initiating Google OAuth sign-in.
   * Redirects the user to the Google OAuth authorization URL.
   */
  @ApiOperation({ summary: 'Handle Google OAuth sign-in' }) // Add operation summary
  @ApiResponse({
    status: 302,
    description: 'Redirect to Google OAuth authorization URL',
  })
  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  handleGoogleLogin() {}

  /**
   * Handles the Google OAuth redirect callback.
   * Redirects the user after Google OAuth sign-in.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @param state - The state parameter passed during OAuth sign-in.
   * @returns Redirects the user to the appropriate URL after sign-in.
   */
  @ApiOperation({ summary: 'Handle Google OAuth redirect' }) // Add operation summary
  @ApiResponse({
    status: 302,
    description: 'Redirect to the appropriate URL after Google OAuth sign-in',
  })
  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  @Redirect('/', 302)
  async googleRedirect(@Req() req, @Res() res, @Query('state') state: string) {
    return this.signIn(req, res, state);
  }

  /**
   * Handles initiating Discord OAuth sign-in.
   * Redirects the user to the Discord OAuth authorization URL.
   */
  @ApiOperation({ summary: 'Handle Discord OAuth sign-in' }) // Add operation summary
  @ApiResponse({
    status: 302,
    description: 'Redirect to Discord OAuth authorization URL',
  })
  @Get('discord/login')
  @UseGuards(DiscordOAuthGuard)
  handleDiscordLogin() {}

  /**
   * Handles the Discord OAuth redirect callback.
   * Redirects the user after Discord OAuth sign-in.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @param state - The state parameter passed during OAuth sign-in.
   * @returns Redirects the user to the appropriate URL after sign-in.
   */
  @ApiOperation({ summary: 'Handle Discord OAuth redirect' }) // Add operation summary
  @ApiResponse({
    status: 302,
    description: 'Redirect to the appropriate URL after Discord OAuth sign-in',
  })
  @Get('discord/redirect')
  @UseGuards(DiscordOAuthGuard)
  @Redirect('/', 302)
  async discordRedirect(@Req() req, @Res() res, @Query('state') state: string) {
    return this.signIn(req, res, state);
  }

  /**
   * Handles initiating 42 OAuth sign-in.
   * Redirects the user to the 42 OAuth authorization URL.
   */
  @ApiOperation({ summary: 'Handle 42 OAuth sign-in' }) // Add operation summary
  @ApiResponse({
    status: 302,
    description: 'Redirect to 42 OAuth authorization URL',
  })
  @Get('42/login')
  @UseGuards(FourtyTwoOAuthGuard)
  handleFourtyTwoLogin() {}

  /**
   * Handles the 42 OAuth redirect callback.
   * Redirects the user after 42 OAuth sign-in.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @param state - The state parameter passed during OAuth sign-in.
   * @returns Redirects the user to the appropriate URL after sign-in.
   */
  @ApiOperation({ summary: 'Handle 42 OAuth redirect' }) // Add operation summary
  @ApiResponse({
    status: 302,
    description: 'Redirect to the appropriate URL after 42 OAuth sign-in',
  })
  @Get('42/redirect')
  @UseGuards(FourtyTwoOAuthGuard)
  @Redirect('/', 302)
  async fourtyTwoRedirect(
    @Req() req,
    @Res() res,
    @Query('state') state: string,
  ) {
    return this.signIn(req, res, state);
  }

  /**
   * Handles user logout by clearing the access token cookie.
   * Redirects the user to the login page after logout.
   * @param res - The HTTP response object.
   * @returns Redirects the user to the login page after logout.
   */
  @ApiOperation({ summary: 'Handle user logout' }) // Add operation summary
  @ApiResponse({
    status: 302,
    description: 'Redirect to the login page after logout',
  })
  @Get('logout')
  @Redirect('/', 302)
  handleLogout(@Res() res) {
    res.clearCookie('access_token');
    return { url: `${this.configService.get('CLIENT_URL')}/login` };
  }
}
