import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Routes } from 'src/utils/consts';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@Controller(Routes.USERS)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('is-loggedin')
  isLogged() {
    return true;
  }

  @Get('is-verified')
  isVerified(@Req() req) {
    return this.usersService.isVerified(req.user.id);
  }
}
