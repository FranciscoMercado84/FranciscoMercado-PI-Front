import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  ShoppingCart, 
  User, 
  LogOut,
  LayoutDashboard,
  Package,
  ClipboardList,
  Settings,
  BarChart3
} from 'lucide-react';

export const CustomerNav = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: 'var(--color-neutral-50)',
      borderBottom: '1px solid var(--color-neutral-300)',
      padding: '16px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link to="/" style={{ 
          fontSize: 'var(--font-size-h4)', 
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-primary-600)',
          textDecoration: 'none'
        }}>
          🥖 Panadería Artesanal
        </Link>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to="/catalog" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: isActive('/catalog') ? 'var(--color-primary-600)' : 'var(--color-neutral-700)',
            textDecoration: 'none',
            fontWeight: isActive('/catalog') ? 'var(--font-weight-medium)' : 'normal'
          }}>
            <Home size={18} />
            Catálogo
          </Link>
          
          <Link to="/cart" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: isActive('/cart') ? 'var(--color-primary-600)' : 'var(--color-neutral-700)',
            textDecoration: 'none',
            fontWeight: isActive('/cart') ? 'var(--font-weight-medium)' : 'normal'
          }}>
            <ShoppingCart size={18} />
            Carrito
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link to="/profile" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--color-neutral-700)',
          textDecoration: 'none'
        }}>
          <User size={18} />
          Perfil
        </Link>
        
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-neutral-700)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <LogOut size={18} />
          Salir
        </button>
      </div>
    </nav>
  );
};

export const AdminNav = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: 'var(--color-neutral-900)',
      color: 'var(--color-neutral-50)',
      padding: '16px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link to="/admin" style={{ 
          fontSize: 'var(--font-size-h4)', 
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-neutral-50)',
          textDecoration: 'none'
        }}>
          🥖 Admin Panel
        </Link>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to="/admin/dashboard" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: isActive('/admin/dashboard') ? 'var(--color-primary-400)' : 'var(--color-neutral-300)',
            textDecoration: 'none',
            fontWeight: isActive('/admin/dashboard') ? 'var(--font-weight-medium)' : 'normal'
          }}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          
          <Link to="/admin/products" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: isActive('/admin/products') ? 'var(--color-primary-400)' : 'var(--color-neutral-300)',
            textDecoration: 'none',
            fontWeight: isActive('/admin/products') ? 'var(--font-weight-medium)' : 'normal'
          }}>
            <Package size={18} />
            Productos
          </Link>
          
          <Link to="/admin/orders" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: isActive('/admin/orders') ? 'var(--color-primary-400)' : 'var(--color-neutral-300)',
            textDecoration: 'none',
            fontWeight: isActive('/admin/orders') ? 'var(--font-weight-medium)' : 'normal'
          }}>
            <ClipboardList size={18} />
            Pedidos
          </Link>
          
          <Link to="/admin/reports" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: isActive('/admin/reports') ? 'var(--color-primary-400)' : 'var(--color-neutral-300)',
            textDecoration: 'none',
            fontWeight: isActive('/admin/reports') ? 'var(--font-weight-medium)' : 'normal'
          }}>
            <BarChart3 size={18} />
            Reportes
          </Link>
          
          <Link to="/admin/settings" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: isActive('/admin/settings') ? 'var(--color-primary-400)' : 'var(--color-neutral-300)',
            textDecoration: 'none',
            fontWeight: isActive('/admin/settings') ? 'var(--font-weight-medium)' : 'normal'
          }}>
            <Settings size={18} />
            Configuración
          </Link>
        </div>
      </div>

      <button
        onClick={logout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'transparent',
          border: '1px solid var(--color-neutral-700)',
          color: 'var(--color-neutral-50)',
          cursor: 'pointer',
          padding: '8px 16px',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <LogOut size={18} />
        Salir
      </button>
    </nav>
  );
};
