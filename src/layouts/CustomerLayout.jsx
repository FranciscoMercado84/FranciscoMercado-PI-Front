import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import HFHeader from '../../components/design-system/high-fidelity/HFHeader';
import HFFooter from '../../components/design-system/high-fidelity/HFFooter';

export const CustomerLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const handleNavigate = (screenId) => {
    const routes = {
      'landing': '/',
      'catalog': '/catalog',
      'cart': '/cart',
      'profile': '/profile',
      'login': '/login',
      'privacy': '/privacidad',
      'terms': '/terminos',
      'cookies': '/cookies',
      'about': '/#about',
      'contact': '/#contact'
    };

    if (screenId === 'about' || screenId === 'contact') {
      navigate(routes[screenId]);
      return;
    }

    const route = routes[screenId];
    if (route) {
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
