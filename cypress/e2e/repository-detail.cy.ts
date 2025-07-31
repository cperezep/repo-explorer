/// <reference types="cypress" />

describe('Repository Detail Page', () => {
  const mockRepoName = 'awesome-react-app';

  beforeEach(() => {
    cy.mockGithubApi('repository');
  });

  it('should display repository detail information correctly', () => {
    cy.visitRepository(mockRepoName);

    cy.wait('@getRepository');

    cy.get('nav[aria-label="Main navigation"]').should('be.visible').and('contain.text', 'Repo Explorer');

    cy.get('[data-testid="repository-detail"]').within(() => {
      cy.get('.repository-detail__title').should('be.visible').and('not.be.empty');

      // Description
      cy.get('.repository-detail__description').should('be.visible').and('not.be.empty');

      // Statistics
      cy.get('.repository-detail__stats').should('be.visible');
      cy.get('.stat-item').each(($stat) => {
        cy.wrap($stat).within(() => {
          cy.get('.stat-item__label').should('be.visible');
          cy.get('.stat-item__value').should('be.visible');
        });
      });

      // Language information
      cy.contains('.info-item', 'Language').find('p').invoke('text').should('eq', 'TypeScript');

      // GitHub link
      cy.get('a[href*="github.com"]').should('be.visible').and('have.attr', 'target', '_blank');
    });
  });

  it('should navigate to list repository list when clicking on back button', () => {
    cy.visit(`/repository/${mockRepoName}`);

    cy.get('[role="status"][aria-label="Loading"]').should('be.visible');

    cy.wait('@getRepository');

    cy.get('.repository-detail__back-btn').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('[data-testid="repository-list"]').should('be.visible');
  });

  it('should have functional GitHub repository link', () => {
    cy.visitRepository(mockRepoName);

    cy.wait('@getRepository');

    cy.get('a[href*="github.com"]').then(($link) => {
      const href = $link.attr('href');
      expect(href).to.include('github.com');
      expect(href).to.include('awesome-react-app');

      // Link opens in new tab
      expect($link.attr('target')).to.equal('_blank');
      expect($link.attr('rel')).to.include('noopener');
    });
  });
});
