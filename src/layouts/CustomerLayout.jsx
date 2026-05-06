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
      'login': '/login'
    };

    // Para about y contact, verificar si estamos en la landing
    if (screenId === 'about' || screenId === 'contact') {
      const element = document.getElementById(screenId);
      if (element) {
        // Si el elemento existe, hacer scroll
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Si no existe, navegar a la landing con hash
        navigate(`/#${screenId}`);
      }
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
