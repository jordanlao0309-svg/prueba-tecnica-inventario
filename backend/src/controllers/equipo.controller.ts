import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import * as equipoService from '../services/equipo.service';

// 1. Obtener todos los equipos
export const obtenerEquipos = async (_req: Request, res: Response) => {
    try {
        const equipos = await equipoService.obtenerEquipos();
        return res.status(200).json(equipos);
    } catch (error) {
        console.error('Error en obtenerEquipos:', error);
        return res.status(500).json({ error: 'Error interno del servidor al obtener los equipos' });
    }
};

// 2. Obtener un equipo por ID
export const obtenerEquipoPorId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El ID proporcionado debe ser un número válido' });
        }

        const equipo = await equipoService.obtenerEquipoPorId(id);
        if (!equipo) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        return res.status(200).json(equipo);
    } catch (error) {
        console.error('Error en obtenerEquipoPorId:', error);
        return res.status(500).json({ error: 'Error interno del servidor al obtener el equipo' });
    }
};

// 3. Crear un nuevo equipo
export const crearEquipo = async (req: Request, res: Response) => {
    try {
        const { nombre, marca, numeroSerie, estado, descripcion } = req.body;

        if (!nombre || !marca || !numeroSerie) {
            return res.status(400).json({
                error: 'Los campos nombre, marca y numeroSerie son obligatorios'
            });
        }

        const nuevoEquipo = await equipoService.crearEquipo({
            nombre,
            marca,
            numeroSerie,
            estado,
            descripcion
        });

        return res.status(201).json(nuevoEquipo);
    } catch (error) {
        console.error('Error en crearEquipo:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(409).json({ error: 'Ya existe un equipo con ese número de serie' });
        }
        return res.status(500).json({ error: 'Error interno del servidor al crear el equipo' });
    }
};

// 4. Actualizar un equipo
export const actualizarEquipo = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El ID proporcionado debe ser un número válido' });
        }

        const equipoActualizado = await equipoService.actualizarEquipo(id, req.body);
        return res.status(200).json(equipoActualizado);
    } catch (error) {
        console.error('Error en actualizarEquipo:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'El equipo a actualizar no existe' });
            }
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Ya existe otro equipo con ese número de serie' });
            }
        }
        return res.status(500).json({ error: 'Error interno del servidor al actualizar el equipo' });
    }
};

// 5. Eliminar un equipo
export const eliminarEquipo = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El ID proporcionado debe ser un número válido' });
        }

        await equipoService.eliminarEquipo(id);
        return res.status(204).send();
    } catch (error) {
        console.error('Error en eliminarEquipo:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: 'El equipo a eliminar no existe' });
        }
        return res.status(500).json({ error: 'Error interno del servidor al eliminar el equipo' });
    }
};