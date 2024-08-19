import express from 'express';
import cors from 'cors';  // Importa el paquete cors
import taskRoutes from './routes/taskRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

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
  apis: ['./routes/*.ts'], // Ruta a tus archivos de rutas donde se documentan los endpoints
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Configura Swagger UI para servir la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configura CORS
app.use(cors({
  origin: 'http://localhost:8080', // Permite solicitudes desde esta URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Ruta de prueba en la raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente.');
});

app.use('/api', taskRoutes);

export default app;
