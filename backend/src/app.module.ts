import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/User';
import { Achievement } from './typeorm/Achievement';
import { MatchHistory } from './typeorm/MatchHistory';
import { AchievementsModule } from './achievements/achievements.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [User, Achievement, MatchHistory],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    AchievementsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
