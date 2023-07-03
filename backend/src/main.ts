import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgran from 'morgan';

async function bootstrap() {
	const { PORT } = process.env;
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());
	app.use(morgran('dev'));

	try {
		await app.listen(PORT, () => {
			console.log('Server is running on port ' + PORT )
		});
	} catch (error) {
		console.log('Error starting server', error);
	}

}
bootstrap();
