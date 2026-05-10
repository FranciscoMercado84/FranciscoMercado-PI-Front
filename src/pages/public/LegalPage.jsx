import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const contentByType = {
  privacy: {
    title: 'Política de Privacidad',
    description: 'Información básica sobre cómo tratamos tus datos personales.',
    sections: [
      'Recopilamos solo los datos necesarios para gestionar pedidos, contacto y acceso a la cuenta.',
      'No vendemos tus datos a terceros y solo los compartimos con proveedores necesarios para prestar el servicio.',
      'Puedes solicitar la rectificación o eliminación de tus datos escribiendo a admin@panaderia.com.'
    ]
  },
  terms: {
    title: 'Términos y Condiciones',
    description: 'Condiciones básicas de uso de la web y realización de pedidos.',
    sections: [
      'Los pedidos están sujetos a disponibilidad de stock y confirmación por parte de la tienda.',
      'Los horarios de recogida mostrados en la web son orientativos y pueden ajustarse según la operativa del local.',
      'El uso de la web implica la aceptación de estas condiciones básicas de servicio.'
    ]
  },
  cookies: {
    title: 'Política de Cookies',
    description: 'Uso básico de cookies para funcionamiento y mejora del sitio.',
    sections: [
      'Usamos cookies técnicas para mantener la sesión y recordar preferencias básicas.',
      'Podemos usar analítica básica para entender el uso de la web y mejorar la experiencia.',
      'Si lo deseas, puedes borrar las cookies desde la configuración de tu navegador.'
    ]
  }
};

export const LegalPage = ({ type = 'privacy' }) => {
  const navigate = useNavigate();
  const page = contentByType[type] || contentByType.privacy;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-neutral-100)',
      fontFamily: 'var(--font-primary)',
      padding: 'var(--space-8) var(--space-6)'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-3) var(--space-4)',
            marginBottom: 'var(--space-6)',
            border: '1px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-lg)',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={18} />
          Volver
        </button>

        <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', boxShadow: 'var(--shadow-low)', border: '1px solid var(--color-neutral-300)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-h2)', marginTop: 0, marginBottom: 'var(--space-3)' }}>
            {page.title}
          </h1>
          <p style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--font-size-body-m)', marginBottom: 'var(--space-6)' }}>
            {page.description}
          </p>

          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            {page.sections.map((text) => (
              <p key={text} style={{ margin: 0, lineHeight: 1.7, color: 'var(--color-neutral-800)' }}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
