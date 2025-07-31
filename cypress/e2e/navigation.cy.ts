/// <reference types="cypress" />

describe('Application Navigation and Routing', () => {
  beforeEach(() => {
    cy.mockGithubApi('repositories');
    cy.mockGithubApi('repository');
  });

  it('should navigate between pages correctly', () => {
    cy.visitRepositoryList();
    cy.wait('@getRepositories');

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('[data-testid="repository-list"]').should('be.visible');

    cy.get('.repository-item').first().click();

    cy.wait('@getRepository');

    cy.url().should('include', '/repository/');
    cy.get('[data-testid="repository-detail"]').should('be.visible');

    cy.get('.repository-detail__back-btn').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('[data-testid="repository-list"]').should('be.visible');
  });
});
