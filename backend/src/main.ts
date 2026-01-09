import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 1. Use the built-in enableCors with a configuration that
    // explicitly matches the "Authorization" and "Content-Type" headers you are sending.
    app.enableCors({
        origin: 'https://scrapays-assessment.netlify.app',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'apollo-require-preflight',
            'x-apollo-operation-name'
        ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204, // Essential for legacy browser/Netlify compatibility
    });

    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();