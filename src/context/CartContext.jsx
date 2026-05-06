import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { carritoService } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar carrito desde el backend
  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [], total: 0 });
      setCartCount(0);
      return;
    }

    try {
      setIsLoading(true);
      const response = await carritoService.get();
      const data = response.data || response;
      const items = data.items || data.productos || [];
      const count = items.reduce((sum, item) => sum + (item.cantidad || item.quantity || 1), 0);
      const total = items.reduce((sum, item) => {
        const precio = item.precio || item.price || item.producto?.precio || item.producto?.price || 0;
        const qty = item.cantidad || item.quantity || 1;
        return sum + (precio * qty);
      }, 0);

      setCart({ items, total });
      setCartCount(count);
    } catch (err) {
      console.error('Error al cargar carrito:', err);
      // Si es 404, el carrito está vacío (no es error real)
      if (err.status === 404) {
        setCart({ items: [], total: 0 });
        setCartCount(0);
      }
      // Para otros errores, NO reseteamos - mantenemos el estado actual
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Cargar carrito cuando cambie la autenticación
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Agregar item al carrito
  const addItem = async (productId, quantity = 1) => {
    // Actualizar contador inmediatamente (optimistic update)
    setCartCount(prev => prev + quantity);

    try {
      await carritoService.addItem(productId, quantity);
      // Recargar carrito completo después de un pequeño delay para evitar race conditions
      setTimeout(() => loadCart(), 300);
      return true;
    } catch (err) {
      // Revertir el optimistic update si falla
      setCartCount(prev => Math.max(0, prev - quantity));
      console.error('Error al agregar al carrito:', err);
      throw err;
    }
  };

  // Actualizar cantidad de un item
  const updateItemQuantity = async (productId, quantity) => {
    try {
      await carritoService.updateItem(productId, quantity);
      loadCart();
      return true;
    } catch (err) {
      console.error('Error al actualizar carrito:', err);
      throw err;
    }
  };

  // Eliminar item del carrito
  const removeItem = async (productId) => {
    try {
      await carritoService.removeItem(productId);
      loadCart();
      return true;
    } catch (err) {
      console.error('Error al eliminar del carrito:', err);
      throw err;
    }
  };

  // Limpiar carrito
  const clearCart = async () => {
    try {
      await carritoService.clear();
      setCart({ items: [], total: 0 });
      setCartCount(0);
      return true;
    } catch (err) {
      console.error('Error al limpiar carrito:', err);
      throw err;
    }
  };

  const value = {
    cart,
    cartCount,
    isLoading,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    refreshCart: loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};
