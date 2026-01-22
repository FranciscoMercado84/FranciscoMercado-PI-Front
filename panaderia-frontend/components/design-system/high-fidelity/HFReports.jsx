import React from 'react';
import { TrendingUp, DollarSign, Package, Users, Download, Calendar } from 'lucide-react';

export default function HFReports() {
  const stats = [
    { label: 'Ventas Totales', value: '$12,450', change: '+15.3%', icon: DollarSign, color: 'var(--color-success)' },
    { label: 'Pedidos', value: '342', change: '+8.1%', icon: Package, color: 'var(--color-info)' },
    { label: 'Clientes', value: '156', change: '+12.5%', icon: Users, color: 'var(--color-warning)' },
    { label: 'Ticket Promedio', value: '$36.40', change: '+6.8%', icon: TrendingUp, color: 'var(--color-primary)' }
  ];

  const topProducts = [
    { name: 'Baguette Francesa', sales: 245, revenue: 857.50 },
    { name: 'Croissant', sales: 198, revenue: 554.40 },
    { name: 'Pan Integral', sales: 176, revenue: 739.20 },
    { name: 'Bagel', sales: 134, revenue: 402.00 }
  ];

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-6)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
              Reportes y Estadísticas
            </h1>
            <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)' }}>
              Análisis y métricas del negocio
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <select style={{
              padding: 'var(--space-3) var(--space-4)',
              border: '1px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              background: 'white',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Últimos 3 meses</option>
              <option>Este año</option>
            </select>
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
              <Download size={18} />
              Exportar
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: `${stat.color}20`,
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <stat.icon size={28} style={{ color: stat.color }} />
                </div>
                <span style={{
                  padding: 'var(--space-1) var(--space-3)',
                  background: 'var(--color-success-light)',
                  color: 'var(--color-success-dark)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-caption)',
                  fontWeight: 'var(--font-weight-bold)',
                  height: 'fit-content'
                }}>
                  {stat.change}
                </span>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          {/* Sales Chart */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-low)'
          }}>
            <h2 style={{
              fontSize: 'var(--font-size-h5)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}>
              <Calendar size={24} style={{ color: 'var(--color-secondary)' }} />
              Ventas por Día
            </h2>
            <div style={{
              height: '300px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              gap: 'var(--space-2)',
              padding: 'var(--space-4)',
              background: 'var(--color-neutral-100)',
              borderRadius: 'var(--radius-lg)'
            }}>
              {[65, 85, 72, 90, 78, 95, 88].map((value, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{
                    width: '100%',
                    height: `${value * 3}px`,
                    background: `linear-gradient(to top, var(--color-primary), var(--color-primary-hover))`,
                    borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scaleY(1.05)';
                    e.currentTarget.style.background = 'var(--color-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scaleY(1)';
                    e.currentTarget.style.background = 'linear-gradient(to top, var(--color-primary), var(--color-primary-hover))';
                  }}
                  />
                  <span style={{
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-neutral-700)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}>
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-low)'
          }}>
            <h2 style={{
              fontSize: 'var(--font-size-h5)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}>
              <TrendingUp size={24} style={{ color: 'var(--color-secondary)' }} />
              Productos Más Vendidos
            </h2>
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              {topProducts.map((product, i) => (
                <div key={i} style={{
                  padding: 'var(--space-4)',
                  background: 'var(--color-neutral-100)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-light)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-neutral-100)'}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-2)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'var(--color-primary)',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 'var(--font-size-body-s)',
                        fontWeight: 'var(--font-weight-bold)'
                      }}>
                        {i + 1}
                      </div>
                      <div style={{
                        fontSize: 'var(--font-size-body-m)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-neutral-900)'
                      }}>
                        {product.name}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 'var(--font-size-h6)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--color-primary)'
                    }}>
                      ${product.revenue.toFixed(2)}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 'var(--font-size-body-s)',
                    color: 'var(--color-neutral-700)'
                  }}>
                    {product.sales} unidades vendidas
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

