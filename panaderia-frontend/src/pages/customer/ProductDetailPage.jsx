import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HFProductDetail from '../../../components/design-system/high-fidelity/HFProductDetail';

export const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigate = (screenId) => {
    const routes = {
      'catalog': '/catalog',
      'cart': '/cart',
      'checkout': '/checkout'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  return <HFProductDetail onNavigate={handleNavigate} />;
};

