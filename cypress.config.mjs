import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Vite dev server default port
    viewportWidth: 1280,
    viewportHeight: 720,
    screenshotOnRunFailure: false,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    // Environment variables for testing
    env: {
      apiUrl: 'https://api.github.com',
      testOrg: 'godaddy',
    },
    setupNodeEvents(on) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
});
