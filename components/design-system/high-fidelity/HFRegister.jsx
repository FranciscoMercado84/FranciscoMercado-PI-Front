import React, { useState } from 'react';
import { User, Mail, Phone, CreditCard, Lock, ArrowRight, Loader } from 'lucide-react';

export default function HFRegister({ onNavigate, onRegister, isLoading = false, error = null }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!formData.nombre || !formData.email || !formData.password) {
      alert('Por favor, completa todos los campos requeridos');
      return;
    }
    onRegister?.(formData);
  };

  const fields = [
    { icon: User, label: 'Nombre Completo', type: 'text', placeholder: 'Juan Pérez', field: 'nombre' },
    { icon: Mail, label: 'Email', type: 'email', placeholder: 'tu@email.com', field: 'email' },
    { icon: Phone, label: 'Teléfono', type: 'tel', placeholder: '+506 8888-8888', field: 'telefono' },
    { icon: Lock, label: 'Contraseña', type: 'password', placeholder: '••••••••', field: 'password' },
    { icon: Lock, label: 'Confirmar Contraseña', type: 'password', placeholder: '••••••••', field: 'confirmPassword' },
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
                value={formData[field.field]}
                onChange={(e) => handleChange(field.field, e.target.value)}
                disabled={isLoading}
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

          {/* Error Message */}
          {error && (
            <div style={{
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--color-error-light)',
              border: '1px solid var(--color-error)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-error-dark)',
              fontSize: 'var(--font-size-body-s)',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Terms */}
          <label style={{
            display: 'flex',
            gap: 'var(--space-2)',
            fontSize: 'var(--font-size-body-s)',
            cursor: 'pointer',
            alignItems: 'start'
          }}>
            <input 
              type="checkbox" 
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              style={{ cursor: 'pointer', marginTop: '4px' }} 
            />
            <span>
              Acepto los{' '}
              <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                términos y condiciones
              </a>
            </span>
          </label>

          {/* Submit */}
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
            padding: 'var(--space-4)',
            background: isLoading ? 'var(--color-neutral-400)' : 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-h6)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            boxShadow: 'var(--shadow-medium)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = 'var(--color-primary-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-high)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
            }
          }}
          >
            {isLoading ? (
              <>
                <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                Creando cuenta...
              </>
            ) : (
              <>
                Crear Cuenta
                <ArrowRight size={20} />
              </>
            )}
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

