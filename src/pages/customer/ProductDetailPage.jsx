import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HFProductDetail from '../../../components/design-system/high-fidelity/HFProductDetail';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { productService, carritoService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productService.getById(id);
      setProduct(response.data || response);
    } catch (err) {
      console.error('Error al cargar producto:', err);
      setError(err.message || 'Error al cargar el producto');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      await carritoService.addItem(productId, quantity);
      // TODO: Mostrar notificación de éxito
      alert('Producto agregado al carrito');
      navigate('/cart');
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      alert(err.message || 'Error al agregar el producto');
    }
  };

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

  if (isLoading) {
    return <LoadingState message="Cargando producto..." />;
  }

  if (error) {
    return (
      <ErrorState 
        title="Error al cargar el producto" 
        message={error}
        onRetry={loadProduct}
      />
    );
  }

  if (!product) {
    return (
      <ErrorState 
        title="Producto no encontrado" 
        message="El producto que buscas no existe."
      />
    );
  }

  return (
    <HFProductDetail 
      product={product}
      onNavigate={handleNavigate}
      onAddToCart={handleAddToCart}
    />
  );
};

