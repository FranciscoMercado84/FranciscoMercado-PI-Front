import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function HFFooter({ onNavigate }) {
  const handleLinkClick = (e, route) => {
    e.preventDefault();
    if (route) {
      onNavigate?.(route);
    } else {
      // Enlaces sin destino van a 404
      if (typeof window !== 'undefined') {
        window.location.href = '/404';
      }
    }
  };

  return (
    <footer style={{
      background: 'var(--color-neutral-900)',
      color: 'var(--color-neutral-100)',
      padding: 'var(--space-10) var(--space-6) var(--space-6)',
      marginTop: 'var(--space-12)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-8)',
          paddingBottom: 'var(--space-8)',
          borderBottom: '1px solid rgba(250, 248, 246, 0.1)'
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🥖
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--font-size-h6)',
                  fontWeight: 'var(--font-weight-bold)',
                  margin: 0,
                  color: 'var(--color-neutral-50)'
                }}>
                  Panadería Artesanal
                </h3>
              </div>
            </div>
            <p style={{
              fontSize: 'var(--font-size-body-s)',
              color: 'var(--color-neutral-300)',
              lineHeight: 1.6,
              margin: 0
            }}>
              Pan fresco todos los días, hecho con amor y dedicación. Tradición y calidad en cada bocado.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              {[Facebook, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'rgba(250, 248, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-neutral-100)',
                    transition: 'all 0.2s',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(250, 248, 246, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: 'var(--font-size-h6)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-50)',
              marginBottom: 'var(--space-4)'
            }}>
              Enlaces Rápidos
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Inicio', route: 'landing' },
                { label: 'Productos', route: 'catalog' },
                { label: 'Sobre Nosotros', route: null },
                { label: 'Blog', route: null },
                { label: 'Contacto', route: null }
              ].map(link => (
                <li key={link.label} style={{ marginBottom: 'var(--space-2)' }}>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, link.route)}
                    style={{
                      fontSize: 'var(--font-size-body-s)',
                      color: 'var(--color-neutral-300)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-neutral-300)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: 'var(--font-size-h6)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-50)',
              marginBottom: 'var(--space-4)'
            }}>
              Contacto
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'start' }}>
                <MapPin size={18} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-300)' }}>
                  Av. Central, San José<br />Costa Rica
                </span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-300)' }}>
                  +506 2222-2222
                </span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-300)' }}>
                  info@panaderia.com
                </span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{
              fontSize: 'var(--font-size-h6)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-50)',
              marginBottom: 'var(--space-4)'
            }}>
              Horario
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {[
                { day: 'Lun - Vie', hours: '7:00 - 14:30 y 17:30 - 20:30' },
                { day: 'Sábado', hours: '7:00 - 14:30' },
                { day: 'Domingo', hours: '7:00 - 14:30' }
              ].map(item => (
                <div key={item.day} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-body-s)',
                  color: 'var(--color-neutral-300)'
                }}>
                  <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{item.day}:</span>
                  <span>{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)'
        }}>
          <p style={{
            fontSize: 'var(--font-size-body-s)',
            color: 'var(--color-neutral-500)',
            margin: 0
          }}>
            © 2026 Panadería Artesanal. Todos los derechos reservados.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
            {['Privacidad', 'Términos', 'Cookies'].map(link => (
              <a
                key={link}
                href="#"
                onClick={(e) => handleLinkClick(e, null)}
                style={{
                  fontSize: 'var(--font-size-body-s)',
                  color: 'var(--color-neutral-500)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-neutral-500)'}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

