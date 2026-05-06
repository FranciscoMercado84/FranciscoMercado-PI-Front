import React, { useState, useEffect } from 'react';
import { Heart, Minus, Plus, ShoppingCart, Info } from 'lucide-react';

// Producto por defecto cuando no se pasa prop
const defaultProduct = {
  id: 1,
  name: 'Baguette Francesa',
  price: 3.50,
  category: 'Pan',
  description: 'Auténtica baguette francesa con corteza crujiente y miga suave. Horneada diariamente con masa madre y harina de alta calidad. Perfecta para acompañar cualquier comida.',
  ingredients: 'Harina de trigo, agua, sal, levadura natural',
  emoji: '🥖',
  available: true,
  rating: 4.5,
  reviews: 128
};

// Mapa de emojis por categoría (sincronizado con backend)
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

export default function HFProductDetail({ onNavigate, product: propProduct, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Detectar tamaño de pantalla para responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Normalizar el producto
  const rawProduct = propProduct || defaultProduct;

  // Verificar si la imagen es una URL válida
  const rawImage = rawProduct.image || rawProduct.imagen_url || rawProduct.imagen;
  const isValidImageUrl = rawImage && typeof rawImage === 'string' &&
    (rawImage.startsWith('http://') || rawImage.startsWith('https://') || rawImage.startsWith('/'));

  const product = {
    id: rawProduct.id || rawProduct._id,
    name: rawProduct.name || rawProduct.nombre,
    price: rawProduct.price || rawProduct.precio || 0,
    category: rawProduct.category || rawProduct.categoria,
    description: rawProduct.description || rawProduct.descripcion || 'Producto artesanal de alta calidad.',
    ingredients: rawProduct.ingredients || rawProduct.ingredientes,
    image: isValidImageUrl && !imageError ? rawImage : null,
    emoji: rawProduct.emoji || categoryEmojis[rawProduct.category || rawProduct.categoria] || categoryEmojis.default,
    available: rawProduct.available !== undefined ? rawProduct.available : (rawProduct.disponible !== undefined ? rawProduct.disponible : true),
    stock: rawProduct.stock || 100
  };

  const hasRealImage = !!product.image;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id, quantity);
    } else {
      onNavigate?.('cart');
    }
  };

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
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-6)',
          fontSize: 'var(--font-size-body-s)',
          color: 'var(--color-neutral-500)'
        }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('catalog')}>Inicio</span>
          <span>/</span>
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('catalog')}>Productos</span>
          <span>/</span>
          <span style={{ color: 'var(--color-neutral-900)', fontWeight: 'var(--font-weight-medium)' }}>
            {product.name}
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 'var(--space-6)' : 'var(--space-10)'
        }}>
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-6)',
              border: '1px solid var(--color-neutral-300)',
              aspectRatio: '1/1',
              maxHeight: isMobile ? '350px' : '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: hasRealImage ? 'inherit' : '120px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {hasRealImage ? (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <span>{product.emoji}</span>
              )}
              <button style={{
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-full)',
                background: 'white',
                border: '1px solid var(--color-neutral-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-error)',
                transition: 'all 0.2s',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-error)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = 'var(--color-error)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              >
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div style={{
              display: 'inline-block',
              padding: 'var(--space-1) var(--space-3)',
              background: product.available ? 'var(--color-available)' : 'var(--color-error)',
              color: 'white',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-badge)',
              fontWeight: 'var(--font-weight-bold)',
              marginBottom: 'var(--space-4)'
            }}>
              {product.available ? '✓ Disponible' : '✗ No disponible'}
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-3)'
            }}>
              {product.name}
            </h1>

            {/* Categoría */}
            {product.category && (
              <div style={{
                fontSize: 'var(--font-size-body-m)',
                color: 'var(--color-neutral-600)',
                marginBottom: 'var(--space-5)'
              }}>
                Categoría: {product.category}
              </div>
            )}

            {/* Price */}
            <div style={{
              background: 'var(--color-primary-light)',
              padding: 'var(--space-5)',
              borderRadius: 'var(--radius-xl)',
              marginBottom: 'var(--space-6)'
            }}>
              <div style={{
                fontSize: 'var(--font-size-h1)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-primary)'
              }}>
                ${product.price.toFixed(2)}
              </div>
              <div style={{
                fontSize: 'var(--font-size-body-s)',
                color: 'var(--color-neutral-700)',
                marginTop: 'var(--space-1)'
              }}>
                Precio por unidad
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <h3 style={{
                fontSize: 'var(--font-size-h6)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-3)'
              }}>
                Descripción
              </h3>
              <p style={{
                fontSize: 'var(--font-size-body-m)',
                color: 'var(--color-neutral-700)',
                lineHeight: 1.6,
                marginBottom: 'var(--space-4)'
              }}>
                {product.description}
              </p>
              {product.ingredients && (
                <div style={{
                  background: 'var(--color-info-light)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-info)',
                  display: 'flex',
                  gap: 'var(--space-3)',
                  alignItems: 'start'
                }}>
                  <Info size={20} style={{ color: 'var(--color-info-dark)', flexShrink: 0, marginTop: '2px' }} />
                  <div style={{
                    fontSize: 'var(--font-size-body-s)',
                    color: 'var(--color-neutral-900)',
                    lineHeight: 1.5
                  }}>
                    <strong>Ingredientes:</strong> {product.ingredients}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{
                display: 'block',
                fontSize: 'var(--font-size-body-m)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-3)'
              }}>
                Cantidad
              </label>
              <div style={{
                display: 'inline-flex',
                background: 'white',
                border: '2px solid var(--color-neutral-300)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-neutral-700)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-100)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Minus size={20} />
                </button>
                <div style={{
                  padding: 'var(--space-3) var(--space-6)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-h6)',
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: '60px',
                  justifyContent: 'center'
                }}>
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-neutral-700)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-100)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
            onClick={handleAddToCart}
            disabled={!product.available}
            style={{
              width: '100%',
              padding: 'var(--space-4)',
              background: product.available ? 'var(--color-primary)' : 'var(--color-neutral-400)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-h6)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: product.available ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-3)',
              boxShadow: product.available ? 'var(--shadow-medium)' : 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (product.available) {
                e.currentTarget.style.background = 'var(--color-primary-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-high)';
              }
            }}
            onMouseLeave={(e) => {
              if (product.available) {
                e.currentTarget.style.background = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
              }
            }}
            >
              <ShoppingCart size={24} />
              Agregar al Carrito - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
