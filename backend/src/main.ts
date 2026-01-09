import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors'; // Import the cors package

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 1. USE NATIVE EXPRESS CORS FIRST
    // This ensures the headers are attached before any NestJS Guards run
    app.use(cors({
        origin: 'https://scrapays-assessment.netlify.app',
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'apollo-require-preflight', 'X-Requested-With'],
        credentials: true,
    }));

    // 2. Disable the built-in Nest CORS so they don't fight
    // app.enableCors(); <-- REMOVE OR COMMENT THIS OUT

    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();