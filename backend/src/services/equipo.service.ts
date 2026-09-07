import prisma from '../prisma';
import { Prisma } from '@prisma/client';

// 1. Listar todos los equipos registrados
export const obtenerEquipos = async () => {
    return await prisma.equipo.findMany({
        orderBy: { createdAt: 'desc' },
    });
};

// 2. Obtener un equipo por su ID
export const obtenerEquipoPorId = async (id: number) => {
    return await prisma.equipo.findUnique({
        where: { id },
    });
};

// 3. Crear un nuevo equipo
export const crearEquipo = async (data: Prisma.EquipoCreateInput) => {
    return await prisma.equipo.create({
        data,
    });
};

// 4. Actualizar la información de un equipo existente
export const actualizarEquipo = async (id: number, data: Prisma.EquipoUpdateInput) => {
    return await prisma.equipo.update({
        where: { id },
        data,
    });
};

// 5. Eliminar un equipo del sistema
export const eliminarEquipo = async (id: number) => {
    return await prisma.equipo.delete({
        where: { id },
    });
};