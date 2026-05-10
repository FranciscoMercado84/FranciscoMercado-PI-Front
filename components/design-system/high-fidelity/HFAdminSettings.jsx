import React, { useEffect, useState } from 'react';
import { Clock, Phone, Mail, Save } from 'lucide-react';
import { configService } from '../../../src/services/api';

export default function HFAdminSettings() {
  const [values, setValues] = useState({
    contactPhone: '+34 911 284 763',
    contactEmail: 'admin@panaderia.com',
    hours: {
      weekday: {
        morningOpen: '07:00',
        morningClose: '14:30',
        afternoonOpen: '17:30',
        afternoonClose: '20:30'
      },
      saturday: { open: '07:00', close: '14:30' },
      sunday: { open: '07:00', close: '14:30' }
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadConfig = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await configService.get();
        const data = response?.data || response || {};

        if (active && data) {
          setValues(prev => ({
            ...prev,
            ...data,
            hours: {
              ...prev.hours,
              ...(data.hours || {})
            }
          }));
        }
      } catch (err) {
        console.error('Error al cargar configuración:', err);
        if (active) setError(err.message || 'No se pudo cargar la configuración');
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadConfig();

    return () => {
      active = false;
    };
  }, []);

  const handleFieldChange = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleHorarioChange = (section, field, val) => {
    setValues((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [section]: {
          ...prev.hours[section],
          [field]: val
        }
      }
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await configService.update(values);
      const data = response?.data || response || {};
      if (data) {
        setValues(prev => ({
          ...prev,
          ...data,
          hours: {
            ...prev.hours,
            ...(data.hours || {})
          }
        }));
      }

      alert('Configuración guardada correctamente.');
    } catch (err) {
      console.error('Error al guardar configuración:', err);
      setError(err.message || 'No se pudo guardar la configuración');
      alert('No se pudo guardar la configuración: ' + (err.message || 'Error'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !error) {
    return (
      <div style={{
        background: 'var(--color-neutral-100)',
        minHeight: '100vh',
        fontFamily: 'var(--font-primary)',
        padding: 'var(--space-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: 'var(--color-neutral-700)' }}>Cargando configuración...</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-6)'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--font-size-h2)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-neutral-900)',
          marginBottom: 'var(--space-2)'
        }}>
          Configuración General
        </h1>
        <p style={{
          fontSize: 'var(--font-size-body-m)',
          color: 'var(--color-neutral-700)',
          marginBottom: 'var(--space-8)'
        }}>
          Ajustes generales del negocio
        </p>

        {error && (
          <div style={{
            marginBottom: 'var(--space-6)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-error-light)',
            color: 'var(--color-error)'
          }}>
            {error}
          </div>
        )}

        {/* Business Info */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-4)'
          }}>
            Información de Contacto
          </h2>

          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <Phone size={18} style={{ color: 'var(--color-secondary)' }} /> Teléfono de Contacto
              </label>
              <input value={values.contactPhone} onChange={(e) => handleFieldChange('contactPhone', e.target.value)} style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--color-neutral-300)', borderRadius: 'var(--radius-lg)' }} />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <Mail size={18} style={{ color: 'var(--color-secondary)' }} /> Email de Contacto y del Formulario
              </label>
              <input value={values.contactEmail} onChange={(e) => handleFieldChange('contactEmail', e.target.value)} style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--color-neutral-300)', borderRadius: 'var(--radius-lg)' }} />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h2 style={{ fontSize: 'var(--font-size-h5)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-900)', marginBottom: 'var(--space-4)' }}>
            <Clock size={20} style={{ marginRight: 'var(--space-2)', verticalAlign: 'middle', color: 'var(--color-secondary)' }} /> Horario de Atención
          </h2>

          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(4, minmax(100px, 1fr))', gap: 'var(--space-3)', alignItems: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-body-m)', fontWeight: 'var(--font-weight-semibold)' }}>Lunes a Viernes</div>
              <div>
                <div style={{ fontSize: 'var(--font-size-body-s)', marginBottom: 'var(--space-1)', color: 'var(--color-neutral-700)' }}>Mañana abre</div>
                <input type="time" value={values.hours.weekday.morningOpen} onChange={(e) => handleHorarioChange('weekday', 'morningOpen', e.target.value)} style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-neutral-300)', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-body-s)', marginBottom: 'var(--space-1)', color: 'var(--color-neutral-700)' }}>Mañana cierra</div>
                <input type="time" value={values.hours.weekday.morningClose} onChange={(e) => handleHorarioChange('weekday', 'morningClose', e.target.value)} style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-neutral-300)', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-body-s)', marginBottom: 'var(--space-1)', color: 'var(--color-neutral-700)' }}>Tarde abre</div>
                <input type="time" value={values.hours.weekday.afternoonOpen} onChange={(e) => handleHorarioChange('weekday', 'afternoonOpen', e.target.value)} style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-neutral-300)', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-body-s)', marginBottom: 'var(--space-1)', color: 'var(--color-neutral-700)' }}>Tarde cierra</div>
                <input type="time" value={values.hours.weekday.afternoonClose} onChange={(e) => handleHorarioChange('weekday', 'afternoonClose', e.target.value)} style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-neutral-300)', borderRadius: 'var(--radius-lg)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: 'var(--space-3)', alignItems: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-body-m)', fontWeight: 'var(--font-weight-semibold)' }}>Sábado</div>
              <div>
                <div style={{ fontSize: 'var(--font-size-body-s)', marginBottom: 'var(--space-1)', color: 'var(--color-neutral-700)' }}>Abre</div>
                <input type="time" value={values.hours.saturday.open} onChange={(e) => handleHorarioChange('saturday', 'open', e.target.value)} style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-neutral-300)', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-body-s)', marginBottom: 'var(--space-1)', color: 'var(--color-neutral-700)' }}>Cierra</div>
                <input type="time" value={values.hours.saturday.close} onChange={(e) => handleHorarioChange('saturday', 'close', e.target.value)} style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-neutral-300)', borderRadius: 'var(--radius-lg)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: 'var(--space-3)', alignItems: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-body-m)', fontWeight: 'var(--font-weight-semibold)' }}>Domingo</div>
              <div>
                <div style={{ fontSize: 'var(--font-size-body-s)', marginBottom: 'var(--space-1)', color: 'var(--color-neutral-700)' }}>Abre</div>
                <input type="time" value={values.hours.sunday.open} onChange={(e) => handleHorarioChange('sunday', 'open', e.target.value)} style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-neutral-300)', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-body-s)', marginBottom: 'var(--space-1)', color: 'var(--color-neutral-700)' }}>Cierra</div>
                <input type="time" value={values.hours.sunday.close} onChange={(e) => handleHorarioChange('sunday', 'close', e.target.value)} style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-neutral-300)', borderRadius: 'var(--radius-lg)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={handleSave} style={{ width: '100%', padding: 'var(--space-4)', background: 'var(--color-secondary)', color: 'white', border: 'none', borderRadius: 'var(--radius-lg)', fontSize: 'var(--font-size-h6)', fontWeight: 'var(--font-weight-semibold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', boxShadow: 'var(--shadow-medium)' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-secondary-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-high)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-secondary)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-medium)'; }}>
          <Save size={18} /> Guardar Configuración
        </button>
      </div>
    </div>
  );
}

