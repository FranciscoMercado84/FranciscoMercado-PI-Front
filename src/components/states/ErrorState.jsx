import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorState = ({ 
  title = 'Error',
  message = 'Ha ocurrido un error. Por favor, intenta de nuevo.',
  onRetry 
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '16px',
      padding: '40px',
      textAlign: 'center'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--color-danger-100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AlertCircle size={32} style={{ color: 'var(--color-danger-600)' }} />
      </div>
      
      <h2 style={{
        fontSize: 'var(--font-size-h3)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-neutral-900)',
        margin: 0
      }}>
        {title}
      </h2>
      
      <p style={{
        fontSize: 'var(--font-size-body-l)',
        color: 'var(--color-neutral-700)',
        maxWidth: '500px',
        margin: 0
      }}>
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: '16px',
            padding: '12px 24px',
            background: 'var(--color-primary-600)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-body-m)',
            fontWeight: 'var(--font-weight-medium)',
            cursor: 'pointer'
          }}
        >
          Reintentar
        </button>
      )}
    </div>
  );
};
