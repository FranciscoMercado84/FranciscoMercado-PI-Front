import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
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
        <h1 style={{
          fontSize: '120px',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-primary-600)',
          margin: 0,
          lineHeight: 1
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: 'var(--font-size-h2)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-neutral-900)',
          margin: '24px 0 16px'
        }}>
          Página no encontrada
        </h2>
        
        <p style={{
          fontSize: 'var(--font-size-body-l)',
          color: 'var(--color-neutral-700)',
          marginBottom: '32px'
        }}>
          Lo sentimos, la página que buscas no existe o ha sido movida.
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

