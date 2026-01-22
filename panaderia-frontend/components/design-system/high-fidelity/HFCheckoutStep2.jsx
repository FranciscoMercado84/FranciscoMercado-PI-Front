import React, { useState } from 'react';
import HFHeader from './HFHeader';
import HFFooter from './HFFooter';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function HFCheckoutStep2({ onNavigate }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = [
    { date: '2026-01-06', day: 'Lun', dayNum: '6' },
    { date: '2026-01-07', day: 'Mar', dayNum: '7' },
    { date: '2026-01-08', day: 'Mié', dayNum: '8' },
    { date: '2026-01-09', day: 'Jue', dayNum: '9' },
    { date: '2026-01-10', day: 'Vie', dayNum: '10' },
  ];

  const times = [
    { time: '09:00', available: 5 },
    { time: '10:00', available: 3 },
    { time: '11:00', available: 0 },
    { time: '14:00', available: 5 },
    { time: '15:00', available: 2 },
    { time: '16:00', available: 4 },
  ];

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
            { num: 1, label: 'Datos', active: false },
            { num: 2, label: 'Horario', active: true },
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
                    : step.num < 2 
                    ? 'var(--color-success)' 
                    : 'var(--color-neutral-200)',
                  color: (step.active || step.num < 2) ? 'white' : 'var(--color-neutral-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-h5)',
                  fontWeight: 'var(--font-weight-bold)',
                  border: (step.active || step.num < 2) ? 'none' : '2px solid var(--color-neutral-300)',
                  boxShadow: step.active ? 'var(--shadow-medium)' : 'none'
                }}>
                  {step.num < 2 ? '✓' : step.num}
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
                  background: step.num < 2 ? 'var(--color-success)' : 'var(--color-neutral-300)',
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
          {/* Date & Time Selection */}
          <div>
            {/* Date Selection */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-neutral-300)',
              padding: 'var(--space-8)',
              boxShadow: 'var(--shadow-low)',
              marginBottom: 'var(--space-6)'
            }}>
              <h2 style={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-2)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}>
                <Calendar size={24} style={{ color: 'var(--color-primary)' }} />
                Selecciona la Fecha
              </h2>
              <p style={{
                fontSize: 'var(--font-size-body-m)',
                color: 'var(--color-neutral-700)',
                marginBottom: 'var(--space-6)'
              }}>
                Elige cuándo recogerás tu pedido
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 'var(--space-3)'
              }}>
                {dates.map((date) => (
                  <div
                    key={date.date}
                    onClick={() => setSelectedDate(date.date)}
                    style={{
                      padding: 'var(--space-4)',
                      background: selectedDate === date.date 
                        ? 'var(--color-primary)'
                        : 'var(--color-neutral-100)',
                      border: selectedDate === date.date
                        ? '2px solid var(--color-primary)'
                        : '2px solid var(--color-neutral-300)',
                      borderRadius: 'var(--radius-lg)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedDate !== date.date) {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedDate !== date.date) {
                        e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    <div style={{
                      fontSize: 'var(--font-size-caption)',
                      color: selectedDate === date.date ? 'white' : 'var(--color-neutral-500)',
                      marginBottom: 'var(--space-1)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      {date.day}
                    </div>
                    <div style={{
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: selectedDate === date.date ? 'white' : 'var(--color-neutral-900)'
                    }}>
                      {date.dayNum}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Selection */}
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
                marginBottom: 'var(--space-2)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}>
                <Clock size={24} style={{ color: 'var(--color-primary)' }} />
                Selecciona la Hora
              </h2>
              <p style={{
                fontSize: 'var(--font-size-body-m)',
                color: 'var(--color-neutral-700)',
                marginBottom: 'var(--space-6)'
              }}>
                Horarios disponibles para el {selectedDate ? 'día seleccionado' : 'día que elijas'}
              </p>

              {!selectedDate ? (
                <div style={{
                  padding: 'var(--space-10)',
                  textAlign: 'center',
                  color: 'var(--color-neutral-500)'
                }}>
                  <Calendar size={48} style={{ opacity: 0.3, marginBottom: 'var(--space-3)' }} />
                  <p>Selecciona una fecha primero</p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--space-3)'
                }}>
                  {times.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available > 0 && setSelectedTime(slot.time)}
                      disabled={slot.available === 0}
                      style={{
                        padding: 'var(--space-4)',
                        background: selectedTime === slot.time
                          ? 'var(--color-primary)'
                          : slot.available === 0
                          ? 'var(--color-neutral-200)'
                          : 'var(--color-neutral-100)',
                        border: selectedTime === slot.time
                          ? '2px solid var(--color-primary)'
                          : '2px solid var(--color-neutral-300)',
                        borderRadius: 'var(--radius-lg)',
                        cursor: slot.available === 0 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        opacity: slot.available === 0 ? 0.5 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (slot.available > 0 && selectedTime !== slot.time) {
                          e.currentTarget.style.borderColor = 'var(--color-primary)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedTime !== slot.time) {
                          e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <div style={{
                        fontSize: 'var(--font-size-h6)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: selectedTime === slot.time ? 'white' : 'var(--color-neutral-900)',
                        marginBottom: 'var(--space-1)'
                      }}>
                        {slot.time}
                      </div>
                      <div style={{
                        fontSize: 'var(--font-size-caption)',
                        color: selectedTime === slot.time 
                          ? 'rgba(255,255,255,0.8)' 
                          : slot.available === 0 
                          ? 'var(--color-error)' 
                          : 'var(--color-success)'
                      }}>
                        {slot.available === 0 ? 'Agotado' : `${slot.available} disponibles`}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-6)'
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-500)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
              }}
              >
                <ArrowLeft size={20} />
                Volver
              </button>
              <button
                onClick={() => onNavigate?.('confirmation')}
                disabled={!selectedDate || !selectedTime}
                style={{
                  flex: 1,
                  padding: 'var(--space-4)',
                  background: (!selectedDate || !selectedTime) 
                    ? 'var(--color-neutral-300)'
                    : 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: (!selectedDate || !selectedTime) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                  boxShadow: (!selectedDate || !selectedTime) ? 'none' : 'var(--shadow-medium)',
                  transition: 'all 0.2s',
                  opacity: (!selectedDate || !selectedTime) ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (selectedDate && selectedTime) {
                    e.currentTarget.style.background = 'var(--color-primary-hover)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-high)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedDate && selectedTime) {
                    e.currentTarget.style.background = 'var(--color-primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                  }
                }}
              >
                Confirmar Pedido
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
                Tu Pedido
              </h3>

              {/* Selected Date/Time */}
              {(selectedDate || selectedTime) && (
                <div style={{
                  background: 'var(--color-success-light)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--space-5)',
                  border: '1px solid var(--color-success)'
                }}>
                  {selectedDate && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      marginBottom: selectedTime ? 'var(--space-2)' : 0,
                      fontSize: 'var(--font-size-body-s)',
                      color: 'var(--color-neutral-900)'
                    }}>
                      <Calendar size={16} />
                      <span><strong>Fecha:</strong> {selectedDate}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      fontSize: 'var(--font-size-body-s)',
                      color: 'var(--color-neutral-900)'
                    }}>
                      <Clock size={16} />
                      <span><strong>Hora:</strong> {selectedTime}</span>
                    </div>
                  )}
                </div>
              )}

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
