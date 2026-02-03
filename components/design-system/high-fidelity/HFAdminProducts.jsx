import React from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

export default function HFAdminProducts({ onNavigate }) {
  const products = [
    { id: 1, name: 'Baguette Francesa', category: 'Pan', price: 3.50, stock: 24, status: 'available' },
    { id: 2, name: 'Croissant Mantequilla', category: 'Pastelería', price: 2.80, stock: 0, status: 'sold-out' },
    { id: 3, name: 'Pan Integral', category: 'Pan', price: 4.20, stock: 15, status: 'available' },
    { id: 4, name: 'Bagel', category: 'Pan', price: 3.00, stock: 8, status: 'available' },
  ];

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-6)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-8)'
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-2)'
          }}>
            Gestión de Productos
          </h1>
          <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)' }}>
            Administra tu inventario de productos
          </p>
        </div>
        <button 
        onClick={() => onNavigate?.('product-form')}
        style={{
          padding: 'var(--space-3) var(--space-6)',
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
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      {/* Search Bar */}
      <div style={{
        background: 'white',
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-neutral-300)',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        gap: 'var(--space-4)'
      }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={20} style={{
            position: 'absolute',
            left: 'var(--space-4)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-neutral-500)'
          }} />
          <input
            type="text"
            placeholder="Buscar productos..."
            style={{
              width: '100%',
              padding: 'var(--space-3) var(--space-3) var(--space-3) var(--space-10)',
              border: '1px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              outline: 'none'
            }}
          />
        </div>
        <select style={{
          padding: 'var(--space-3) var(--space-4)',
          border: '1px solid var(--color-neutral-300)',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--font-size-body-m)',
          cursor: 'pointer'
        }}>
          <option>Todas las Categorías</option>
          <option>Pan</option>
          <option>Pastelería</option>
          <option>Especiales</option>
        </select>
      </div>

      {/* Products Table */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-neutral-300)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-low)'
      }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 150px',
          padding: 'var(--space-4) var(--space-6)',
          background: 'var(--color-neutral-100)',
          borderBottom: '2px solid var(--color-neutral-300)',
          fontSize: 'var(--font-size-body-s)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-neutral-700)'
        }}>
          <div>Producto</div>
          <div>Categoría</div>
          <div>Precio</div>
          <div>Stock</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>

        {/* Table Body */}
        {products.map((product, i) => (
          <div key={product.id} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 150px',
            padding: 'var(--space-5) var(--space-6)',
            borderBottom: i < products.length - 1 ? '1px solid var(--color-neutral-300)' : 'none',
            alignItems: 'center',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-100)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)'
            }}>
              {product.name}
            </div>
            <div style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)' }}>
              {product.category}
            </div>
            <div style={{
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-primary)'
            }}>
              ${product.price.toFixed(2)}
            </div>
            <div style={{
              fontSize: 'var(--font-size-body-m)',
              color: product.stock === 0 ? 'var(--color-error)' : 'var(--color-neutral-900)'
            }}>
              {product.stock}
            </div>
            <div>
              <span style={{
                padding: 'var(--space-1) var(--space-3)',
                background: product.status === 'available' ? 'var(--color-success-light)' : 'var(--color-error-light)',
                color: product.status === 'available' ? 'var(--color-success-dark)' : 'var(--color-error-dark)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-badge)',
                fontWeight: 'var(--font-weight-bold)'
              }}>
                {product.status === 'available' ? 'Disponible' : 'Agotado'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {[
                { icon: Eye, color: 'var(--color-info)', action: null },
                { icon: Edit, color: 'var(--color-primary)', action: () => onNavigate?.('edit-product', product.id) },
                { icon: Trash2, color: 'var(--color-error)', action: null }
              ].map((action, j) => (
                <button 
                key={j} 
                onClick={action.action}
                style={{
                  padding: 'var(--space-2)',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  color: action.color,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = `${action.color}20`}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <action.icon size={18} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
