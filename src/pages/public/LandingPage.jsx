import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import HFHeader from '../../../components/design-system/high-fidelity/HFHeader';
import HFLanding from '../../../components/design-system/high-fidelity/HFLanding';
import { productService } from '../../services/api';

export const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount, addItem } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [toast, setToast] = useState(null);

  // Procesar hash de la URL para scroll a sección
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'about' || hash === 'contact') {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [location.hash]);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        // Intentar obtener los productos más vendidos
        const bestSellers = await productService.getBestSellers(4);
        const products = Array.isArray(bestSellers) ? bestSellers : (bestSellers.data || bestSellers.productos || []);

        if (products.length > 0) {
          setFeaturedProducts(products);
        } else {
          // Si no hay datos de ventas, obtener todos y mostrar algunos
          const response = await productService.getAll();
          const allProducts = Array.isArray(response) ? response : (response.data || response.productos || []);
          setFeaturedProducts(allProducts.slice(0, 4));
        }
      } catch (err) {
        console.error('Error al cargar productos destacados:', err);
        // Fallback: cargar productos normales
        try {
          const response = await productService.getAll();
          const products = Array.isArray(response) ? response : (response.data || response.productos || []);
          setFeaturedProducts(products.slice(0, 4));
        } catch (fallbackErr) {
          console.error('Error en fallback:', fallbackErr);
        }
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
      await addItem(productId, 1);

      // Mostrar notificación de éxito
      const productName = product.name || product.nombre || 'Producto';
      setToast({ message: `${productName} añadido al carrito`, type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      setToast({ message: 'Error al agregar al carrito', type: 'error' });
      setTimeout(() => setToast(null), 3000);
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
      'contact': 'scroll-contact',
      'about': 'scroll-about'
    };
    
    const route = routes[screenId];
    if (route === 'scroll-contact') {
      setTimeout(() => {
        const contact = document.getElementById('contact');
        if (contact) {
          contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else if (route === 'scroll-about') {
      setTimeout(() => {
        const about = document.getElementById('about');
        if (about) {
          about.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
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

