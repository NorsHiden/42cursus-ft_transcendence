import { Controller, Get, UseGuards } from '@nestjs/common';
import { Routes } from 'src/utils/consts';
import { IUsersService } from '../interfaces/users.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller(Routes.USERS)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: IUsersService) {}

  @Get('isLogged')
  isLogged() {
    return true;
  }
}
