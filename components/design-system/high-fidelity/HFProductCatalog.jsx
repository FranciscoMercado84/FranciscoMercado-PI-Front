import React, { useMemo, useState } from 'react';
import HFFooter from './HFFooter';
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react';

// Productos de ejemplo para cuando no se pasen props (sincronizados con backend)
const defaultProducts = [
  { id: 1, name: 'Baguette Francesa', price: 3.50, category: 'Panadería', emoji: '🥖', badge: 'Popular' },
  { id: 2, name: 'Croissant Mantequilla', price: 2.80, category: 'Panadería', emoji: '🥐', badge: 'Nuevo' },
  { id: 3, name: 'Pan Integral', price: 4.20, category: 'Panadería', emoji: '🍞', badge: null },
  { id: 4, name: 'Bagel', price: 3.00, category: 'Panadería', emoji: '🥯', badge: null },
  { id: 5, name: 'Pan de Ajo', price: 4.50, category: 'Panadería', emoji: '🧄', badge: 'Popular' },
  { id: 6, name: 'Donut', price: 2.50, category: 'Dulces', emoji: '🍩', badge: null },
  { id: 7, name: 'Pretzel', price: 3.20, category: 'Panadería', emoji: '🥨', badge: null },
  { id: 8, name: 'Pan Dulce', price: 2.90, category: 'Dulces', emoji: '🧁', badge: 'Nuevo' },
];

// Mapa de emojis por categoría para productos sin imagen (sincronizado con backend)
const categoryEmojis = {
  'Despensa y básicos': '🧂',
  'Conservas y Enlatados': '🥫',
  'Aceites, Vinagres y Salsas': '🍶',
  'Bebidas y Bodega': '🍷',
  'Charcutería': '🥓',
  'Dulces': '🍰',
  'Panadería': '🥖',
  'Pan': '🍞',  // Para compatibilidad con datos antiguos
  'Pastelería': '🥐',  // Para compatibilidad con datos antiguos
  'Especiales': '🧄',  // Para compatibilidad con datos antiguos
  'Bebidas': '☕',  // Para compatibilidad con datos antiguos
  'Postres': '🍰',  // Para compatibilidad con datos antiguos
  'default': '🥯'
};

