import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: [
                'https://scrapays-assessment.netlify.app',
                'http://localhost:5173',
                'http://localhost:4000'
            ],
            methods: ['GET', 'POST', 'OPTIONS'],
            allowedHeaders: ['Authorization', 'Content-Type', "X-Requested-With"],
            credentials: true,
        },
    });

    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}

bootstrap();