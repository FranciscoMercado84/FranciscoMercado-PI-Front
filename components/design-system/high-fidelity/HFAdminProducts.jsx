import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, AlertTriangle } from 'lucide-react';

// Datos mock por defecto
const defaultProducts = [
  { id: 1, name: 'Baguette Francesa', category: 'Panadería', price: 3.50, stock: 24, stock_minimo: 10, status: 'available' },
  { id: 2, name: 'Croissant Mantequilla', category: 'Panadería', price: 2.80, stock: 0, stock_minimo: 10, status: 'sold-out' },
  { id: 3, name: 'Pan Integral', category: 'Panadería', price: 4.20, stock: 15, stock_minimo: 10, status: 'available' },
  { id: 4, name: 'Bagel', category: 'Panadería', price: 3.00, stock: 5, stock_minimo: 10, status: 'low-stock' },
];

export default function HFAdminProducts({ products: propProducts, onNavigate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Normalizar productos del backend
  const normalizeProduct = (p) => {
    const stock = p.stock ?? p.inventario ?? 0;
    const stockMinimo = p.stock_minimo ?? 10;
    
    // Determinar estado del inventario
    let status = 'available';
    if (stock === 0) {
      status = 'sold-out';
    } else if (stock <= stockMinimo) {
      status = 'low-stock';
    }

    return {
      id: p.id || p._id,
      name: p.name || p.nombre,
      category: p.category || p.categoria || 'Sin categoría',
      price: p.price || p.precio || 0,
      stock: stock,
      stock_minimo: stockMinimo,
      status: p.estado_inventario || status,
      image: p.image || p.imagen || p.imagen_url
    };
  };

  const rawProducts = propProducts || defaultProducts;
  const products = rawProducts.map(normalizeProduct);

  // Obtener categorías únicas
  const categories = [...new Set(products.map(p => p.category))];

  // Filtrar productos
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
          padding: 'var(--space-3) var(--space-4)',
          border: '1px solid var(--color-neutral-300)',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--font-size-body-m)',
          cursor: 'pointer'
        }}>
          <option value="all">Todas las Categorías</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
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
        {filteredProducts.map((product, i) => (
          <div key={product.id} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 150px',
            padding: 'var(--space-5) var(--space-6)',
            borderBottom: i < filteredProducts.length - 1 ? '1px solid var(--color-neutral-300)' : 'none',
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
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--font-size-body-m)',
              color: product.stock === 0 
                ? 'var(--color-error)' 
                : product.status === 'low-stock' || product.status === 'bajo'
                  ? 'var(--color-warning-dark)'
                  : 'var(--color-neutral-900)'
            }}>
              {(product.status === 'low-stock' || product.status === 'bajo') && (
                <AlertTriangle size={16} style={{ color: 'var(--color-warning)' }} />
              )}
              {product.stock}
            </div>
            <div>
              <span style={{
                padding: 'var(--space-1) var(--space-3)',
                background: product.status === 'available' || product.status === 'disponible'
                  ? 'var(--color-success-light)' 
                  : product.status === 'low-stock' || product.status === 'bajo'
                    ? 'var(--color-warning-light)'
                    : 'var(--color-error-light)',
                color: product.status === 'available' || product.status === 'disponible'
                  ? 'var(--color-success-dark)' 
                  : product.status === 'low-stock' || product.status === 'bajo'
                    ? 'var(--color-warning-dark)'
                    : 'var(--color-error-dark)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-badge)',
                fontWeight: 'var(--font-weight-bold)'
              }}>
                {product.status === 'available' || product.status === 'disponible' 
                  ? 'Disponible' 
                  : product.status === 'low-stock' || product.status === 'bajo'
                    ? 'Stock Bajo'
                    : 'Agotado'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {[
                { icon: Eye, color: 'var(--color-info)', action: () => onNavigate?.('view-product', product.id) },
                { icon: Edit, color: 'var(--color-primary)', action: () => onNavigate?.('edit-product', product.id) },
                { icon: Trash2, color: 'var(--color-error)', action: () => onDelete?.(product.id) }
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
