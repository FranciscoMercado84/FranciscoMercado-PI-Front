import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { authService, pedidoService } from '../../services/api';
import HFProfile from '../../../components/design-system/high-fidelity/HFProfile';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { refreshCart } = useCart();
  const [profileData, setProfileData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderNotifications, setOrderNotifications] = useState([]);
  const [nextPickupSummary, setNextPickupSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const getOrderStatusStorageKey = () => {
    const storageId = user?.id || user?.email || 'guest';
    return `panaderia-puri:order-status:${storageId}`;
  };

  const normalizeStatus = (value) => (value || '').toLowerCase().replace(/_/g, ' ').trim();

  const normalizeOrders = (response) => {
    const ordersData = Array.isArray(response) ? response : (response?.data || response?.pedidos || []);

    return ordersData.map((order) => ({
      id: order.id || order._id || order.numero || order.numero_pedido,
      status: order.status || order.estado || order.state || 'pending',
      total: Number(order.total || order.total_pedido || 0),
      items: order.items || order.productos || [],
      date: order.fecha || order.createdAt || order.created_at || order.date,
      pickupDate: order.hora_recogida || order.fecha_recogida || order.pickupDate || order.pickup_date || order.recogida_hora,
      pickupTime: order.hora || order.time || order.pickupTime,
      raw: order
    })).filter((order) => order.id);
  };

  const formatPickupSummary = (order) => {
    if (!order) {
      return null;
    }

    const dateSource = order.pickupDate || order.date;
    if (!dateSource) {
      return null;
    }

    const dateObject = new Date(dateSource);
    if (Number.isNaN(dateObject.getTime())) {
      return null;
    }

    const dateLabel = dateObject.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });

    const timeLabel = order.pickupTime
      ? order.pickupTime
      : dateObject.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit'
        });

    return `Tu próximo pedido para el ${dateLabel} a las ${timeLabel}`;
  };

  const updateOrderInsights = (ordersList) => {
    const storageKey = getOrderStatusStorageKey();
    let previousStatuses = {};

    try {
      previousStatuses = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (error) {
      previousStatuses = {};
    }

    const currentStatuses = {};
    const changedOrders = [];

    ordersList.forEach((order) => {
      const normalizedStatus = normalizeStatus(order.status);
      currentStatuses[order.id] = normalizedStatus;

      if (previousStatuses[order.id] && previousStatuses[order.id] !== normalizedStatus) {
        changedOrders.push({
          ...order,
          previousStatus: previousStatuses[order.id],
          currentStatus: normalizedStatus
        });
      }
    });

    localStorage.setItem(storageKey, JSON.stringify(currentStatuses));
    setOrderNotifications(changedOrders.slice(0, 3));

    const upcomingOrder = ordersList.find((order) => {
      const status = normalizeStatus(order.status);
      const hasPickupDate = Boolean(order.pickupDate || order.date);
      return hasPickupDate && ['pending', 'pendiente', 'preparando', 'en proceso', 'listo'].includes(status);
    });

    setNextPickupSummary(formatPickupSummary(upcomingOrder));
  };

  // Cargar datos del perfil
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profileResult, ordersResult] = await Promise.allSettled([
          authService.getProfile(),
          pedidoService.getMisPedidos()
        ]);

        if (profileResult.status === 'fulfilled') {
          const profile = profileResult.value;
          setProfileData(profile.data || profile);
        } else if (user) {
          setProfileData(user);
        }

        if (ordersResult.status === 'fulfilled') {
          const normalizedOrders = normalizeOrders(ordersResult.value);
          setOrders(normalizedOrders);
          updateOrderInsights(normalizedOrders);
        } else {
          setOrders([]);
          setOrderNotifications([]);
          setNextPickupSummary(null);
        }
      } catch (err) {
        console.error('Error al cargar perfil:', err);
        // Usar datos del contexto de autenticación como fallback
        if (user) {
          setProfileData(user);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleNavigate = (screenId, payload) => {
    if (screenId === 'order-detail' && payload) {
      navigate(`/order/${payload}`);
      return;
    }

    const routes = {
      'orders': '/orders',
      'catalog': '/catalog',
      'login': '/login',
      'landing': '/'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  const handleSave = async (formData) => {
    const response = await authService.updateProfile(formData);
    const updatedProfile = response.data || response.user || response;
    const mergedProfile = {
      ...(profileData || user || {}),
      ...(updatedProfile?.user || updatedProfile),
      ...formData,
    };

    setProfileData(mergedProfile);
    updateUser?.({
      nombre: mergedProfile.nombre || mergedProfile.name,
      name: mergedProfile.nombre || mergedProfile.name,
      email: mergedProfile.email,
      telefono: mergedProfile.telefono,
      direccion: mergedProfile.direccion,
      cedula: mergedProfile.cedula,
    });

    setToast({ message: 'Perfil actualizado correctamente', type: 'success' });
    window.setTimeout(() => setToast(null), 3000);

    return mergedProfile;
  };

  const handleReorder = async (orderId) => {
    try {
      const result = await pedidoService.repetirPedido(orderId);
      if (!result?.success) {
        throw new Error('No se pudieron añadir los productos del pedido');
      }

      await refreshCart();

      setToast({
        message: `Pedido añadido al carrito (${result.itemsAdded} producto${result.itemsAdded === 1 ? '' : 's'})`,
        type: 'success'
      });
      window.setTimeout(() => setToast(null), 3000);
      navigate('/cart');
    } catch (error) {
      console.error('Error al repetir pedido:', error);
      setToast({ message: error.message || 'No se pudo repetir el pedido', type: 'error' });
      window.setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'var(--font-primary)'
      }}>
        Cargando perfil...
      </div>
    );
  }

  return (
    <>
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
      <HFProfile 
        user={profileData}
        recentOrders={orders.slice(0, 3)}
        orderNotifications={orderNotifications}
        nextPickupSummary={nextPickupSummary}
        onSave={handleSave}
        onReorder={handleReorder}
        onNavigate={handleNavigate} 
      />
    </>
  );
};

