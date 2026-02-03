import React from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function HFRecover({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-lg)'
    }}>
      <div style={{ width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-md)' }}>🔐</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? 'var(--font-size-h3)' : 'var(--font-size-h2)',
            color: 'var(--color-neutral-900)',
            margin: 0,
            marginBottom: 'var(--spacing-xs)'
          }}>
            Recuperar Contraseña
          </h1>
          <p style={{
            fontSize: 'var(--font-size-body-m)',
            color: 'var(--color-neutral-700)',
            margin: 0
          }}>
            Te enviaremos instrucciones por email
          </p>
        </div>

        <div className="card" style={{ padding: isMobile ? 'var(--spacing-xl)' : 'var(--spacing-2xl)' }}>
          <div className="form-group">
            <label className="label" htmlFor="email">Correo electrónico</label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="tu@email.com"
                style={{ paddingLeft: '44px' }}
              />
              <Mail size={20} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-neutral-500)'
              }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}>
            Enviar Instrucciones
          </button>

          <div style={{ textAlign: 'center', fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-700)' }}>
            <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'var(--font-weight-semibold)' }}>
              ← Volver al inicio de sesión
            </a>
          </div>
        </div>

        <div className="alert alert-success" style={{ marginTop: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <CheckCircle size={20} />
          <span>Email enviado correctamente. Revisa tu bandeja de entrada.</span>
        </div>
      </div>
    </div>
  );
}

