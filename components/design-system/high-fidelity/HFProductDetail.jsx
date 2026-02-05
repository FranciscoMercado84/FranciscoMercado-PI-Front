import React, { useState } from 'react';
import HFFooter from './HFFooter';
import { Star, Heart, Minus, Plus, ShoppingCart, Info } from 'lucide-react';

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

// Mapa de emojis por categoría
const categoryEmojis = {
  'Pan': '🍞',
  'Panadería': '🥖',
  'Pastelería': '🥐',
  'Especiales': '🧄',
  'Bebidas': '☕',
  'Postres': '🍰',
  'default': '🥯'
};

export default function HFProductDetail({ onNavigate, product: propProduct, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Normalizar el producto
  const rawProduct = propProduct || defaultProduct;
  const product = {
    id: rawProduct.id || rawProduct._id,
    name: rawProduct.name || rawProduct.nombre,
    price: rawProduct.price || rawProduct.precio || 0,
    category: rawProduct.category || rawProduct.categoria,
    description: rawProduct.description || rawProduct.descripcion || 'Producto artesanal de alta calidad.',
    ingredients: rawProduct.ingredients || rawProduct.ingredientes,
    image: rawProduct.image || rawProduct.imagen_url || rawProduct.imagen,
    emoji: rawProduct.emoji || categoryEmojis[rawProduct.category || rawProduct.categoria] || categoryEmojis.default,
    available: rawProduct.available !== undefined ? rawProduct.available : (rawProduct.disponible !== undefined ? rawProduct.disponible : true),
    rating: rawProduct.rating || rawProduct.calificacion || 4.5,
    reviews: rawProduct.reviews || rawProduct.resenas || 0,
    stock: rawProduct.stock || 100
  };

  const images = product.image ? [product.image] : [product.emoji, product.emoji, product.emoji, product.emoji];
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
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-10)'
        }}>
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8)',
              border: '1px solid var(--color-neutral-300)',
              marginBottom: 'var(--space-4)',
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: hasRealImage ? 'inherit' : '180px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {hasRealImage ? (
                <img 
                  src={images[selectedImage]} 
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                images[selectedImage]
              )}
              <button style={{
                position: 'absolute',
                top: 'var(--space-5)',
                right: 'var(--space-5)',
                width: '48px',
                height: '48px',
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

            {/* Thumbnails */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-3)'
            }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  style={{
                    aspectRatio: '1/1',
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    border: selectedImage === i 
                      ? '2px solid var(--color-primary)' 
                      : '1px solid var(--color-neutral-300)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedImage !== i) {
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedImage !== i) {
                      e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                    }
                  }}
                >
                  {img}
                </div>
              ))}
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

            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-5)'
            }}>
              <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star
                    key={i}
                    size={20}
                    fill={i <= 4 ? 'var(--color-new)' : 'none'}
                    stroke={i <= 4 ? 'var(--color-new)' : 'var(--color-neutral-300)'}
                  />
                ))}
              </div>
              <span style={{
                fontSize: 'var(--font-size-body-s)',
                color: 'var(--color-neutral-700)'
              }}>
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

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
