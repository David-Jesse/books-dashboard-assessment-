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
    const server = app.getHttpAdapter().getInstance();
    server.use((0, cors_1.default)({
        origin: [
            'https://scrapays-assessment.netlify.app',
            'http://localhost:5173',
        ],
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Authorization', 'Content-Type'],
        credentials: false,
    }));
    server.options('/graphql', (req, res) => {
        res.sendStatus(204);
    });
    await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map