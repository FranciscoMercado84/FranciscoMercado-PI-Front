import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { carritoService } from '../services/api';
import HFHeader from '../../components/design-system/high-fidelity/HFHeader';
import HFFooter from '../../components/design-system/high-fidelity/HFFooter';

export const CustomerLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  // Cargar cantidad de items en el carrito
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
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };
    loadCartCount();
  }, [isAuthenticated]);

  const handleNavigate = (screenId) => {
    const routes = {
      'landing': '/',
      'catalog': '/catalog',
      'cart': '/cart',
      'profile': '/profile',
      'login': '/login',
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
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-neutral-100)',
      fontFamily: 'var(--font-primary)'
    }}>
      <HFHeader 
        isAuthenticated={!!user} 
        cartItems={cartCount} 
        variant="transparent" 
        onNavigate={handleNavigate}
        onLogout={logout}
      />
      <main>
        {children || <Outlet />}
      </main>
      <HFFooter onNavigate={handleNavigate} />
    </div>
  );
};
