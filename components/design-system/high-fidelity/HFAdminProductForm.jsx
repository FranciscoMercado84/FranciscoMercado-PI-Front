import React, { useState, useEffect, useRef } from 'react';
import { Package, Tag, DollarSign, FileText, Image as ImageIcon, Save, X, Loader, Upload, Trash2 } from 'lucide-react';

// Valores por defecto para un producto nuevo
const defaultFormData = {
  nombre: '',
  categoria: '',
  precio: '',
  descripcion: '',
  disponible: true,
  imagen: '',
  imageFile: null,
  imagePreview: ''
};

export default function HFAdminProductForm({ product, onNavigate, onSubmit, isProcessing = false, categories = [] }) {
  const [formData, setFormData] = useState(defaultFormData);
  const fileInputRef = useRef(null);
  const isEditing = !!product;

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || product.name || '',
        categoria: product.categoria || product.category || '',
        precio: product.precio || product.price || '',
        descripcion: product.descripcion || product.description || '',
        disponible: product.disponible ?? product.available ?? true,
        imagen: product.imagen || product.image || product.imagen_url || '',
        imageFile: null,
        imagePreview: product.imagen || product.image || product.imagen_url || ''
      });
    }
  }, [product]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagePick = (file) => {
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => {
      if (prev.imagePreview && prev.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(prev.imagePreview);
      }

      return {
        ...prev,
        imageFile: file,
        imagePreview: previewUrl
      };
    });
  };

  const handleRemoveImage = () => {
    setFormData((prev) => {
      if (prev.imagePreview && prev.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(prev.imagePreview);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      return {
        ...prev,
        imageFile: null,
        imagePreview: '',
        imagen: ''
      };
    });
  };

  useEffect(() => {
    return () => {
      if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

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
      descripcion: formData.descripcion.trim(),
      disponible: formData.disponible,
      imagen: formData.imagen,
      imageFile: formData.imageFile
    });
  };

  // Categorías por defecto si no se proporcionan (sincronizadas con backend)
  const categoryOptions = categories.length > 0 ? categories : [
    'Despensa y básicos',
    'Conservas y Enlatados',
    'Aceites, Vinagres y Salsas',
    'Bebidas y Bodega',
    'Charcutería',
    'Dulces',
    'Panadería'
  ];

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
                padding: 'var(--space-8)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-secondary)';
                e.currentTarget.style.background = 'var(--color-neutral-100)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                e.currentTarget.style.background = 'transparent';
              }}
              >
                {formData.imagePreview ? (
                  <div style={{ display: 'grid', gap: 'var(--space-3)', justifyItems: 'center' }}>
                    <img
                      src={formData.imagePreview}
                      alt="Vista previa del producto"
                      style={{
                        width: '100%',
                        maxWidth: '320px',
                        height: '220px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-neutral-300)'
                      }}
                    />
                    <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          padding: 'var(--space-2) var(--space-4)',
                          background: 'var(--color-secondary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-lg)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)'
                        }}
                      >
                        <Upload size={16} /> Cambiar imagen
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        style={{
                          padding: 'var(--space-2) var(--space-4)',
                          background: 'white',
                          color: 'var(--color-error)',
                          border: '1px solid var(--color-neutral-300)',
                          borderRadius: 'var(--radius-lg)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)'
                        }}
                      >
                        <Trash2 size={16} /> Quitar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={48} style={{ color: 'var(--color-neutral-300)', marginBottom: 'var(--space-3)' }} />
                    <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)' }}>
                      Haz clic para añadir una imagen
                    </p>
                    <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-neutral-500)', marginTop: 'var(--space-2)' }}>
                      PNG, JPG hasta 5MB
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImagePick(e.target.files?.[0])}
                />
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

              {/* Stock management removed: se gestiona en tienda física */}
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
