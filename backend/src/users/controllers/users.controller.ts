import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';
import { Routes } from 'src/utils/consts';

@Controller(Routes.USERS)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // User Info
  @Get('/')
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users || [];
  }

  @Get('@me')
  async getSelfUser(@Req() req) {
    const user = await this.usersService.getUserById(req.user.id);
    return user;
  }

  @Get(':userid')
  async getUser(@Param('userid') userid: string) {
    const userById = await this.usersService.getUserById(userid);
    if (userById) return userById;
    const userByUsername = await this.usersService.getUserByUsername(userid);
    return userByUsername || {};
  }

  // User Achievements
  @Get(':userid/achievements')
  async getAchievementsFromUser(@Param('userid') userid: string) {
    const user = await this.usersService.getUserById(userid);
    return user.achievements || [];
  }

  @Get(':userid/achievements/:achievementid')
  async getAchievementFromUser(
    @Param('userid') userid: string,
    @Param('achievementid') achievementid: string,
  ) {
    const user = await this.usersService.getUserById(userid);
    const achievement = user.achievements.find(
      (achievement) => achievement.id === achievementid,
    );
    return achievement || {};
  }

  // User Matches
  @Get(':userid/matches')
  async getMatchesFromUser(@Param('userid') userid: string) {
    const user = await this.usersService.getUserById(userid);
    return user.match_history || [];
  }
}
