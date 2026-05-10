import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/api';
import HFResetPassword from '../../../components/design-system/high-fidelity/HFResetPassword';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [tokenChecking, setTokenChecking] = useState(Boolean(token));
  const [tokenError, setTokenError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenError('Falta el token de restablecimiento. Solicita un nuevo enlace.');
        setTokenChecking(false);
        return;
      }

      try {
        await authService.validateResetToken(token);
      } catch (err) {
        console.error('Error validando token de recuperación:', err);
        setTokenError(err.data?.message || err.data?.error || err.message || 'El enlace de recuperación no es válido o expiró.');
      } finally {
        setTokenChecking(false);
      }
    };

    validateToken();
  }, [token]);

  const handleReset = async ({ newPassword, confirmPassword }) => {
    if (!token) {
      setTokenError('No se encontró token para restablecer la contraseña.');
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError('Completa ambos campos de contraseña.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.resetPassword(token, newPassword);
      setSuccessMessage('Tu contraseña fue actualizada correctamente. Ya puedes iniciar sesión con la nueva contraseña.');
    } catch (err) {
      console.error('Error restableciendo contraseña:', err);
      setError(err.data?.message || err.data?.error || err.message || 'No se pudo actualizar la contraseña.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (screenId) => {
    if (screenId === 'login') {
      navigate('/login');
    } else if (screenId === 'recover') {
      navigate('/recover');
    } else if (screenId === 'landing') {
      navigate('/');
    }
  };

  return (
    <HFResetPassword
      onNavigate={handleNavigate}
      onSubmit={handleReset}
      isLoading={isLoading}
      error={error}
      successMessage={successMessage}
      tokenChecking={tokenChecking}
      tokenError={tokenError}
    />
  );
};