"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter());
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
        if (req.method === 'OPTIONS') {
            return res.status(204).send();
        }
        next();
    });
    app.enableCors({
        origin: [
            'https://scrapays-assessment.netlify.app',
            'http://localhost:5173',
        ],
        credentials: true,
    });
    await app.listen(process.env.PORT || 3001, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map