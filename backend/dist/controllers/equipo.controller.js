"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEquipo = exports.actualizarEquipo = exports.crearEquipo = exports.obtenerEquipoPorId = exports.obtenerEquipos = void 0;
const client_1 = require("@prisma/client");
const equipoService = __importStar(require("../services/equipo.service"));
// 1. Obtener todos los equipos
const obtenerEquipos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipos = yield equipoService.obtenerEquipos();
        return res.status(200).json(equipos);
    }
    catch (error) {
        console.error('Error en obtenerEquipos:', error);
        return res.status(500).json({ error: 'Error interno del servidor al obtener los equipos' });
    }
});
exports.obtenerEquipos = obtenerEquipos;
// 2. Obtener un equipo por ID
const obtenerEquipoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El ID proporcionado debe ser un número válido' });
        }
        const equipo = yield equipoService.obtenerEquipoPorId(id);
        if (!equipo) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }
        return res.status(200).json(equipo);
    }
    catch (error) {
        console.error('Error en obtenerEquipoPorId:', error);
        return res.status(500).json({ error: 'Error interno del servidor al obtener el equipo' });
    }
});
exports.obtenerEquipoPorId = obtenerEquipoPorId;
// 3. Crear un nuevo equipo
const crearEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, marca, numeroSerie, estado, descripcion } = req.body;
        if (!nombre || !marca || !numeroSerie) {
            return res.status(400).json({
                error: 'Los campos nombre, marca y numeroSerie son obligatorios'
            });
        }
        const nuevoEquipo = yield equipoService.crearEquipo({
            nombre,
            marca,
            numeroSerie,
            estado,
            descripcion
        });
        return res.status(201).json(nuevoEquipo);
    }
    catch (error) {
        console.error('Error en crearEquipo:', error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(409).json({ error: 'Ya existe un equipo con ese número de serie' });
        }
        return res.status(500).json({ error: 'Error interno del servidor al crear el equipo' });
    }
});
exports.crearEquipo = crearEquipo;
// 4. Actualizar un equipo
const actualizarEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El ID proporcionado debe ser un número válido' });
        }
        const equipoActualizado = yield equipoService.actualizarEquipo(id, req.body);
        return res.status(200).json(equipoActualizado);
    }
    catch (error) {
        console.error('Error en actualizarEquipo:', error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'El equipo a actualizar no existe' });
            }
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Ya existe otro equipo con ese número de serie' });
            }
        }
        return res.status(500).json({ error: 'Error interno del servidor al actualizar el equipo' });
    }
});
exports.actualizarEquipo = actualizarEquipo;
// 5. Eliminar un equipo
const eliminarEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El ID proporcionado debe ser un número válido' });
        }
        yield equipoService.eliminarEquipo(id);
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error en eliminarEquipo:', error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: 'El equipo a eliminar no existe' });
        }
        return res.status(500).json({ error: 'Error interno del servidor al eliminar el equipo' });
    }
});
exports.eliminarEquipo = eliminarEquipo;
