/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to wait for the app to be ready
     * @example cy.waitForAppReady()
     */
    waitForAppReady(): Chainable<void>;

    /**
     * Custom command to visit repository list page and wait for load
     * @example cy.visitRepositoryList()
     */
    visitRepositoryList(): Chainable<void>;

    /**
     * Custom command to visit specific repository page
     * @param repoName The repository name to visit
     * @example cy.visitRepository('awesome-react-app')
     */
    visitRepository(repoName: string): Chainable<void>;

    /**
     * Custom command to mock GitHub API responses
     * @param mockType Type of mock to apply
     * @example cy.mockGithubApi('repositories')
     */
    mockGithubApi(mockType: 'repositories' | 'repository'): Chainable<void>;
  }
}
