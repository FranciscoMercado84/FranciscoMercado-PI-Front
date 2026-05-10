import React from 'react';
import { User, Phone, Mail, Calendar, Clock, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

// Establecer título de la página
if (typeof document !== 'undefined') {
  document.title = 'Checkout - Panadería Puri';
}

// Carrito por defecto
const defaultCart = {
  items: [
    { id: 1, name: 'Pan Integral', price: 4.20, quantity: 2 },
    { id: 2, name: 'Croissant', price: 2.80, quantity: 3 },
    { id: 3, name: 'Tarta', price: 15.00, quantity: 1 },
  ]
};

// Horarios del local (con margen de preparación)
// Mañana: abre 7:00, recogida desde 8:00 (+1hr)
// Tarde: abre 17:30, recogida desde 18:00 (+30min)
const HORARIOS_LOCAL = {
  // Lunes a Viernes
  weekday: {
    morning: { start: '08:00', end: '14:30' },
    afternoon: { start: '18:00', end: '20:30' }
  },
  // Sábados y Domingos
  weekend: {
    morning: { start: '08:00', end: '14:30' },
    afternoon: null // Cerrado por la tarde
  }
};

const toLocalDateKey = (date = new Date()) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
};

// Generar horarios disponibles en intervalos de 30 minutos
const generateTimeSlots = (start, end) => {
  const slots = [];
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);
  
  let currentHour = startHour;
  let currentMin = startMin;
  
  while (currentHour < endHour || (currentHour === endHour && currentMin <= endMin)) {
    const timeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`;
    slots.push(timeStr);
    
    currentMin += 30;
    if (currentMin >= 60) {
      currentMin = 0;
      currentHour++;
    }
  }
  
  return slots;
};

// Obtener horarios disponibles para una fecha específica
const getAvailableTimeSlots = (dateStr) => {
  if (!dateStr) return [];
  
  const date = new Date(`${dateStr}T00:00:00`);
  const dayOfWeek = date.getDay(); // 0 = Domingo, 6 = Sábado
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  const schedule = isWeekend ? HORARIOS_LOCAL.weekend : HORARIOS_LOCAL.weekday;
  
  let slots = generateTimeSlots(schedule.morning.start, schedule.morning.end);
  
  if (schedule.afternoon) {
    slots = [...slots, ...generateTimeSlots(schedule.afternoon.start, schedule.afternoon.end)];
  }

  if (dateStr === toLocalDateKey()) {
    const now = new Date();
    slots = slots.filter((time) => {
      const slotDate = new Date(`${dateStr}T${time}:00`);
      return slotDate > now;
    });
  }
  
  return slots;
};

// Obtener fecha mínima (hoy o mañana si ya pasó la hora de cierre)
const getMinDate = () => {
  const today = toLocalDateKey();
  const todaySlots = getAvailableTimeSlots(today);

  if (todaySlots.length > 0) {
    return today;
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toLocalDateKey(tomorrow);
};

export default function HFCheckout({ onNavigate, cart: propCart, onSubmit, isProcessing, user }) {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    nombre: '',
    telefono: '',
    email: '',
    notas: '',
    fecha: '',
    hora: ''
  });
  const [errors, setErrors] = React.useState({});
  const [availableSlots, setAvailableSlots] = React.useState([]);

  // Prefiller datos del usuario si está disponible
  React.useEffect(() => {
    if (user && user.name && !formData.nombre) {
      setFormData(prev => ({
        ...prev,
        nombre: user.name || '',
        email: user.email || '',
        telefono: user.telefono || ''
      }));
    }
  }, [user]);

  // Actualizar horarios disponibles cuando cambie la fecha
  React.useEffect(() => {
    if (formData.fecha) {
      const slots = getAvailableTimeSlots(formData.fecha);
      setAvailableSlots(slots);
      // Si la hora seleccionada no está disponible, limpiarla
      if (!slots.includes(formData.hora)) {
        setFormData(prev => ({ ...prev, hora: '' }));
      }
    } else {
      setAvailableSlots([]);
    }
  }, [formData.fecha]);

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
  const total = subtotal;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, hora: time }));
    if (errors.hora) {
      setErrors(prev => ({ ...prev, hora: null }));
    }
  };

  // Validar paso 1 (datos del cliente)
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }
    
    // Limpiar teléfono: solo dígitos
    const telefonoLimpio = formData.telefono.replace(/[^\d]/g, '');
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (telefonoLimpio.length !== 9) {
      newErrors.telefono = 'El teléfono debe tener exactamente 9 dígitos';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validar paso 2 (horario de recogida)
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.fecha) {
      newErrors.fecha = 'Selecciona una fecha de recogida';
    } else {
      const selectedDate = new Date(formData.fecha);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.fecha = 'La fecha no puede ser anterior a hoy';
      }
    }
    
    if (!formData.hora) {
      newErrors.hora = 'Selecciona una hora de recogida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Avanzar al siguiente paso con validación
  const goToNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      // Crear fecha ISO válida combinando fecha y hora
      const [year, month, day] = formData.fecha.split('-');
      const [hours, minutes] = formData.hora.split(':');
      const pickupDate = new Date(year, month - 1, day, hours, minutes);
      
      // Enviar teléfono limpio (solo 9 dígitos)
      const telefonoLimpio = formData.telefono.replace(/[^\d]/g, '');
      onSubmit({
        nombre_cliente: formData.nombre.trim(),
        telefono: telefonoLimpio,
        email: formData.email.trim() || undefined,
        notas: formData.notas.trim() || undefined,
        location: 'Avenida de las Ciencias, 49, Madrid',
        ubicacion: 'Avenida de las Ciencias, 49, Madrid',
        direccion: 'Avenida de las Ciencias, 49, Madrid',
        hora_recogida: pickupDate.toISOString(),
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

  const errorStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    color: 'var(--color-error)',
    fontSize: 'var(--font-size-body-s)',
    marginTop: 'var(--space-1)'
  };

  const inputErrorStyle = {
    borderColor: 'var(--color-error)',
    boxShadow: '0 0 0 3px var(--color-error-light)'
  };

  // Obtener el nombre del día de la semana
  const getDayName = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  };

  // Verificar si es fin de semana
  const isWeekend = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
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
              { id: 'nombre', label: 'Nombre completo *', type: 'text', icon: User, placeholder: 'Juan Pérez' },
              { id: 'telefono', label: 'Teléfono *', type: 'tel', icon: Phone, placeholder: '600000000' },
              { id: 'email', label: 'Email (opcional)', type: 'email', icon: Mail, placeholder: 'tu@email.com' }
            ].map((field) => {
              const Icon = field.icon;
              const hasError = !!errors[field.id];
              return (
                <div key={field.id} style={formGroupStyle}>
                  <label style={labelStyle} htmlFor={field.id}>{field.label}</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      id={field.id} 
                      type={field.type} 
                      value={formData[field.id]}
                      onChange={handleInputChange}
                      style={{ 
                        ...inputStyle, 
                        paddingLeft: '44px',
                        ...(hasError ? inputErrorStyle : {})
                      }} 
                      placeholder={field.placeholder} 
                    />
                    <Icon size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: hasError ? 'var(--color-error)' : 'var(--color-neutral-500)' }} />
                  </div>
                  {hasError && (
                    <div style={errorStyle}>
                      <AlertCircle size={14} />
                      {errors[field.id]}
                    </div>
                  )}
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
            <button style={{ ...btnPrimaryStyle, width: '100%' }} onClick={goToNextStep}>
              Continuar
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={cardStyle}>
            <h2 style={{ fontSize: 'var(--font-size-h4)', marginBottom: 'var(--space-5)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-900)' }}>Horario de Recogida</h2>
            
            {/* Horarios del local */}
            <div style={{ 
              padding: 'var(--space-3) var(--space-4)', 
              background: 'var(--color-info-light, #e0f2fe)', 
              borderRadius: 'var(--radius-lg)', 
              marginBottom: 'var(--space-5)',
              fontSize: 'var(--font-size-body-s)',
              color: 'var(--color-neutral-700)'
            }}>
              <strong>🕐 Horarios de recogida:</strong><br />
              Lun-Vie: 7:00-14:30 y 17:30-20:30<br />
              Sáb-Dom: 7:00-14:30
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Selecciona la fecha *</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="date" 
                  id="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  style={{ 
                    ...inputStyle, 
                    paddingLeft: '44px',
                    ...(errors.fecha ? inputErrorStyle : {})
                  }} 
                />
                <Calendar size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: errors.fecha ? 'var(--color-error)' : 'var(--color-neutral-500)' }} />
              </div>
              {errors.fecha && (
                <div style={errorStyle}>
                  <AlertCircle size={14} />
                  {errors.fecha}
                </div>
              )}
              {formData.fecha && (
                <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-600)', marginTop: 'var(--space-1)' }}>
                  {getDayName(formData.fecha)} {isWeekend(formData.fecha) ? '(Solo mañana)' : ''}
                </p>
              )}
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Hora de recogida *</label>
              {!formData.fecha ? (
                <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-500)', fontStyle: 'italic' }}>
                  Selecciona primero una fecha para ver los horarios disponibles
                </p>
              ) : availableSlots.length === 0 ? (
                <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-warning-dark)' }}>
                  No hay horarios disponibles para esta fecha
                </p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 'var(--space-2)' }}>
                  {availableSlots.map((time) => (
                    <button 
                      key={time} 
                      onClick={() => handleTimeSelect(time)}
                      style={{
                        ...( formData.hora === time ? btnPrimaryStyle : btnGhostStyle),
                        padding: 'var(--space-2) var(--space-3)',
                        fontSize: 'var(--font-size-body-s)'
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
              {errors.hora && (
                <div style={errorStyle}>
                  <AlertCircle size={14} />
                  {errors.hora}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <button style={{ ...btnGhostStyle, flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }} onClick={() => setStep(1)}>
                <ArrowLeft size={20} />
                Atrás
              </button>
              <button style={{ ...btnPrimaryStyle, flex: 1 }} onClick={goToNextStep}>
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
                {getDayName(formData.fecha)}, {formData.fecha.split('-').reverse().join('/')} a las {formData.hora}
              </p>
            </div>
            <div style={{ marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-5)', borderBottom: '1px solid var(--color-neutral-300)' }}>
              <p style={{ fontSize: 'var(--font-size-body-m)', color: 'var(--color-neutral-900)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-weight-medium)' }}>
                {formData.nombre} • {formData.telefono}
              </p>
              <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-600)', margin: 0 }}>{formData.email || 'Sin email'}</p>
              {formData.notas && (
                <p style={{ fontSize: 'var(--font-size-body-s)', color: 'var(--color-neutral-600)', marginTop: 'var(--space-2)', fontStyle: 'italic' }}>
                  Notas: {formData.notas}
                </p>
              )}
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

