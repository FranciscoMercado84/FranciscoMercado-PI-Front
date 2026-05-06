import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ArrowRight, Tag, RefreshCw, ShoppingBag } from 'lucide-react';

// Items por defecto cuando no se pasan props
const defaultCartItems = [
  { id: 1, name: 'Baguette Francesa', price: 3.50, quantity: 2, emoji: '🥖' },
  { id: 2, name: 'Croissant Mantequilla', price: 2.80, quantity: 3, emoji: '🥐' },
  { id: 3, name: 'Pan Integral', price: 4.20, quantity: 1, emoji: '🍞' },
];

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
  'default': '🥯'
};

export default function HFCart({
  onNavigate,
  cart: propCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  frecuentProducts = [],
  onAddFrequentProduct,
  isAuthenticated = false
}) {
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamaño de pantalla para responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // Normalizar items del carrito
  const normalizeCartItem = (item) => {
    const producto = item.producto || item;
    return {
      id: item.id || item._id,
      productoId: producto._id || producto.id || item.productoId,
      name: producto.name || producto.nombre || item.name || item.nombre,
      price: producto.price || producto.precio || item.price || item.precio || 0,
      quantity: item.quantity || item.cantidad || 1,
      image: producto.image || producto.imagen_url || producto.imagen || item.image,
      emoji: producto.emoji || categoryEmojis[producto.category || producto.categoria] || categoryEmojis.default,
      description: producto.description || producto.descripcion || item.description
    };
  };

  // Usar carrito de props o el por defecto
  const rawItems = propCart?.items || propCart?.productos || propCart || defaultCartItems;
  const cartItems = Array.isArray(rawItems) ? rawItems.map(normalizeCartItem) : [];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) {
      if (onRemoveItem) {
        onRemoveItem(item.id);
      }
    } else if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQuantity);
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
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--font-size-h2)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-neutral-900)',
          marginBottom: 'var(--space-2)'
        }}>
          Carrito de Compras
        </h1>
        <p style={{
          fontSize: 'var(--font-size-body-m)',
          color: 'var(--color-neutral-700)',
          marginBottom: 'var(--space-8)'
        }}>
          {cartItems.length} producto{cartItems.length !== 1 ? 's' : ''} en tu carrito
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 450px',
          gap: 'var(--space-6)',
          alignItems: 'start'
        }}>
          {/* Cart Items */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-neutral-300)',
              overflow: 'hidden'
            }}>
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    padding: 'var(--space-5)',
                    borderBottom: index < cartItems.length - 1 ? '1px solid var(--color-neutral-300)' : 'none',
                    display: 'flex',
                    gap: 'var(--space-5)',
                    alignItems: 'center'
                  }}
                >
                  {/* Product Image */}
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'var(--color-neutral-200)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    flexShrink: 0,
                    overflow: 'hidden'
                  }}>
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      item.emoji
                    )}
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: 'var(--font-size-h6)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-neutral-900)',
                      marginBottom: 'var(--space-1)'
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontSize: 'var(--font-size-body-s)',
                      color: 'var(--color-neutral-700)',
                      marginBottom: 'var(--space-3)'
                    }}>
                      {item.description || 'Producto artesanal'}
                    </p>
                    <div style={{
                      fontSize: 'var(--font-size-h6)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--color-primary)'
                    }}>
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    background: 'var(--color-neutral-100)',
                    border: '2px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden'
                  }}>
                    <button 
                    onClick={() => handleQuantityChange(item, -1)}
                    style={{
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-neutral-700)',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <Minus size={18} />
                    </button>
                    <div style={{
                      padding: 'var(--space-2) var(--space-4)',
                      fontWeight: 'var(--font-weight-semibold)',
                      minWidth: '40px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.quantity}
                    </div>
                    <button 
                    onClick={() => handleQuantityChange(item, 1)}
                    style={{
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-neutral-700)',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div style={{
                    fontSize: 'var(--font-size-h5)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-neutral-900)',
                    minWidth: '80px',
                    textAlign: 'right'
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove Button */}
                  <button 
                  onClick={() => onRemoveItem?.(item.id)}
                  style={{
                    padding: 'var(--space-2)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-error)',
                    transition: 'all 0.2s',
                    borderRadius: 'var(--radius-lg)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-error-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <button style={{
              marginTop: 'var(--space-5)',
              padding: 'var(--space-3) var(--space-5)',
              background: 'white',
              border: '2px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-neutral-900)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => onNavigate?.('catalog')}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
              e.currentTarget.style.color = 'var(--color-neutral-900)';
            }}
            >
              ← Continuar Comprando
            </button>

            {/* Sección Pedir de Nuevo - Productos Frecuentes */}
            {isAuthenticated && frecuentProducts.length > 0 && (
              <div style={{
                marginTop: 'var(--space-6)',
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-neutral-300)',
                padding: 'var(--space-5)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-4)'
                }}>
                  <RefreshCw size={20} style={{ color: 'var(--color-primary)' }} />
                  <h3 style={{
                    fontSize: 'var(--font-size-h6)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-neutral-900)',
                    margin: 0
                  }}>
                    Pedir de Nuevo
                  </h3>
                </div>
                <p style={{
                  fontSize: 'var(--font-size-body-s)',
                  color: 'var(--color-neutral-700)',
                  marginBottom: 'var(--space-4)'
                }}>
                  Productos que has pedido anteriormente
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: 'var(--space-3)'
                }}>
                  {frecuentProducts.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      style={{
                        background: 'var(--color-neutral-50)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-3)',
                        textAlign: 'center',
                        border: '1px solid var(--color-neutral-200)',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-neutral-200)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{
                        width: '50px',
                        height: '50px',
                        margin: '0 auto var(--space-2)',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--color-neutral-200)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}>
                        {product.imagen ? (
                          <img
                            src={product.imagen}
                            alt={product.nombre}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        ) : (
                          <ShoppingBag size={24} style={{ color: 'var(--color-neutral-500)' }} />
                        )}
                      </div>
                      <p style={{
                        fontSize: 'var(--font-size-body-s)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--color-neutral-900)',
                        marginBottom: 'var(--space-1)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {product.nombre}
                      </p>
                      <p style={{
                        fontSize: 'var(--font-size-caption)',
                        color: 'var(--color-neutral-500)',
                        marginBottom: 'var(--space-2)'
                      }}>
                        Pedido {product.frecuencia}x
                      </p>
                      <button
                        onClick={() => onAddFrequentProduct?.(product.id)}
                        style={{
                          width: '100%',
                          padding: 'var(--space-2)',
                          background: 'var(--color-primary-light)',
                          color: 'var(--color-primary)',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          fontSize: 'var(--font-size-caption)',
                          fontWeight: 'var(--font-weight-semibold)',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--color-primary)';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--color-primary-light)';
                          e.currentTarget.style.color = 'var(--color-primary)';
                        }}
                      >
                        + Añadir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ position: 'sticky', top: 'var(--space-6)' }}>
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--color-neutral-300)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-low)'
            }}>
              <h2 style={{
                fontSize: 'var(--font-size-h5)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-5)',
                paddingBottom: 'var(--space-4)',
                borderBottom: '1px solid var(--color-neutral-300)'
              }}>
                Resumen del Pedido
              </h2>

              {/* Promo Code */}
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <label style={{
                  display: 'block',
                  fontSize: 'var(--font-size-body-s)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  Código de Descuento
                </label>
                <div style={{
                  display: 'flex',
                  gap: 'var(--space-2)'
                }}>
                  <div style={{
                    flex: 1,
                    position: 'relative'
                  }}>
                    <Tag size={18} style={{
                      position: 'absolute',
                      left: 'var(--space-3)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-neutral-500)'
                    }} />
                    <input
                      type="text"
                      placeholder="Ingresa código"
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
                  <button style={{
                    padding: '0 var(--space-5)',
                    background: 'var(--color-neutral-100)',
                    border: '1px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body-m)',
                    fontWeight: 'var(--font-weight-semibold)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary-light)';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-neutral-100)';
                    e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                  }}
                  >
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-3)',
                  fontSize: 'var(--font-size-body-m)',
                  color: 'var(--color-neutral-700)'
                }}>
                  <span>Subtotal:</span>
                  <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-4)',
                  fontSize: 'var(--font-size-body-m)',
                  color: 'var(--color-neutral-700)'
                }}>
                  <span>IVA (13%):</span>
                  <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div style={{
                  paddingTop: 'var(--space-4)',
                  borderTop: '2px solid var(--color-neutral-300)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-neutral-900)'
                }}>
                  <span>Total:</span>
                  <span style={{ color: 'var(--color-primary)' }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
              onClick={() => onNavigate?.('checkout')}
              style={{
                width: '100%',
                padding: 'var(--space-4)',
                background: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-h6)',
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
                Proceder al Pago
                <ArrowRight size={20} />
              </button>

              {/* Trust Badges */}
              <div style={{
                marginTop: 'var(--space-5)',
                padding: 'var(--space-4)',
                background: 'var(--color-success-light)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-body-s)',
                color: 'var(--color-neutral-900)',
                textAlign: 'center'
              }}>
                🔒 Pago seguro • 📦 Recoge en tienda
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
