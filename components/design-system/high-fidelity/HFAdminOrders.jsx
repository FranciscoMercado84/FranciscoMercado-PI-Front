import React from 'react';
import { Search, Filter, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function HFAdminOrders({ onNavigate }) {
  const orders = [
    { id: 'ORD-285', customer: 'Juan Pérez', date: '2026-01-05 10:30', items: 3, total: 22.15, status: 'pending' },
    { id: 'ORD-284', customer: 'María García', date: '2026-01-05 09:45', items: 2, total: 15.80, status: 'completed' },
    { id: 'ORD-283', customer: 'Carlos López', date: '2026-01-05 09:15', items: 5, total: 32.50, status: 'cancelled' },
    { id: 'ORD-282', customer: 'Ana Rodríguez', date: '2026-01-04 16:20', items: 4, total: 18.90, status: 'completed' },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      pending: { label: 'Pendiente', color: 'var(--color-warning)', bg: 'var(--color-warning-light)', icon: Clock },
      completed: { label: 'Completado', color: 'var(--color-success)', bg: 'var(--color-success-light)', icon: CheckCircle },
      cancelled: { label: 'Cancelado', color: 'var(--color-error)', bg: 'var(--color-error-light)', icon: XCircle }
    };
    return configs[status] || configs.pending;
  };

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-6)'
    }}>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--font-size-h2)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-neutral-900)',
        marginBottom: 'var(--space-2)'
      }}>
        Gestión de Pedidos
      </h1>
      <p style={{
        fontSize: 'var(--font-size-body-m)',
        color: 'var(--color-neutral-700)',
        marginBottom: 'var(--space-8)'
      }}>
        Administra y procesa todos los pedidos
      </p>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-6)'
      }}>
        {[
          { label: 'Pedidos Hoy', value: '12', color: 'var(--color-info)' },
          { label: 'Pendientes', value: '5', color: 'var(--color-warning)' },
          { label: 'Completados', value: '7', color: 'var(--color-success)' }
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'white',
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            boxShadow: 'var(--shadow-low)'
          }}>
            <div style={{
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-bold)',
              color: stat.color,
              marginBottom: 'var(--space-2)'
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-700)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-neutral-300)',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        gap: 'var(--space-4)'
      }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={20} style={{
            position: 'absolute',
            left: 'var(--space-4)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-neutral-500)'
          }} />
          <input
            type="text"
            placeholder="Buscar por ID o cliente..."
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
          padding: 'var(--space-3) var(--space-5)',
          background: 'var(--color-secondary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--font-size-body-m)',
          fontWeight: 'var(--font-weight-semibold)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)'
        }}>
          <Filter size={18} />
          Filtros
        </button>
      </div>

      {/* Orders Table */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-neutral-300)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-low)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr 1fr 100px 100px 120px 100px',
          padding: 'var(--space-4) var(--space-6)',
          background: 'var(--color-neutral-100)',
          borderBottom: '2px solid var(--color-neutral-300)',
          fontSize: 'var(--font-size-body-s)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-neutral-700)'
        }}>
          <div>ID Pedido</div>
          <div>Cliente</div>
          <div>Fecha/Hora</div>
          <div>Items</div>
          <div>Total</div>
          <div>Estado</div>
          <div>Acción</div>
        </div>

        {orders.map((order, i) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div key={order.id} style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 1fr 100px 100px 120px 100px',
              padding: 'var(--space-5) var(--space-6)',
              borderBottom: i < orders.length - 1 ? '1px solid var(--color-neutral-300)' : 'none',
              alignItems: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-100)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                fontFamily: 'monospace',
                fontSize: 'var(--font-size-body-m)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)'
              }}>
                {order.id}
              </div>
              <div style={{
                fontSize: 'var(--font-size-body-m)',
                color: 'var(--color-neutral-900)'
              }}>
                {order.customer}
              </div>
              <div style={{
                fontSize: 'var(--font-size-body-s)',
                color: 'var(--color-neutral-700)'
              }}>
                {order.date}
              </div>
              <div style={{
                fontSize: 'var(--font-size-body-m)',
                color: 'var(--color-neutral-900)'
              }}>
                {order.items}
              </div>
              <div style={{
                fontSize: 'var(--font-size-body-m)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-primary)'
              }}>
                ${order.total.toFixed(2)}
              </div>
              <div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                  padding: 'var(--space-1) var(--space-3)',
                  background: statusConfig.bg,
                  color: statusConfig.color,
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-badge)',
                  fontWeight: 'var(--font-weight-bold)'
                }}>
                  <StatusIcon size={12} />
                  {statusConfig.label}
                </span>
              </div>
              <div>
                <button 
                onClick={() => onNavigate?.('order-detail', order.id)}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--color-secondary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-body-s)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)'
                }}>
                  <Eye size={14} />
                  Ver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

