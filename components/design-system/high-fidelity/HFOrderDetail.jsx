import React from 'react';
import { Package, Calendar, Clock, MapPin, CheckCircle, Download, X, ArrowLeft } from 'lucide-react';

export default function HFOrderDetail({ onNavigate, isAdmin = false }) {
  const orderItems = [
    { name: 'Baguette Francesa', qty: 2, price: 3.50 },
    { name: 'Croissant Mantequilla', qty: 3, price: 2.80 },
    { name: 'Pan Integral', qty: 1, price: 4.20 }
  ];

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)'
      }}>
        {/* Header */}
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
              background: 'var(--color-success-light)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-success)',
              fontSize: 'var(--font-size-body-s)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-success-dark)'
            }}>
              <CheckCircle size={16} />
              Completado
            </div>
          </div>
          <button style={{
            padding: 'var(--space-3) var(--space-5)',
            background: 'white',
            border: '2px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary)';
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
            e.currentTarget.style.color = 'inherit';
          }}
          >
            <Download size={20} />
            Descargar Recibo
          </button>
        </div>

        {/* Order Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-6)'
        }}>
          {[
            { icon: Calendar, label: 'Fecha del Pedido', value: '5 de Enero, 2026' },
            { icon: Clock, label: 'Hora de Recogida', value: '14:00 - 15:00' },
            { icon: MapPin, label: 'Ubicación', value: 'Av. Central, San José' },
            { icon: Package, label: 'Total de Productos', value: '6 productos' }
          ].map((item, i) => (
            <div key={i} style={{
              background: 'white',
              padding: 'var(--space-5)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-neutral-300)',
              display: 'flex',
              gap: 'var(--space-4)',
              alignItems: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'var(--color-primary-light)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <item.icon size={24} style={{ color: 'var(--color-primary)' }} />
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
                  fontSize: 'var(--font-size-h6)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-neutral-900)'
                }}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Items */}
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
            borderBottom: '1px solid var(--color-neutral-300)'
          }}>
            Productos
          </h2>

          {orderItems.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-4) 0',
              borderBottom: i < orderItems.length - 1 ? '1px solid var(--color-neutral-300)' : 'none'
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
                color: 'var(--color-primary)'
              }}>
                ${(item.qty * item.price).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Totals */}
          <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', borderTop: '2px solid var(--color-neutral-300)' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-3)',
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)'
            }}>
              <span>Subtotal:</span>
              <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>$19.60</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)'
            }}>
              <span>IVA (13%):</span>
              <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>$2.55</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 'var(--space-4)',
              borderTop: '2px solid var(--color-neutral-900)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-bold)'
            }}>
              <span>Total:</span>
              <span style={{ color: 'var(--color-primary)' }}>$22.15</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: isAdmin ? 'flex-start' : 'center' }}>
          {isAdmin ? (
            <button 
            onClick={() => onNavigate?.('orders')}
            style={{
              padding: 'var(--space-4) var(--space-6)',
              background: 'white',
              border: '2px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
              e.currentTarget.style.color = 'inherit';
            }}
            >
              <ArrowLeft size={20} />
              Volver a Pedidos
            </button>
          ) : (
            <button 
            onClick={() => onNavigate?.('cart')}
            style={{
              padding: 'var(--space-4) var(--space-8)',
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
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
              Pedir de Nuevo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

