import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 🟢 MANUAL RAW MIDDLEWARE
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'https://scrapays-assessment.netlify.app');
        res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept, apollo-require-preflight, x-apollo-operation-name');
        res.header('Access-Control-Allow-Credentials', 'true');

        // Respond immediately to the browser's "ask for permission" (OPTIONS)
        if (req.method === 'OPTIONS') {
            return res.status(204).end();
        }
        next();
    });

    // Listen on Render's port
    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();