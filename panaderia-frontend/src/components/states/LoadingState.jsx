import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Cargando...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '16px',
      color: 'var(--color-neutral-700)'
    }}>
      <Loader2 
        size={48} 
        style={{ 
          animation: 'spin 1s linear infinite',
          color: 'var(--color-primary-600)' 
        }} 
      />
      <p style={{
        fontSize: 'var(--font-size-body-l)',
        fontWeight: 'var(--font-weight-medium)'
      }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