export default function HFProductCatalog({
  onNavigate,
  products: propProducts,
  onAddToCart,
  categories = [],
  searchTerm = '',
  selectedCategory = '',
  sortOption = '',
  filtersOpen = false,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onToggleFilters,
  onResetFilters
}) {
  const [viewMode, setViewMode] = useState('grid');

  // Usar productos de props o los por defecto
  const products = propProducts && propProducts.length > 0 ? propProducts : defaultProducts;

  const categoryOptions = useMemo(() => {
    const baseCategories = products
      .map((product) => product.category || product.categoria)
      .filter(Boolean);

    return Array.from(new Set([...categories, ...baseCategories, selectedCategory].filter(Boolean)))
      .sort((a, b) => a.localeCompare(b, 'es'));
  }, [categories, products, selectedCategory]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const name = (product.name || product.nombre || '').toLowerCase();
      const category = product.category || product.categoria || '';
      const matchesSearch = !normalizedSearch || name.includes(normalizedSearch);
      const matchesCategory = !selectedCategory || category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (!sortOption) {
      return filtered;
    }

    const sorted = [...filtered];

    if (sortOption === 'precio') {
      return sorted.sort((a, b) => (a.price || a.precio || 0) - (b.price || b.precio || 0));
    }

    if (sortOption === 'mas-vendidos') {
      return sorted.sort((a, b) => (b.ventas_totales || b.ventas || 0) - (a.ventas_totales || a.ventas || 0));
    }

    if (sortOption === 'nuevos') {
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.fecha_creacion || 0).getTime();
        const dateB = new Date(b.createdAt || b.fecha_creacion || 0).getTime();
        return dateB - dateA;
      });
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortOption]);

  // Helper para obtener el emoji del producto
  const getProductEmoji = (product) => {
    if (product.emoji) return product.emoji;
    const category = product.category || product.categoria || 'default';
    return categoryEmojis[category] || categoryEmojis.default;
  };

  // Helper para obtener propiedades del producto (normalizar estructura)
  const getProductProps = (product) => ({
    id: product.id || product._id,
    name: product.name || product.nombre,
    price: product.price || product.precio,
    category: product.category || product.categoria,
    description: product.description || product.descripcion,
    image: product.image || product.imagen_url || product.imagen,
    emoji: getProductEmoji(product),
    badge: product.badge || product.etiqueta,
  });

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
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
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
          <select 
            value={selectedCategory}
            onChange={(e) => onCategoryChange?.(e.target.value)}
            style={{
              padding: 'var(--space-3) var(--space-4)',
              border: '1px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              background: 'white',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-neutral-900)'
            }}
          >
            <option value="">Todas las Categorías</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Filter Button */}
          <button
            type="button"
            onClick={() => onToggleFilters?.()}
            aria-pressed={filtersOpen}
            style={{
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
            {filtersOpen ? 'Ocultar filtros' : 'Filtros'}
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

        {filtersOpen && (
          <div style={{
            background: 'white',
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            marginBottom: 'var(--space-6)',
            boxShadow: 'var(--shadow-low)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-4)',
              flexWrap: 'wrap'
            }}>
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: 'var(--font-size-body-l)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-neutral-900)'
                }}>
                  Ordenación y filtros
                </h3>
                <p style={{
                  margin: 'var(--space-1) 0 0',
                  fontSize: 'var(--font-size-body-s)',
                  color: 'var(--color-neutral-700)'
                }}>
                  Ajusta el catálogo con una búsqueda rápida y el orden que prefieras.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onResetFilters?.()}
                style={{
                  padding: 'var(--space-3) var(--space-5)',
                  background: 'var(--color-neutral-50)',
                  border: '1px solid var(--color-neutral-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Limpiar filtros
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, 320px) auto',
              gap: 'var(--space-4)',
              alignItems: 'end'
            }}>
              <div style={{ minWidth: 0 }}>
              <label style={{
                display: 'block',
                fontSize: 'var(--font-size-body-s)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-neutral-700)',
                marginBottom: 'var(--space-2)'
              }}>
                Ordenar por
              </label>
              <select
                value={sortOption}
                onChange={(e) => onSortChange?.(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3) var(--space-4)',
                  border: '1px solid var(--color-neutral-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-m)',
                  background: 'white',
                  cursor: 'pointer',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)'
                }}
              >
                <option value="">Sin ordenar</option>
                <option value="mas-vendidos">Más vendidos</option>
                <option value="precio">Precio</option>
                <option value="nuevos">Nuevos</option>
              </select>
              </div>

              <div style={{ minWidth: 0 }}>
                <label style={{
                  display: 'block',
                  fontSize: 'var(--font-size-body-s)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-700)',
                  marginBottom: 'var(--space-2)'
                }}>
                  Categoría activa
                </label>
                <div style={{
                  minHeight: '48px',
                  padding: '0 var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-neutral-200)',
                  background: 'var(--color-neutral-50)',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--color-neutral-700)',
                  fontSize: 'var(--font-size-body-m)'
                }}>
                  {selectedCategory || 'Todas las categorías'}
                </div>
              </div>

              <div style={{ minWidth: '140px' }}>
                <label style={{
                  display: 'block',
                  fontSize: 'var(--font-size-body-s)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-700)',
                  marginBottom: 'var(--space-2)',
                  opacity: 0
                }}>
                  Acciones
                </label>
                <button
                  type="button"
                  onClick={() => onToggleFilters?.()}
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '0 var(--space-4)',
                    background: 'white',
                    border: '1px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body-m)',
                    fontWeight: 'var(--font-weight-medium)',
                    cursor: 'pointer'
                  }}
                >
                  Ocultar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' 
            ? 'repeat(auto-fill, minmax(280px, 1fr))' 
            : '1fr',
          gap: 'var(--space-5)'
        }}>
          {filteredProducts.map(product => {
            const p = getProductProps(product);
            return (
              <div
                key={p.id}
                onClick={() => onNavigate?.('product-detail', p.id)}
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
                  flexShrink: 0,
                  overflow: 'hidden'
                }}>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: 'var(--space-3)',
                        background: 'white'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span style={{ display: p.image ? 'none' : 'flex' }}>{p.emoji}</span>
                  {p.badge && (
                    <div style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      right: 'var(--space-3)',
                      padding: 'var(--space-1) var(--space-3)',
                      background: p.badge === 'Nuevo' ? 'var(--color-new)' : 'var(--color-primary)',
                      color: 'white',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--font-size-badge)',
                      fontWeight: 'var(--font-weight-bold)'
                    }}>
                      {p.badge}
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
                      {p.category}
                    </div>
                    <h3 style={{
                      fontSize: 'var(--font-size-h6)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-neutral-900)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      {p.name}
                    </h3>
                    <p style={{
                      fontSize: 'var(--font-size-body-s)',
                      color: 'var(--color-neutral-700)',
                      marginBottom: 'var(--space-4)',
                      lineHeight: 1.5
                    }}>
                      {p.description || 'Producto artesanal de alta calidad'}
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
                      ${(p.price || 0).toFixed(2)}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart?.(p.id);
                      }}
                      style={{
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
