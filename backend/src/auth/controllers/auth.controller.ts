import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleOAuthGuard } from '../guards/google-auth.guard';
import { DiscordOAuthGuard } from '../guards/discord-auth.guard';
import { FourtyTwoOAuthGuard } from '../guards/42-auth.guard';
import { Routes } from 'src/utils/consts';
import { IAuthService } from '../interfaces/IAuthService.interface';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private authService: IAuthService) {}
  /* Google OAuth*/
  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  handleGoogleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleRedirect(@Req() req, @Res() res) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      MaxAge: 86400, // 1 day
      sameSite: true,
      secure: false,
    });

    res.status(HttpStatus.OK);
    res.json({ access_token: token, user: req.user });
  }
  /* Discord OAuth */
  @Get('discord/login')
  @UseGuards(DiscordOAuthGuard)
  handleDiscordLogin() {}

  @Get('discord/redirect')
  @UseGuards(DiscordOAuthGuard)
  async discordRedirect(@Req() req, @Res() res) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      MaxAge: 86400, // 1 day
      sameSite: true,
      secure: false,
    });

    res.status(HttpStatus.OK);
    res.json({ access_token: token, user: req.user });
  }

  /* 42 OAuth */
  @Get('42/login')
  @UseGuards(FourtyTwoOAuthGuard)
  handleFourtyTwoLogin() {}

  @Get('42/redirect')
  @UseGuards(FourtyTwoOAuthGuard)
  async fourtyTwoRedirect(@Req() req, @Res() res) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      MaxAge: 86400, // 1 day
      sameSite: true,
      secure: false,
    });

    res.status(HttpStatus.OK);
    res.json({ access_token: token, user: req.user });
  }

  @Get('logout')
  handleLogout(@Res() res) {
    res.clearCookie('access_token');
    res.status(HttpStatus.OK);
    res.json({ message: 'Logged out' });
  }
}
