describe('Registration Flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '/v1/auth/register', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          success: true,
          user: {
            id: 99,
            email: req.body.email,
            nombre: req.body.nombre
          }
        }
      });
    }).as('register');

    cy.intercept('POST', '/v1/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        token: 'mock-register-token',
        user: {
          id: 99,
          email: 'usuario@test.local',
          nombre: 'Usuario Test',
          role: 'customer'
        }
      }
    }).as('login');

    cy.intercept('GET', '/v1/auth/profile', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          id: 99,
          email: 'usuario@test.local',
          nombre: 'Usuario Test',
          role: 'customer'
        }
      }
    }).as('profile');

    cy.visit('/register');
  });

  it('User can register with valid data', () => {
    cy.contains('Nombre Completo').parent().find('input').type('Usuario Test');
    cy.contains(/^Email$/).parent().find('input').type('usuario@test.local');
    cy.contains(/Teléfono/).parent().find('input').type('5551234567');
    cy.contains('Contraseña').parent().find('input').type('Password123!');
    cy.contains('Confirmar Contraseña').parent().find('input').type('Password123!');

    cy.get('input[type="checkbox"]').check({ force: true });
    cy.contains('button', 'Crear Cuenta').click({ force: true });

    cy.wait('@register');
    cy.wait('@login');
    cy.location('pathname', { timeout: 10000 }).should('eq', '/catalog');
  });
});