import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HFOrderDetail from '../../../components/design-system/high-fidelity/HFOrderDetail';

export const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigate = (screenId) => {
    const routes = {
      'orders': '/orders',
      'catalog': '/catalog',
      'cart': '/cart',
      'cancel-order': '/order/' + id + '/cancel'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  return <HFOrderDetail onNavigate={handleNavigate} />;
};

