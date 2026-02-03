import React from 'react';
import { Package, User, Calendar, Clock, MapPin, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

export default function HFAdminOrderDetail() {
  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-6)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
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
              Pedido #ORD-285
            </h1>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-warning-light)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-warning)',
              fontSize: 'var(--font-size-body-s)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-warning-dark)'
            }}>
              <Clock size={16} />
              Pendiente
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button style={{
              padding: 'var(--space-3) var(--space-5)',
              background: 'var(--color-success)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}>
              <CheckCircle size={18} />
              Marcar Completado
            </button>
            <button style={{
              padding: 'var(--space-3) var(--space-5)',
              background: 'white',
              border: '2px solid var(--color-error)',
              color: 'var(--color-error)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}>
              <XCircle size={18} />
              Cancelar
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-6)'
        }}>
          {/* Customer Info */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-low)'
          }}>
            <h2 style={{
              fontSize: 'var(--font-size-h5)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-5)',
              paddingBottom: 'var(--space-3)',
              borderBottom: '1px solid var(--color-neutral-300)'
            }}>
              Información del Cliente
            </h2>
            {[
              { icon: User, label: 'Nombre', value: 'Juan Pérez González' },
              { icon: Mail, label: 'Email', value: 'juan.perez@email.com' },
              { icon: Phone, label: 'Teléfono', value: '+506 8888-8888' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 'var(--space-3)',
                alignItems: 'start',
                marginBottom: i < 2 ? 'var(--space-4)' : 0
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'var(--color-secondary-light)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <item.icon size={20} style={{ color: 'var(--color-secondary)' }} />
                </div>
                <div>
                  <div style={{
                    fontSize: 'var(--font-size-body-s)',
                    color: 'var(--color-neutral-500)',
                    marginBottom: 'var(--space-1)'
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: 'var(--font-size-body-m)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-neutral-900)'
                  }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pickup Info */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-low)'
          }}>
            <h2 style={{
              fontSize: 'var(--font-size-h5)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-5)',
              paddingBottom: 'var(--space-3)',
              borderBottom: '1px solid var(--color-neutral-300)'
            }}>
              Información de Recogida
            </h2>
            {[
              { icon: Calendar, label: 'Fecha', value: '8 de Enero, 2026' },
              { icon: Clock, label: 'Hora', value: '14:00 - 15:00' },
              { icon: MapPin, label: 'Ubicación', value: 'Av. Central, San José' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 'var(--space-3)',
                alignItems: 'start',
                marginBottom: i < 2 ? 'var(--space-4)' : 0
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <item.icon size={20} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <div style={{
                    fontSize: 'var(--font-size-body-s)',
                    color: 'var(--color-neutral-500)',
                    marginBottom: 'var(--space-1)'
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: 'var(--font-size-body-m)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-neutral-900)'
                  }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-4)',
            borderBottom: '2px solid var(--color-neutral-300)'
          }}>
            Productos del Pedido
          </h2>

          {[
            { name: 'Baguette Francesa', qty: 2, price: 3.50 },
            { name: 'Croissant Mantequilla', qty: 3, price: 2.80 },
            { name: 'Pan Integral', qty: 1, price: 4.20 }
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-4) 0',
              borderBottom: i < arr.length - 1 ? '1px solid var(--color-neutral-300)' : 'none'
            }}>
              <div>
                <div style={{
                  fontSize: 'var(--font-size-h6)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-1)'
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontSize: 'var(--font-size-body-s)',
                  color: 'var(--color-neutral-700)'
                }}>
                  Cantidad: {item.qty} × ${item.price.toFixed(2)}
                </div>
              </div>
              <div style={{
                fontSize: 'var(--font-size-h5)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-secondary)'
              }}>
                ${(item.qty * item.price).toFixed(2)}
              </div>
            </div>
          ))}

          <div style={{
            marginTop: 'var(--space-6)',
            paddingTop: 'var(--space-6)',
            borderTop: '2px solid var(--color-neutral-900)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 'var(--font-size-h4)',
            fontWeight: 'var(--font-weight-bold)'
          }}>
            <span>Total:</span>
            <span style={{ color: 'var(--color-secondary)' }}>$22.15</span>
          </div>
        </div>
      </div>
    </div>
  );
}

