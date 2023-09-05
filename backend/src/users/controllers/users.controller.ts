import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';
import { ConfigService } from '@nestjs/config';

@Controller()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get('test')
  test() {
    return { statusCode: 200, message: 'test' };
  }
}
