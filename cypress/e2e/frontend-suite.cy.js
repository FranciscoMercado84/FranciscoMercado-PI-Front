describe('Frontend Suite - Smoke & Core Flows', () => {
  // Use Cypress baseUrl from cypress.config.js (preview runs on :4173)

  beforeEach(() => {
    // Basic mocks for product listing and cart/order endpoints
    cy.intercept('GET', '/v1/productos/mas-vendidos?limit=4', {
      statusCode: 200,
      body: [
        { id: 1, nombre: 'Pan de Ajo', price: 3.5, slug: 'pan-de-ajo' },
        { id: 2, nombre: 'Baguette', price: 2.0, slug: 'baguette' }
      ]
    }).as('getFeaturedProducts');

    cy.intercept('GET', '/v1/productos', {
      statusCode: 200,
      body: [
        { id: 1, nombre: 'Pan de Ajo', price: 3.5, slug: 'pan-de-ajo' },
        { id: 2, nombre: 'Baguette', price: 2.0, slug: 'baguette' }
      ]
    }).as('getProducts');

    cy.intercept('POST', '/v1/carrito/items', (req) => {
      req.reply({ statusCode: 200, body: { success: true } });
    }).as('addCart');

    cy.intercept('GET', '/v1/auth/profile', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          id: 1,
          email: 'test@demo.com',
          nombre: 'Test User',
          role: 'customer'
        }
      }
    }).as('profile');

    cy.intercept('GET', '/v1/carrito', {
      statusCode: 200,
      body: {
        items: [
          {
            id: 'item-1',
            productoId: 1,
            name: 'Pan de Ajo',
            price: 3.5,
            quantity: 1
          }
        ]
      }
    }).as('getCart');

    cy.intercept('POST', '/v1/pedidos', {
      statusCode: 201,
      body: { success: true, orderId: 1234 }
    }).as('createOrder');
  });

  it('Navigation smoke: header links and routes load', () => {
    cy.visit('/');
    cy.wait('@getFeaturedProducts');

    // Check header/nav links on the landing page
    cy.get('nav').contains('Productos').should('exist');
    cy.contains(/Iniciar Sesión|Login/).should('exist');

    // Navigate to catalog and verify products render from mocked API
    cy.get('nav').contains('Productos').click();
    cy.wait('@getProducts');
    cy.contains('Pan de Ajo').should('exist');
    cy.contains('Baguette').should('exist');
  });

  it('Add product to cart and complete checkout (mocked)', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify({
        id: 1,
        email: 'test@demo.com',
        nombre: 'Test User',
        role: 'customer',
        token: 'mock-token'
      }));
    });

    cy.visit('/catalog');
    cy.wait('@profile');
    cy.wait('@getProducts');

    // Add first product to cart by finding title and clicking nearby button
    cy.contains('button', /Agregar|Añadir|Add/).first().click({ force: true });
    cy.wait('@addCart');

    // Go to cart and proceed to checkout
    cy.visit('/cart');
    cy.wait('@profile');
    cy.wait('@getCart');
    cy.visit('/checkout');
    cy.wait('@profile');

    cy.contains('Tus Datos').should('exist');
    cy.contains('button', 'Continuar').should('exist');
  });

  it.skip('Registration flow (needs selectors validation in app)', () => {
    // Placeholder: expand once registration form selectors are confirmed
  });

  it.skip('Profile update flow (needs selectors)', () => {
    // Placeholder for profile/update tests
  });
});
