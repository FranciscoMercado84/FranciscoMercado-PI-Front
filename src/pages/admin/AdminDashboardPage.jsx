import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFAdminDashboard from '../../../components/design-system/high-fidelity/HFAdminDashboard';
import { LoadingState } from '../../components/states/LoadingState';
import { productService, pedidoService } from '../../services/api';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Cargar productos, pedidos y productos con stock bajo en paralelo
        const [productsRes, ordersRes, lowStockRes] = await Promise.all([
          productService.getAll(),
          pedidoService.getAllPedidos(),
          productService.getStockBajo().catch(() => ({ data: [] })) // Si falla, array vacío
        ]);

        const products = Array.isArray(productsRes) ? productsRes : (productsRes.data || productsRes.productos || []);
        const orders = Array.isArray(ordersRes) ? ordersRes : (ordersRes.data || ordersRes.pedidos || []);
        const lowStock = Array.isArray(lowStockRes) ? lowStockRes : (lowStockRes.data || []);

        // Calcular estadísticas
        const today = new Date().toDateString();
        const ordersToday = orders.filter(o => {
          try {
            const orderDate = new Date(o.createdAt || o.fechaCreacion || o.date);
            return orderDate.toDateString() === today;
          } catch {
            return false;
          }
        });

        const salesToday = ordersToday.reduce((sum, o) => sum + (o.total || 0), 0);
        const pendingOrders = orders.filter(o => 
          o.status === 'pending' || o.status === 'pendiente' || o.estado === 'pendiente'
        ).length;

        // Calcular productos agotados desde los productos cargados
        const outOfStock = products.filter(p => p.stock === 0 || p.estado_inventario === 'agotado').length;

        setStats({
          salesToday: salesToday || 0,
          pendingOrders: pendingOrders,
          activeCustomers: Math.min(orders.length, 50), // Estimación
          totalProducts: products.length,
          lowStockCount: lowStock.length,
          outOfStockCount: outOfStock
        });

        // Ordenar pedidos por fecha y tomar los 5 más recientes
        const sortedOrders = orders.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.fechaCreacion || 0);
          const dateB = new Date(b.createdAt || b.fechaCreacion || 0);
          return dateB - dateA;
        }).slice(0, 5);

        setRecentOrders(sortedOrders);
        setLowStockProducts(lowStock.slice(0, 5)); // Top 5 productos con stock bajo
      } catch (err) {
        console.error('Error al cargar datos del dashboard:', err);
        // Usar valores por defecto si hay error
        setStats({
          salesToday: 0,
          pendingOrders: 0,
          activeCustomers: 0,
          totalProducts: 0,
          lowStockCount: 0,
          outOfStockCount: 0
        });
        setRecentOrders([]);
        setLowStockProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleNavigate = (screenId, orderId) => {
    if (screenId === 'order-detail' && orderId) {
      navigate(`/admin/orders/${orderId}`);
    } else {
      const routes = {
        'products': '/admin/products',
        'orders': '/admin/orders',
        'reports': '/admin/reports',
        'settings': '/admin/settings'
      };
      
      const route = routes[screenId];
      if (route) {
        navigate(route);
      }
    }
  };

  if (isLoading) {
    return <LoadingState message="Cargando dashboard..." />;
  }

  return (
    <HFAdminDashboard 
      stats={stats} 
      recentOrders={recentOrders} 
      lowStockProducts={lowStockProducts}
      onNavigate={handleNavigate} 
    />
  );
};

