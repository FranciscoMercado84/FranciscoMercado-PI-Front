import React, { useState } from 'react';
import HFFooter from './HFFooter';
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react';

export default function HFProductCatalog({ onNavigate }) {
  const [viewMode, setViewMode] = useState('grid');

  const products = [
    { id: 1, name: 'Baguette Francesa', price: 3.50, category: 'Pan', emoji: '🥖', badge: 'Popular' },
    { id: 2, name: 'Croissant Mantequilla', price: 2.80, category: 'Pastelería', emoji: '🥐', badge: 'Nuevo' },
    { id: 3, name: 'Pan Integral', price: 4.20, category: 'Pan', emoji: '🍞', badge: null },
    { id: 4, name: 'Bagel', price: 3.00, category: 'Pan', emoji: '🥯', badge: null },
    { id: 5, name: 'Pan de Ajo', price: 4.50, category: 'Especiales', emoji: '🧄', badge: 'Popular' },
    { id: 6, name: 'Donut', price: 2.50, category: 'Pastelería', emoji: '🍩', badge: null },
    { id: 7, name: 'Pretzel', price: 3.20, category: 'Pan', emoji: '🥨', badge: null },
    { id: 8, name: 'Pan Dulce', price: 2.90, category: 'Pastelería', emoji: '🧁', badge: 'Nuevo' },
  ];

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)'
      }}>
        {/* Page Header */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-2)'
          }}>
            Nuestros Productos
          </h1>
          <p style={{
            fontSize: 'var(--font-size-body-m)',
            color: 'var(--color-neutral-700)'
          }}>
            Explora nuestra selección de productos artesanales
          </p>
        </div>

        {/* Filters Bar */}
        <div style={{
          background: 'white',
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          marginBottom: 'var(--space-6)',
          display: 'flex',
          gap: 'var(--space-4)',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Search */}
          <div style={{
            flex: '1 1 300px',
            position: 'relative'
          }}>
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: 'var(--space-4)',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-neutral-500)'
              }}
            />
            <input
              type="text"
              placeholder="Buscar productos..."
              style={{
                width: '100%',
                padding: 'var(--space-3) var(--space-3) var(--space-3) var(--space-10)',
                border: '1px solid var(--color-neutral-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-body-m)',
                background: 'var(--color-neutral-100)',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.background = 'white';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                e.currentTarget.style.background = 'var(--color-neutral-100)';
              }}
            />
          </div>

          {/* Category Filter */}
          <select style={{
            padding: 'var(--space-3) var(--space-4)',
            border: '1px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
            background: 'white',
            cursor: 'pointer',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-neutral-900)'
          }}>
            <option>Todas las Categorías</option>
            <option>Pan</option>
            <option>Pastelería</option>
            <option>Especiales</option>
          </select>

          {/* Filter Button */}
          <button style={{
            padding: 'var(--space-3) var(--space-5)',
            background: 'white',
            border: '1px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
            fontWeight: 'var(--font-weight-medium)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-neutral-300)'}
          >
            <SlidersHorizontal size={18} />
            Filtros
          </button>

          {/* View Toggle */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-1)',
            background: 'var(--color-neutral-100)',
            padding: 'var(--space-1)',
            borderRadius: 'var(--radius-lg)'
          }}>
            {[
              { mode: 'grid', Icon: Grid },
              { mode: 'list', Icon: List }
            ].map(({ mode, Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: 'var(--space-2)',
                  background: viewMode === mode ? 'white' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  color: viewMode === mode ? 'var(--color-primary)' : 'var(--color-neutral-500)',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  boxShadow: viewMode === mode ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' 
            ? 'repeat(auto-fill, minmax(280px, 1fr))' 
            : '1fr',
          gap: 'var(--space-5)'
        }}>
          {products.map(product => (
            <div
              key={product.id}
              onClick={() => onNavigate?.('product-detail')}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--color-neutral-300)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                display: viewMode === 'list' ? 'flex' : 'block'
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
                aspectRatio: viewMode === 'grid' ? '4/3' : '1/1',
                width: viewMode === 'list' ? '200px' : '100%',
                background: 'var(--color-neutral-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '64px',
                position: 'relative',
                flexShrink: 0
              }}>
                {product.emoji}
                {product.badge && (
                  <div style={{
                    position: 'absolute',
                    top: 'var(--space-3)',
                    right: 'var(--space-3)',
                    padding: 'var(--space-1) var(--space-3)',
                    background: product.badge === 'Nuevo' ? 'var(--color-new)' : 'var(--color-primary)',
                    color: 'white',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-badge)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}>
                    {product.badge}
                  </div>
                )}
              </div>
              <div style={{ 
                padding: 'var(--space-5)',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-primary)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--space-1)'
                  }}>
                    {product.category}
                  </div>
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
                    Pan artesanal horneado fresco cada día
                  </p>
                </div>
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
                    ${product.price.toFixed(2)}
                  </span>
                  <button style={{
                    padding: 'var(--space-2) var(--space-4)',
                    background: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body-s)',
                    fontWeight: 'var(--font-weight-semibold)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary-hover)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary)';
                    e.currentTarget.style.transform = 'scale(1)';
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
  );
}
