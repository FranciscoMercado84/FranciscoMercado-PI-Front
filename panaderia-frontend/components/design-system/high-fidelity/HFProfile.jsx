import React from 'react';
import { User, Mail, Phone, CreditCard, MapPin, Lock, Save } from 'lucide-react';

export default function HFProfile() {
  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--font-size-h2)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-neutral-900)',
          marginBottom: 'var(--space-2)'
        }}>
          Mi Perfil
        </h1>
        <p style={{
          fontSize: 'var(--font-size-body-m)',
          color: 'var(--color-neutral-700)',
          marginBottom: 'var(--space-8)'
        }}>
          Gestiona tu información personal
        </p>

        {/* Profile Picture */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-6)'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'var(--font-weight-bold)',
            border: '4px solid white',
            boxShadow: 'var(--shadow-medium)'
          }}>
            JP
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-2)'
            }}>
              Juan Pérez
            </h2>
            <p style={{
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)',
              marginBottom: 'var(--space-4)'
            }}>
              Cliente desde Enero 2024
            </p>
            <button style={{
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-neutral-100)',
              border: '1px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-s)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.background = 'var(--color-primary-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
              e.currentTarget.style.background = 'var(--color-neutral-100)';
            }}
            >
              Cambiar Foto
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h3 style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-6)'
          }}>
            Información Personal
          </h3>

          <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
            {[
              { icon: User, label: 'Nombre Completo', value: 'Juan Pérez González', type: 'text' },
              { icon: Mail, label: 'Email', value: 'juan.perez@email.com', type: 'email' },
              { icon: Phone, label: 'Teléfono', value: '+506 8888-8888', type: 'tel' },
              { icon: CreditCard, label: 'Cédula', value: '1-0000-0000', type: 'text' },
              { icon: MapPin, label: 'Dirección', value: 'San José, Costa Rica', type: 'text' }
            ].map((field, i) => (
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
                  defaultValue={field.value}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
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
          </div>
        </div>

        {/* Change Password */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h3 style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-6)'
          }}>
            Cambiar Contraseña
          </h3>

          <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
            {[
              { label: 'Contraseña Actual', placeholder: '••••••••' },
              { label: 'Nueva Contraseña', placeholder: '••••••••' },
              { label: 'Confirmar Nueva Contraseña', placeholder: '••••••••' }
            ].map((field, i) => (
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
                  <Lock size={18} style={{ color: 'var(--color-primary)' }} />
                  {field.label}
                </label>
                <input
                  type="password"
                  placeholder={field.placeholder}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
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
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <button style={{
            flex: 1,
            padding: 'var(--space-4)',
            background: 'white',
            border: '2px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-neutral-500)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
          }}
          >
            Cancelar
          </button>
          <button style={{
            flex: 1,
            padding: 'var(--space-4)',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
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
            <Save size={20} />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

