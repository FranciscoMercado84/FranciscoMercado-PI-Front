import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.FRONTEND_BASE_URL || process.env.FRONTEND_URL || 'http://localhost:4173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    setupNodeEvents(on, config) {
      // configure reporters via CLI in package.json scripts
    }
  }
});
