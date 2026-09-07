import type { CreateEquipoDTO, Equipo, UpdateEquipoDTO } from '../types/equipo';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/equipos';

export class ApiServiceError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiServiceError';
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return {} as T;
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMessage =
      typeof data === 'object' && data !== null && 'error' in data
        ? (data as { error: string }).error
        : typeof data === 'string' && data.length > 0
        ? data
        : `Error en la petición (Código ${response.status})`;
    throw new ApiServiceError(errorMessage, response.status);
  }

  return data as T;
}

export const equipoApi = {
  async getAll(): Promise<Equipo[]> {
    try {
      const response = await fetch(API_BASE_URL);
      return await handleResponse<Equipo[]>(response);
    } catch (error) {
      if (error instanceof ApiServiceError) throw error;
      throw new ApiServiceError('No se pudo conectar con el servidor backend', 503);
    }
  },

  async getById(id: number): Promise<Equipo> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      return await handleResponse<Equipo>(response);
    } catch (error) {
      if (error instanceof ApiServiceError) throw error;
      throw new ApiServiceError('No se pudo conectar con el servidor backend', 503);
    }
  },

  async create(equipo: CreateEquipoDTO): Promise<Equipo> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipo),
      });
      return await handleResponse<Equipo>(response);
    } catch (error) {
      if (error instanceof ApiServiceError) throw error;
      throw new ApiServiceError('No se pudo conectar con el servidor backend', 503);
    }
  },

  async update(id: number, equipo: UpdateEquipoDTO): Promise<Equipo> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipo),
      });
      return await handleResponse<Equipo>(response);
    } catch (error) {
      if (error instanceof ApiServiceError) throw error;
      throw new ApiServiceError('No se pudo conectar con el servidor backend', 503);
    }
  },

  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      await handleResponse<void>(response);
    } catch (error) {
      if (error instanceof ApiServiceError) throw error;
      throw new ApiServiceError('No se pudo conectar con el servidor backend', 503);
    }
  },
};
