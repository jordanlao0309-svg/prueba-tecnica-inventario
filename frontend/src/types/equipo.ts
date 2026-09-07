export type EstadoEquipo = 'OPERATIVO' | 'EN_MANTENIMIENTO' | 'DADO_DE_BAJA';

export interface Equipo {
  id: number;
  nombre: string;
  marca: string;
  estado: EstadoEquipo;
  numeroSerie: string;
  descripcion: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEquipoDTO {
  nombre: string;
  marca: string;
  estado?: EstadoEquipo;
  numeroSerie: string;
  descripcion?: string;
}

export interface UpdateEquipoDTO {
  nombre?: string;
  marca?: string;
  estado?: EstadoEquipo;
  numeroSerie?: string;
  descripcion?: string;
}

export interface ApiError {
  error: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}
