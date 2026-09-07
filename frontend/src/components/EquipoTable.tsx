import React, { useState } from 'react';
import type { Equipo } from '../types/equipo';
import { Edit3, Trash2, Copy, Check, Inbox, Plus } from 'lucide-react';

interface EquipoTableProps {
  equipos: Equipo[];
  isLoading: boolean;
  onEdit: (equipo: Equipo) => void;
  onDelete: (equipo: Equipo) => void;
  onOpenCreate: () => void;
}

export const EquipoTable: React.FC<EquipoTableProps> = ({
  equipos,
  isLoading,
  onEdit,
  onDelete,
  onOpenCreate,
}) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopySerial = (id: number, serial: string) => {
    navigator.clipboard.writeText(serial);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'OPERATIVO':
        return (
          <span className="badge-status operativo">
            <span className="status-dot" />
            Operativo
          </span>
        );
      case 'EN_MANTENIMIENTO':
        return (
          <span className="badge-status mantenimiento">
            <span className="status-dot" />
            Mantenimiento
          </span>
        );
      case 'DADO_DE_BAJA':
        return (
          <span className="badge-status dado_de_baja">
            <span className="status-dot" />
            Dado de Baja
          </span>
        );
      default:
        return <span>{estado}</span>;
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return isoString;
    }
  };

  if (isLoading && equipos.length === 0) {
    return (
      <div className="glass-panel empty-state">
        <div className="spin empty-icon" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent', borderWidth: '3px', borderStyle: 'solid' }}>
        </div>
        <p className="empty-title">Cargando inventario...</p>
        <p className="empty-desc">Obteniendo registros actualizados desde la base de datos.</p>
      </div>
    );
  }

  if (equipos.length === 0) {
    return (
      <div className="glass-panel empty-state">
        <div className="empty-icon">
          <Inbox size={32} />
        </div>
        <h3 className="empty-title">No se encontraron equipos</h3>
        <p className="empty-desc">
          No hay registros que coincidan con los criterios de búsqueda o el inventario aún está vacío.
        </p>
        <button className="btn btn-primary" onClick={onOpenCreate}>
          <Plus size={16} />
          <span>Registrar Primer Equipo</span>
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel table-container">
      <table className="equipo-table">
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Marca</th>
            <th>N° de Serie</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Fecha Registro</th>
            <th style={{ textAlign: 'right' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo.id}>
              <td style={{ fontWeight: 600 }}>{equipo.nombre}</td>
              <td style={{ color: 'var(--text-secondary)' }}>{equipo.marca}</td>
              <td>
                <span className="serial-pill">
                  {equipo.numeroSerie}
                  <button
                    className="copy-btn"
                    onClick={() => handleCopySerial(equipo.id, equipo.numeroSerie)}
                    title="Copiar número de serie"
                  >
                    {copiedId === equipo.id ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                  </button>
                </span>
              </td>
              <td>{getStatusBadge(equipo.estado)}</td>
              <td
                style={{
                  maxWidth: '240px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'var(--text-secondary)',
                  fontSize: '0.8125rem',
                }}
                title={equipo.descripcion || 'Sin descripción'}
              >
                {equipo.descripcion || '—'}
              </td>
              <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                {formatDate(equipo.createdAt)}
              </td>
              <td>
                <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                  <button
                    className="action-btn edit"
                    onClick={() => onEdit(equipo)}
                    title="Editar equipo"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => onDelete(equipo)}
                    title="Eliminar equipo"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
