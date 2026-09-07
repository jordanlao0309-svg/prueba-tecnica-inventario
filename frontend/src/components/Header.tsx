import React from 'react';
import { Laptop, Plus, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateModal, onRefresh, isLoading }) => {
  return (
    <header className="glass-panel header">
      <div className="header-brand">
        <div className="brand-icon-wrapper">
          <Laptop size={26} />
        </div>
        <div>
          <h1 className="header-title">Inventario de Equipos TI</h1>
          <p className="header-subtitle">
            Control de activos, estado operativo y mantenimiento en tiempo real
          </p>
        </div>
      </div>

      <div className="header-actions">
        <button
          className="btn btn-secondary"
          onClick={onRefresh}
          disabled={isLoading}
          title="Recargar listado"
        >
          <RefreshCw size={16} className={isLoading ? 'spin' : ''} />
          <span>Actualizar</span>
        </button>

        <button className="btn btn-primary" onClick={onOpenCreateModal}>
          <Plus size={18} />
          <span>Nuevo Equipo</span>
        </button>
      </div>
    </header>
  );
};
