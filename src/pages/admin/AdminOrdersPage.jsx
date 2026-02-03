import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFAdminOrders from '../../../components/design-system/high-fidelity/HFAdminOrders';
import { LoadingState } from '../../components/states/LoadingState';
import { EmptyState } from '../../components/states/EmptyState';
import { ClipboardList } from 'lucide-react';

export const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasOrders] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
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

  if (!hasOrders) {
    return (
      <EmptyState
        title="No hay pedidos"
        message="Aún no se han recibido pedidos."
        icon={<ClipboardList size={32} style={{ color: 'var(--color-neutral-600)' }} />}
      />
    );
  }

  return <HFAdminOrders onNavigate={handleNavigate} />;
};

