import React, { useState } from 'react';
import { TrendingUp, DollarSign, Package, Users, Download, Calendar, RefreshCw } from 'lucide-react';

export default function HFReports({
  estadisticas = {},
  ventasPorDia = [],
  productosMasVendidos = [],
  onPeriodoChange,
  onExportar,
  isLoading = false
}) {
  const [periodo, setPeriodo] = useState('7d');

  // Datos por defecto si no se pasan props
  const defaultStats = {
    ventas_totales: estadisticas.ventas_totales || 0,
    pedidos: estadisticas.pedidos || 0,
    clientes: estadisticas.clientes || 0,
    ticket_promedio: estadisticas.ticket_promedio || 0,
    cambio_ventas: estadisticas.cambio_ventas || '+0%',
    cambio_pedidos: estadisticas.cambio_pedidos || '+0%',
    cambio_clientes: estadisticas.cambio_clientes || '+0%',
    cambio_ticket: estadisticas.cambio_ticket || '+0%'
  };

  const stats = [
    {
      label: 'Ventas Totales',
      value: `$${defaultStats.ventas_totales.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`,
      change: defaultStats.cambio_ventas,
      icon: DollarSign,
      color: 'var(--color-success)'
    },
    {
      label: 'Pedidos',
      value: defaultStats.pedidos.toString(),
      change: defaultStats.cambio_pedidos,
      icon: Package,
      color: 'var(--color-info)'
    },
    {
      label: 'Clientes',
      value: defaultStats.clientes.toString(),
      change: defaultStats.cambio_clientes,
      icon: Users,
      color: 'var(--color-warning)'
    },
    {
      label: 'Ticket Promedio',
      value: `$${defaultStats.ticket_promedio.toFixed(2)}`,
      change: defaultStats.cambio_ticket,
      icon: TrendingUp,
      color: 'var(--color-primary)'
    }
  ];

  // Datos de ventas por día (usar props o datos vacíos)
  const chartData = ventasPorDia.length > 0
    ? ventasPorDia
    : [
        { dia: 'L', ventas: 0 },
        { dia: 'M', ventas: 0 },
        { dia: 'X', ventas: 0 },
        { dia: 'J', ventas: 0 },
        { dia: 'V', ventas: 0 },
        { dia: 'S', ventas: 0 },
        { dia: 'D', ventas: 0 }
      ];

  // Calcular altura máxima para el gráfico
  const maxVentas = Math.max(...chartData.map(d => d.ventas), 1);

  const handlePeriodoChange = (newPeriodo) => {
    setPeriodo(newPeriodo);
    onPeriodoChange?.(newPeriodo);
  };

  const handleExportar = () => {
    onExportar?.('ventas', periodo);
  };

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
          marginBottom: 'var(--space-8)',
          flexWrap: 'wrap',
          gap: 'var(--space-4)'
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
            <select
              value={periodo}
              onChange={(e) => handlePeriodoChange(e.target.value)}
              style={{
                padding: 'var(--space-3) var(--space-4)',
                border: '1px solid var(--color-neutral-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-body-m)',
                background: 'white',
                cursor: 'pointer',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="3m">Últimos 3 meses</option>
              <option value="1y">Este año</option>
            </select>
            <button
              onClick={handleExportar}
              disabled={isLoading}
              style={{
                padding: 'var(--space-3) var(--space-5)',
                background: 'var(--color-secondary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-body-m)',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? <RefreshCw size={18} className="animate-spin" /> : <Download size={18} />}
              Exportar
            </button>
          </div>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}>
            <div style={{ textAlign: 'center' }}>
              <RefreshCw size={40} style={{ color: 'var(--color-primary)', animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: 'var(--space-3)', color: 'var(--color-neutral-700)' }}>Cargando datos...</p>
            </div>
          </div>
        )}

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
                  background: stat.change.startsWith('+') ? 'var(--color-success-light)' : 'var(--color-error-light)',
                  color: stat.change.startsWith('+') ? 'var(--color-success-dark)' : 'var(--color-error)',
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 'var(--space-6)'
        }}>
          {/* Sales Chart */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            padding: 'var(--space-6)',
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
              height: '280px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              gap: 'var(--space-2)',
              padding: 'var(--space-4)',
              background: 'var(--color-neutral-100)',
              borderRadius: 'var(--radius-lg)'
            }}>
              {chartData.map((data, i) => {
                const height = maxVentas > 0 ? (data.ventas / maxVentas) * 240 : 20;
                return (
                  <div key={i} style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-2)'
                  }}>
                    <div
                      style={{
                        width: '100%',
                        minHeight: '20px',
                        height: `${Math.max(height, 20)}px`,
                        background: data.ventas > 0
                          ? 'linear-gradient(to top, var(--color-primary), var(--color-primary-hover))'
                          : 'var(--color-neutral-300)',
                        borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scaleY(1.05)';
                        e.currentTarget.style.background = 'var(--color-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scaleY(1)';
                        e.currentTarget.style.background = data.ventas > 0
                          ? 'linear-gradient(to top, var(--color-primary), var(--color-primary-hover))'
                          : 'var(--color-neutral-300)';
                      }}
                      title={`$${data.ventas.toFixed(2)}`}
                    />
                    <span style={{
                      fontSize: 'var(--font-size-caption)',
                      color: 'var(--color-neutral-700)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      {data.dia}
                    </span>
                  </div>
                );
              })}
            </div>
            {chartData.every(d => d.ventas === 0) && (
              <p style={{
                textAlign: 'center',
                color: 'var(--color-neutral-500)',
                marginTop: 'var(--space-4)',
                fontSize: 'var(--font-size-body-s)'
              }}>
                No hay datos de ventas para este período
              </p>
            )}
          </div>

          {/* Top Products */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            padding: 'var(--space-6)',
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
              {productosMasVendidos.length > 0 ? (
                productosMasVendidos.map((product, i) => (
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
                          {product.nombre || product.name}
                        </div>
                      </div>
                      <div style={{
                        fontSize: 'var(--font-size-h6)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--color-primary)'
                      }}>
                        ${(product.ingresos || product.revenue || 0).toFixed(2)}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 'var(--font-size-body-s)',
                      color: 'var(--color-neutral-700)'
                    }}>
                      {product.ventas || product.sales || 0} unidades vendidas
                    </div>
                  </div>
                ))
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--space-8)',
                  color: 'var(--color-neutral-500)'
                }}>
                  <Package size={40} style={{ marginBottom: 'var(--space-3)', opacity: 0.5 }} />
                  <p>No hay datos de productos vendidos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
