import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const server = app.getHttpAdapter().getInstance();

    // ✅ Apply CORS at Express level
    server.use(
        cors({
            origin: [
                'https://scrapays-assessment.netlify.app',
                'http://localhost:5173',
            ],
            methods: ['GET', 'POST', 'OPTIONS'],
            allowedHeaders: ['Authorization', 'Content-Type'],
            credentials: false,
        }),
    );

    // ✅ MANUALLY handle preflight for GraphQL
    server.options('/graphql', (req, res) => {
        res.sendStatus(204);
    });

    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}

bootstrap();
