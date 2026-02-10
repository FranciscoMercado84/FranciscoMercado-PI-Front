import React from 'react';
import { Package, Calendar, Clock, MapPin, CheckCircle, Download, X, ArrowLeft, AlertCircle, Loader } from 'lucide-react';

// Configuración de estados (valores del backend: Pendiente, En preparación, Listo, Entregado, Cancelado)
const statusConfig = {
  'Pendiente': { label: 'Pendiente', icon: AlertCircle, bgColor: 'var(--color-warning-light)', borderColor: 'var(--color-warning)', textColor: 'var(--color-warning-dark)' },
  'En preparación': { label: 'En Preparación', icon: Loader, bgColor: 'var(--color-info-light, #e0f2fe)', borderColor: 'var(--color-info, #0ea5e9)', textColor: 'var(--color-info-dark, #0369a1)' },
  'Listo': { label: 'Listo para Recoger', icon: CheckCircle, bgColor: 'var(--color-success-light)', borderColor: 'var(--color-success)', textColor: 'var(--color-success-dark)' },
  'Entregado': { label: 'Entregado', icon: CheckCircle, bgColor: 'var(--color-success-light)', borderColor: 'var(--color-success)', textColor: 'var(--color-success-dark)' },
  'Cancelado': { label: 'Cancelado', icon: X, bgColor: 'var(--color-error-light)', borderColor: 'var(--color-error)', textColor: 'var(--color-error-dark)' },
  // Fallbacks para compatibilidad
  pending: { label: 'Pendiente', icon: AlertCircle, bgColor: 'var(--color-warning-light)', borderColor: 'var(--color-warning)', textColor: 'var(--color-warning-dark)' },
  pendiente: { label: 'Pendiente', icon: AlertCircle, bgColor: 'var(--color-warning-light)', borderColor: 'var(--color-warning)', textColor: 'var(--color-warning-dark)' }
};

// Datos mock por defecto
const defaultOrder = {
  id: 'ORD-285',
  status: 'completed',
  date: '5 de Enero, 2026',
  pickupTime: '14:00 - 15:00',
  location: 'Av. Central, San José',
  items: [
    { name: 'Baguette Francesa', qty: 2, price: 3.50 },
    { name: 'Croissant Mantequilla', qty: 3, price: 2.80 },
    { name: 'Pan Integral', qty: 1, price: 4.20 }
  ],
  subtotal: 19.60,
  tax: 2.55,
  total: 22.15
};

