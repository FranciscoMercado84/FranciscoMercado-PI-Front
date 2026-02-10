import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HFHeader from '../../../components/design-system/high-fidelity/HFHeader';
import HFLanding from '../../../components/design-system/high-fidelity/HFLanding';
import HFFooter from '../../../components/design-system/high-fidelity/HFFooter';
import { productService, carritoService } from '../../services/api';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);

  // Cargar carrito para obtener el conteo
  useEffect(() => {
    const loadCartCount = async () => {
      if (isAuthenticated) {
        try {
          const cart = await carritoService.get();
          const items = cart.items || cart.productos || [];
          const count = items.reduce((sum, item) => sum + (item.cantidad || item.quantity || 1), 0);
          setCartCount(count);
        } catch (err) {
          console.error('Error al cargar carrito:', err);
        }
      }
    };
    loadCartCount();
  }, [isAuthenticated]);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const response = await productService.getAll();
        const products = Array.isArray(response) ? response : (response.data || response.productos || []);
        
        // Mezclar productos aleatoriamente y tomar 4 para rotación
        const shuffled = [...products].sort(() => Math.random() - 0.5);
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (err) {
        console.error('Error al cargar productos destacados:', err);
      }
    };

    loadFeaturedProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const productId = product.id || product._id;
      await carritoService.addItem(productId, 1);
      
      // Actualizar contador del carrito
      setCartCount(prev => prev + 1);
      
      // Mostrar notificación de éxito
      const productName = product.name || product.nombre || 'Producto';
      setToast({ message: `${productName} añadido al carrito`, type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
    }
  };

  const handleNavigate = (screenId, productId) => {
    if (screenId === 'product-detail' && productId) {
      navigate(`/product/${productId}`);
      return;
    }

    const routes = {
      'login': '/login',
      'register': '/register',
      'catalog': '/catalog',
      'cart': '/cart',
      'profile': '/profile',
      'landing': '/',
      'admin-login': '/admin/login',
      'contact': 'footer'
    };
    
    const route = routes[screenId];
    if (route === 'footer') {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <div>
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
          fontWeight: '500',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <span style={{ fontSize: '18px' }}>✓</span>
          {toast.message}
        </div>
      )}
      <HFHeader 
        isAuthenticated={!!user} 
        cartItems={cartCount} 
        variant="transparent" 
        onNavigate={handleNavigate}
        onLogout={logout}
      />
      <HFLanding 
        onNavigate={handleNavigate} 
        featuredProducts={featuredProducts}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

