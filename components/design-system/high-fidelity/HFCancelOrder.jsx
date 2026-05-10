import React, { useState } from 'react';
import HFHeader from './HFHeader';
import HFFooter from './HFFooter';
import { AlertTriangle, X } from 'lucide-react';

export default function HFCancelOrder() {
  const [reason, setReason] = useState('');

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <HFHeader isAuthenticated cartItems={0} />

      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: 'var(--space-10) var(--space-6)'
      }}>
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          border: '2px solid var(--color-error)',
          padding: 'var(--space-10)',
          boxShadow: 'var(--shadow-high)'
        }}>
          {/* Warning Icon */}
          <div style={{
            width: '100px',
            height: '100px',
            background: 'var(--color-error-light)',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-6)',
            border: '3px solid var(--color-error)'
          }}>
            <AlertTriangle size={50} style={{ color: 'var(--color-error)' }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-neutral-900)',
            textAlign: 'center',
            marginBottom: 'var(--space-3)'
          }}>
            Cancelar Pedido
          </h1>

          <p style={{
            fontSize: 'var(--font-size-body-lg)',
            color: 'var(--color-neutral-700)',
            textAlign: 'center',
            marginBottom: 'var(--space-8)',
            lineHeight: 1.6
          }}>
            ¿Estás seguro de que deseas cancelar este pedido?
          </p>

          {/* Order Summary */}
          <div style={{
            background: 'var(--color-neutral-100)',
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--space-6)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-2)',
              fontSize: 'var(--font-size-body-m)'
            }}>
              <span style={{ color: 'var(--color-neutral-700)' }}>Total del pedido:</span>
              <span style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-neutral-900)' }}>$22.15</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--font-size-body-m)'
            }}>
              <span style={{ color: 'var(--color-neutral-700)' }}>Fecha de recogida:</span>
              <span style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-neutral-900)' }}>8 de Enero, 14:00</span>
            </div>
          </div>

          {/* Reason */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label style={{
              display: 'block',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-2)'
            }}>
              Motivo de cancelación (Opcional)
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--space-3) var(--space-4)',
                border: '2px solid var(--color-neutral-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-body-m)',
                outline: 'none',
                cursor: 'pointer',
                background: 'white',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-error)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-error-light)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="">Selecciona un motivo...</option>
              <option value="change-mind">Cambié de opinión</option>
              <option value="wrong-order">Pedido equivocado</option>
              <option value="schedule">Problema con el horario</option>
              <option value="other">Otro motivo</option>
            </select>
          </div>

          {/* Warning Message */}
          <div style={{
            background: 'var(--color-error-bg)',
            border: '1px solid var(--color-error)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
            fontSize: 'var(--font-size-body-s)',
            color: 'var(--color-neutral-900)',
            lineHeight: 1.6
          }}>
            <strong>⚠️ Importante:</strong> Una vez cancelado, este pedido no podrá ser recuperado. Tendrás que realizar un nuevo pedido si cambias de opinión.
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <button style={{
              padding: 'var(--space-4)',
              background: 'white',
              border: '2px solid var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-neutral-500)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
            }}
            >
              No, Mantener Pedido
            </button>
            <button style={{
              padding: 'var(--space-4)',
              background: 'var(--color-error)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-body-m)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              boxShadow: 'var(--shadow-medium)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-error-dark)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-high)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-error)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
            }}
            >
              <X size={20} />
              Sí, Cancelar Pedido
            </button>
          </div>
        </div>
      </div>

      <HFFooter />
    </div>
  );
}

