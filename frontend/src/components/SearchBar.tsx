import React from 'react';
import { Search, X } from 'lucide-react';
import type { EstadoEquipo } from '../types/equipo';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedEstado: EstadoEquipo | 'TODOS';
  onEstadoChange: (estado: EstadoEquipo | 'TODOS') => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedEstado,
  onEstadoChange,
}) => {
  return (
    <div className="glass-panel control-bar">
      <div className="search-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre, marca o número de serie..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filter-group">
        <button
          className={`filter-pill ${selectedEstado === 'TODOS' ? 'active' : ''}`}
          onClick={() => onEstadoChange('TODOS')}
        >
          Todos
        </button>
        <button
          className={`filter-pill ${selectedEstado === 'OPERATIVO' ? 'active' : ''}`}
          onClick={() => onEstadoChange('OPERATIVO')}
        >
          Operativos
        </button>
        <button
          className={`filter-pill ${selectedEstado === 'EN_MANTENIMIENTO' ? 'active' : ''}`}
          onClick={() => onEstadoChange('EN_MANTENIMIENTO')}
        >
          En Mantenimiento
        </button>
        <button
          className={`filter-pill ${selectedEstado === 'DADO_DE_BAJA' ? 'active' : ''}`}
          onClick={() => onEstadoChange('DADO_DE_BAJA')}
        >
          Dados de Baja
        </button>
      </div>
    </div>
  );
};
