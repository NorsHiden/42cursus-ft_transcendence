import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'
const configService = new ConfigService();


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env.dev',
		}),
		AuthModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: configService.get<string>('DB_HOST'),
			autoLoadEntities: true,
			synchronize: true,
		  }),
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
