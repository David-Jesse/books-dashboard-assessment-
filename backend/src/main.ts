import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    // 1. Create the app without passing CORS options here
    const app = await NestFactory.create(AppModule);

    // 2. Enable CORS with "origin: true"
    // This allows the request from your Netlify frontend dynamically
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    // 3. Listen on the correct port
    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}

bootstrap();