import React, { useState, useEffect } from 'react';
import HFFooter from './HFFooter';
import { ArrowRight, Star, Clock, MapPin, Users, Heart, Send, Phone, Mail } from 'lucide-react';

const defaultFeaturedProducts = [
  { id: 1, name: 'Pan del Dia', description: 'Recien horneado en tienda, caliente y crujiente', price: 1.2, emoji: '🥖' },
  { id: 2, name: 'Bolleria Variada', description: 'Croissants, magdalenas y dulces artesanales', price: 1.5, emoji: '🥐' },
  { id: 3, name: 'Charcuteria', description: 'Embutidos de calidad con corte en tienda', price: 8.9, emoji: '🥓' },
  { id: 4, name: 'Productos de Despensa', description: 'Conservas, aceites y basicos del dia a dia', price: 3.5, emoji: '🫒' }
];

const categoryEmojis = {
  'Despensa y básicos': '🧂',
  'Conservas y Enlatados': '🥫',
  'Aceites, Vinagres y Salsas': '🫒',
  'Bebidas y Bodega': '🍷',
  'Charcutería': '🥓',
  'Dulces': '🍰',
  'Panadería': '🥖',
  'Pan': '🥖',  // Para compatibilidad con datos antiguos
  'Pastelería': '🥐',  // Para compatibilidad con datos antiguos
  'default': '🛒'
};

