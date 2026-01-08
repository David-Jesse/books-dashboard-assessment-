import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [
          "http://localhost:5173",
          "https://scrapays-assessment.netlify.app"
        ],
        credentials: true,
        allowedHeaders: [
            'Authorization',
            'Content-Type',
        ],
        methods: ['GET', 'POST', 'OPTIONS'],
    });

    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();