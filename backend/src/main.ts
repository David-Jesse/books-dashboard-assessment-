import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Use cors middleware directly
    app.use(cors({
        origin: [
            'https://scrapays-assessment.netlify.app',
            'http://localhost:5173'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
    }));

    const port = process.env.PORT || 4000;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on port ${port}`);
}

bootstrap();