import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 1. Manual CORS Interceptor
    app.use((req, res, next) => {
        // Allow your Netlify URL
        res.header('Access-Control-Allow-Origin', 'https://scrapays-assessment.netlify.app');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        // Add the Apollo-specific headers to the allowed list
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, apollo-require-preflight, x-apollo-operation-name');
        res.header('Access-Control-Allow-Credentials', 'true');

        // 🟢 Short-circuit OPTIONS requests
        if (req.method === 'OPTIONS') {
            return res.sendStatus(204);
        }
        next();
    });

    // 2. Default Nest CORS as backup
    app.enableCors({
        origin: 'https://scrapays-assessment.netlify.app',
        credentials: true,
    });

    await app.listen(process.env.PORT || 3001, '0.0.0.0');
}
bootstrap();