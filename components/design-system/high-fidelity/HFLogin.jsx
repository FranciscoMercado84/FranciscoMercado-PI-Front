import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function HFLogin({ onNavigate }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-6)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'white',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--color-neutral-300)',
        padding: 'var(--space-10)',
        boxShadow: 'var(--shadow-high)'
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--space-8)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            margin: '0 auto var(--space-4)',
            boxShadow: 'var(--shadow-low)'
          }}>
            🥖
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-2)'
          }}>
            Bienvenido
          </h1>
          <p style={{
            fontSize: 'var(--font-size-body-m)',
            color: 'var(--color-neutral-700)'
          }}>
            Inicia sesión en tu cuenta
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
          {/* Email */}
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
              <Mail size={18} style={{ color: 'var(--color-primary)' }} />
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
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
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-light)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password */}
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
              <Lock size={18} style={{ color: 'var(--color-primary)' }} />
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
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-light)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Remember & Forgot */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--font-size-body-s)',
              cursor: 'pointer'
            }}>
              <input type="checkbox" style={{ cursor: 'pointer' }} />
              <span>Recordarme</span>
            </label>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate?.('recover'); }}
              style={{
                fontSize: 'var(--font-size-body-s)',
                color: 'var(--color-primary)',
                textDecoration: 'none',
                fontWeight: 'var(--font-weight-medium)',
                transition: 'color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-primary)'}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Submit Button */}
          <button 
          onClick={() => onNavigate?.('catalog')}
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-primary)',
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
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-primary-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-high)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
          }}
          >
            Iniciar Sesión
            <ArrowRight size={20} />
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-2)'
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'var(--color-neutral-300)'
            }}></div>
            <span style={{
              fontSize: 'var(--font-size-body-s)',
              color: 'var(--color-neutral-500)'
            }}>
              o
            </span>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'var(--color-neutral-300)'
            }}></div>
          </div>

          {/* Register Link */}
          <div style={{
            textAlign: 'center',
            fontSize: 'var(--font-size-body-m)',
            color: 'var(--color-neutral-700)'
          }}>
            ¿No tienes cuenta?{' '}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate?.('register'); }}
              style={{
                color: 'var(--color-primary)',
                textDecoration: 'none',
                fontWeight: 'var(--font-weight-semibold)',
                transition: 'color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
            >
              Regístrate aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
