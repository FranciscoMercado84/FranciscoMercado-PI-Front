import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFOrderHistory from '../../../components/design-system/high-fidelity/HFOrderHistory';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { EmptyState } from '../../components/states/EmptyState';
import { ShoppingBag } from 'lucide-react';
import { pedidoService } from '../../services/api';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await pedidoService.getMisPedidos();
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

    loadOrders();
  }, []);

  const handleNavigate = (screenId, orderId) => {
    if (screenId === 'order-detail' && orderId) {
      navigate(`/order/${orderId}`);
    } else {
      const routes = {
        'catalog': '/catalog',
        'profile': '/profile'
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
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No tienes pedidos"
        message="Aún no has realizado ningún pedido. ¡Explora nuestro catálogo y haz tu primer pedido!"
        actionLabel="Ver catálogo"
        onAction={() => navigate('/catalog')}
        icon={<ShoppingBag size={32} style={{ color: 'var(--color-neutral-600)' }} />}
      />
    );
  }

  return <HFOrderHistory orders={orders} onNavigate={handleNavigate} />;
};

