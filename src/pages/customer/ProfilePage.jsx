import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import HFProfile from '../../../components/design-system/high-fidelity/HFProfile';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos del perfil
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Intentar obtener perfil completo del API
        const profile = await authService.getProfile();
        setProfileData(profile.data || profile);
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

  const handleNavigate = (screenId) => {
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
    // TODO: Implementar actualización de perfil cuando el backend lo soporte
    // Por ahora, solo actualizar el estado local
    console.log('Datos a guardar:', formData);
    setProfileData(prev => ({ ...prev, ...formData }));
    // Simular delay para feedback visual
    await new Promise(resolve => setTimeout(resolve, 500));
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
    <HFProfile 
      user={profileData} 
      onSave={handleSave}
      onNavigate={handleNavigate} 
    />
  );
};

