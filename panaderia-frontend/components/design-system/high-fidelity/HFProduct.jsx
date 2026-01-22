import React from 'react';
import { ShoppingCart, Heart, Share2, Minus, Plus } from 'lucide-react';

export default function HFProduct({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-neutral-50)' }}>
      <header style={{ background: 'white', borderBottom: '1px solid var(--color-neutral-300)', padding: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 'var(--font-size-h5)' : 'var(--font-size-h4)', color: 'var(--color-primary)', margin: 0 }}>
            🥖 Panadería
          </h1>
        </div>
      </header>

      <div style={{ padding: isMobile ? 'var(--spacing-md)' : 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'var(--spacing-2xl)' }}>
          <div>
            <div style={{
              background: 'var(--color-neutral-200)',
              borderRadius: 'var(--radius-xl)',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '120px',
              marginBottom: 'var(--spacing-lg)'
            }}>
              🥐
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--color-neutral-200)',
                  borderRadius: 'var(--radius-md)',
                  border: i === 1 ? '2px solid var(--color-primary)' : '1px solid var(--color-neutral-300)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '32px'
                }}>
                  🥐
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="badge badge-primary" style={{ marginBottom: 'var(--spacing-sm)' }}>POPULAR</span>
            <h1 style={{ fontSize: isMobile ? 'var(--font-size-h3)' : 'var(--font-size-h2)', margin: 0, marginBottom: 'var(--spacing-md)' }}>
              Croissant de Mantequilla
            </h1>
            <p style={{ fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)', margin: 0, marginBottom: 'var(--spacing-lg)' }}>
              $3.50
            </p>

            <div style={{ marginBottom: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-neutral-300)' }}>
              <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)', lineHeight: '1.6' }}>
                Delicioso croissant hojaldrado elaborado con mantequilla fresca de alta calidad. Horneado diariamente en nuestro obrador para garantizar la mejor textura y sabor.
              </p>
            </div>

            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)' }}>
                Ingredientes
              </h3>
              <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-700)' }}>
                Harina de trigo, mantequilla (25%), agua, azúcar, levadura, sal, huevo
              </p>
            </div>

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <label className="label" style={{ marginBottom: 'var(--spacing-md)' }}>Cantidad</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                <button
                  className="btn btn-ghost"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '48px', height: '48px', padding: 0 }}
                >
                  <Minus size={20} />
                </button>
                <span style={{ fontSize: 'var(--font-size-h4)', fontWeight: 'var(--font-weight-bold)', minWidth: '48px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  className="btn btn-ghost"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '48px', height: '48px', padding: 0 }}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              <button className="btn btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <ShoppingCart size={20} />
                Añadir al carrito
              </button>
              <button className="btn btn-ghost" style={{ width: '48px', height: '48px', padding: 0 }}>
                <Heart size={20} />
              </button>
              <button className="btn btn-ghost" style={{ width: '48px', height: '48px', padding: 0 }}>
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

