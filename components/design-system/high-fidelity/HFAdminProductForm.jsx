import React from 'react';
import { Package, Tag, DollarSign, Hash, FileText, Image as ImageIcon, Save, X } from 'lucide-react';

export default function HFAdminProductForm({ onNavigate }) {
  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-6)'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--font-size-h2)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-neutral-900)',
          marginBottom: 'var(--space-2)'
        }}>
          Nuevo Producto
        </h1>
        <p style={{
          fontSize: 'var(--font-size-body-m)',
          color: 'var(--color-neutral-700)',
          marginBottom: 'var(--space-8)'
        }}>
          Agrega un nuevo producto al catálogo
        </p>

        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
            {/* Product Image */}
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--font-size-body-m)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-3)'
              }}>
                <ImageIcon size={18} style={{ color: 'var(--color-secondary)' }} />
                Imagen del Producto
              </label>
              <div style={{
                border: '2px dashed var(--color-neutral-300)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-10)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-secondary)';
                e.currentTarget.style.background = 'var(--color-neutral-100)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                e.currentTarget.style.background = 'transparent';
              }}
              >
                <ImageIcon size={48} style={{ color: 'var(--color-neutral-300)', marginBottom: 'var(--space-3)' }} />
                <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)' }}>
                  Haz clic o arrastra una imagen aquí
                </p>
                <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-neutral-500)', marginTop: 'var(--space-2)' }}>
                  PNG, JPG hasta 5MB
                </p>
              </div>
            </div>

            {/* Basic Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-5)'
            }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <Package size={18} style={{ color: 'var(--color-secondary)' }} />
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  placeholder="Ej: Baguette Francesa"
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    border: '2px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body-m)',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-secondary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 90, 60, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <Tag size={18} style={{ color: 'var(--color-secondary)' }} />
                  Categoría
                </label>
                <select style={{
                  width: '100%',
                  padding: 'var(--space-3) var(--space-4)',
                  border: '2px solid var(--color-neutral-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-m)',
                  outline: 'none',
                  cursor: 'pointer',
                  background: 'white'
                }}>
                  <option>Selecciona una categoría...</option>
                  <option>Pan</option>
                  <option>Pastelería</option>
                  <option>Especiales</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <DollarSign size={18} style={{ color: 'var(--color-secondary)' }} />
                  Precio
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    border: '2px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body-m)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <Hash size={18} style={{ color: 'var(--color-secondary)' }} />
                  Stock Inicial
                </label>
                <input
                  type="number"
                  placeholder="0"
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    border: '2px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body-m)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--font-size-body-m)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-2)'
              }}>
                <FileText size={18} style={{ color: 'var(--color-secondary)' }} />
                Descripción
              </label>
              <textarea
                rows={4}
                placeholder="Describe el producto..."
                style={{
                  width: '100%',
                  padding: 'var(--space-3) var(--space-4)',
                  border: '2px solid var(--color-neutral-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-m)',
                  outline: 'none',
                  fontFamily: 'var(--font-primary)',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Availability */}
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                fontSize: 'var(--font-size-body-m)',
                cursor: 'pointer'
              }}>
                <input type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
                <span style={{ fontWeight: 'var(--font-weight-medium)' }}>
                  Producto disponible para la venta
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-8)',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-neutral-300)'
          }}>
            <button style={{
              padding: 'var(--space-4)',
              background: 'white',
              border: '2px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-neutral-500)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-neutral-300)'}
            >
              <X size={20} />
              Cancelar
            </button>
            <button style={{
              padding: 'var(--space-4)',
              background: 'var(--color-secondary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              boxShadow: 'var(--shadow-medium)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-secondary-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-high)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
            }}
            >
              <Save size={20} />
              Guardar Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
