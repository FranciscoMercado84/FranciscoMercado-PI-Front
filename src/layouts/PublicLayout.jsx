import React from 'react';
import { Outlet } from 'react-router-dom';

export const PublicLayout = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-neutral-100)',
      fontFamily: 'var(--font-primary)'
    }}>
      {children || <Outlet />}
    </div>
  );
};
