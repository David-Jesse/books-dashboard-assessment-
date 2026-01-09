import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 1. Manually set headers using Express middleware
    // This runs BEFORE Guards and BEFORE GraphQL
    app.use((req, res, next) => {
        const origin = req.headers.origin;

        // Dynamically allow the origin if it's yours
        if (origin === 'https://scrapays-assessment.netlify.app') {
            res.header('Access-Control-Allow-Origin', origin);
        }

        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, apollo-require-preflight');
        res.header('Access-Control-Allow-Credentials', 'true');

        // 2. Intercept OPTIONS method
        if (req.method === 'OPTIONS') {
            return res.status(204).send();
        }

        next();
    });

    // 3. Listen on the port provided by Render
    // '0.0.0.0' is required for Render to route external traffic
    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();