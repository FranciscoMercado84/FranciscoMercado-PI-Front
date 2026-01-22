import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';

export default function HFConfirmation({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--color-success-light), var(--color-primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-lg)' }}>
      <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <div style={{
          width: '120px',
          height: '120px',
          background: 'var(--color-success)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--spacing-xl)',
          boxShadow: 'var(--shadow-high)'
        }}>
          <CheckCircle size={64} color="white" />
        </div>

        <h1 style={{ fontSize: isMobile ? 'var(--font-size-h2)' : 'var(--font-size-h1)', fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)', margin: 0, marginBottom: 'var(--spacing-md)' }}>
          ¡Pedido Confirmado!
        </h1>
        <p style={{ fontSize: 'var(--font-size-body-lg)', color: 'var(--color-neutral-700)', marginBottom: 'var(--spacing-2xl)' }}>
          Tu pedido ha sido procesado correctamente
        </p>

        <div className="card" style={{ textAlign: 'left', marginBottom: 'var(--spacing-xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
              Número de pedido
            </p>
            <p style={{ fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)', margin: 0, fontFamily: 'monospace' }}>
              #PEDIDO-1234
            </p>
          </div>

          <div style={{ padding: 'var(--spacing-lg)', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
              <Calendar size={20} style={{ color: 'var(--color-primary)' }} />
              <div>
                <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-600)', margin: 0 }}>Fecha de recogida</p>
                <p style={{ fontSize: 'var(--font-size-body-m)', fontWeight: 'var(--font-weight-semibold)', margin: 0 }}>Hoy, 15 de Enero</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <Clock size={20} style={{ color: 'var(--color-primary)' }} />
              <div>
                <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-600)', margin: 0 }}>Hora</p>
                <p style={{ fontSize: 'var(--font-size-body-m)', fontWeight: 'var(--font-weight-semibold)', margin: 0 }}>12:00 - 12:30</p>
              </div>
            </div>
          </div>

          <div className="alert alert-info">
            <p style={{ margin: 0, fontSize: 'var(--font-size-body-s)' }}>
              Te hemos enviado un email de confirmación con todos los detalles de tu pedido.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexDirection: isMobile ? 'column' : 'row' }}>
          <button className="btn btn-primary" style={{ flex: 1 }}>Ver Mi Pedido</button>
          <button className="btn btn-secondary" style={{ flex: 1 }}>Volver al Inicio</button>
        </div>
      </div>
    </div>
  );
}

