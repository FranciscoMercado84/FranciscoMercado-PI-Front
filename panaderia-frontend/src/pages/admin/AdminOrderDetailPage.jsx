import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HFOrderDetail from '../../../components/design-system/high-fidelity/HFOrderDetail';

export const AdminOrderDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigate = (screenId) => {
    const routes = {
      'orders': '/admin/orders',
      'dashboard': '/admin/dashboard'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  return <HFOrderDetail onNavigate={handleNavigate} isAdmin={true} />;
};

