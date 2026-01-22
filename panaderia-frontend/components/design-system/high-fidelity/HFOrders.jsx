import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function HFOrders({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const orders = [
    { id: '#1234', date: 'Hoy', time: '12:00', total: '62.05', status: 'preparing', statusText: 'Preparando', emoji: '🍞' },
    { id: '#1233', date: 'Ayer', time: '10:30', total: '45.00', status: 'ready', statusText: 'Listo', emoji: '🥐' },
    { id: '#1232', date: '10 Ene', time: '14:00', total: '38.50', status: 'completed', statusText: 'Completado', emoji: '🎂' },
    { id: '#1231', date: '8 Ene', time: '11:00', total: '52.00', status: 'completed', statusText: 'Completado', emoji: '🍪' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparing': return { bg: 'var(--color-warning-light)', text: 'var(--color-warning-dark)', border: 'var(--color-warning)' };
      case 'ready': return { bg: 'var(--color-success-light)', text: 'var(--color-success-dark)', border: 'var(--color-success)' };
      case 'completed': return { bg: 'var(--color-neutral-200)', text: 'var(--color-neutral-700)', border: 'var(--color-neutral-400)' };
      default: return { bg: 'var(--color-neutral-200)', text: 'var(--color-neutral-700)', border: 'var(--color-neutral-400)' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-neutral-50)' }}>
      <header style={{ background: 'white', borderBottom: '1px solid var(--color-neutral-300)', padding: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: isMobile ? 'var(--font-size-h4)' : 'var(--font-size-h3)', margin: 0 }}>Mis Pedidos</h1>
        </div>
      </header>

      <div style={{ padding: isMobile ? 'var(--spacing-md)' : 'var(--spacing-xl)', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)' }}>
          <button className="btn btn-primary">Activos</button>
          <button className="btn btn-ghost">Historial</button>
        </div>

        <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
          {orders.map((order) => {
            const colors = getStatusColor(order.status);
            return (
              <div key={order.id} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-high)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-medium)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'var(--color-neutral-200)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    flexShrink: 0
                  }}>
                    {order.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
                      <h3 style={{ fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-semibold)', margin: 0, fontFamily: 'monospace' }}>
                        {order.id}
                      </h3>
                      <span style={{
                        fontSize: 'var(--font-size-caption)',
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                      }}>
                        {order.statusText}
                      </span>
                    </div>
                    <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-600)', margin: 0 }}>
                      Recogida: {order.date} a las {order.time}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                      ${order.total}
                    </p>
                    <ChevronRight size={20} style={{ color: 'var(--color-neutral-500)' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

