import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para poder recibir datos en formato JSON
app.use(express.json());

// Ruta base de prueba
app.get('/', (req: Request, res: Response) => {
    res.send('¡Servidor del Inventario de Equipos funcionando correctamente!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});