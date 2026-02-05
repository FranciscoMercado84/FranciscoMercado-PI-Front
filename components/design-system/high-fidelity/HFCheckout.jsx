import React from 'react';
import { User, Phone, Mail, Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

// Carrito por defecto
const defaultCart = {
  items: [
    { id: 1, name: 'Pan Integral', price: 4.20, quantity: 2 },
    { id: 2, name: 'Croissant', price: 2.80, quantity: 3 },
    { id: 3, name: 'Tarta', price: 15.00, quantity: 1 },
  ]
};

export default function HFCheckout({ onNavigate, cart: propCart, onSubmit, isProcessing }) {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    nombre: '',
    telefono: '',
    email: '',
    notas: '',
    fecha: '',
    hora: '12:00'
  });

  // Normalizar carrito
  const rawCart = propCart || defaultCart;
  const cartItems = (rawCart.items || rawCart.productos || []).map(item => {
    const producto = item.producto || item;
    return {
      id: item.id || item._id,
      name: producto.name || producto.nombre || item.name || item.nombre,
      price: producto.price || producto.precio || item.price || item.precio || 0,
      quantity: item.quantity || item.cantidad || 1
    };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, hora: time }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        nombre: formData.nombre,
        telefono: formData.telefono,
        email: formData.email,
        notas: formData.notas,
        hora_recogida: `${formData.fecha} ${formData.hora}`,
        metodo_pago: 'efectivo' // Por defecto
      });
    } else {
      onNavigate?.('order-confirmation');
    }
  };

  const cardStyle = {
    background: 'white',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-6)',
    border: '1px solid var(--color-neutral-300)',
    boxShadow: 'var(--shadow-low)'
  };

  const formGroupStyle = {
    marginBottom: 'var(--space-5)'
  };

  const labelStyle = {
    display: 'block',
    fontSize: 'var(--font-size-body-m)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-neutral-900)',
    marginBottom: 'var(--space-2)'
  };

  const inputStyle = {
    width: '100%',
    padding: 'var(--space-3) var(--space-4)',
    border: '2px solid var(--color-neutral-300)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--font-size-body-m)',
    outline: 'none',
    transition: 'all 0.2s'
  };

  const btnPrimaryStyle = {
    padding: 'var(--space-4) var(--space-6)',
    background: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--font-size-body-m)',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)'
  };

  const btnGhostStyle = {
    padding: 'var(--space-4) var(--space-6)',
    background: 'transparent',
    color: 'var(--color-neutral-700)',
    border: '2px solid var(--color-neutral-300)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--font-size-body-m)',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-neutral-100)' }}>
      <div style={{ padding: 'var(--space-8) var(--space-6)', maxWidth: '800px', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ flex: 1, height: '8px', background: s <= step ? 'var(--color-primary)' : 'var(--color-neutral-300)', marginRight: s < 3 ? '8px' : 0, borderRadius: 'var(--radius-lg)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-body-s)' }}>
            <span style={{ color: step >= 1 ? 'var(--color-primary)' : 'var(--color-neutral-500)', fontWeight: step === 1 ? 'var(--font-weight-semibold)' : 'normal' }}>1. Datos</span>
            <span style={{ color: step >= 2 ? 'var(--color-primary)' : 'var(--color-neutral-500)', fontWeight: step === 2 ? 'var(--font-weight-semibold)' : 'normal' }}>2. Horario</span>
            <span style={{ color: step >= 3 ? 'var(--color-primary)' : 'var(--color-neutral-500)', fontWeight: step === 3 ? 'var(--font-weight-semibold)' : 'normal' }}>3. Confirmación</span>
          </div>
        </div>

        {step === 1 && (
          <div style={cardStyle}>
            <h2 style={{ fontSize: 'var(--font-size-h4)', marginBottom: 'var(--space-5)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-900)' }}>Tus Datos</h2>
            {[
              { id: 'nombre', label: 'Nombre completo', type: 'text', icon: User, placeholder: 'Juan Pérez' },
              { id: 'telefono', label: 'Teléfono', type: 'tel', icon: Phone, placeholder: '+34 600 000 000' },
              { id: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'tu@email.com' }
            ].map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.id} style={formGroupStyle}>
                  <label style={labelStyle} htmlFor={field.id}>{field.label}</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      id={field.id} 
                      type={field.type} 
                      value={formData[field.id]}
                      onChange={handleInputChange}
                      style={{ ...inputStyle, paddingLeft: '44px' }} 
                      placeholder={field.placeholder} 
                    />
                    <Icon size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-neutral-500)' }} />
                  </div>
                </div>
              );
            })}
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="notas">Notas del pedido (opcional)</label>
              <textarea 
                id="notas" 
                value={formData.notas}
                onChange={handleInputChange}
                style={{ ...inputStyle, resize: 'vertical' }} 
                rows={3} 
                placeholder="Instrucciones especiales..." 
              />
            </div>
            <button style={{ ...btnPrimaryStyle, width: '100%' }} onClick={() => setStep(2)}>
              Continuar
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={cardStyle}>
            <h2 style={{ fontSize: 'var(--font-size-h4)', marginBottom: 'var(--space-5)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-900)' }}>Horario de Recogida</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Selecciona la fecha</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="date" 
                  id="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, paddingLeft: '44px' }} 
                />
                <Calendar size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-neutral-500)' }} />
              </div>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Hora de recogida</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 'var(--space-3)' }}>
                {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'].map((time) => (
                  <button 
                    key={time} 
                    onClick={() => handleTimeSelect(time)}
                    style={formData.hora === time ? btnPrimaryStyle : btnGhostStyle}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <button style={{ ...btnGhostStyle, flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }} onClick={() => setStep(1)}>
                <ArrowLeft size={20} />
                Atrás
              </button>
              <button style={{ ...btnPrimaryStyle, flex: 1 }} onClick={() => setStep(3)}>
                Continuar
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={cardStyle}>
            <h2 style={{ fontSize: 'var(--font-size-h4)', marginBottom: 'var(--space-5)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-900)' }}>Resumen del Pedido</h2>
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-primary-light)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-5)' }}>
              <p style={{ margin: 0, marginBottom: 'var(--space-1)', fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-700)' }}>Recogida:</p>
              <p style={{ margin: 0, fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-900)' }}>
                {formData.fecha || 'Hoy'} a las {formData.hora}
              </p>
            </div>
            <div style={{ marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-5)', borderBottom: '1px solid var(--color-neutral-300)' }}>
              <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-900)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-weight-medium)' }}>
                {formData.nombre || 'Cliente'} • {formData.telefono || 'Sin teléfono'}
              </p>
              <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-600)', margin: 0 }}>{formData.email || 'Sin email'}</p>
            </div>
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <h3 style={{ fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)', color: 'var(--color-neutral-900)' }}>
                Productos ({cartItems.length})
              </h3>
              {cartItems.map((item) => (
                <p key={item.id} style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-700)', margin: '8px 0' }}>
                  {item.name} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                </p>
              ))}
            </div>
            <div style={{ fontSize: 'var(--font-size-h4)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-6)', color: 'var(--color-primary)', padding: 'var(--space-4)', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)' }}>
              Total: ${total.toFixed(2)}
            </div>
            <button 
              style={{ ...btnPrimaryStyle, width: '100%' }} 
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
              {!isProcessing && <ArrowRight size={20} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