export default function HFOrderDetail({ order: propOrder, onNavigate, isAdmin = false, onStatusChange }) {
  // Normalizar el pedido
  const normalizeOrder = (o) => {
    if (!o) return defaultOrder;
    
    // Normalizar items - manejar estructura anidada del backend
    const items = (o.items || o.productos || []).map(item => {
      // El backend puede enviar producto como objeto anidado
      const producto = item.producto || item;
      return {
        name: item.name || item.nombre || producto.nombre || 'Producto',
        qty: item.qty || item.quantity || item.cantidad || 1,
        price: item.price || item.precio || item.precio_unitario || producto.precio || 0
      };
    });
    
    // Calcular totales
    const subtotal = o.subtotal || items.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const tax = o.tax || o.impuesto || o.iva || (subtotal * 0.13);
    const total = o.total || (subtotal + tax);
    
    // Formatear fecha
    let dateFormatted = o.date || o.fecha;
    if (o.createdAt || o.fechaCreacion) {
      const d = new Date(o.createdAt || o.fechaCreacion);
      dateFormatted = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    // Formatear hora de recogida
    let pickupTimeFormatted = 'No especificado';
    const horaRecogida = o.pickupTime || o.horaRecogida || o.hora_recogida || o.horarioRetiro;
    if (horaRecogida) {
      try {
        const d = new Date(horaRecogida);
        if (!isNaN(d.getTime())) {
          pickupTimeFormatted = d.toLocaleString('es-ES', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          });
        } else {
          pickupTimeFormatted = horaRecogida;
        }
      } catch {
        pickupTimeFormatted = horaRecogida;
      }
    }
    
    return {
      id: o.id || o._id || o.orderId || 'N/A',
      status: o.status || o.estado || 'pending',
      date: dateFormatted || 'Fecha no disponible',
      pickupTime: pickupTimeFormatted,
      location: o.location || o.ubicacion || o.direccion || 'Av. Central, San José',
      items,
      subtotal,
      tax,
      total,
      cliente: o.nombre_cliente || o.cliente || o.usuario?.nombre || 'Cliente',
      telefono: o.telefono || ''
    };
  };

  const order = normalizeOrder(propOrder);
  const status = statusConfig[order.status] || statusConfig['Pendiente'];
  const StatusIcon = status.icon;

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
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
              Pedido #{String(order.id).slice(-8).toUpperCase()}
            </h1>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-4)',
              background: status.bgColor,
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${status.borderColor}`,
              fontSize: 'var(--font-size-body-s)',
              fontWeight: 'var(--font-weight-bold)',
              color: status.textColor
            }}>
              <StatusIcon size={16} />
              {status.label}
            </div>
          </div>
          <button style={{
            padding: 'var(--space-3) var(--space-5)',
            background: 'white',
            border: '2px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary)';
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
            e.currentTarget.style.color = 'inherit';
          }}
          >
            <Download size={20} />
            Descargar Recibo
          </button>
        </div>

        {/* Order Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-6)'
        }}>
          {[
            { icon: Calendar, label: 'Fecha del Pedido', value: order.date },
            { icon: Clock, label: 'Hora de Recogida', value: order.pickupTime },
            { icon: MapPin, label: 'Ubicación', value: order.location },
            { icon: Package, label: 'Total de Productos', value: `${order.items.reduce((sum, i) => sum + i.qty, 0)} productos` }
          ].map((item, i) => (
            <div key={i} style={{
              background: 'white',
              padding: 'var(--space-5)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-neutral-300)',
              display: 'flex',
              gap: 'var(--space-4)',
              alignItems: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'var(--color-primary-light)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <item.icon size={24} style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <div style={{
                  fontSize: 'var(--font-size-body-s)',
                  color: 'var(--color-neutral-500)',
                  marginBottom: 'var(--space-1)'
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: 'var(--font-size-h6)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-neutral-900)'
                }}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Items */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-4)',
            borderBottom: '1px solid var(--color-neutral-300)'
          }}>
            Productos
          </h2>

          {order.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-4) 0',
              borderBottom: i < order.items.length - 1 ? '1px solid var(--color-neutral-300)' : 'none'
            }}>
              <div>
                <div style={{
                  fontSize: 'var(--font-size-h6)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-1)'
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontSize: 'var(--font-size-body-s)',
                  color: 'var(--color-neutral-700)'
                }}>
                  Cantidad: {item.qty} × ${item.price.toFixed(2)}
                </div>
              </div>
              <div style={{
                fontSize: 'var(--font-size-h5)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-primary)'
              }}>
                ${(item.qty * item.price).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Totals */}
          <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', borderTop: '2px solid var(--color-neutral-300)' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-3)',
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)'
            }}>
              <span>Subtotal:</span>
              <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>${order.subtotal.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)'
            }}>
              <span>IVA (13%):</span>
              <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>${order.tax.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 'var(--space-4)',
              borderTop: '2px solid var(--color-neutral-900)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-bold)'
            }}>
              <span>Total:</span>
              <span style={{ color: 'var(--color-primary)' }}>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Admin Status Change */}
        {isAdmin && onStatusChange && (() => {
          // Transiciones válidas según el backend
          const allowedTransitions = {
            'Pendiente': ['En preparación', 'Cancelado'],
            'En preparación': ['Listo', 'Cancelado'],
            'Listo': ['Entregado'],
            'Entregado': [],
            'Cancelado': []
          };
          
          const statusStyles = {
            'En preparación': { label: 'En Preparación', color: 'var(--color-info, #0ea5e9)' },
            'Listo': { label: 'Listo para Recoger', color: 'var(--color-success)' },
            'Entregado': { label: 'Entregado', color: 'var(--color-success-dark, #15803d)' },
            'Cancelado': { label: 'Cancelar Pedido', color: 'var(--color-error)' }
          };
          
          const currentStatus = order.status || 'Pendiente';
          const availableTransitions = allowedTransitions[currentStatus] || [];
          
          if (availableTransitions.length === 0) {
            return null; // No mostrar si no hay transiciones disponibles
          }
          
          return (
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-neutral-300)',
              padding: 'var(--space-6)',
              marginBottom: 'var(--space-6)',
              boxShadow: 'var(--shadow-low)'
            }}>
              <h3 style={{
                fontSize: 'var(--font-size-h6)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-4)'
              }}>
                Cambiar Estado del Pedido
              </h3>
              <p style={{
                fontSize: 'var(--font-size-body-s)',
                color: 'var(--color-neutral-600)',
                marginBottom: 'var(--space-4)'
              }}>
                Estado actual: <strong>{currentStatus}</strong>
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                {availableTransitions.map(nextStatus => {
                  const style = statusStyles[nextStatus];
                  return (
                    <button
                      key={nextStatus}
                      onClick={() => onStatusChange(order.id, nextStatus)}
                      style={{
                        padding: 'var(--space-2) var(--space-4)',
                        background: 'white',
                        color: style.color,
                        border: `2px solid ${style.color}`,
                        borderRadius: 'var(--radius-lg)',
                        fontSize: 'var(--font-size-body-s)',
                        fontWeight: 'var(--font-weight-semibold)',
                        cursor: 'pointer',
                        opacity: 0.9,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = style.color;
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = style.color;
                        e.currentTarget.style.opacity = '0.9';
                      }}
                    >
                      {style.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: isAdmin ? 'flex-start' : 'center' }}>
          {isAdmin ? (
            <button 
            onClick={() => onNavigate?.('orders')}
            style={{
              padding: 'var(--space-4) var(--space-6)',
              background: 'white',
              border: '2px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
              e.currentTarget.style.color = 'inherit';
            }}
            >
              <ArrowLeft size={20} />
              Volver a Pedidos
            </button>
          ) : (
            <button 
            onClick={() => onNavigate?.('cart')}
            style={{
              padding: 'var(--space-4) var(--space-8)',
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
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
              Pedir de Nuevo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

