import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HFCart from '../../../components/design-system/high-fidelity/HFCart';
import HFCartEmpty from '../../../components/design-system/high-fidelity/HFCartEmpty';

export const CartPage = () => {
  const navigate = useNavigate();
  // Simular carrito vacío o con items
  const [hasItems] = useState(true);

  const handleNavigate = (screenId) => {
    const routes = {
      'catalog': '/catalog',
      'checkout': '/checkout',
      'product-detail': '/product/1'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  // Mostrar componente según el estado del carrito
  if (!hasItems) {
    return <HFCartEmpty onNavigate={handleNavigate} />;
  }

  return <HFCart onNavigate={handleNavigate} />;
};

