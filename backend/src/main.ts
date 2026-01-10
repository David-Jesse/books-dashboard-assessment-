import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 🟢 Use the built-in enableCors with specific Preflight handling
    app.enableCors({
        origin: 'https://scrapays-assessment.netlify.app',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'apollo-require-preflight',
            'x-apollo-operation-name',
        ],
        // This is the critical part to stop the 405 error:
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    // Ensure it binds to 0.0.0.0 for Render
    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}

bootstrap();