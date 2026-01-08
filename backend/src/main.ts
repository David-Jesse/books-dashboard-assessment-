import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true, // Enable CORS at the application level
    });

    // Also configure CORS explicitly
    app.enableCors({
        origin: [
            'https://scrapays-assessment.netlify.app',
            'http://localhost:5173'
        ],
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    const port = process.env.PORT || 4000;
    await app.listen(port, '0.0.0.0'); // Listen on all interfaces
    console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();