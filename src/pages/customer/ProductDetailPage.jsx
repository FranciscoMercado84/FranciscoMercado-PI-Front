import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HFProductDetail from '../../../components/design-system/high-fidelity/HFProductDetail';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { productService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

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
      await addItem(productId, quantity);
      const productName = product?.nombre || product?.name || 'Producto';
      setToast({ message: `${productName} añadido al carrito`, type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      setToast({ message: err.message || 'Error al agregar el producto', type: 'error' });
      setTimeout(() => setToast(null), 3000);
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
    <>
      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 1000,
          padding: '12px 20px',
          background: toast.type === 'success' ? 'var(--color-success, #22c55e)' : 'var(--color-error, #ef4444)',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '500'
        }}>
          <span style={{ fontSize: '18px' }}>{toast.type === 'success' ? '✓' : '✕'}</span>
          {toast.message}
        </div>
      )}
      <HFProductDetail
        product={product}
        onNavigate={handleNavigate}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

