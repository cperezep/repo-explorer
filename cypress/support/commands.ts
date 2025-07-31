// Mock data
const mockRepositoryA = {
  id: 123456789,
  name: 'awesome-react-app',
  description: 'A comprehensive React application with TypeScript and modern tooling',
  language: 'TypeScript',
  forks_count: 45,
  open_issues_count: 12,
  watchers_count: 78,
  stargazers_count: 234,
  html_url: 'https://github.com/octocat/awesome-react-app',
};

const mockRepositoryB = {
  id: 987654321,
  name: 'simple-utility',
  description: 'A simple utility library',
  language: 'JavaScript',
  forks_count: 5,
  open_issues_count: 2,
  watchers_count: 10,
  stargazers_count: 25,
  html_url: 'https://github.com/octocat/simple-utility',
};

Cypress.Commands.add('waitForAppReady', () => {
  cy.get('[data-testid="repository-list"], [data-testid="repository-detail"]', { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('visitRepositoryList', () => {
  cy.visit('/');
  cy.waitForAppReady();
});

Cypress.Commands.add('visitRepository', (repoName: string) => {
  cy.visit(`/repository/${repoName}`);
  cy.waitForAppReady();
});

// Custom command to mock GitHub API
Cypress.Commands.add('mockGithubApi', (mockType: 'repositories' | 'repository') => {
  const baseUrl = Cypress.env('apiUrl');
  const testOrg = Cypress.env('testOrg');

  switch (mockType) {
    case 'repositories':
      cy.intercept('GET', `${baseUrl}/orgs/${testOrg}/repos`, {
        statusCode: 200,
        body: [mockRepositoryA, mockRepositoryB],
      }).as('getRepositories');
      break;

    case 'repository':
      cy.intercept('GET', `${baseUrl}/repos/${testOrg}/*`, {
        statusCode: 200,
        body: mockRepositoryA,
      }).as('getRepository');
      break;
  }
});
