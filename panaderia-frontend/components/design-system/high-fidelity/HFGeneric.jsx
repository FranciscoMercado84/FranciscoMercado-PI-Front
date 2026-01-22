import React from 'react';
import HFHeader from './HFHeader';
import HFFooter from './HFFooter';

export default function HFGeneric({ 
  title, 
  subtitle, 
  isAuthenticated = false,
  showFooter = true,
  children 
}) {
  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <HFHeader isAuthenticated={isAuthenticated} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)',
        minHeight: '60vh'
      }}>
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-2)'
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)'
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {children || (
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            padding: 'var(--space-10)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              background: 'var(--color-primary-light)',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)',
              fontSize: '48px'
            }}>
              📄
            </div>
            <h3 style={{
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Pantalla en Desarrollo
            </h3>
            <p style={{
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Esta pantalla está basada en el wireframe correspondiente y utiliza el Design System de Panadería Artesanal.
            </p>
          </div>
        )}
      </div>

      {showFooter && <HFFooter />}
    </div>
  );
}

