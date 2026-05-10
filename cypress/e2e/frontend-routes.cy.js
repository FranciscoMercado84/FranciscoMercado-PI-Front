describe('Frontend Routes Coverage', () => {
  const customerUser = {
    id: 1,
    email: 'test@demo.com',
    nombre: 'Test User',
    role: 'customer',
    token: 'mock-token'
  };

  const adminUser = {
    id: 10,
    email: 'admin@demo.com',
    nombre: 'Admin User',
    role: 'admin',
    token: 'mock-admin-token'
  };

  const seedUser = (user) => {
    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify(user));
      win.sessionStorage.removeItem('user');
    });
  };

  beforeEach(() => {
    cy.intercept('GET', '/v1/productos/mas-vendidos?limit=4', {
      statusCode: 200,
      body: [
        { id: 1, nombre: 'Pan de Ajo', price: 3.5, slug: 'pan-de-ajo' },
        { id: 2, nombre: 'Baguette', price: 2.0, slug: 'baguette' }
      ]
    }).as('bestSellers');

    cy.intercept('GET', '/v1/productos', {
      statusCode: 200,
      body: [
        { id: 1, nombre: 'Pan de Ajo', price: 3.5, slug: 'pan-de-ajo', categoria: 'Panadería' },
        { id: 2, nombre: 'Baguette', price: 2.0, slug: 'baguette', categoria: 'Panadería' }
      ]
    }).as('products');

    cy.intercept('GET', '/v1/productos/1', {
      statusCode: 200,
      body: {
        id: 1,
        nombre: 'Pan de Ajo',
        price: 3.5,
        description: 'Pan recién horneado'
      }
    }).as('productDetail');

    cy.intercept('GET', '/v1/auth/profile', {
      statusCode: 200,
      body: {
        success: true,
        user: customerUser
      }
    }).as('profile');

    cy.intercept('GET', '/v1/carrito', {
      statusCode: 200,
      body: {
        items: [
          { id: 'item-1', productoId: 1, name: 'Pan de Ajo', price: 3.5, quantity: 1 }
        ]
      }
    }).as('cart');

    cy.intercept('POST', '/v1/carrito/items', {
      statusCode: 200,
      body: { success: true }
    }).as('addCart');

    cy.intercept('POST', '/v1/carrito', {
      statusCode: 200,
      body: { success: true }
    }).as('clearCart');

    cy.intercept('GET', '/v1/pedidos', {
      statusCode: 200,
      body: {
        pedidos: [
          {
            id: 'order-1',
            total: 24.5,
            estado: 'entregado',
            items: [
              { producto_id: 1, nombre: 'Pan de Ajo', price: 3.5, cantidad: 2 }
            ]
          }
        ]
      }
    }).as('orders');

    cy.intercept('GET', '/v1/pedidos/1', {
      statusCode: 200,
      body: {
        id: 'order-1',
        total: 24.5,
        estado: 'entregado',
        items: [
          { producto_id: 1, nombre: 'Pan de Ajo', price: 3.5, cantidad: 2 }
        ]
      }
    }).as('orderDetail');

    cy.intercept('POST', '/v1/pedidos', {
      statusCode: 201,
      body: { success: true, id: 'order-created' }
    }).as('createOrder');

    cy.intercept('GET', '/v1/pedidos/admin/all', {
      statusCode: 200,
      body: {
        pedidos: [
          { id: 'admin-order-1', total: 48.0, estado: 'pendiente', items: [] }
        ]
      }
    }).as('adminOrders');

    cy.intercept('GET', '/v1/productos?disponible=all', {
      statusCode: 200,
      body: {
        productos: [
          { id: 1, nombre: 'Pan de Ajo', disponible: true },
          { id: 2, nombre: 'Baguette', disponible: false }
        ]
      }
    }).as('adminProducts');

    cy.intercept('GET', '/v1/productos/inventario/bajo-stock', {
      statusCode: 200,
      body: []
    }).as('stockLow');

    cy.intercept('GET', '/v1/productos/inventario/agotados', {
      statusCode: 200,
      body: []
    }).as('stockOut');

    cy.intercept('GET', '/v1/reportes/**', {
      statusCode: 200,
      body: {
        ventas_totales: 1200,
        pedidos_count: 12,
        clientes_count: 7,
        ticket_promedio: 100
      }
    }).as('reports');

    cy.intercept('GET', '/v1/auth/reset-password?token=valid-token', {
      statusCode: 200,
      body: { success: true }
    }).as('validateResetToken');

    cy.intercept('POST', '/v1/auth/forgot-password', {
      statusCode: 200,
      body: { success: true, message: 'Email enviado' }
    }).as('forgotPassword');

    cy.intercept('POST', '/v1/auth/reset-password', {
      statusCode: 200,
      body: { success: true }
    }).as('resetPassword');
  });

  it('covers public and auth pages', () => {
    cy.visit('/');
    cy.wait('@bestSellers');
    cy.contains('Panadería Puri').should('exist');
    cy.contains('Ver Productos').should('exist');

    cy.visit('/login');
    cy.contains('Iniciar Sesión').should('exist');

    cy.visit('/register');
    cy.contains('Crear Cuenta').should('exist');

    cy.visit('/recover');
    cy.contains('Recuperar Contraseña').should('exist');
    cy.get('input[type="email"]').type('test@demo.com');
    cy.contains('button', 'Enviar Enlace').click();
    cy.wait('@forgotPassword');
    cy.contains('¡Email Enviado!').should('exist');

    cy.visit('/reset/valid-token');
    cy.wait('@validateResetToken');
    cy.contains('Crear nueva contraseña').should('exist');
    cy.contains('Nueva contraseña').parent().find('input').type('Password123!');
    cy.contains('Confirmar contraseña').parent().find('input').type('Password123!');
    cy.contains('button', 'Actualizar contraseña').click({ force: true });
    cy.wait('@resetPassword');
    cy.contains(/actualizada correctamente|Ya puedes iniciar sesión/).should('exist');
  });

  it('covers customer routes', () => {
    seedUser(customerUser);

    cy.visit('/catalog');
    cy.wait('@products');
    cy.contains('Nuestros Productos').should('exist');
    cy.contains('Pan de Ajo').should('exist');

    cy.contains('button', /Agregar|Añadir|Add/).first().click({ force: true });
    cy.wait('@addCart');

    cy.visit('/cart');
    cy.wait('@cart');
    cy.contains('Carrito de Compras').should('exist');
    cy.contains('Enviar Pedido').should('exist');

    cy.visit('/checkout');
    cy.contains('Tus Datos').should('exist');
    cy.contains('button', 'Continuar').should('exist');

    cy.visit('/profile');
    cy.wait('@profile');
    cy.wait('@orders');
    cy.contains(/Perfil|Mi perfil/).should('exist');

    cy.visit('/order/1');
    cy.wait('@orderDetail');
    cy.contains(/Pedido|Detalle/).should('exist');

    cy.visit('/product/1');
    cy.wait('@productDetail');
    cy.contains('Pan de Ajo').should('exist');

    cy.visit('/privacidad');
    cy.contains(/Privacidad|Política de Privacidad/).should('exist');

    cy.visit('/terminos');
    cy.contains(/Términos|Condiciones/).should('exist');

    cy.visit('/cookies');
    cy.contains(/Cookies|Política de Cookies/).should('exist');
  });

  it('covers admin routes', () => {
    seedUser(adminUser);

    cy.intercept('GET', '/v1/auth/profile', {
      statusCode: 200,
      body: {
        success: true,
        user: adminUser
      }
    }).as('adminProfile');

    cy.visit('/admin/login');
    cy.contains('Panel de Administración').should('exist');

    cy.visit('/admin/dashboard');
    cy.wait('@adminProfile');
    cy.wait('@adminProducts');
    cy.wait('@adminOrders');
    cy.contains('Dashboard').should('exist');
    cy.contains('Pedidos Recientes').should('exist');

    cy.visit('/admin/products');
    cy.wait('@adminProducts');
    cy.contains('Gestión de Productos').should('exist');

    cy.visit('/admin/orders');
    cy.wait('@adminOrders');
    cy.contains('Gestión de Pedidos').should('exist');

    cy.visit('/admin/reports');
    cy.wait('@reports');
    cy.contains(/Reportes|Resumen/).should('exist');

    cy.visit('/admin/settings');
    cy.contains('Configuración General').should('exist');
  });

  it('covers guarded redirects and 404', () => {
    cy.visit('/checkout');
    cy.location('pathname').should('eq', '/login');

    cy.visit('/admin/dashboard');
    cy.location('pathname').should('eq', '/login');

    cy.visit('/ruta-que-no-existe');
    cy.contains('404').should('exist');
    cy.contains('Página no encontrada').should('exist');
  });
});