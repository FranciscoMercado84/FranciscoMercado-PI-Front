import React from 'react';
import { BarChart, TrendingUp, Package, DollarSign, Users, Clock } from 'lucide-react';

// Datos por defecto
const defaultStats = {
  salesToday: 285.50,
  pendingOrders: 8,
  activeCustomers: 42,
  totalProducts: 24
};

const defaultRecentOrders = [
  { id: 'ORD-285', customer: 'Juan Pérez', total: 22.15, status: 'pending', time: '10:30 AM' },
  { id: 'ORD-284', customer: 'María García', total: 15.80, status: 'completed', time: '09:45 AM' },
  { id: 'ORD-283', customer: 'Carlos López', total: 32.50, status: 'pending', time: '09:15 AM' }
];

export default function HFAdminDashboard({ stats: propStats, recentOrders: propRecentOrders, onNavigate }) {
  // Usar props si existen, sino usar defaults
  const statsData = propStats || defaultStats;

  // Normalizar pedidos recientes
  const normalizeOrder = (o) => {
    let time = o.time;
    if (!time && (o.createdAt || o.fechaCreacion)) {
      const d = new Date(o.createdAt || o.fechaCreacion);
      time = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }

    return {
      id: o.id || o._id || o.orderId,
      customer: o.customer || o.cliente || o.usuario?.nombre || 'Cliente',
      total: o.total || 0,
      status: o.status || o.estado || 'pending',
      time: time || 'N/A'
    };
  };

  const recentOrders = (propRecentOrders || defaultRecentOrders).map(normalizeOrder);

  const stats = [
    { label: 'Ventas Hoy', value: `$${statsData.salesToday.toFixed(2)}`, change: '+12%', icon: DollarSign, color: 'var(--color-success)' },
    { label: 'Pedidos Pendientes', value: String(statsData.pendingOrders), change: `+${statsData.pendingOrders}`, icon: Package, color: 'var(--color-warning)' },
    { label: 'Clientes Activos', value: String(statsData.activeCustomers), change: '+5', icon: Users, color: 'var(--color-info)' },
    { label: 'Productos', value: String(statsData.totalProducts), change: '0', icon: TrendingUp, color: 'var(--color-primary)', onClick: () => onNavigate?.('products') }
  ];

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-6)'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-hover) 100%)',
        padding: 'var(--space-6)',
        borderRadius: '16px',
        color: 'white',
        marginBottom: 'var(--space-6)',
        boxShadow: 'var(--shadow-medium)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-6)'
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--space-2)'
          }}>
            Dashboard
          </h1>
          <p style={{ fontSize: 'var(--font-size-body-lg)', opacity: 0.95 }}>
            Bienvenido, Admin • {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ textAlign: 'right', minWidth: '220px' }}>
          <div style={{ fontSize: 'var(--font-size-body-m)', opacity: 0.9 }}>Panel de Administración</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-8)'
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: 'white',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            boxShadow: 'var(--shadow-low)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-low)';
          }}
          onClick={stat.onClick}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)', alignItems: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: `${stat.color}20`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <stat.icon size={28} style={{ color: stat.color }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '48px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: stat.change.startsWith('+') ? 'var(--color-success-light)' : 'var(--color-error-light)',
                  color: stat.change.startsWith('+') ? 'var(--color-success-dark)' : 'var(--color-error)',
                  borderRadius: '999px',
                  fontSize: 'var(--font-size-caption)',
                  fontWeight: 'var(--font-weight-bold)'
                }}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div style={{
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-1)'
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-700)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-neutral-300)',
        padding: 'var(--space-8)',
        boxShadow: 'var(--shadow-low)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-6)',
          paddingBottom: 'var(--space-4)',
          borderBottom: '2px solid var(--color-secondary)'
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-h4)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)'
          }}>
            Pedidos Recientes
          </h2>
          <button 
          onClick={() => onNavigate?.('orders')}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-secondary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-s)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer'
          }}>
            Ver Todos
          </button>
        </div>

        {recentOrders.map((order, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-4)',
            borderBottom: i < recentOrders.length - 1 ? '1px solid var(--color-neutral-300)' : 'none',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-100)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 'var(--font-size-h6)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-1)',
                fontFamily: 'monospace'
              }}>
                {order.id}
              </div>
              <div style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-700)' }}>
                {order.customer}
              </div>
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              padding: 'var(--space-1) var(--space-3)',
              background: order.status === 'completed' ? 'var(--color-success-light)' : 'var(--color-warning-light)',
              color: order.status === 'completed' ? 'var(--color-success-dark)' : 'var(--color-warning-dark)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-badge)',
              fontWeight: 'var(--font-weight-bold)',
              marginRight: 'var(--space-5)'
            }}>
              {order.status === 'completed' ? '✓' : <Clock size={12} />}
              {order.status === 'completed' ? 'Completado' : 'Pendiente'}
            </div>
            <div style={{
              fontSize: 'var(--font-size-h6)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-primary)',
              marginRight: 'var(--space-4)'
            }}>
              ${order.total.toFixed(2)}
            </div>
            <div style={{
              fontSize: 'var(--font-size-body-s)',
              color: 'var(--color-neutral-500)',
              minWidth: '80px',
              textAlign: 'right'
            }}>
              {order.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
