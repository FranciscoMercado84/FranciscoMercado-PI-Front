import React from 'react';
import { Mail, Lock, ArrowRight, Shield } from 'lucide-react';

export default function HFAdminLogin({ onNavigate }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--color-secondary-light) 0%, var(--color-neutral-900) 100%)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-6)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: 'white',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--color-neutral-300)',
        padding: 'var(--space-10)',
        boxShadow: 'var(--shadow-high)'
      }}>
        {/* Logo & Badge */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{
            width: '90px',
            height: '90px',
            background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-hover) 100%)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            margin: '0 auto var(--space-4)',
            boxShadow: 'var(--shadow-medium)',
            position: 'relative'
          }}>
            🥖
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '36px',
              height: '36px',
              background: 'var(--color-primary)',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid white',
              boxShadow: 'var(--shadow-low)'
            }}>
              <Shield size={18} style={{ color: 'white' }} />
            </div>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-2)'
          }}>
            Panel de Administración
          </h1>
          <p style={{
            fontSize: 'var(--font-size-body-m)',
            color: 'var(--color-neutral-700)'
          }}>
            Acceso exclusivo para administradores
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-2)'
            }}>
              <Mail size={18} style={{ color: 'var(--color-secondary)' }} />
              Email
            </label>
            <input
              type="email"
              placeholder="admin@panaderia.com"
              style={{
                width: '100%',
                padding: 'var(--space-4)',
                border: '2px solid var(--color-neutral-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-body-m)',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-secondary)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 90, 60, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-2)'
            }}>
              <Lock size={18} style={{ color: 'var(--color-secondary)' }} />
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: 'var(--space-4)',
                border: '2px solid var(--color-neutral-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-body-m)',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-secondary)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 90, 60, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <button 
          onClick={() => onNavigate?.('admin-dashboard')}
          style={{
            padding: 'var(--space-4)',
            background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-hover) 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-h6)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            boxShadow: 'var(--shadow-medium)',
            transition: 'all 0.2s',
            marginTop: 'var(--space-2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-secondary-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-high)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-hover) 100%)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
          }}
          >
            <Shield size={20} />
            Acceder al Panel
            <ArrowRight size={20} />
          </button>

          {/* Security Notice */}
          <div style={{
            background: 'var(--color-warning-light)',
            border: '1px solid var(--color-warning)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            fontSize: 'var(--font-size-body-s)',
            color: 'var(--color-neutral-900)',
            marginTop: 'var(--space-2)',
            lineHeight: 1.5
          }}>
            <strong>🔒 Acceso Seguro:</strong> Este panel es solo para personal autorizado. Todos los accesos son registrados por seguridad.
          </div>
        </div>
      </div>
    </div>
  );
}
