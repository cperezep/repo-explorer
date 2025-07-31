/// <reference types="cypress" />

describe('Repository List Page', () => {
  beforeEach(() => {
    cy.mockGithubApi('repositories');
  });

  it('should load the repository list page successfully', () => {
    cy.visit('/');

    cy.get('nav[aria-label="Main navigation"]').should('be.visible').and('contain.text', 'Repo Explorer');

    cy.wait('@getRepositories');

    cy.get('h2').should('contain.text', 'Repositories');

    cy.get('.repository-list__subtitle').should('be.visible').and('contain.text', 'repositories');

    cy.get('[data-testid="repository-list"]').should('be.visible');
  });

  it('should display repository list information correctly', () => {
    cy.visit('/');

    cy.wait('@getRepositories');

    cy.get('.repository-item')
      .first()
      .within(() => {
        cy.get('h3').should('be.visible').and('not.be.empty');

        cy.get('.repository-item__description').should('be.visible');
      });
  });

  it('should navigate to repository detail when clicking on repository', () => {
    cy.visit('/');

    cy.wait('@getRepositories');

    cy.get('.repository-item')
      .first()
      .within(() => {
        cy.get('h3')
          .invoke('text')
          .then((title) => {
            cy.root().click(); // Click on the repository item

            cy.url().should('include', `/repository/${title.trim()}`);
          });
      });
  });
});
