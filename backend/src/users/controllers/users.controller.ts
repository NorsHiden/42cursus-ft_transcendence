import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('@me')
  @UseGuards(JwtAuthGuard)
  async getSelfUser(@Req() req) {
    const user = this.usersService.getUserById(req.user.id);
    return user;
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    const users = this.usersService.getAllUsers();
    return users || [];
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string) {
    const userById = await this.usersService.getUserById(id);
    if (userById) return userById;
    const userByUsername = await this.usersService.getUserByUsername(id);
    return userByUsername || {};
  }
}
