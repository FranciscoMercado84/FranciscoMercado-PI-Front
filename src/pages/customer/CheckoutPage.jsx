import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HFCheckout from '../../../components/design-system/high-fidelity/HFCheckout';
import { SuccessState } from '../../components/states/SuccessState';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleNavigate = (screenId) => {
    if (screenId === 'confirmation' || screenId === 'order-confirmation') {
      setOrderCompleted(true);
    } else {
      const routes = {
        'cart': '/cart',
        'catalog': '/catalog'
      };
      
      const route = routes[screenId];
      if (route) {
        navigate(route);
      }
    }
  };

  if (orderCompleted) {
    return (
      <SuccessState
        title="¡Pedido confirmado!"
        message="Tu pedido ha sido procesado correctamente. Recibirás un email con los detalles."
        actionLabel="Ver mi pedido"
        onAction={() => navigate('/order/1')}
      />
    );
  }

  return <HFCheckout onNavigate={handleNavigate} />;
};

