import React from 'react';
import type { Equipo } from '../types/equipo';
import { Database, CheckCircle2, Wrench, AlertTriangle } from 'lucide-react';

interface StatsCardsProps {
  equipos: Equipo[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ equipos }) => {
  const total = equipos.length;
  const operativos = equipos.filter((e) => e.estado === 'OPERATIVO').length;
  const mantenimiento = equipos.filter((e) => e.estado === 'EN_MANTENIMIENTO').length;
  const baja = equipos.filter((e) => e.estado === 'DADO_DE_BAJA').length;

  return (
    <div className="stats-grid">
      <div className="glass-panel stat-card total">
        <div className="stat-info">
          <span className="stat-label">Total Equipos</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-icon">
          <Database size={24} />
        </div>
      </div>

      <div className="glass-panel stat-card operativo">
        <div className="stat-info">
          <span className="stat-label">Operativos</span>
          <span className="stat-value">{operativos}</span>
        </div>
        <div className="stat-icon">
          <CheckCircle2 size={24} />
        </div>
      </div>

      <div className="glass-panel stat-card mantenimiento">
        <div className="stat-info">
          <span className="stat-label">En Mantenimiento</span>
          <span className="stat-value">{mantenimiento}</span>
        </div>
        <div className="stat-icon">
          <Wrench size={24} />
        </div>
      </div>

      <div className="glass-panel stat-card baja">
        <div className="stat-info">
          <span className="stat-label">Dados de Baja</span>
          <span className="stat-value">{baja}</span>
        </div>
        <div className="stat-icon">
          <AlertTriangle size={24} />
        </div>
      </div>
    </div>
  );
};
