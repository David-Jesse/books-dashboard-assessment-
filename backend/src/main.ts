import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Use a robust configuration that explicitly handles the headers you sent
    app.enableCors({
        origin: 'https://scrapays-assessment.netlify.app',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'apollo-require-preflight', // Added for Apollo compatibility
            'x-apollo-operation-name'
        ],
        // This is the "magic" line for preflight issues:
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();