import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const location = useLocation();

  console.log('🔒 [ProtectedRoute] Validando acceso:', {
    isAuthenticated,
    isAdmin,
    requireAdmin,
    userRole: user?.role,
    user
  });

  if (!isAuthenticated) {
    // Redirigir al login, guardando la ubicación desde donde vino
    console.log('⛔ [ProtectedRoute] Usuario no autenticado, redirigiendo a /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Usuario autenticado pero no es admin
    console.log('⛔ [ProtectedRoute] Usuario autenticado pero NO es admin, redirigiendo a /unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('✅ [ProtectedRoute] Acceso permitido');
  return <>{children}</>;
};
