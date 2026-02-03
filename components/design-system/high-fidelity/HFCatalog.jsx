import React from 'react';
import { Search, SlidersHorizontal, ShoppingCart } from 'lucide-react';

export default function HFCatalog({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const products = Array(9).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    price: (5 + i * 2).toFixed(2),
    emoji: ['🍞', '🥐', '🎂', '🍪', '🥖', '🧁', '🥯', '🥨', '🍩'][i]
  }));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-neutral-50)' }}>
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--color-neutral-300)',
        padding: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-md)', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? 'var(--font-size-h5)' : 'var(--font-size-h4)',
            color: 'var(--color-primary)',
            margin: 0
          }}>
            🥖 Panadería
          </h1>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCart size={20} />
            {!isMobile && <span>Carrito (3)</span>}
          </button>
        </div>
      </header>

      <div style={{ padding: isMobile ? 'var(--spacing-md)' : 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ fontSize: isMobile ? 'var(--font-size-h4)' : 'var(--font-size-h2)', margin: 0, marginBottom: 'var(--spacing-lg)' }}>
            Catálogo de Productos
          </h2>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="text" className="input" placeholder="Buscar productos..." style={{ paddingLeft: '44px' }} />
              <Search size={20} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-neutral-500)'
              }} />
            </div>
            <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={20} />
              {!isMobile && <span>Filtros</span>}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            {['Todos', 'Pan', 'Bollería', 'Tartas', 'Galletas'].map((cat, i) => (
              <button key={i} className={i === 0 ? 'btn btn-primary' : 'btn btn-ghost'} style={{ fontSize: 'var(--font-size-body-s)' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : viewport === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: 'var(--spacing-lg)'
        }}>
          {products.map((product) => (
            <div key={product.id} className="card" style={{ overflow: 'hidden', padding: 0 }}>
              <div style={{
                background: 'var(--color-neutral-200)',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px'
              }}>
                {product.emoji}
              </div>
              <div style={{ padding: 'var(--spacing-lg)' }}>
                <h3 style={{ fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-semibold)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: 'var(--font-size-h5)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)', margin: 0, marginBottom: 'var(--spacing-md)' }}>
                  ${product.price}
                </p>
                <button className="btn btn-primary" style={{ width: '100%' }}>Añadir al carrito</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

