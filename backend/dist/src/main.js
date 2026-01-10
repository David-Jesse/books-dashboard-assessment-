"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((req, res, next) => {
        const origin = req.headers.origin;
        const allowedOrigin = 'https://scrapays-assessment.netlify.app';
        if (origin === allowedOrigin) {
            res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
        }
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept, apollo-require-preflight, x-apollo-operation-name');
        if (req.method === 'OPTIONS') {
            res.status(204).send();
            return;
        }
        next();
    });
    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map