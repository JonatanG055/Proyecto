"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = (0, express_1.default)();
// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'API para gestionar tareas',
        },
    },
    apis: ['./routes/taskRoutes.ts'], // Ruta a tus archivos de rutas donde se documentan los endpoints
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Configura Swagger UI para servir la documentación
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Configura CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:8080', // Permite solicitudes desde esta URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express_1.default.json());
// Ruta de prueba en la raíz
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente.');
});
// Usa las rutas de tareas con el prefijo '/tasks'
app.use('/tasks', taskRoutes_1.default);
exports.default = app;
