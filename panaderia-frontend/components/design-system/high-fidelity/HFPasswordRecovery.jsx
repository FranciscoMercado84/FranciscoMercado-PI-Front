import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function HFPasswordRecovery({ onNavigate }) {
  const [emailSent, setEmailSent] = useState(false);

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
        {!emailSent ? (
          <>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
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
                Recuperar Contraseña
              </h1>
              <p style={{
                fontSize: 'var(--font-size-body-m)',
                color: 'var(--color-neutral-700)',
                lineHeight: 1.6
              }}>
                Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
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

              <button
                onClick={() => setEmailSent(true)}
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
                Enviar Enlace
                <ArrowRight size={20} />
              </button>

              <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onNavigate?.('login'); }}
                  style={{
                    fontSize: 'var(--font-size-body-m)',
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    fontWeight: 'var(--font-weight-medium)',
                    transition: 'color 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                >
                  ← Volver al inicio de sesión
                </a>
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, var(--color-success) 0%, var(--color-success-dark) 100%)',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)',
              boxShadow: '0 0 0 15px var(--color-success-light)'
            }}>
              <CheckCircle size={60} style={{ color: 'white' }} />
            </div>
            <h2 style={{
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-3)'
            }}>
              ¡Email Enviado!
            </h2>
            <p style={{
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)',
              marginBottom: 'var(--space-6)',
              lineHeight: 1.6
            }}>
              Hemos enviado un enlace de recuperación a tu email. Revisa tu bandeja de entrada y sigue las instrucciones.
            </p>
            <div style={{
              background: 'var(--color-info-light)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-info)',
              fontSize: 'var(--font-size-body-s)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-6)',
              textAlign: 'left'
            }}>
              💡 Si no recibes el email en unos minutos, revisa tu carpeta de spam.
            </div>
            <button 
              onClick={() => onNavigate?.('landing')}
              style={{
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-primary)';
            }}
            >
              Volver al Inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

