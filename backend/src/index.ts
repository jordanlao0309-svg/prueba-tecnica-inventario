import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import equipoRoutes from './routes/equipo.routes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta base / Healthcheck
app.get('/', (_req: Request, res: Response) => {
    res.json({
        status: 'online',
        message: '¡Servidor del Inventario de Equipos funcionando correctamente!',
        endpoints: {
            equipos: '/api/equipos'
        }
    });
});

// Rutas de la API
app.use('/api/equipos', equipoRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});