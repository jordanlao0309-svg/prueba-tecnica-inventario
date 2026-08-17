"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const equipo_routes_1 = __importDefault(require("./routes/equipo.routes"));
// Cargar variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middlewares globales
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Ruta base / Healthcheck
app.get('/', (_req, res) => {
    res.json({
        status: 'online',
        message: '¡Servidor del Inventario de Equipos funcionando correctamente!',
        endpoints: {
            equipos: '/api/equipos'
        }
    });
});
// Rutas de la API
app.use('/api/equipos', equipo_routes_1.default);
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
