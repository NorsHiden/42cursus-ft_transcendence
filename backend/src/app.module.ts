import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FriendlistModule } from './friendlist/friendlist.module';
import { NotificationModule } from './notification/notification.module';
import { AchievementModule } from './achievement/achievement.module';
import { GatewaysModule } from './gateways/gateways.module';

const configService = new ConfigService();

/**
 * The `AppModule` serves as the central module of the NestJS application,
 * configuring various components and modules needed to run the application.
 */
@Module({
  imports: [
    // Configures the global application environment using values from .env.dev.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),

    // Configures TypeORM to connect to the PostgreSQL database.
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: configService.get<string>('DB_URL'),
      autoLoadEntities: true,
      synchronize: true,
    }),

    // Configures serving static files, including avatars.
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../../imgs`,
      renderPath: '/imgs',
      serveRoot: '/imgs',
      serveStaticOptions: {
        index: false,
        redirect: false,
      },
    }),

    // Imports the `AuthModule` for handling authentication and user authorization.
    AuthModule,

    // Imports the `UsersModule` for user-related functionality.
    UsersModule,

    FriendlistModule,

    NotificationModule,

    GatewaysModule,
  ],
})
export class AppModule {}
