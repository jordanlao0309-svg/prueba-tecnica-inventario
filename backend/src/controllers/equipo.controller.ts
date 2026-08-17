import { Request, Response } from 'express';
import * as equipoService from '../services/equipo.service';

export const obtenerEquipos = async (req: Request, res: Response) => {
    try {
        const equipos = await equipoService.obtenerEquipos();
        res.status(200).json(equipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los equipos' });
    }
};

export const crearEquipo = async (req: Request, res: Response) => {
    try {
        const nuevoEquipo = await equipoService.crearEquipo(req.body);
        res.status(201).json(nuevoEquipo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el equipo' });
    }
};

export const actualizarEquipo = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const equipoActualizado = await equipoService.actualizarEquipo(id, req.body);
        res.status(200).json(equipoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el equipo' });
    }
};

export const eliminarEquipo = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await equipoService.eliminarEquipo(id);
        res.status(204).send(); // 204 significa "No Content", ideal para cuando se elimina algo
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el equipo' });
    }
};