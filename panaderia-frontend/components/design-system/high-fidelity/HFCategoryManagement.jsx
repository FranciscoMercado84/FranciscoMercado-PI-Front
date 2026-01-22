import React from 'react';
import { Plus, GripVertical, Edit, Trash2, Package } from 'lucide-react';

export default function HFCategoryManagement() {
  const categories = [
    { id: 1, name: 'Pan', products: 12, color: '#D4941C', order: 1 },
    { id: 2, name: 'Pastelería', products: 8, color: '#8B5A3C', order: 2 },
    { id: 3, name: 'Especiales', products: 4, color: '#4A7C59', order: 3 }
  ];

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-6)'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
              Gestión de Categorías
            </h1>
            <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)' }}>
              Organiza tus productos por categorías
            </p>
          </div>
          <button style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-secondary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            boxShadow: 'var(--shadow-medium)'
          }}>
            <Plus size={20} />
            Nueva Categoría
          </button>
        </div>

        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-low)'
        }}>
          {categories.map((category, i) => (
            <div key={category.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              padding: 'var(--space-6)',
              borderBottom: i < categories.length - 1 ? '1px solid var(--color-neutral-300)' : 'none',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-100)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                cursor: 'grab',
                color: 'var(--color-neutral-500)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <GripVertical size={24} />
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-lg)',
                background: category.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: '20px',
                flexShrink: 0
              }}>
                {category.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 'var(--font-size-h6)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-1)'
                }}>
                  {category.name}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-s)',
                  color: 'var(--color-neutral-700)'
                }}>
                  <Package size={14} />
                  {category.products} productos
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: 'var(--color-secondary-light)',
                  color: 'var(--color-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-s)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)'
                }}>
                  <Edit size={16} />
                  Editar
                </button>
                <button style={{
                  padding: 'var(--space-2)',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  color: 'var(--color-error)',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-error-light)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          background: 'var(--color-info-light)',
          border: '1px solid var(--color-info)',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--font-size-body-s)',
          color: 'var(--color-neutral-900)'
        }}>
          💡 <strong>Tip:</strong> Arrastra las categorías para reordenarlas. El orden afectará cómo se muestran en la tienda.
        </div>
      </div>
    </div>
  );
}

