import React from 'react';
import { Clock, Plus, Edit, Trash2, AlertCircle } from 'lucide-react';

export default function HFPickupTimeManagement() {
  const timeSlots = [
    { id: 1, time: '09:00', capacity: 5, available: 5, status: 'available' },
    { id: 2, time: '10:00', capacity: 5, available: 2, status: 'available' },
    { id: 3, time: '11:00', capacity: 5, available: 0, status: 'full' },
    { id: 4, time: '14:00', capacity: 5, available: 5, status: 'available' },
    { id: 5, time: '15:00', capacity: 5, available: 3, status: 'available' },
    { id: 6, time: '16:00', capacity: 5, available: 4, status: 'available' }
  ];

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-6)'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-8)'
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-2)'
            }}>
              Gestión de Horarios
            </h1>
            <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)' }}>
              Administra los horarios de recogida disponibles
            </p>
          </div>
          <button style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            boxShadow: 'var(--shadow-medium)'
          }}>
            <Plus size={20} />
            Nuevo Horario
          </button>
        </div>

        {/* Info Card */}
        <div style={{
          background: 'var(--color-info-light)',
          border: '1px solid var(--color-info)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-6)',
          display: 'flex',
          gap: 'var(--space-4)',
          alignItems: 'start'
        }}>
          <AlertCircle size={24} style={{ color: 'var(--color-info-dark)', flexShrink: 0 }} />
          <div style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-900)', lineHeight: 1.6 }}>
            <strong>Gestión de Capacidad:</strong> Cada horario tiene una capacidad máxima de pedidos. Los clientes solo pueden seleccionar horarios con disponibilidad.
          </div>
        </div>

        {/* Time Slots Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-5)'
        }}>
          {timeSlots.map(slot => (
            <div key={slot.id} style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              border: `2px solid ${slot.status === 'full' ? 'var(--color-error)' : 'var(--color-neutral-300)'}`,
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-low)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (slot.status !== 'full') {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
              }
            }}
            onMouseLeave={(e) => {
              if (slot.status !== 'full') {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-low)';
              }
            }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: 'var(--space-4)'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: slot.status === 'full' ? 'var(--color-error-light)' : 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Clock size={28} style={{ color: slot.status === 'full' ? 'var(--color-error)' : 'var(--color-primary)' }} />
                </div>
                <div style={{
                  padding: 'var(--space-1) var(--space-3)',
                  background: slot.status === 'full' ? 'var(--color-error-light)' : 'var(--color-success-light)',
                  color: slot.status === 'full' ? 'var(--color-error-dark)' : 'var(--color-success-dark)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-badge)',
                  fontWeight: 'var(--font-weight-bold)'
                }}>
                  {slot.status === 'full' ? 'Lleno' : 'Disponible'}
                </div>
              </div>

              <div style={{
                fontSize: 'var(--font-size-h3)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-2)'
              }}>
                {slot.time}
              </div>

              <div style={{
                fontSize: 'var(--font-size-body-m)',
                color: 'var(--color-neutral-700)',
                marginBottom: 'var(--space-4)'
              }}>
                Capacidad: {slot.capacity} pedidos
              </div>

              {/* Availability Bar */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-body-s)',
                  color: 'var(--color-neutral-700)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <span>Disponibles:</span>
                  <span style={{ fontWeight: 'var(--font-weight-bold)' }}>
                    {slot.available} / {slot.capacity}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'var(--color-neutral-200)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(slot.available / slot.capacity) * 100}%`,
                    height: '100%',
                    background: slot.available === 0 
                      ? 'var(--color-error)' 
                      : slot.available <= 2 
                      ? 'var(--color-warning)' 
                      : 'var(--color-success)',
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button style={{
                  flex: 1,
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--color-secondary-light)',
                  color: 'var(--color-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-s)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-1)'
                }}>
                  <Edit size={14} />
                  Editar
                </button>
                <button style={{
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--color-error-light)',
                  color: 'var(--color-error)',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

