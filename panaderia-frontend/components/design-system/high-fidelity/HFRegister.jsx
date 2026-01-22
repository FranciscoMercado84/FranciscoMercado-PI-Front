import React from 'react';
import { User, Mail, Phone, CreditCard, Lock, ArrowRight } from 'lucide-react';

export default function HFRegister({ onNavigate }) {
  const fields = [
    { icon: User, label: 'Nombre Completo', type: 'text', placeholder: 'Juan Pérez' },
    { icon: Mail, label: 'Email', type: 'email', placeholder: 'tu@email.com' },
    { icon: Phone, label: 'Teléfono', type: 'tel', placeholder: '+506 8888-8888' },
    { icon: CreditCard, label: 'Cédula', type: 'text', placeholder: '1-0000-0000' },
    { icon: Lock, label: 'Contraseña', type: 'password', placeholder: '••••••••' },
    { icon: Lock, label: 'Confirmar Contraseña', type: 'password', placeholder: '••••••••' },
  ];

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
        maxWidth: '600px',
        background: 'white',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--color-neutral-300)',
        padding: 'var(--space-10)',
        boxShadow: 'var(--shadow-high)'
      }}>
        {/* Logo & Title */}
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
            Crear Cuenta
          </h1>
          <p style={{
            fontSize: 'var(--font-size-body-m)',
            color: 'var(--color-neutral-700)'
          }}>
            Únete a Panadería Artesanal
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
          {fields.map((field, i) => (
            <div key={i}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--font-size-body-m)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-2)'
              }}>
                <field.icon size={18} style={{ color: 'var(--color-primary)' }} />
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
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
          ))}

          {/* Terms */}
          <label style={{
            display: 'flex',
            gap: 'var(--space-2)',
            fontSize: 'var(--font-size-body-s)',
            cursor: 'pointer',
            alignItems: 'start'
          }}>
            <input type="checkbox" style={{ cursor: 'pointer', marginTop: '4px' }} />
            <span>
              Acepto los{' '}
              <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                términos y condiciones
              </a>
            </span>
          </label>

          {/* Submit */}
          <button 
            onClick={() => onNavigate?.('register')}
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
            Crear Cuenta
            <ArrowRight size={20} />
          </button>

          {/* Login Link */}
          <div style={{
            textAlign: 'center',
            fontSize: 'var(--font-size-body-m)',
            color: 'var(--color-neutral-700)',
            marginTop: 'var(--space-2)'
          }}>
            ¿Ya tienes cuenta?{' '}
            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate?.('login'); }}
              style={{
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer'
            }}>
              Inicia sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

