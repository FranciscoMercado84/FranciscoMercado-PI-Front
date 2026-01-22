import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirigir al login, guardando la ubicación desde donde vino
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Usuario autenticado pero no es admin
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
