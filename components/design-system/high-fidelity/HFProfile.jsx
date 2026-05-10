import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Save, Package, Calendar, Clock, CheckCircle, Truck, Bell, RefreshCw } from 'lucide-react';

// Establecer título de la página
if (typeof document !== 'undefined') {
  document.title = 'Perfil - Panadería Puri';
}

export default function HFProfile({ user, onSave, onNavigate, recentOrders = [], orderNotifications = [], nextPickupSummary = null, onReorder }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Sincronizar datos del usuario cuando llega
  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || user.name || '',
        email: user.email || '',
        telefono: user.telefono || user.phone || ''
      });
    }
  }, [user]);

  const getInitials = () => {
    const name = formData.nombre || 'Usuario';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const normalizeOrder = (order) => {
    const status = (order.status || order.estado || 'pending').toString().toLowerCase().replace(/_/g, ' ');
    const dateSource = order.date || order.fecha || order.createdAt;

    return {
      id: order.id || order._id || order.numero,
      status,
      date: dateSource,
      total: Number(order.total || 0),
      itemsCount: Array.isArray(order.items) ? order.items.length : Array.isArray(order.productos) ? order.productos.length : Number(order.items || order.productos || 0),
      pickupDate: order.pickupDate || order.fecha_recogida || order.hora_recogida,
      pickupTime: order.pickupTime || order.hora || ''
    };
  };

  const getStatusConfig = (status) => {
    const normalized = (status || '').toLowerCase();

    switch (normalized) {
      case 'completed':
      case 'completado':
      case 'entregado':
        return { label: 'Completado', color: 'var(--color-success)', bg: 'var(--color-success-light)', Icon: CheckCircle };
      case 'pending':
      case 'pendiente':
        return { label: 'Pendiente', color: 'var(--color-warning)', bg: 'var(--color-warning-light)', Icon: Clock };
      case 'preparando':
      case 'en proceso':
      case 'en proceso de preparación':
        return { label: 'En preparación', color: 'var(--color-info)', bg: 'var(--color-info-light)', Icon: Package };
      case 'listo':
      case 'ready':
        return { label: 'Listo', color: 'var(--color-primary)', bg: 'var(--color-primary-light)', Icon: Bell };
      case 'en camino':
      case 'enviado':
        return { label: 'En camino', color: 'var(--color-primary)', bg: 'var(--color-primary-light)', Icon: Truck };
      case 'cancelado':
      case 'cancelled':
        return { label: 'Cancelado', color: 'var(--color-error)', bg: 'var(--color-error-light)', Icon: Package };
      default:
        return { label: status || 'Desconocido', color: 'var(--color-neutral-500)', bg: 'var(--color-neutral-100)', Icon: Package };
    }
  };

  const formatOrderDate = (order) => {
    const dateSource = order.pickupDate || order.date;
    if (!dateSource) {
      return 'Sin fecha';
    }

    const dateObject = new Date(dateSource);
    if (Number.isNaN(dateObject.getTime())) {
      return 'Sin fecha';
    }

    return dateObject.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const normalizedRecentOrders = recentOrders.slice(0, 3).map(normalizeOrder);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      if (onSave) {
        await onSave(formData);
        setMessage({ type: 'success', text: 'Cambios guardados correctamente' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Error al guardar' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleCancel = () => {
    // Restablecer datos originales
    if (user) {
      setFormData({
        nombre: user.nombre || user.name || '',
        email: user.email || '',
        telefono: user.telefono || user.phone || ''
      });
    }
    if (onNavigate) onNavigate('landing');
  };

  return (
    <div style={{
      background: 'var(--color-neutral-100)',
      minHeight: '100vh',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--font-size-h2)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-neutral-900)',
          marginBottom: 'var(--space-2)'
        }}>
          Mi Perfil
        </h1>
        <p style={{
          fontSize: 'var(--font-size-body-m)',
          color: 'var(--color-neutral-700)',
          marginBottom: 'var(--space-8)'
        }}>
          Gestiona tu información personal
        </p>

        {/* Profile Picture */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-6)'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'var(--font-weight-bold)',
            border: '4px solid white',
            boxShadow: 'var(--shadow-medium)'
          }}>
            {getInitials()}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-2)'
            }}>
              {formData.nombre || 'Usuario'}
            </h2>
            <p style={{
              fontSize: 'var(--font-size-body-m)',
              color: 'var(--color-neutral-700)'
            }}>
              Cliente desde Enero 2024
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h3 style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-6)'
          }}>
            Información Personal
          </h3>

          <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
            {[
              { icon: User, label: 'Nombre Completo', field: 'nombre', type: 'text' },
              { icon: Mail, label: 'Email', field: 'email', type: 'email', disabled: true },
              { icon: Phone, label: 'Teléfono', field: 'telefono', type: 'tel' }
            ].map((fieldConfig, i) => (
              <div key={i}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <fieldConfig.icon size={18} style={{ color: 'var(--color-primary)' }} />
                  {fieldConfig.label}
                </label>
                <input
                  type={fieldConfig.type}
                  value={formData[fieldConfig.field] || ''}
                  onChange={(e) => handleInputChange(fieldConfig.field, e.target.value)}
                  disabled={fieldConfig.disabled}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    border: '2px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body-m)',
                    outline: 'none',
                    background: fieldConfig.disabled ? 'var(--color-neutral-100)' : 'white',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-light)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {(nextPickupSummary || orderNotifications.length > 0 || normalizedRecentOrders.length > 0) && (
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-neutral-300)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-6)',
            boxShadow: 'var(--shadow-low)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-5)',
              flexWrap: 'wrap'
            }}>
              <div>
                <h3 style={{
                  fontSize: 'var(--font-size-h5)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  Pedidos recientes
                </h3>
                <p style={{
                  fontSize: 'var(--font-size-body-m)',
                  color: 'var(--color-neutral-700)',
                  margin: 0
                }}>
                  Consulta tu actividad más reciente sin salir del perfil.
                </p>
              </div>

            </div>

            {nextPickupSummary && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-5)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-primary-light)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-4)'
              }}>
                <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{nextPickupSummary}</span>
              </div>
            )}

            {orderNotifications.length > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-5)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-warning-light, #fef3c7)',
                color: 'var(--color-neutral-900)',
                marginBottom: 'var(--space-4)'
              }}>
                <Bell size={18} style={{ color: 'var(--color-warning, #d97706)' }} />
                <span style={{ fontWeight: 'var(--font-weight-medium)' }}>
                  {orderNotifications.length} pedido{orderNotifications.length !== 1 ? 's' : ''} actualizaron su estado.
                </span>
              </div>
            )}

            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              {normalizedRecentOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.Icon;

                return (
                  <div
                    key={order.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onNavigate?.('order-detail', order.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onNavigate?.('order-detail', order.id);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4) var(--space-5)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-neutral-300)',
                      background: 'var(--color-neutral-50)',
                      flexWrap: 'wrap',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.boxShadow = 'var(--shadow-low)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-neutral-50)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                        <strong style={{ color: 'var(--color-neutral-900)' }}>
                          Pedido del {formatOrderDate(order)}
                        </strong>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--space-1)',
                          padding: 'var(--space-1) var(--space-3)',
                          borderRadius: 'var(--radius-full)',
                          background: statusConfig.bg,
                          color: statusConfig.color,
                          fontSize: 'var(--font-size-badge)',
                          fontWeight: 'var(--font-weight-bold)'
                        }}>
                          <StatusIcon size={12} />
                          {statusConfig.label}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: 'var(--space-4)',
                        flexWrap: 'wrap',
                        fontSize: 'var(--font-size-body-s)',
                        color: 'var(--color-neutral-700)'
                      }}>
                        <span><Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} />{formatOrderDate(order)}</span>
                        <span><Package size={14} style={{ display: 'inline', marginRight: '6px' }} />{order.itemsCount} producto{order.itemsCount === 1 ? '' : 's'}</span>
                        <span><Clock size={14} style={{ display: 'inline', marginRight: '6px' }} />${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onReorder?.(order.id);
                      }}
                      style={{
                        padding: 'var(--space-3) var(--space-4)',
                        background: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: 'var(--font-size-body-s)',
                        fontWeight: 'var(--font-weight-semibold)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)'
                      }}
                    >
                      <RefreshCw size={16} />
                      Reordenar
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Change Password */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-300)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-low)'
        }}>
          <h3 style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-neutral-900)',
            marginBottom: 'var(--space-6)'
          }}>
            Cambiar Contraseña
          </h3>

          <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
            {[
              { label: 'Contraseña Actual', placeholder: '••••••••' },
              { label: 'Nueva Contraseña', placeholder: '••••••••' },
              { label: 'Confirmar Nueva Contraseña', placeholder: '••••••••' }
            ].map((field, i) => (
              <div key={i}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-body-m)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-neutral-900)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <Lock size={18} style={{ color: 'var(--color-primary)' }} />
                  {field.label}
                </label>
                <input
                  type="password"
                  placeholder={field.placeholder}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    border: '2px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-body-m)',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-light)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Message */}
        {message && (
          <div style={{
            padding: 'var(--space-4)',
            background: message.type === 'success' ? 'var(--color-success-light, #dcfce7)' : 'var(--color-error-light, #fee2e2)',
            color: message.type === 'success' ? 'var(--color-success, #16a34a)' : 'var(--color-error, #dc2626)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--space-4)',
            fontWeight: 'var(--font-weight-medium)',
            textAlign: 'center'
          }}>
            {message.text}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <button 
            onClick={handleCancel}
            style={{
            flex: 1,
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
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            style={{
            flex: 1,
            padding: 'var(--space-4)',
            background: saving ? 'var(--color-neutral-400)' : 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-m)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: saving ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            boxShadow: 'var(--shadow-medium)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!saving) {
              e.currentTarget.style.background = 'var(--color-primary-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-high)';
            }
          }}
          onMouseLeave={(e) => {
            if (!saving) {
              e.currentTarget.style.background = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
            }
          }}
          >
            <Save size={20} />
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

