import React, { useState, useEffect } from 'react';
import { Package, Tag, DollarSign, Hash, FileText, Image as ImageIcon, Save, X, Loader, AlertTriangle } from 'lucide-react';

// Valores por defecto para un producto nuevo
const defaultFormData = {
  nombre: '',
  categoria: '',
  precio: '',
  stock: '',
  stock_minimo: '10',
  descripcion: '',
  disponible: true,
  imagen: ''
};

export default function HFAdminProductForm({ product, onNavigate, onSubmit, isProcessing = false, categories = [] }) {
  const [formData, setFormData] = useState(defaultFormData);
  const isEditing = !!product;

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || product.name || '',
        categoria: product.categoria || product.category || '',
        precio: product.precio || product.price || '',
        stock: product.stock ?? product.inventario ?? '',
        stock_minimo: product.stock_minimo ?? 10,
        descripcion: product.descripcion || product.description || '',
        disponible: product.disponible ?? product.available ?? true,
        imagen: product.imagen || product.image || ''
      });
    }
  }, [product]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validación básica
    if (!formData.nombre.trim()) {
      alert('El nombre del producto es requerido');
      return;
    }
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }

    onSubmit?.({
      nombre: formData.nombre.trim(),
      categoria: formData.categoria || 'General',
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock) || 0,
      stock_minimo: parseInt(formData.stock_minimo) || 10,
      descripcion: formData.descripcion.trim(),
      disponible: formData.disponible,
      imagen: formData.imagen
    });
  };

  // Categorías por defecto si no se proporcionan
  const categoryOptions = categories.length > 0 ? categories : ['Pan', 'Pastelería', 'Especiales', 'Bebidas'];

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
          {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>
        <p style={{
          fontSize: 'var(--font-size-body-m)',
          color: 'var(--color-neutral-700)',
          marginBottom: 'var(--space-8)'
        }}>
          {isEditing ? 'Modifica los datos del producto' : 'Agrega un nuevo producto al catálogo'}
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
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
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
                <select 
                  value={formData.categoria}
                  onChange={(e) => handleChange('categoria', e.target.value)}
                  style={{
                  width: '100%',
                  padding: 'var(--space-3) var(--space-4)',
                  border: '2px solid var(--color-neutral-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-m)',
                  outline: 'none',
                  cursor: 'pointer',
                  background: 'white'
                }}>
                  <option value="">Selecciona una categoría...</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
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
                  value={formData.precio}
                  onChange={(e) => handleChange('precio', e.target.value)}
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
                  value={formData.stock}
                  onChange={(e) => handleChange('stock', e.target.value)}
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
                  <AlertTriangle size={18} style={{ color: 'var(--color-warning)' }} />
                  Stock Mínimo (Alerta)
                </label>
                <input
                  type="number"
                  placeholder="10"
                  value={formData.stock_minimo}
                  onChange={(e) => handleChange('stock_minimo', e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    border: '2px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body-m)',
                    outline: 'none'
                  }}
                />
                <p style={{
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-neutral-500)',
                  marginTop: 'var(--space-1)'
                }}>
                  Se mostrará alerta cuando el stock sea menor a este valor
                </p>
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
                value={formData.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
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
                <input 
                  type="checkbox" 
                  checked={formData.disponible}
                  onChange={(e) => handleChange('disponible', e.target.checked)}
                  style={{ cursor: 'pointer' }} 
                />
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
            <button 
            onClick={() => onNavigate?.('products')}
            disabled={isProcessing}
            style={{
              padding: 'var(--space-4)',
              background: 'white',
              border: '2px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              transition: 'all 0.2s',
              opacity: isProcessing ? 0.6 : 1
            }}
            onMouseEnter={(e) => !isProcessing && (e.currentTarget.style.borderColor = 'var(--color-neutral-500)')}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-neutral-300)'}
            >
              <X size={20} />
              Cancelar
            </button>
            <button 
            onClick={handleSubmit}
            disabled={isProcessing}
            style={{
              padding: 'var(--space-4)',
              background: isProcessing ? 'var(--color-neutral-400)' : 'var(--color-secondary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              boxShadow: 'var(--shadow-medium)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!isProcessing) {
                e.currentTarget.style.background = 'var(--color-secondary-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-high)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing) {
                e.currentTarget.style.background = 'var(--color-secondary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
              }
            }}
            >
              {isProcessing ? <Loader size={20} className="animate-spin" /> : <Save size={20} />}
              {isProcessing ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Guardar Producto')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
