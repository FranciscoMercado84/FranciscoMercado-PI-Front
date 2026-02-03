import React from 'react';
import HFHeader from './HFHeader';
import HFFooter from './HFFooter';
import { User, Mail, Phone, MapPin, CreditCard, ArrowRight } from 'lucide-react';

export default function HFCheckoutStep1({ onNavigate }) {
  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <HFHeader isAuthenticated cartItems={3} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)'
      }}>
        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 'var(--space-10)',
          gap: 'var(--space-4)'
        }}>
          {[
            { num: 1, label: 'Datos', active: true },
            { num: 2, label: 'Horario', active: false },
            { num: 3, label: 'Confirmación', active: false }
          ].map((step, i) => (
            <React.Fragment key={step.num}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-full)',
                  background: step.active 
                    ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)'
                    : 'var(--color-neutral-200)',
                  color: step.active ? 'white' : 'var(--color-neutral-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-h5)',
                  fontWeight: 'var(--font-weight-bold)',
                  border: step.active ? 'none' : '2px solid var(--color-neutral-300)',
                  boxShadow: step.active ? 'var(--shadow-medium)' : 'none'
                }}>
                  {step.num}
                </div>
                <span style={{
                  fontSize: 'var(--font-size-body-s)',
                  fontWeight: step.active ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
                  color: step.active ? 'var(--color-primary)' : 'var(--color-neutral-500)'
                }}>
                  {step.label}
                </span>
              </div>
              {i < 2 && (
                <div style={{
                  width: '80px',
                  height: '2px',
                  background: 'var(--color-neutral-300)',
                  marginBottom: 'var(--space-6)'
                }}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: 'var(--space-6)',
          alignItems: 'start'
        }}>
          {/* Form */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-low)'
          }}>
            <h2 style={{
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-2)'
            }}>
              Información de Contacto
            </h2>
            <p style={{
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)',
              marginBottom: 'var(--space-6)'
            }}>
              Completa tus datos para procesar el pedido
            </p>

            <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
              {/* Name Fields */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-4)'
              }}>
                {['Nombre', 'Apellido'].map((label) => (
                  <div key={label}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      fontSize: 'var(--font-size-body-m)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-neutral-900)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      <User size={18} style={{ color: 'var(--color-primary)' }} />
                      {label}
                    </label>
                    <input
                      type="text"
                      placeholder={`Tu ${label.toLowerCase()}`}
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

              {/* Email */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <Mail size={18} style={{ color: 'var(--color-primary)' }} />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
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

              {/* Phone */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <Phone size={18} style={{ color: 'var(--color-primary)' }} />
                  Teléfono
                </label>
                <input
                  type="tel"
                  placeholder="+506 8888-8888"
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

              {/* ID Number */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <CreditCard size={18} style={{ color: 'var(--color-primary)' }} />
                  Cédula
                </label>
                <input
                  type="text"
                  placeholder="1-0000-0000"
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

              {/* Notes */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  Notas adicionales (Opcional)
                </label>
                <textarea
                  placeholder="¿Algo que debamos saber?"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    border: '2px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body-m)',
                    outline: 'none',
                    transition: 'all 0.2s',
                    resize: 'vertical',
                    fontFamily: 'var(--font-primary)'
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
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-8)',
              paddingTop: 'var(--space-6)',
              borderTop: '1px solid var(--color-neutral-300)'
            }}>
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
                Volver al Carrito
              </button>
              <button 
              onClick={() => onNavigate?.('checkout-2')}
              style={{
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
                Continuar
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ position: 'sticky', top: 'var(--space-6)' }}>
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--color-neutral-300)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-low)'
            }}>
              <h3 style={{
                fontSize: 'var(--font-size-h6)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-5)',
                paddingBottom: 'var(--space-4)',
                borderBottom: '1px solid var(--color-neutral-300)'
              }}>
                Resumen del Pedido
              </h3>

              <div style={{ marginBottom: 'var(--space-5)' }}>
                {[
                  { name: 'Baguette', qty: 2, price: 7.00 },
                  { name: 'Croissant', qty: 3, price: 8.40 },
                  { name: 'Pan Integral', qty: 1, price: 4.20 }
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-3)',
                    fontSize: 'var(--font-size-body-s)',
                    color: 'var(--color-neutral-700)'
                  }}>
                    <span>{item.name} x{item.qty}</span>
                    <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--color-neutral-300)',
                marginBottom: 'var(--space-4)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)'
                }}>
                  <span style={{ color: 'var(--color-neutral-700)' }}>Subtotal:</span>
                  <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>$19.60</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-body-m)',
                  marginBottom: 'var(--space-4)'
                }}>
                  <span style={{ color: 'var(--color-neutral-700)' }}>IVA (13%):</span>
                  <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>$2.55</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 'var(--space-4)',
                borderTop: '2px solid var(--color-neutral-900)',
                fontSize: 'var(--font-size-h5)',
                fontWeight: 'var(--font-weight-bold)'
              }}>
                <span>Total:</span>
                <span style={{ color: 'var(--color-primary)' }}>$22.15</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HFFooter />
    </div>
  );
}
