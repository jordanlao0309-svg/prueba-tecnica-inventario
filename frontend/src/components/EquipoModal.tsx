import React, { useState, useEffect } from 'react';
import type { CreateEquipoDTO, Equipo, EstadoEquipo, UpdateEquipoDTO } from '../types/equipo';
import { X, Save, AlertCircle } from 'lucide-react';

interface EquipoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEquipoDTO | UpdateEquipoDTO) => Promise<void>;
  equipoToEdit?: Equipo | null;
}

export const EquipoModal: React.FC<EquipoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  equipoToEdit,
}) => {
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [estado, setEstado] = useState<EstadoEquipo>('OPERATIVO');
  const [descripcion, setDescripcion] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (equipoToEdit) {
      setNombre(equipoToEdit.nombre);
      setMarca(equipoToEdit.marca);
      setNumeroSerie(equipoToEdit.numeroSerie);
      setEstado(equipoToEdit.estado);
      setDescripcion(equipoToEdit.descripcion || '');
    } else {
      setNombre('');
      setMarca('');
      setNumeroSerie('');
      setEstado('OPERATIVO');
      setDescripcion('');
    }
    setFormError(null);
  }, [equipoToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!nombre.trim() || !marca.trim() || !numeroSerie.trim()) {
      setFormError('Por favor completa todos los campos obligatorios (*)');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        nombre: nombre.trim(),
        marca: marca.trim(),
        numeroSerie: numeroSerie.trim(),
        estado,
        descripcion: descripcion.trim() || undefined,
      });
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Ocurrió un error inesperado al procesar la solicitud');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {equipoToEdit ? 'Editar Información del Equipo' : 'Registrar Nuevo Equipo'}
          </h2>
          <button className="close-btn" onClick={onClose} disabled={isSubmitting}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {formError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#F87171',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem',
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{formError}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                Nombre del Equipo <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej. Laptop ThinkPad T14, Monitor 27..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              <div className="form-group">
                <label className="form-label">
                  Marca <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej. Lenovo, Dell, HP..."
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Número de Serie <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej. LNV-2024-001"
                  value={numeroSerie}
                  onChange={(e) => setNumeroSerie(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Estado del Equipo</label>
              <select
                className="form-select"
                value={estado}
                onChange={(e) => setEstado(e.target.value as EstadoEquipo)}
              >
                <option value="OPERATIVO">OPERATIVO (En funcionamiento)</option>
                <option value="EN_MANTENIMIENTO">EN MANTENIMIENTO (Revisión técnica)</option>
                <option value="DADO_DE_BAJA">DADO DE BAJA (Retirado del servicio)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Descripción o Notas (Opcional)</label>
              <textarea
                className="form-textarea"
                placeholder="Detalles de asignación, especificaciones, observaciones..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <Save size={16} />
              <span>{isSubmitting ? 'Guardando...' : equipoToEdit ? 'Guardar Cambios' : 'Registrar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
