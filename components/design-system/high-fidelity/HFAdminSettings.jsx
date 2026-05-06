import React from 'react';
import { Store, Clock, MapPin, Phone, Mail, Globe, Save } from 'lucide-react';

export default function HFAdminSettings() {
  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-6)'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--font-size-h2)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-neutral-900)',
          marginBottom: 'var(--space-2)'
        }}>
          Configuración General
        </h1>
        <p style={{
          fontSize: 'var(--font-size-body-m)',
          color: 'var(--color-neutral-700)',
          marginBottom: 'var(--space-8)'
        }}>
          Ajustes generales del negocio
        </p>

        {/* Business Info */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-4)',
            borderBottom: '2px solid var(--color-secondary)'
          }}>
            Información del Negocio
          </h2>

          <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
            {[
              { icon: Store, label: 'Nombre del Negocio', placeholder: 'Panadería Puri', type: 'text' },
              { icon: Phone, label: 'Teléfono', placeholder: '+34 XXX XXX XXX', type: 'tel' },
              { icon: Mail, label: 'Email de Contacto', placeholder: 'admin@panaderia.com', type: 'email' },
              { icon: MapPin, label: 'Dirección', placeholder: 'Calle comercial del barrio', type: 'text' },
              { icon: Globe, label: 'Sitio Web', placeholder: 'www.panaderiapuri.com', type: 'url' }
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
                  <field.icon size={18} style={{ color: 'var(--color-secondary)' }} />
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  defaultValue={field.placeholder}
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
                    e.currentTarget.style.borderColor = 'var(--color-secondary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 90, 60, 0.1)';
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

        {/* Business Hours */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-4)',
            borderBottom: '2px solid var(--color-secondary)'
          }}>
            <Clock size={24} style={{ marginRight: 'var(--space-2)', verticalAlign: 'middle', color: 'var(--color-secondary)' }} />
            Horario de Atención
          </h2>

          {[
            { day: 'Lunes - Viernes', open: '07:00', close: '19:00', enabled: true },
            { day: 'Sábado', open: '08:00', close: '18:00', enabled: true },
            { day: 'Domingo', open: '00:00', close: '00:00', enabled: false }
          ].map((schedule, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr 1fr auto',
              gap: 'var(--space-4)',
              alignItems: 'center',
              padding: 'var(--space-4)',
              marginBottom: i < 2 ? 'var(--space-3)' : 0,
              background: schedule.enabled ? 'transparent' : 'var(--color-neutral-100)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div style={{
                fontSize: 'var(--font-size-body-m)',
                fontWeight: 'var(--font-weight-semibold)',
                color: schedule.enabled ? 'var(--color-neutral-900)' : 'var(--color-neutral-500)'
              }}>
                {schedule.day}
              </div>
              <input
                type="time"
                defaultValue={schedule.open}
                disabled={!schedule.enabled}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--color-neutral-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-m)'
                }}
              />
              <input
                type="time"
                defaultValue={schedule.close}
                disabled={!schedule.enabled}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--color-neutral-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-m)'
                }}
              />
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-body-s)',
                color: 'var(--color-neutral-700)'
              }}>
                <input type="checkbox" defaultChecked={schedule.enabled} style={{ cursor: 'pointer' }} />
                Abierto
              </label>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button style={{
          width: '100%',
          padding: 'var(--space-4)',
          background: 'var(--color-secondary)',
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
          e.currentTarget.style.background = 'var(--color-secondary-hover)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-high)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--color-secondary)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
        }}
        >
          <Save size={20} />
          Guardar Configuración
        </button>
      </div>
    </div>
  );
}

