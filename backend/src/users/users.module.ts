import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Achievement } from 'src/typeorm/Achievement';
import { MatchHistory } from 'src/typeorm/MatchHistory';
import { PostController } from './controllers/users.controller.dev';
import { AchievementsService } from 'src/achievements/services/achievements.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Achievement, MatchHistory])],
  controllers: [UsersController, PostController],
  providers: [UsersService, JwtStrategy, AchievementsService],
})
export class UsersModule {}
