import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(),
    );

    // 1. Manual Middleware to "Short-Circuit" the Preflight (OPTIONS)
    app.use((req, res, next) => {
        const allowedOrigins = [
            'https://scrapays-assessment.netlify.app',
            'http://localhost:5173'
        ];
        const origin = req.headers.origin;

        if (allowedOrigins.includes(origin)) {
            res.header('Access-Control-Allow-Origin', origin);
        }

        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept, apollo-require-preflight, x-apollo-operation-name');
        res.header('Access-Control-Allow-Credentials', 'true');

        // 🟢 If it's an OPTIONS request, return 204 (No Content) immediately.
        // This prevents the "405 Method Not Allowed" error from Apollo.
        if (req.method === 'OPTIONS') {
            return res.status(204).send();
        }

        next();
    });

    // 2. Standard CORS as a backup for other routes
    app.enableCors({
        origin: [
            'https://scrapays-assessment.netlify.app',
            'http://localhost:5173',
        ],
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'apollo-require-preflight',
            'x-apollo-operation-name',
        ]
    });

    await app.listen(process.env.PORT || 3001, '0.0.0.0');
}

bootstrap();