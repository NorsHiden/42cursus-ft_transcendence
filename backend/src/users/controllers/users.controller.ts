import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { IUsersService } from '../interfaces/IUsersService.interface';
import { Services } from 'src/utils/consts';

@Controller()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get('test')
  test() {
    return { statusCode: 200, message: 'test' };
  }
}
