import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFCart from '../../../components/design-system/high-fidelity/HFCart';
import HFCartEmpty from '../../../components/design-system/high-fidelity/HFCartEmpty';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { carritoService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await carritoService.get();
      setCart(response.data || response);
    } catch (err) {
      console.error('Error al cargar carrito:', err);
      // Si es 404, el carrito está vacío
      if (err.status === 404) {
        setCart({ items: [] });
      } else {
        setError(err.message || 'Error al cargar el carrito');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await carritoService.updateItem(itemId, newQuantity);
      await loadCart();
    } catch (err) {
      console.error('Error al actualizar cantidad:', err);
      alert(err.message || 'Error al actualizar la cantidad');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await carritoService.removeItem(itemId);
      await loadCart();
    } catch (err) {
      console.error('Error al eliminar item:', err);
      alert(err.message || 'Error al eliminar el producto');
    }
  };

  const handleClearCart = async () => {
    try {
      await carritoService.clear();
      setCart({ items: [] });
    } catch (err) {
      console.error('Error al vaciar carrito:', err);
      alert(err.message || 'Error al vaciar el carrito');
    }
  };

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

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return (
      <HFCartEmpty 
        onNavigate={handleNavigate}
        message="Inicia sesión para ver tu carrito"
      />
    );
  }

  if (isLoading) {
    return <LoadingState message="Cargando carrito..." />;
  }

  if (error) {
    return (
      <ErrorState 
        title="Error al cargar el carrito" 
        message={error}
        onRetry={loadCart}
      />
    );
  }

  // Verificar si el carrito está vacío
  const cartItems = cart?.items || cart?.productos || [];
  if (!cartItems.length) {
    return <HFCartEmpty onNavigate={handleNavigate} />;
  }

  return (
    <HFCart 
      cart={cart}
      onNavigate={handleNavigate}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onClearCart={handleClearCart}
    />
  );
};

