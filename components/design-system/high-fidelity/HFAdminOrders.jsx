import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, Clock, XCircle, Loader } from 'lucide-react';

// Datos mock por defecto
const defaultOrders = [
  { id: 'ORD-285', customer: 'Juan Pérez', date: '2026-01-05 10:30', items: 3, total: 22.15, status: 'pending' },
  { id: 'ORD-284', customer: 'María García', date: '2026-01-05 09:45', items: 2, total: 15.80, status: 'completed' },
  { id: 'ORD-283', customer: 'Carlos López', date: '2026-01-05 09:15', items: 5, total: 32.50, status: 'cancelled' },
  { id: 'ORD-282', customer: 'Ana Rodríguez', date: '2026-01-04 16:20', items: 4, total: 18.90, status: 'completed' },
];

export default function HFAdminOrders({ orders: propOrders, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Normalizar pedidos del backend
  const normalizeOrder = (o) => {
    // Formatear fecha
    let dateFormatted = o.date || o.fecha;
    // Guardar fecha original en ISO si está disponible para cálculos fiables
    let rawDate = null;
    if (o.createdAt || o.fechaCreacion || o.created_at || o.date) {
      const d = new Date(o.createdAt || o.fechaCreacion || o.created_at || o.date);
      if (!isNaN(d.getTime())) {
        rawDate = d.toISOString();
        dateFormatted = d.toLocaleString('es-ES', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    }

    // Calcular items
    const items = o.items || o.productos || [];
    const itemCount = o.itemCount || items.reduce((sum, item) => sum + (item.qty || item.quantity || item.cantidad || 1), 0);

    return {
      id: o.id || o._id || o.orderId,
      customer: o.customer || o.cliente || o.usuario?.nombre || 'Cliente',
      date: dateFormatted || 'Fecha no disponible',
      rawDate,
      items: itemCount,
      total: o.total || 0,
      status: o.status || o.estado || 'pending'
    };
  };

  const rawOrders = propOrders || defaultOrders;
  const orders = rawOrders.map(normalizeOrder);

  // Filtrar pedidos
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      String(o.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Estadísticas dinámicas
  const today = new Date().toDateString();
  const ordersToday = orders.filter(o => {
    try {
      const orderDate = new Date(o.rawDate || o.date);
      return orderDate.toDateString() === today;
    } catch {
      return false;
    }
  }).length; // no fallback to total orders

  const pendingOrders = orders.filter(o => o.status === 'Pendiente' || o.status === 'pending' || o.status === 'pendiente').length;
  const completedOrders = orders.filter(o => o.status === 'Entregado' || o.status === 'completed' || o.status === 'completado' || o.status === 'entregado').length;

  const getStatusConfig = (status) => {
    const configs = {
      // Valores del backend (exactos)
      'Pendiente': { label: 'Pendiente', color: 'var(--color-warning)', bg: 'var(--color-warning-light)', icon: Clock },
      'En preparación': { label: 'En Preparación', color: 'var(--color-info, #0ea5e9)', bg: 'var(--color-info-light, #e0f2fe)', icon: Loader },
      'Listo': { label: 'Listo para Recoger', color: 'var(--color-success)', bg: 'var(--color-success-light)', icon: CheckCircle },
      'Entregado': { label: 'Entregado', color: 'var(--color-success)', bg: 'var(--color-success-light)', icon: CheckCircle },
      'Cancelado': { label: 'Cancelado', color: 'var(--color-error)', bg: 'var(--color-error-light)', icon: XCircle },
      // Fallbacks para compatibilidad
      pending: { label: 'Pendiente', color: 'var(--color-warning)', bg: 'var(--color-warning-light)', icon: Clock },
      pendiente: { label: 'Pendiente', color: 'var(--color-warning)', bg: 'var(--color-warning-light)', icon: Clock }
    };
    return configs[status] || configs['Pendiente'];
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
          { label: 'Pedidos Hoy', value: String(ordersToday), color: 'var(--color-info)' },
          { label: 'Pendientes', value: String(pendingOrders), color: 'var(--color-warning)' },
          { label: 'Completados', value: String(completedOrders), color: 'var(--color-success)' }
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
          padding: 'var(--space-3) var(--space-5)',
          background: 'white',
          color: 'var(--color-neutral-900)',
          border: '1px solid var(--color-neutral-300)',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--font-size-body-m)',
          fontWeight: 'var(--font-weight-semibold)',
          cursor: 'pointer'
        }}>
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completados</option>
          <option value="cancelled">Cancelados</option>
        </select>
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

        {filteredOrders.map((order, i) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div key={order.id} style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 1fr 100px 100px 120px 100px',
              padding: 'var(--space-5) var(--space-6)',
              borderBottom: i < filteredOrders.length - 1 ? '1px solid var(--color-neutral-300)' : 'none',
              alignItems: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-neutral-100)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                fontFamily: 'monospace',
                fontSize: 'var(--font-size-body-s)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-900)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                title: order.id
              }}>
                #{String(order.id).slice(-8).toUpperCase()}
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