export default function HFLanding({ onNavigate, featuredProducts: propProducts, onAddToCart, heroImage = '/hero-panaderia.jpg' }) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamaño de pantalla para responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const normalizeProduct = (p, index) => ({
    id: p.id || p._id || index,
    name: p.name || p.nombre || 'Producto',
    description: p.description || p.descripcion || 'Producto de confianza para tu dia a dia',
    price: p.price || p.precio || 0,
    image: p.image || p.imagen || p.imagen_url,
    emoji: categoryEmojis[p.category || p.categoria] || categoryEmojis.default,
    category: p.category || p.categoria
  });

  const featuredProducts = (propProducts && propProducts.length > 0)
    ? propProducts.slice(0, 4).map(normalizeProduct)
    : defaultFeaturedProducts;

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
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
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 'var(--space-6)' : 'var(--space-10)',
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
              Comercio de proximidad desde hace anos
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-h1)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              lineHeight: 1.2,
              marginBottom: 'var(--space-4)'
            }}>
              Panaderia Puri
            </h1>
            <p style={{
              fontSize: 'var(--font-size-h4)',
              color: 'var(--color-primary)',
              fontStyle: 'italic',
              marginBottom: 'var(--space-4)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              Tu tienda de siempre, cada dia mas cerca.
            </p>
            <p style={{
              fontSize: 'var(--font-size-body-lg)',
              color: 'var(--color-neutral-700)',
              lineHeight: 1.6,
              marginBottom: 'var(--space-6)'
            }}>
              Pan recien horneado y productos de alimentacion basica. Tradicion, cercania y confianza en tu barrio.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
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
              >
                Ver Productos
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => onNavigate?.('about')}
                style={{
                  padding: 'var(--space-4) var(--space-6)',
                  background: 'white',
                  color: 'var(--color-neutral-900)',
                  border: '2px solid var(--color-neutral-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer'
                }}
              >
                Conocer Mas
              </button>
            </div>
          </div>
          <div style={{
            borderRadius: 'var(--radius-2xl)',
            aspectRatio: '4/3',
            boxShadow: 'var(--shadow-high)',
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--color-neutral-300)'
          }}>
            <img
              src={heroImage}
              alt='Panaderia Puri - Pan recien horneado'
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(212, 148, 28, 0.12) 0%, rgba(139, 90, 60, 0.16) 100%)'
            }}></div>
          </div>
        </div>
      </section>

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
              { icon: Clock, title: 'Pan Recien Horneado', desc: 'Horneado varias veces al dia en tienda' },
              { icon: MapPin, title: 'Comercio de Proximidad', desc: 'Tu tienda de barrio de toda la vida' },
              { icon: Heart, title: 'Trato Cercano', desc: 'Atencion personalizada y de confianza' }
            ].map((feature) => (
              <div key={feature.title} style={{
                padding: 'var(--space-6)',
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-neutral-300)',
                textAlign: 'center'
              }}>
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

      <section style={{
        padding: 'var(--space-10) var(--space-6)',
        background: 'var(--color-neutral-100)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Productos Destacados
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)' }}>
              Descubre nuestros productos mas populares
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-6)'
          }}>
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-neutral-300)',
                  cursor: 'pointer'
                }}
                onClick={() => onNavigate?.('product-detail', product.id)}
              >
                <div style={{
                  aspectRatio: '4/3',
                  background: 'var(--color-neutral-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: 'var(--space-3)',
                        background: 'white'
                      }}
                    />
                  ) : (
                    <span style={{ background: 'var(--color-neutral-300)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {product.emoji}
                    </span>
                  )}
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
                    Destacado
                  </div>
                </div>
                <div style={{ padding: 'var(--space-5)' }}>
                  <h3 style={{
                    fontSize: 'var(--font-size-h6)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-neutral-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    {product.name}
                  </h3>
                  <p style={{
                    fontSize: 'var(--font-size-body-s)',
                    color: 'var(--color-neutral-700)',
                    marginBottom: 'var(--space-4)',
                    lineHeight: 1.5
                  }}>
                    {product.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: 'var(--font-size-h5)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--color-primary)'
                    }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToCart) {
                          onAddToCart(product);
                        } else {
                          onNavigate?.('cart');
                        }
                      }}
                      style={{
                        padding: 'var(--space-2) var(--space-4)',
                        background: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        border: 'none',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: 'var(--font-size-body-s)',
                        fontWeight: 'var(--font-weight-semibold)',
                        cursor: 'pointer'
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

      <section id='about' style={{
        padding: 'var(--space-12) var(--space-6)',
        background: 'var(--color-neutral-50)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Sobre Nosotros
            </h2>
            <p style={{
              fontSize: 'var(--font-size-body-lg)',
              color: 'var(--color-primary)',
              fontStyle: 'italic'
            }}>
              Tu tienda de siempre, cada dia mas cerca.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div>
              <img
                src='/logo-panaderia-puri.png'
                alt='Panaderia Puri'
                style={{
                  width: '100%',
                  maxWidth: '350px',
                  margin: '0 auto',
                  display: 'block',
                  borderRadius: 'var(--radius-xl)'
                }}
              />
            </div>
            <div>
              <h3 style={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-4)'
              }}>
                Comercio de Proximidad con Tradicion
              </h3>
              <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
                Panaderia Puri es un comercio de proximidad con larga trayectoria en el barrio, especializado en pan recien horneado y alimentacion basica.
              </p>
              <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
                Recibimos pan diariamente de nuestros proveedores y lo horneamos en el punto de venta para ofrecerlo caliente y recien hecho.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                {[
                  { icon: Heart, label: 'Confianza' },
                  { icon: MapPin, label: 'Proximidad' },
                  { icon: Users, label: 'Tradicion' }
                ].map((item) => (
                  <div key={item.label} style={{
                    textAlign: 'center',
                    padding: 'var(--space-4)',
                    background: 'var(--color-primary-light)',
                    borderRadius: 'var(--radius-lg)'
                  }}>
                    <item.icon size={28} style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }} />
                    <p style={{
                      fontSize: 'var(--font-size-body-s)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-neutral-900)',
                      margin: 0
                    }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='contact' style={{
        padding: 'var(--space-12) var(--space-6)',
        background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Contacto
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)' }}>
              Tienes alguna pregunta? Escribenos y te responderemos lo antes posible.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'var(--space-8)' }}>
            <div style={{ background: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-medium)' }}>
              <h3 style={{
                fontSize: 'var(--font-size-h5)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-5)'
              }}>
                Informacion de Contacto
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <MapPin size={20} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-900)' }}>Calle comercial del barrio</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <Phone size={20} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-900)' }}>+34 XXX XXX XXX</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <Mail size={20} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-900)' }}>admin@panaderia.com</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <Clock size={20} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-900)' }}>L-V 7:00-14:30 / 17:30-20:30</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-medium)' }}>
              <h3 style={{
                fontSize: 'var(--font-size-h5)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-5)'
              }}>
                Envia un Mensaje
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const mailtoLink = `mailto:admin@panaderia.com?subject=Contacto desde web - ${contactForm.name}&body=${encodeURIComponent(`Nombre: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMensaje:\n${contactForm.message}`)}`;
                  window.location.href = mailtoLink;
                  setContactStatus('success');
                  setContactForm({ name: '', email: '', message: '' });
                  setTimeout(() => setContactStatus(null), 4000);
                }}
              >
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <input
                    type='text'
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    placeholder='Nombre'
                    style={{
                      width: '100%',
                      padding: 'var(--space-3) var(--space-4)',
                      border: '1px solid var(--color-neutral-300)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--font-size-body-m)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <input
                    type='email'
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    placeholder='Email'
                    style={{
                      width: '100%',
                      padding: 'var(--space-3) var(--space-4)',
                      border: '1px solid var(--color-neutral-300)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--font-size-body-m)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    rows={4}
                    placeholder='Mensaje'
                    style={{
                      width: '100%',
                      padding: 'var(--space-3) var(--space-4)',
                      border: '1px solid var(--color-neutral-300)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--font-size-body-m)',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
                {contactStatus === 'success' && (
                  <div style={{
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'var(--color-success-light)',
                    color: 'var(--color-success-dark)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--space-4)',
                    fontSize: 'var(--font-size-body-s)'
                  }}>
                    Mensaje enviado. Te responderemos pronto.
                  </div>
                )}
                <button
                  type='submit'
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-5)',
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
                    gap: 'var(--space-2)'
                  }}
                >
                  <Send size={18} />
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <HFFooter onNavigate={onNavigate} />
    </div>
  );
}
