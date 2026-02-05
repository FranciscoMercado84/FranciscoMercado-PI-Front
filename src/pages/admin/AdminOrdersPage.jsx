import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFAdminOrders from '../../../components/design-system/high-fidelity/HFAdminOrders';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { EmptyState } from '../../components/states/EmptyState';
import { ClipboardList } from 'lucide-react';
import { pedidoService } from '../../services/api';

export const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await pedidoService.getAllPedidos();
      // La respuesta puede ser un array directamente o estar en response.data
      const ordersData = Array.isArray(response) ? response : (response.data || response.pedidos || []);
      setOrders(ordersData);
    } catch (err) {
      console.error('Error al cargar pedidos:', err);
      setError(err.message || 'Error al cargar los pedidos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleNavigate = (screenId, orderId) => {
    if (screenId === 'order-detail' && orderId) {
      navigate(`/admin/orders/${orderId}`);
    } else {
      const routes = {
        'dashboard': '/admin/dashboard'
      };
      
      const route = routes[screenId];
      if (route) {
        navigate(route);
      }
    }
  };

  if (isLoading) {
    return <LoadingState message="Cargando pedidos..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error al cargar pedidos"
        message={error}
        onRetry={loadOrders}
      />
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No hay pedidos"
        message="Aún no se han recibido pedidos."
        icon={<ClipboardList size={32} style={{ color: 'var(--color-neutral-600)' }} />}
      />
    );
  }

  return <HFAdminOrders orders={orders} onNavigate={handleNavigate} />;
};

