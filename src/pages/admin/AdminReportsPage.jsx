import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HFReports from '../../../components/design-system/high-fidelity/HFReports';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { reportService, pedidoService, productService } from '../../services/api';

export const AdminReportsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [periodo, setPeriodo] = useState('7d');
  const [estadisticas, setEstadisticas] = useState({});
  const [ventasPorDia, setVentasPorDia] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);

  const loadReportData = useCallback(async (periodoActual) => {
    setIsLoading(true);
    setError(null);

    try {
      // Intentar cargar datos de reportes del backend
      const [stats, ventas, productos] = await Promise.all([
        reportService.getEstadisticas(periodoActual),
        reportService.getVentasPorDia(periodoActual),
        reportService.getProductosMasVendidos(5)
      ]);

      setEstadisticas(stats.data || stats);
      setVentasPorDia(Array.isArray(ventas) ? ventas : (ventas.data || []));
      setProductosMasVendidos(Array.isArray(productos) ? productos : (productos.data || []));
    } catch (err) {
      console.error('Error al cargar reportes:', err);

      // Si el endpoint de reportes no existe, calcular datos desde pedidos
      try {
        const pedidos = await pedidoService.getAllPedidos();
        const pedidosList = Array.isArray(pedidos) ? pedidos : (pedidos.data || pedidos.pedidos || []);

        // Calcular estadísticas básicas desde pedidos
        const stats = calcularEstadisticasDesdeRedidos(pedidosList, periodoActual);
        setEstadisticas(stats);

        // Calcular ventas por día
        const ventasDia = calcularVentasPorDia(pedidosList, periodoActual);
        setVentasPorDia(ventasDia);

        // Obtener productos más vendidos
        const productosVendidos = await calcularProductosMasVendidos(pedidosList);
        setProductosMasVendidos(productosVendidos);
      } catch (fallbackErr) {
        console.error('Error en fallback:', fallbackErr);
        // En caso de error total, mostrar datos vacíos
        setEstadisticas({});
        setVentasPorDia([]);
        setProductosMasVendidos([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReportData(periodo);
  }, [loadReportData, periodo]);

  const handlePeriodoChange = (newPeriodo) => {
    setPeriodo(newPeriodo);
  };

  const handleExportar = async (tipo, periodoExport) => {
    try {
      setIsLoading(true);
      await reportService.exportarReporte(tipo, periodoExport);
    } catch (err) {
      console.error('Error al exportar:', err);
      // Exportación manual si el endpoint no existe
      exportarManual(tipo);
    } finally {
      setIsLoading(false);
    }
  };

  const exportarManual = (tipo) => {
    let data = [];
    let headers = [];

    if (tipo === 'ventas') {
      headers = ['Día', 'Ventas ($)'];
      data = ventasPorDia.map(v => [v.dia, v.ventas]);
    } else if (tipo === 'productos') {
      headers = ['Producto', 'Unidades Vendidas', 'Ingresos ($)'];
      data = productosMasVendidos.map(p => [p.nombre || p.name, p.ventas || p.sales, p.ingresos || p.revenue]);
    }

    const csvContent = [headers.join(','), ...data.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte-${tipo}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleNavigate = (screenId) => {
    const routes = {
      'dashboard': '/admin/dashboard',
      'orders': '/admin/orders',
      'products': '/admin/products'
    };

    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  if (isLoading && !estadisticas.ventas_totales) {
    return <LoadingState message="Generando reportes..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error al cargar reportes"
        message={error}
        onRetry={() => loadReportData(periodo)}
      />
    );
  }

  return (
    <HFReports
      onNavigate={handleNavigate}
      estadisticas={estadisticas}
      ventasPorDia={ventasPorDia}
      productosMasVendidos={productosMasVendidos}
      onPeriodoChange={handlePeriodoChange}
      onExportar={handleExportar}
      isLoading={isLoading}
    />
  );
};

// Funciones auxiliares para calcular datos desde pedidos

function calcularEstadisticasDesdeRedidos(pedidos, periodo) {
  const ahora = new Date();
  const dias = periodo === '7d' ? 7 : periodo === '30d' ? 30 : periodo === '3m' ? 90 : 365;
  const fechaInicio = new Date(ahora.getTime() - dias * 24 * 60 * 60 * 1000);

  const pedidosFiltrados = pedidos.filter(p => {
    const fechaPedido = new Date(p.fecha || p.createdAt || p.created_at);
    return fechaPedido >= fechaInicio;
  });

  const ventasTotales = pedidosFiltrados.reduce((sum, p) => sum + (p.total || 0), 0);
  const numPedidos = pedidosFiltrados.length;
  const clientes = new Set(pedidosFiltrados.map(p => p.usuario_id || p.userId || p.cliente_id)).size;
  const ticketPromedio = numPedidos > 0 ? ventasTotales / numPedidos : 0;

  return {
    ventas_totales: ventasTotales,
    pedidos: numPedidos,
    clientes: clientes,
    ticket_promedio: ticketPromedio,
    cambio_ventas: '+0%',
    cambio_pedidos: '+0%',
    cambio_clientes: '+0%',
    cambio_ticket: '+0%'
  };
}

function calcularVentasPorDia(pedidos, periodo) {
  const diasSemana = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  const ventasPorDia = {};

  // Inicializar todos los días
  diasSemana.forEach(dia => { ventasPorDia[dia] = 0; });

  // Sumar ventas por día de la semana
  pedidos.forEach(pedido => {
    const fecha = new Date(pedido.fecha || pedido.createdAt || pedido.created_at);
    const diaSemana = diasSemana[fecha.getDay()];
    ventasPorDia[diaSemana] += pedido.total || 0;
  });

  // Convertir a array ordenado (L-D)
  const orden = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  return orden.map(dia => ({ dia, ventas: ventasPorDia[dia] }));
}

async function calcularProductosMasVendidos(pedidos) {
  const productosCount = {};

  pedidos.forEach(pedido => {
    const items = pedido.items || pedido.productos || [];
    items.forEach(item => {
      const id = item.producto_id || item.productoId || item.producto?._id || item.producto?.id;
      const nombre = item.nombre || item.producto?.nombre || item.name || item.producto?.name || 'Producto';
      const precio = item.precio || item.producto?.precio || item.price || item.producto?.price || 0;
      const cantidad = item.cantidad || item.quantity || 1;

      if (id) {
        if (!productosCount[id]) {
          productosCount[id] = { id, nombre, ventas: 0, ingresos: 0 };
        }
        productosCount[id].ventas += cantidad;
        productosCount[id].ingresos += precio * cantidad;
      }
    });
  });

  return Object.values(productosCount)
    .sort((a, b) => b.ventas - a.ventas)
    .slice(0, 5);
}
