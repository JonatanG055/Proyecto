import express from 'express';
import connectDB from './db'; // Asegúrate de que la ruta a db.ts es correcta
import taskRoutes from './routes/taskRoutes';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
