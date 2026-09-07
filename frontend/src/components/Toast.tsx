import React, { useEffect } from 'react';
import type { ToastMessage } from '../types/equipo';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  useEffect(() => {
    if (toasts.length > 0) {
      const latestToast = toasts[toasts.length - 1];
      const timer = setTimeout(() => {
        onDismiss(latestToast.id);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toasts, onDismiss]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        if (toast.type === 'error') Icon = AlertCircle;
        if (toast.type === 'info') Icon = Info;

        return (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <Icon size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-msg">{toast.message}</div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                opacity: 0.7,
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
