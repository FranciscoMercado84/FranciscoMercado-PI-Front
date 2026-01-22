import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-neutral-100)',
      padding: '40px',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'var(--color-warning-100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 32px'
        }}>
          <ShieldAlert size={64} style={{ color: 'var(--color-warning-600)' }} />
        </div>
        
        <h1 style={{
          fontSize: 'var(--font-size-h1)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-neutral-900)',
          margin: '0 0 16px'
        }}>
          Acceso no autorizado
        </h1>
        
        <p style={{
          fontSize: 'var(--font-size-body-l)',
          color: 'var(--color-neutral-700)',
          marginBottom: '32px'
        }}>
          No tienes permisos para acceder a esta página. Por favor, inicia sesión con una cuenta autorizada o contacta al administrador.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'var(--color-neutral-50)',
              color: 'var(--color-neutral-900)',
              border: '1px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} />
            Volver atrás
          </button>
          
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
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
            <Home size={18} />
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

