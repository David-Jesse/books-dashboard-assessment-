import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [
            'https://scrapays-assessment.netlify.app',
            'http://localhost:5173',
        ],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Authorization', 'Content-Type'],
    });

    await app.listen(process.env.PORT || 3001, '0.0.0.0');
}
bootstrap();
