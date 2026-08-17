import { Router } from 'express';
import * as equipoController from '../controllers/equipo.controller';

const router = Router();

router.get('/', equipoController.obtenerEquipos);
router.post('/', equipoController.crearEquipo);
router.put('/:id', equipoController.actualizarEquipo);
router.delete('/:id', equipoController.eliminarEquipo);

export default router;