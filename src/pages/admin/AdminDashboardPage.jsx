import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFAdminDashboard from '../../../components/design-system/high-fidelity/HFAdminDashboard';
import { LoadingState } from '../../components/states/LoadingState';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (screenId) => {
    const routes = {
      'products': '/admin/products',
      'orders': '/admin/orders',
      'reports': '/admin/reports',
      'settings': '/admin/settings',
      'order-detail': '/admin/orders/1'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  if (isLoading) {
    return <LoadingState message="Cargando dashboard..." />;
  }

  return <HFAdminDashboard onNavigate={handleNavigate} />;
};

