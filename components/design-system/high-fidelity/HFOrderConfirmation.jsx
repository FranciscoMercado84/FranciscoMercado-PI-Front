import React from 'react';
import HFHeader from './HFHeader';
import HFFooter from './HFFooter';
import { CheckCircle, Download, Calendar, Clock, MapPin } from 'lucide-react';

export default function HFOrderConfirmation({ onNavigate }) {
  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <HFHeader isAuthenticated cartItems={0} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'var(--space-10) var(--space-6)',
        textAlign: 'center'
      }}>
        {/* Success Icon */}
        <div style={{
          width: '140px',
          height: '140px',
          background: 'linear-gradient(135deg, var(--color-success) 0%, var(--color-success-dark) 100%)',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-6)',
          boxShadow: '0 0 0 20px var(--color-success-light)'
        }}>
          <CheckCircle size={80} style={{ color: 'white' }} />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--font-size-h1)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-neutral-900)',
          marginBottom: 'var(--space-3)'
        }}>
          ¡Pedido Confirmado!
        </h1>

        <p style={{
          fontSize: 'var(--font-size-body-lg)',
          color: 'var(--color-neutral-700)',
          marginBottom: 'var(--space-4)',
          lineHeight: 1.6
        }}>
          Tu pedido ha sido procesado exitosamente
        </p>

        <div style={{
          display: 'inline-block',
          padding: 'var(--space-3) var(--space-6)',
          background: 'var(--color-primary-light)',
          borderRadius: 'var(--radius-full)',
          border: '2px solid var(--color-primary)',
          marginBottom: 'var(--space-10)'
        }}>
          <span style={{
            fontSize: 'var(--font-size-body-m)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)'
          }}>
            Número de Pedido: <span style={{ color: 'var(--color-primary)', fontFamily: 'monospace' }}>#ORD-285</span>
          </span>
        </div>

        {/* Order Details Card */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-6)',
          textAlign: 'left',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-6)',
            textAlign: 'center'
          }}>
            Detalles del Pedido
          </h2>

          <div style={{
            display: 'grid',
            gap: 'var(--space-5)'
          }}>
            {[
              { icon: Calendar, label: 'Fecha de Recogida', value: 'Miércoles, 8 de Enero 2026' },
              { icon: Clock, label: 'Hora de Recogida', value: '14:00 - 15:00' },
              { icon: MapPin, label: 'Ubicación', value: 'Av. Central, San José, Costa Rica' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 'var(--space-4)',
                alignItems: 'start'
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
                <div style={{ flex: 1 }}>
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

          <div style={{
            marginTop: 'var(--space-6)',
            paddingTop: 'var(--space-6)',
            borderTop: '2px solid var(--color-neutral-300)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: 'var(--font-size-h5)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)'
            }}>
              Total Pagado:
            </span>
            <span style={{
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-primary)'
            }}>
              $22.15
            </span>
          </div>
        </div>

        {/* Info Box */}
        <div style={{
          background: 'var(--color-info-light)',
          border: '1px solid var(--color-info)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-8)',
          textAlign: 'left',
          fontSize: 'var(--font-size-body-m)',
          color: 'var(--color-neutral-900)',
          lineHeight: 1.6
        }}>
          <strong>📧 Confirmación enviada:</strong> Hemos enviado un correo electrónico con los detalles de tu pedido. Por favor, muestra este correo o el número de pedido al recoger tus productos.
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-4)'
        }}>
          <button style={{
            padding: 'var(--space-4)',
            background: 'white',
            border: '2px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
          <button 
          onClick={() => onNavigate?.('landing')}
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
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
            Seguir Comprando
          </button>
        </div>
      </div>

      <HFFooter />
    </div>
  );
}
