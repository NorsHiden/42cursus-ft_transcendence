import {
  Controller,
  Get,
  HttpStatus,
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

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.Auth) private readonly authService: IAuthService,
  ) {}

  async signIn(req, res, state: string) {
    const token = await this.authService.signIn(req.user);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    if (req.user.verified === false) return { url: '/postlogin' };
    return { url: state };
  }

  /* Google OAuth*/
  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  handleGoogleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  @Redirect('/', 302)
  async googleRedirect(@Req() req, @Res() res, @Query('state') state: string) {
    return this.signIn(req, res, state);
  }
  /* Discord OAuth */
  @Get('discord/login')
  @UseGuards(DiscordOAuthGuard)
  handleDiscordLogin() {}

  @Get('discord/redirect')
  @UseGuards(DiscordOAuthGuard)
  @Redirect('/', 302)
  async discordRedirect(@Req() req, @Res() res, @Query('state') state: string) {
    return this.signIn(req, res, state);
  }

  /* 42 OAuth */
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
    return this.signIn(req, res, state);
  }
  @Get('logout')
  @Redirect('/', 302)
  handleLogout(@Res() res) {
    res.clearCookie('access_token');
  }
}
