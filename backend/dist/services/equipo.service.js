"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEquipo = exports.actualizarEquipo = exports.crearEquipo = exports.obtenerEquipoPorId = exports.obtenerEquipos = void 0;
const prisma_1 = __importDefault(require("../prisma"));
// 1. Listar todos los equipos registrados
const obtenerEquipos = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.equipo.findMany({
        orderBy: { createdAt: 'desc' },
    });
});
exports.obtenerEquipos = obtenerEquipos;
// 2. Obtener un equipo por su ID
const obtenerEquipoPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.equipo.findUnique({
        where: { id },
    });
});
exports.obtenerEquipoPorId = obtenerEquipoPorId;
// 3. Crear un nuevo equipo
const crearEquipo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.equipo.create({
        data,
    });
});
exports.crearEquipo = crearEquipo;
// 4. Actualizar la información de un equipo existente
const actualizarEquipo = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.equipo.update({
        where: { id },
        data,
    });
});
exports.actualizarEquipo = actualizarEquipo;
// 5. Eliminar un equipo del sistema
const eliminarEquipo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.equipo.delete({
        where: { id },
    });
});
exports.eliminarEquipo = eliminarEquipo;
