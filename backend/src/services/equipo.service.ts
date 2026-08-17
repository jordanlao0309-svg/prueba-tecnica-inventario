import prisma from '../prisma';
import { Equipo } from '@prisma/client';

// 1. Listar todos los equipos registrados
export const obtenerEquipos = async () => {
    return await prisma.equipo.findMany({
        orderBy: { createdAt: 'desc' } // Los ordenamos del más nuevo al más viejo
    });
};

// 2. Crear un nuevo equipo
export const crearEquipo = async (data: Omit<Equipo, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prisma.equipo.create({
        data,
    });
};

// 3. Actualizar la información de un equipo existente
export const actualizarEquipo = async (id: number, data: Partial<Omit<Equipo, 'id' | 'createdAt' | 'updatedAt'>>) => {
    return await prisma.equipo.update({
        where: { id },
        data,
    });
};

// 4. Eliminar un equipo del sistema
export const eliminarEquipo = async (id: number) => {
    return await prisma.equipo.delete({
        where: { id },
    });
};