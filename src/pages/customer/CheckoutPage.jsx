import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFCheckout from '../../../components/design-system/high-fidelity/HFCheckout';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { SuccessState } from '../../components/states/SuccessState';
import { carritoService, pedidoService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [orderCreated, setOrderCreated] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadCart();
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await carritoService.get();
      const cartData = response.data || response;
      
      // Verificar si el carrito tiene items
      const items = cartData?.items || cartData?.productos || [];
      if (items.length === 0) {
        navigate('/cart');
        return;
      }
      
      setCart(cartData);
    } catch (err) {
      console.error('Error al cargar carrito:', err);
      setError(err.message || 'Error al cargar el carrito');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (orderData) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      // Crear el pedido
      const response = await pedidoService.create(orderData);
      const pedido = response.data || response;
      
      // Limpiar carrito después de crear pedido
      try {
        await carritoService.clear();
      } catch (e) {
        console.warn('Error al limpiar carrito:', e);
      }
      
      setOrderCreated(pedido);
    } catch (err) {
      console.error('Error al crear pedido:', err);
      setError(err.message || 'Error al crear el pedido');
      setIsProcessing(false);
    }
  };

  const handleNavigate = (screenId) => {
    if (screenId === 'confirmation' || screenId === 'order-confirmation') {
      // Esto ahora se maneja con handleSubmit
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

  if (isLoading) {
    return <LoadingState message="Cargando checkout..." />;
  }

  if (error && !isProcessing) {
    return (
      <ErrorState 
        title="Error" 
        message={error}
        onRetry={loadCart}
      />
    );
  }

  if (orderCreated) {
    const orderId = orderCreated._id || orderCreated.id;
    return (
      <SuccessState
        title="¡Pedido confirmado!"
        message="Tu pedido ha sido procesado correctamente. Recibirás un email con los detalles."
        actionLabel="Ver mi pedido"
        onAction={() => navigate(`/order/${orderId}`)}
      />
    );
  }

  return (
    <HFCheckout 
      cart={cart}
      onNavigate={handleNavigate}
      onSubmit={handleSubmit}
      isProcessing={isProcessing}
    />
  );
};

