import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFProductCatalog from '../../../components/design-system/high-fidelity/HFProductCatalog';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { EmptyState } from '../../components/states/EmptyState';
import { productService, carritoService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const CatalogPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productService.getAll();
      // La respuesta puede venir como response.data o directamente como array
      const productList = response.data || response || [];
      setProducts(Array.isArray(productList) ? productList : []);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      await carritoService.addItem(productId, 1);
      // TODO: Mostrar notificación de éxito
      alert('Producto agregado al carrito');
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      alert(err.message || 'Error al agregar el producto');
    }
  };

  const handleNavigate = (screenId, productId) => {
    if (screenId === 'product-detail' && productId) {
      navigate(`/product/${productId}`);
    } else {
      const routes = {
        'product-detail': '/product/1',
        'cart': '/cart',
        'profile': '/profile'
      };
      
      const route = routes[screenId];
      if (route) {
        navigate(route);
      }
    }
  };

  if (isLoading) {
    return <LoadingState message="Cargando catálogo..." />;
  }

  if (error) {
    return (
      <ErrorState 
        title="Error al cargar el catálogo" 
        message={error}
        onRetry={loadProducts}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No hay productos disponibles"
        message="Aún no hay productos en el catálogo. Vuelve pronto."
      />
    );
  }

  return (
    <HFProductCatalog 
      products={products}
      onNavigate={handleNavigate}
      onAddToCart={handleAddToCart}
    />
  );
};

