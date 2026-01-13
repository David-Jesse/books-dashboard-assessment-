"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'https://scrapays-assessment.netlify.app');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, apollo-require-preflight, x-apollo-operation-name');
        res.header('Access-Control-Allow-Credentials', 'true');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(204);
        }
        next();
    });
    app.enableCors({
        origin: 'https://scrapays-assessment.netlify.app',
        credentials: true,
    });
    await app.listen(process.env.PORT || 3001, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map