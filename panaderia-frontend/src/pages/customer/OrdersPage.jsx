import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFOrderHistory from '../../../components/design-system/high-fidelity/HFOrderHistory';
import { LoadingState } from '../../components/states/LoadingState';
import { EmptyState } from '../../components/states/EmptyState';
import { ShoppingBag } from 'lucide-react';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasOrders] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (screenId) => {
    const routes = {
      'order-detail': '/order/1',
      'catalog': '/catalog',
      'profile': '/profile'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  if (isLoading) {
    return <LoadingState message="Cargando pedidos..." />;
  }

  if (!hasOrders) {
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

  return <HFOrderHistory onNavigate={handleNavigate} />;
};

