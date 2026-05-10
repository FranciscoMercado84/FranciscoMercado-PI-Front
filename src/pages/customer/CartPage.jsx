import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HFCart from '../../../components/design-system/high-fidelity/HFCart';
import HFCartEmpty from '../../../components/design-system/high-fidelity/HFCartEmpty';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { carritoService, productService, pedidoService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { refreshCart, clearCart } = useCart();
  const [cart, setCart] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [frecuentProducts, setFrecuentProducts] = useState([]);
  const [resumeMessage, setResumeMessage] = useState(null);
  const [stockWarnings, setStockWarnings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const cartSnapshotRef = useRef(null);

  const getAbandonedCartKey = () => {
    const storageId = user?.id || user?.email || 'guest';
    return `panaderia-puri:abandoned-cart:${storageId}`;
  };

  const normalizeCartItems = (cartData) => {
    const rawItems = cartData?.items || cartData?.productos || [];

    return rawItems.map((item) => {
      const producto = item.producto || item;
      const stockValue = producto.stock ?? item.stock ?? item.existencia ?? item.existencias;
      const parsedStock = stockValue === null || stockValue === undefined || stockValue === ''
        ? null
        : Number(stockValue);

      return {
        id: item.id || item._id,
        productoId: producto._id || producto.id || item.productoId,
        name: producto.name || producto.nombre || item.name || item.nombre,
        price: producto.price || producto.precio || item.price || item.precio || 0,
        quantity: item.quantity || item.cantidad || 1,
        image: producto.image || producto.imagen_url || producto.imagen || item.image,
        emoji: producto.emoji || item.emoji,
        description: producto.description || producto.descripcion || item.description,
        stock: Number.isFinite(parsedStock) ? parsedStock : null
      };
    });
  };

  const readAbandonedSnapshot = () => {
    try {
      const rawSnapshot = localStorage.getItem(getAbandonedCartKey());
      if (!rawSnapshot) {
        return null;
      }

      return JSON.parse(rawSnapshot);
    } catch (error) {
      console.warn('No se pudo leer el carrito abandonado:', error);
      return null;
    }
  };

  const updateAbandonedNotice = () => {
    const snapshot = readAbandonedSnapshot();

    if (snapshot?.totalItems > 0) {
      setResumeMessage(`Has dejado ${snapshot.totalItems} producto${snapshot.totalItems === 1 ? '' : 's'} sin comprar`);
    } else {
      setResumeMessage(null);
    }
  };

  const saveAbandonedSnapshot = () => {
    if (!isAuthenticated) {
      return;
    }

    const currentCart = cartSnapshotRef.current || cart;
    const items = normalizeCartItems(currentCart);

    if (items.length === 0) {
      return;
    }

    const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalAmount = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);

    localStorage.setItem(getAbandonedCartKey(), JSON.stringify({
      totalItems,
      totalAmount,
      savedAt: new Date().toISOString()
    }));
  };

  const clearAbandonedSnapshot = () => {
    localStorage.removeItem(getAbandonedCartKey());
    setResumeMessage(null);
  };

  useEffect(() => {
    loadSuggestions();
    if (isAuthenticated) {
      loadCart();
      loadFrecuentProducts();
      updateAbandonedNotice();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    cartSnapshotRef.current = cart;
  }, [cart]);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveAbandonedSnapshot();
      }
    };

    const handleBeforeUnload = () => {
      saveAbandonedSnapshot();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      saveAbandonedSnapshot();
    };
  }, [isAuthenticated, user?.id, user?.email]);

  const loadFrecuentProducts = async () => {
    try {
      const productos = await pedidoService.getProductosFrecuentes(5);
      setFrecuentProducts(productos);
    } catch (err) {
      console.error('Error al cargar productos frecuentes:', err);
    }
  };

  const loadSuggestions = async () => {
    try {
      const response = await productService.getAll();
      const products = Array.isArray(response) ? response : (response.data || response.productos || []);
      // Mezclar y tomar 4 productos aleatorios
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setSuggestions(shuffled.slice(0, 4));
    } catch (err) {
      console.error('Error al cargar sugerencias:', err);
    }
  };

  const loadCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await carritoService.get();
      const cartData = response.data || response;
      setCart(cartData);
      const normalizedItems = normalizeCartItems(cartData);
      setStockWarnings(normalizedItems.filter((item) => item.stock !== null && (item.stock <= 0 || item.quantity > item.stock)));
    } catch (err) {
      console.error('Error al cargar carrito:', err);
      // Si es 404, el carrito está vacío
      if (err.status === 404) {
        setCart({ items: [] });
        setStockWarnings([]);
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
    const shouldClear = window.confirm('¿Seguro que quieres vaciar el carrito?');
    if (!shouldClear) {
      return;
    }

    try {
      await clearCart();
      setCart({ items: [] });
      setStockWarnings([]);
      clearAbandonedSnapshot();
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

  const handleNavigateWithParams = (screenId, payload) => {
    if (screenId === 'product-detail' && payload) {
      navigate(`/product/${payload}`);
      return;
    }

    handleNavigate(screenId);
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      const productId = product.id || product._id;
      await carritoService.addItem(productId, 1);
      await loadCart();
      refreshCart();
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      alert(err.message || 'Error al agregar el producto');
    }
  };

  const handleAddFrequentProduct = async (productId) => {
    try {
      await carritoService.addItem(productId, 1);
      await loadCart();
      refreshCart();
      setToast({ message: 'Producto añadido al carrito', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Error al agregar producto frecuente:', err);
      setToast({ message: err.message || 'Error al agregar el producto', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return (
      <HFCartEmpty 
        onNavigate={handleNavigateWithParams}
        suggestions={suggestions}
        onAddToCart={handleAddToCart}
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
    const snapshot = readAbandonedSnapshot();

    return (
      <HFCartEmpty 
        onNavigate={handleNavigateWithParams} 
        suggestions={suggestions}
        onAddToCart={handleAddToCart}
        resumeMessage={snapshot?.totalItems > 0
          ? `Has dejado ${snapshot.totalItems} producto${snapshot.totalItems === 1 ? '' : 's'} sin comprar`
          : resumeMessage}
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
      <HFCart
        cart={cart}
        onNavigate={handleNavigateWithParams}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        suggestions={suggestions}
        frecuentProducts={frecuentProducts}
        onAddFrequentProduct={handleAddFrequentProduct}
        isAuthenticated={isAuthenticated}
        resumeMessage={resumeMessage}
        stockWarnings={stockWarnings}
      />
    </>
  );
};

