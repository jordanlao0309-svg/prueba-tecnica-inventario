import { useState, useEffect, useMemo, useCallback } from 'react';
import type { CreateEquipoDTO, Equipo, EstadoEquipo, ToastMessage, ToastType, UpdateEquipoDTO } from './types/equipo';
import { equipoApi } from './services/equipoApi';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { SearchBar } from './components/SearchBar';
import { EquipoTable } from './components/EquipoTable';
import { EquipoModal } from './components/EquipoModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Toast } from './components/Toast';

export function App() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedEstado, setSelectedEstado] = useState<EstadoEquipo | 'TODOS'>('TODOS');

  // Modales
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [equipoToEdit, setEquipoToEdit] = useState<Equipo | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [equipoToDelete, setEquipoToDelete] = useState<Equipo | null>(null);

  // Notificaciones Toast
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Carga inicial y refresco de equipos
  const loadEquipos = useCallback(async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const data = await equipoApi.getAll();
      setEquipos(data);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Error al conectar con la API';
      showToast('error', 'Error al cargar inventario', msg);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadEquipos();
  }, [loadEquipos]);

  // Filtrado reactivo en memoria
  const filteredEquipos = useMemo(() => {
    return equipos.filter((item) => {
      const matchesSearch =
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numeroSerie.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesEstado =
        selectedEstado === 'TODOS' ? true : item.estado === selectedEstado;

      return matchesSearch && matchesEstado;
    });
  }, [equipos, searchTerm, selectedEstado]);

  // Manejadores de modales
  const handleOpenCreateModal = () => {
    setEquipoToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (equipo: Equipo) => {
    setEquipoToEdit(equipo);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (equipo: Equipo) => {
    setEquipoToDelete(equipo);
    setIsDeleteModalOpen(true);
  };

  // Operaciones CRUD
  const handleSubmitForm = async (data: CreateEquipoDTO | UpdateEquipoDTO) => {
    if (equipoToEdit) {
      // Actualización
      const updated = await equipoApi.update(equipoToEdit.id, data);
      setEquipos((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      showToast('success', 'Equipo actualizado', `Se guardaron los cambios de ${updated.nombre}`);
    } else {
      // Creación
      const created = await equipoApi.create(data as CreateEquipoDTO);
      setEquipos((prev) => [created, ...prev]);
      showToast('success', 'Equipo registrado', `${created.nombre} fue añadido al inventario`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!equipoToDelete) return;
    try {
      await equipoApi.delete(equipoToDelete.id);
      setEquipos((prev) => prev.filter((item) => item.id !== equipoToDelete.id));
      showToast(
        'success',
        'Equipo eliminado',
        `Se eliminó ${equipoToDelete.nombre} (${equipoToDelete.numeroSerie}) del inventario`
      );
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'No se pudo eliminar el equipo';
      showToast('error', 'Error al eliminar', msg);
    }
  };

  return (
    <div className="app-layout">
      {/* Encabezado principal */}
      <Header
        onOpenCreateModal={handleOpenCreateModal}
        onRefresh={() => loadEquipos(true)}
        isLoading={isLoading}
      />

      {/* Tarjetas de estadísticas */}
      <StatsCards equipos={equipos} />

      {/* Barra de búsqueda y filtros */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedEstado={selectedEstado}
        onEstadoChange={setSelectedEstado}
      />

      {/* Listado / Tabla de equipos */}
      <EquipoTable
        equipos={filteredEquipos}
        isLoading={isLoading}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
        onOpenCreate={handleOpenCreateModal}
      />

      {/* Modal de Creación / Edición */}
      <EquipoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitForm}
        equipoToEdit={equipoToEdit}
      />

      {/* Modal de Confirmación de Eliminación */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        equipo={equipoToDelete}
      />

      {/* Notificaciones flotantes */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
