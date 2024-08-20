import app from './app';
import connectDB from './db';

const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
