import React from 'react';
import { ShoppingCart, User, Menu, LogOut } from 'lucide-react';

export default function HFHeader({ isAuthenticated = false, cartItems = 0, variant = 'light', onNavigate, onLogout }) {
  return (
    <header style={{
      background: variant === 'transparent' ? 'rgba(255, 255, 255, 0.95)' : 'var(--color-neutral-50)',
      borderBottom: '1px solid var(--color-neutral-300)',
      padding: 'var(--space-4) var(--space-6)',
      backdropFilter: variant === 'transparent' ? 'blur(10px)' : 'none',
      position: variant === 'transparent' ? 'sticky' : 'relative',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: 'var(--shadow-low)'
          }}>
            🥖
          </div>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-h5)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              margin: 0,
              lineHeight: 1
            }}>
              Panadería
            </h1>
            <p style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-neutral-500)',
              margin: 0,
              lineHeight: 1
            }}>
              Artesanal
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{
          display: 'flex',
          gap: 'var(--space-6)',
          alignItems: 'center'
        }}>
          {[
            { label: 'Inicio', route: 'landing' },
            { label: 'Productos', route: 'catalog' },
            { label: 'Contacto', route: 'contact' }
          ].map(item => (
            <a
              key={item.label}
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate?.(item.route); }}
              style={{
                fontSize: 'var(--font-size-body-m)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-neutral-700)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-neutral-700)'}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          {/* Cart */}
          <button 
            onClick={() => onNavigate?.('cart')}
            style={{
            position: 'relative',
            padding: 'var(--space-2)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-neutral-700)',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-neutral-700)'}
          >
            <ShoppingCart size={24} />
            {cartItems > 0 && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'var(--color-error)',
                color: 'white',
                borderRadius: 'var(--radius-full)',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--font-size-badge)',
                fontWeight: 'var(--font-weight-bold)',
                border: '2px solid var(--color-neutral-50)'
              }}>
                {cartItems}
              </span>
            )}
          </button>

          {/* User/Login */}
          {isAuthenticated ? (
            <>
              <button 
                onClick={() => onNavigate?.('profile')}
                style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-primary-light)',
                border: '2px solid var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-primary)',
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
                <User size={20} />
              </button>
              <button 
                onClick={() => onLogout?.()}
                style={{
                padding: 'var(--space-2)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-neutral-700)',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-error)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-neutral-700)'
              }
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <button 
              onClick={() => onNavigate?.('login')}
              style={{
              padding: 'var(--space-2) var(--space-5)',
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-body-m)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-primary-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-low)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

