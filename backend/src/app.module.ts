import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RouterModule } from '@nestjs/core';
import { Routes } from './utils/consts';

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
      rootPath: `${__dirname}/../../avatars`,
      renderPath: '/avatars',
      serveRoot: '/avatars',
      serveStaticOptions: {
        index: false,
        redirect: false,
      },
    }),

    // Imports the `AuthModule` for handling authentication and user authorization.
    AuthModule,

    // Imports the `UsersModule` for user-related functionality.
    UsersModule,
  ],
  controllers: [], // No controllers defined in this module.
  providers: [], // No providers defined in this module.
})
export class AppModule {}
