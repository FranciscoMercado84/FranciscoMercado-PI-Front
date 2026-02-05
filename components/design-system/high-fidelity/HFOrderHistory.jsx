import React from 'react';
import { Package, Clock, CheckCircle, XCircle, ChevronRight, Truck } from 'lucide-react';

// Pedidos por defecto cuando no se pasan props
const defaultOrders = [
  { id: 'ORD-285', date: '2026-01-05', status: 'completed', total: 22.15, items: 3 },
  { id: 'ORD-284', date: '2026-01-03', status: 'completed', total: 15.80, items: 2 },
  { id: 'ORD-283', date: '2025-12-28', status: 'cancelled', total: 32.50, items: 5 },
  { id: 'ORD-282', date: '2025-12-22', status: 'completed', total: 18.90, items: 4 },
  { id: 'ORD-281', date: '2025-12-15', status: 'completed', total: 25.40, items: 3 },
];

export default function HFOrderHistory({ onNavigate, orders: propOrders }) {
  // Normalizar pedidos
  const normalizeOrder = (order) => ({
    id: order.id || order._id || order.numero,
    date: order.date || order.fecha || order.createdAt,
    status: order.status || order.estado || 'pending',
    total: order.total || 0,
    items: order.items?.length || order.productos?.length || order.items || 0
  });

  const orders = (propOrders && propOrders.length > 0) 
    ? propOrders.map(normalizeOrder) 
    : defaultOrders;

  // Calcular estadísticas
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'completado' || o.status === 'entregado').length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const getStatusConfig = (status) => {
    const statusLower = (status || '').toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'completado':
      case 'entregado':
        return {
          label: 'Completado',
          color: 'var(--color-success)',
          bg: 'var(--color-success-light)',
          icon: CheckCircle
        };
      case 'pending':
      case 'pendiente':
        return {
          label: 'Pendiente',
          color: 'var(--color-warning)',
          bg: 'var(--color-warning-light)',
          icon: Clock
        };
      case 'cancelled':
      case 'cancelado':
        return {
          label: 'Cancelado',
          color: 'var(--color-error)',
          bg: 'var(--color-error-light)',
          icon: XCircle
        };
      case 'en_proceso':
      case 'en proceso':
      case 'preparando':
        return {
          label: 'En Proceso',
          color: 'var(--color-info)',
          bg: 'var(--color-info-light)',
          icon: Package
        };
      case 'enviado':
      case 'en_camino':
        return {
          label: 'En Camino',
          color: 'var(--color-primary)',
          bg: 'var(--color-primary-light)',
          icon: Truck
        };
      default:
        return {
          label: status || 'Desconocido',
          color: 'var(--color-neutral-500)',
          bg: 'var(--color-neutral-100)',
          icon: Package
        };
    }
  };

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{
        maxWidth: '1200px',
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
          Mis Pedidos
        </h1>
        <p style={{
          fontSize: 'var(--font-size-body-m)',
          color: 'var(--color-neutral-700)',
          marginBottom: 'var(--space-8)'
        }}>
          Revisa tu historial de compras
        </p>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-5)',
          marginBottom: 'var(--space-8)'
        }}>
          {[
            { label: 'Total de Pedidos', value: totalOrders.toString(), icon: '📦' },
            { label: 'Pedidos Completados', value: completedOrders.toString(), icon: '✅' },
            { label: 'Total Gastado', value: `$${totalSpent.toFixed(2)}`, icon: '💰' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-neutral-300)',
              boxShadow: 'var(--shadow-low)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: 'var(--space-3)' }}>{stat.icon}</div>
              <div style={{
                fontSize: 'var(--font-size-h3)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-2)'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 'var(--font-size-body-s)',
                color: 'var(--color-neutral-700)'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Orders List */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-low)'
        }}>
          {orders.map((order, index) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={order.id}
                onClick={() => onNavigate?.('order-detail', order.id)}
                style={{
                  padding: 'var(--space-6)',
                  borderBottom: index < orders.length - 1 ? '1px solid var(--color-neutral-300)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-5)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-neutral-100)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {/* Order Icon */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Package size={32} style={{ color: 'var(--color-primary)' }} />
                </div>

                {/* Order Info */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    <h3 style={{
                      fontSize: 'var(--font-size-h6)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-neutral-900)',
                      fontFamily: 'monospace'
                    }}>
                      {order.id}
                    </h3>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--space-1)',
                      padding: 'var(--space-1) var(--space-3)',
                      background: statusConfig.bg,
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--font-size-badge)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: statusConfig.color
                    }}>
                      <StatusIcon size={12} />
                      {statusConfig.label}
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: 'var(--space-5)',
                    fontSize: 'var(--font-size-body-s)',
                    color: 'var(--color-neutral-700)'
                  }}>
                    <span>📅 {new Date(order.date).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</span>
                    <span>📦 {order.items} {order.items === 1 ? 'producto' : 'productos'}</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-5)'
                }}>
                  <div style={{
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-primary)',
                    textAlign: 'right'
                  }}>
                    ${order.total.toFixed(2)}
                  </div>
                  <ChevronRight size={24} style={{ color: 'var(--color-neutral-500)' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State for no orders (commented out, shown when orders.length === 0) */}
        {/* 
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-10)',
          textAlign: 'center'
        }}>
          <Package size={80} style={{ color: 'var(--color-neutral-300)', marginBottom: 'var(--space-4)' }} />
          <h3>No tienes pedidos aún</h3>
          <p>Explora nuestros productos y haz tu primer pedido</p>
        </div>
        */}
      </div>
    </div>
  );
}

