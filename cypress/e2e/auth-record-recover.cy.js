describe('Auth E2E - Login (remember) + Recover/Reset', () => {
  beforeEach(() => {
    // Mock login endpoint
    cy.intercept('POST', '/v1/auth/login', {
      statusCode: 200,
      body: { 
        success: true, 
        token: 'mock-jwt-token-12345',
        user: { id: 1, email: 'test@demo.com', nombre: 'Test User' }
      }
    }).as('login');

    // Mock profile endpoint
    cy.intercept('GET', '/v1/auth/profile', {
      statusCode: 200,
      body: { 
        success: true, 
        user: { id: 1, email: 'test@demo.com', nombre: 'Test User' }
      }
    }).as('profile');

    // visit login page
    cy.visit('/login');
  });

  it('Login with remember me persists in localStorage', () => {
    // fill inputs
    cy.get('input[type="email"]').clear().type('test@demo.com');
    cy.get('input[type="password"]').clear().type('Password123!');
    // ensure checkbox exists and check it
    cy.get('input[aria-label="Recordarme"]').check();
    // submit
    cy.contains('button', 'Iniciar Sesión').click();

    // after login, verify localStorage contains user
    cy.wait(500);
    cy.window().then((win) => {
      const stored = win.localStorage.getItem('user');
      expect(stored).to.be.a('string');
    });

    // simulate closing tab: reload should keep session
    cy.reload();
    cy.window().then((win) => {
      const user = win.localStorage.getItem('user');
      expect(user).to.not.be.null;
    });
  });

  it('Login without remember uses sessionStorage', () => {
    cy.get('input[type="email"]').clear().type('test@demo.com');
    cy.get('input[type="password"]').clear().type('Password123!');
    // uncheck remember
    cy.get('input[aria-label="Recordarme"]').uncheck();
    cy.contains('button', 'Iniciar Sesión').click();
    cy.wait('@login');

    cy.wait(500);
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('user')).to.be.a('string');
      expect(win.localStorage.getItem('user')).to.be.null;
    });

    // simulate closing tab: clear sessionStorage
    cy.window().then((win) => win.sessionStorage.clear());
    cy.reload();
    cy.window().then((win) => {
      // no user in storage
      expect(win.sessionStorage.getItem('user')).to.be.null;
      expect(win.localStorage.getItem('user')).to.be.null;
    });
  });

  it('Recover password flow (mocked backend)', () => {
    // Intercept forgot-password to simulate success
    cy.intercept('POST', '/v1/auth/forgot-password', {
      statusCode: 200,
      body: { success: true, message: 'Email enviado' }
    }).as('forgot');

    cy.visit('/recover');
    cy.get('input[type="email"]').type('test@demo.com');
    cy.contains('button', 'Enviar Enlace').click();
    cy.wait('@forgot');
    cy.contains('¡Email Enviado!').should('exist');
  });
});
