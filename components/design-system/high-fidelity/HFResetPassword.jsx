import React, { useState } from 'react';
import { Lock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function HFResetPassword({
  onNavigate,
  onSubmit,
  isLoading = false,
  error = null,
  successMessage = null,
  tokenChecking = false,
  tokenError = null,
}) {
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  if (tokenChecking) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
        fontFamily: 'var(--font-primary)'
      }}>
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-10)',
          boxShadow: 'var(--shadow-high)',
          border: '1px solid var(--color-neutral-300)',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--color-neutral-700)' }}>Validando enlace...</p>
        </div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
        fontFamily: 'var(--font-primary)'
      }}>
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-10)',
          boxShadow: 'var(--shadow-high)',
          border: '1px solid var(--color-neutral-300)',
          maxWidth: '480px',
          width: '100%'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(239, 68, 68, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)'
            }}>
              <AlertCircle size={38} style={{ color: '#dc2626' }} />
            </div>
            <h1 style={{ fontSize: 'var(--font-size-h3)', marginBottom: 'var(--space-3)' }}>Enlace no válido</h1>
            <p style={{ color: 'var(--color-neutral-700)', lineHeight: 1.6 }}>{tokenError}</p>
          </div>
          <button
            onClick={() => onNavigate?.('recover')}
            style={{
              width: '100%',
              padding: 'var(--space-4)',
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-semibold)'
            }}
          >
            Solicitar otro enlace
          </button>
        </div>
      </div>
    );
  }

  if (successMessage) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
        fontFamily: 'var(--font-primary)'
      }}>
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-10)',
          boxShadow: 'var(--shadow-high)',
          border: '1px solid var(--color-neutral-300)',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(34, 197, 94, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-5)'
          }}>
            <CheckCircle size={52} style={{ color: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: 'var(--font-size-h3)', marginBottom: 'var(--space-3)' }}>Contraseña actualizada</h1>
          <p style={{ color: 'var(--color-neutral-700)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>{successMessage}</p>
          <button
            onClick={() => onNavigate?.('login')}
            style={{
              width: '100%',
              padding: 'var(--space-4)',
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-semibold)'
            }}
          >
            Ir al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

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
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            margin: '0 auto var(--space-4)',
            boxShadow: 'var(--shadow-low)'
          }}>
            🔐
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-2)'
          }}>
            Crear nueva contraseña
          </h1>
          <p style={{
            fontSize: 'var(--font-size-body-m)',
            color: 'var(--color-neutral-700)',
            lineHeight: 1.6
          }}>
            Define una nueva contraseña segura para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-5)' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-weight-medium)' }}>
              <Lock size={18} style={{ color: 'var(--color-primary)' }} />
              Nueva contraseña
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData((current) => ({ ...current, newPassword: e.target.value }))}
              placeholder="Nueva contraseña"
              style={{ width: '100%', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-neutral-300)' }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-weight-medium)' }}>
              <Lock size={18} style={{ color: 'var(--color-primary)' }} />
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData((current) => ({ ...current, confirmPassword: e.target.value }))}
              placeholder="Repite la nueva contraseña"
              style={{ width: '100%', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-neutral-300)' }}
            />
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)'
            }}>
              <AlertCircle size={18} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: 'var(--font-size-body-s)', lineHeight: 1.5 }}>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: 'var(--space-4)',
              background: isLoading ? 'var(--color-neutral-400)' : 'var(--color-primary)',
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
              transition: 'all 0.2s'
            }}
          >
            {isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
            <ArrowRight size={20} />
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('login')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            ← Volver al inicio de sesión
          </button>
        </form>
      </div>
    </div>
  );
}