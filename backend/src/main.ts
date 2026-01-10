import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
    );

    // ✅ Apply CORS BEFORE Apollo is mounted
    app.use(
        cors({
            origin: [
                'https://scrapays-assessment.netlify.app',
                'http://localhost:5173',
            ],
            methods: ['GET', 'POST'],
            allowedHeaders: ['Authorization', 'Content-Type'],
        }),
    );

    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}

bootstrap();
