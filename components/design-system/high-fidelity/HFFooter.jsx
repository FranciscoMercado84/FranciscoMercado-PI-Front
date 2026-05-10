import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { configService } from '../../../src/services/api';

const defaultConfig = {
  contactPhone: '+34 911 284 763',
  contactEmail: 'admin@panaderia.com',
  hours: {
    weekday: {
      morningOpen: '07:00',
      morningClose: '14:30',
      afternoonOpen: '17:30',
      afternoonClose: '20:30'
    },
    saturday: { open: '07:00', close: '14:30' },
    sunday: { open: '07:00', close: '14:30' }
  }
};

export default function HFFooter({ onNavigate }) {
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    let active = true;

    const loadConfig = async () => {
      try {
        const response = await configService.get();
        const data = response?.data || response || {};
        if (active && data) {
          setConfig(prev => ({ ...prev, ...data, hours: { ...prev.hours, ...(data.hours || {}) } }));
        }
      } catch (error) {
        console.error('Error al cargar configuración pública:', error);
      }
    };

    loadConfig();

    return () => {
      active = false;
    };
  }, []);

  const weekdayHours = config.hours?.weekday || defaultConfig.hours.weekday;
  const saturdayHours = config.hours?.saturday || defaultConfig.hours.saturday;
  const sundayHours = config.hours?.sunday || defaultConfig.hours.sunday;

  const handleLinkClick = (e, route) => {
    e.preventDefault();
    if (route) {
      onNavigate?.(route);
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
              <img 
                src="/logo-panaderia-puri.png" 
                alt="Panadería Puri" 
                style={{
                  width: '44px',
                  height: '44px',
                  objectFit: 'contain',
                  borderRadius: 'var(--radius-lg)'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{
                width: '44px',
                height: '44px',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
                borderRadius: 'var(--radius-lg)',
                display: 'none',
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
                  Panadería Puri
                </h3>
              </div>
            </div>
            <p style={{
              fontSize: 'var(--font-size-body-s)',
              color: 'var(--color-neutral-300)',
              lineHeight: 1.6,
              margin: 0,
              fontStyle: 'italic'
            }}>
              "Tu tienda de siempre, cada día más cerca."
            </p>
            <p style={{
              fontSize: 'var(--font-size-body-s)',
              color: 'var(--color-neutral-300)',
              lineHeight: 1.6,
              margin: 'var(--space-3) 0 0 0'
            }}>
              Pan recién horneado y productos de alimentación básica. Tradición, cercanía y confianza en tu barrio.
            </p>
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
                { label: 'Sobre Nosotros', route: 'about' },
                { label: 'Contacto', route: 'contact' }
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
                  Avenida de las Ciencias, 49<br />Madrid
                </span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-300)' }}>
                  {config.contactPhone}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-300)' }}>
                  {config.contactEmail}
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
                { day: 'Lun - Vie', hours: `${weekdayHours.morningOpen} - ${weekdayHours.morningClose} y ${weekdayHours.afternoonOpen} - ${weekdayHours.afternoonClose}` },
                { day: 'Sábado', hours: `${saturdayHours.open} - ${saturdayHours.close}` },
                { day: 'Domingo', hours: `${sundayHours.open} - ${sundayHours.close}` }
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
            © 2026 Panadería Puri. Todos los derechos reservados.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
            {[
              { label: 'Privacidad', route: 'privacy' },
              { label: 'Términos', route: 'terms' },
              { label: 'Cookies', route: 'cookies' }
            ].map(link => (
              <a
                key={link.label}
                href="#"
                onClick={(e) => handleLinkClick(e, link.route)}
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
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

