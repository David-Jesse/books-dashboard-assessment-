import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // This MUST be the very first middleware defined
    app.use((req, res, next) => {
        const origin = req.headers.origin;
        const allowedOrigin = 'https://scrapays-assessment.netlify.app';

        if (origin === allowedOrigin) {
            res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
        }

        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept, apollo-require-preflight, x-apollo-operation-name');

        // 🟢 THE FIX: Handle OPTIONS and STOP the request here
        if (req.method === 'OPTIONS') {
            res.status(204).send();
            return;
        }

        next();
    });

    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}

bootstrap();