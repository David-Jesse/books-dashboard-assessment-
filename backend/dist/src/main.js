"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors_1 = __importDefault(require("cors"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.getHttpAdapter().getInstance().use((0, cors_1.default)({
        origin: [
            'https://scrapays-assessment.netlify.app',
            'http://localhost:5173'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Access-Control-Allow-Origin'],
        credentials: true,
    }));
    const port = process.env.PORT || 4000;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map