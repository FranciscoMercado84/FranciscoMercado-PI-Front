import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HFOrderDetail from '../../../components/design-system/high-fidelity/HFOrderDetail';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { pedidoService } from '../../services/api';

export const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      if (!id) {
        setError('ID de pedido no proporcionado');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await pedidoService.getById(id);
        // La respuesta puede ser el pedido directamente o estar en response.data
        const orderData = response.data || response.pedido || response;
        setOrder(orderData);
      } catch (err) {
        console.error('Error al cargar pedido:', err);
        setError(err.message || 'Error al cargar el pedido');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [id]);

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

  if (isLoading) {
    return <LoadingState message="Cargando detalles del pedido..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="No se pudo abrir el pedido"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <HFOrderDetail order={order} onNavigate={handleNavigate} />;
};

