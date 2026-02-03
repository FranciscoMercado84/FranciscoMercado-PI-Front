import React from 'react';
import HFFooter from './HFFooter';
import { ArrowRight, Star, Clock, Award } from 'lucide-react';

export default function HFLanding({ onNavigate }) {
  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%)',
        padding: 'var(--space-12) var(--space-6)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-10)',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-primary)',
              color: 'white',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-body-s)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--space-5)'
            }}>
              ✨ Nuevo: Pan integral de masa madre
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-h1)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              lineHeight: 1.2,
              marginBottom: 'var(--space-4)'
            }}>
              Pan Fresco<br />Todos los Días
            </h1>
            <p style={{
              fontSize: 'var(--font-size-body-lg)',
              color: 'var(--color-neutral-700)',
              lineHeight: 1.6,
              marginBottom: 'var(--space-6)'
            }}>
              Descubre el sabor auténtico de nuestro pan artesanal, horneado con amor y los mejores ingredientes naturales.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <button 
                onClick={() => onNavigate?.('catalog')}
                style={{
                padding: 'var(--space-4) var(--space-6)',
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
                boxShadow: 'var(--shadow-low)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-primary-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-low)';
              }}
              >
                Ver Productos
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => onNavigate?.('catalog')}
                style={{
                padding: 'var(--space-4) var(--space-6)',
                background: 'white',
                color: 'var(--color-neutral-900)',
                border: '2px solid var(--color-neutral-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-body-m)',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                Conocer Más
              </button>
            </div>
          </div>
          <div style={{
            background: 'var(--color-neutral-300)',
            borderRadius: 'var(--radius-2xl)',
            aspectRatio: '4/3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-high)',
            fontSize: 'var(--font-size-h1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(212, 148, 28, 0.1) 0%, rgba(139, 90, 60, 0.1) 100%)'
            }}></div>
            <span style={{ fontSize: '120px' }}>🥖</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: 'var(--space-10) var(--space-6)',
        background: 'var(--color-neutral-50)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-6)'
          }}>
            {[
              { icon: Clock, title: 'Fresco Diario', desc: 'Horneado todas las mañanas' },
              { icon: Award, title: '100% Natural', desc: 'Ingredientes seleccionados' },
              { icon: Star, title: 'Calidad Premium', desc: 'Recetas tradicionales' }
            ].map((feature, i) => (
              <div key={i} style={{
                padding: 'var(--space-6)',
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-neutral-300)',
                textAlign: 'center',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
              }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-4)',
                  color: 'var(--color-primary)'
                }}>
                  <feature.icon size={32} />
                </div>
                <h3 style={{
                  fontSize: 'var(--font-size-h5)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: 'var(--font-size-body-s)',
                  color: 'var(--color-neutral-700)',
                  margin: 0
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{
        padding: 'var(--space-10) var(--space-6)',
        background: 'var(--color-neutral-100)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'var(--space-8)'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Productos Destacados
            </h2>
            <p style={{
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)'
            }}>
              Descubre nuestras especialidades más populares
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-6)'
          }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--color-neutral-300)',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  aspectRatio: '4/3',
                  background: 'var(--color-neutral-300)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px',
                  position: 'relative'
                }}>
                  {i === 1 ? '🥖' : i === 2 ? '🥐' : i === 3 ? '🍞' : '🥯'}
                  <div style={{
                    position: 'absolute',
                    top: 'var(--space-3)',
                    right: 'var(--space-3)',
                    padding: 'var(--space-1) var(--space-3)',
                    background: 'var(--color-success)',
                    color: 'white',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-badge)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}>
                    Nuevo
                  </div>
                </div>
                <div style={{ padding: 'var(--space-5)' }}>
                  <h3 style={{
                    fontSize: 'var(--font-size-h6)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-neutral-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    {i === 1 ? 'Baguette' : i === 2 ? 'Croissant' : i === 3 ? 'Pan Integral' : 'Bagel'}
                  </h3>
                  <p style={{
                    fontSize: 'var(--font-size-body-s)',
                    color: 'var(--color-neutral-700)',
                    marginBottom: 'var(--space-4)',
                    lineHeight: 1.5
                  }}>
                    Pan artesanal horneado fresco cada día
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: 'var(--font-size-h5)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--color-primary)'
                    }}>
                      ${(i * 2 + 3)}.00
                    </span>
                    <button 
                      onClick={() => onNavigate?.('cart')}
                      style={{
                      padding: 'var(--space-2) var(--space-4)',
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      border: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--font-size-body-s)',
                      fontWeight: 'var(--font-weight-semibold)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-primary)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-primary-light)';
                      e.currentTarget.style.color = 'var(--color-primary)';
                    }}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HFFooter onNavigate={onNavigate} />
    </div>
  );
}
