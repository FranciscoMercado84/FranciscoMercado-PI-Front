import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

// Productos por defecto si no se pasan sugerencias
const defaultSuggestions = [
  { id: 1, name: 'Baguette Francesa', price: 3.50, emoji: '🥖' },
  { id: 2, name: 'Croissant', price: 2.80, emoji: '🥐' },
  { id: 3, name: 'Pan Integral', price: 4.20, emoji: '🍞' },
  { id: 4, name: 'Bagel', price: 3.00, emoji: '🥯' },
];

// Emojis para categorías
const categoryEmojis = {
  'Pan': '🥖',
  'Pastelería': '🥐',
  'Especiales': '🍞',
  'Bebidas': '☕',
  'default': '🥯'
};

export default function HFCartEmpty({ onNavigate, suggestions: propSuggestions, onAddToCart }) {
  // Normalizar sugerencias del backend
  const normalizedSuggestions = (propSuggestions && propSuggestions.length > 0)
    ? propSuggestions.slice(0, 4).map(p => ({
        id: p.id || p._id,
        name: p.name || p.nombre || 'Producto',
        price: p.price || p.precio || 0,
        image: p.image || p.imagen || p.imagen_url,
        emoji: categoryEmojis[p.category || p.categoria] || categoryEmojis.default
      }))
    : defaultSuggestions;

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'var(--space-12) var(--space-6)',
        textAlign: 'center'
      }}>
        {/* Empty State */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-10)',
          border: '1px solid var(--color-neutral-300)',
          marginBottom: 'var(--space-10)'
        }}>
          <div style={{
            width: '140px',
            height: '140px',
            background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-neutral-100) 100%)',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-6)',
            border: '3px solid var(--color-primary)'
          }}>
            <ShoppingBag size={64} style={{ color: 'var(--color-primary)' }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-3)'
          }}>
            Tu carrito está vacío
          </h1>

          <p style={{
            fontSize: 'var(--font-size-body-lg)',
            color: 'var(--color-neutral-700)',
            marginBottom: 'var(--space-8)',
            maxWidth: '500px',
            margin: '0 auto var(--space-8)',
            lineHeight: 1.6
          }}>
            Parece que aún no has agregado nada a tu carrito. ¡Descubre nuestros deliciosos productos!
          </p>

          <button 
            onClick={() => onNavigate?.('catalog')}
            style={{
            padding: 'var(--space-4) var(--space-8)',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-h6)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
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
            Ver Productos
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Suggestions */}
        <div>
          <h2 style={{
            fontSize: 'var(--font-size-h4)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-6)',
            textAlign: 'left'
          }}>
            Te podría interesar
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 'var(--space-5)'
          }}>
            {normalizedSuggestions.map(product => (
              <div
                key={product.id}
                style={{
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
                  aspectRatio: '1/1',
                  background: product.image ? `url(${product.image}) center/cover` : 'var(--color-neutral-200)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '56px'
                }}>
                  {!product.image && product.emoji}
                </div>
                <div style={{ padding: 'var(--space-4)' }}>
                  <h3 style={{
                    fontSize: 'var(--font-size-body-m)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-neutral-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    {product.name}
                  </h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: 'var(--font-size-h6)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--color-primary)'
                    }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart?.(product);
                    }}
                    style={{
                      padding: 'var(--space-2) var(--space-3)',
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
      </div>
    </div>
  );
}

