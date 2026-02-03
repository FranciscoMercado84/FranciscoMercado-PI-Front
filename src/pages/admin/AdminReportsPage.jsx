import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFReports from '../../../components/design-system/high-fidelity/HFReports';
import { LoadingState } from '../../components/states/LoadingState';

export const AdminReportsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return <LoadingState message="Generando reportes..." />;
  }

  return <HFReports onNavigate={handleNavigate} />;
};

