import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const SuccessState = ({ 
  title = '¡Éxito!',
  message = 'La operación se completó correctamente.',
  actionLabel,
  onAction
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      gap: 'var(--space-6)',
      padding: 'var(--space-10)',
      textAlign: 'center',
      background: 'var(--color-neutral-100)',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{
        width: '96px',
        height: '96px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-medium)',
        animation: 'pulse 2s ease-in-out infinite'
      }}>
        <CheckCircle2 size={48} style={{ color: 'white' }} />
      </div>
      
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--font-size-h2)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-neutral-900)',
        margin: 0
      }}>
        {title}
      </h2>
      
      <p style={{
        fontSize: 'var(--font-size-body-lg)',
        color: 'var(--color-neutral-700)',
        maxWidth: '600px',
        margin: 0,
        lineHeight: 1.6
      }}>
        {message}
      </p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            marginTop: '16px',
            padding: '14px 32px',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-low)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-primary-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-low)';
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
