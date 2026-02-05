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
      // Opcional: mostrar notificación de éxito
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
      <HFHeader 
        isAuthenticated={!!user} 
        cartItems={0} 
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

