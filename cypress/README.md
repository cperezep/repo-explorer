# E2E Testing with Cypress

This document outlines the End-to-End (E2E) testing strategy for the Repository Explorer application using Cypress..

## Test Structure

### Test Files

- **`repository-list.cy.ts`** - Tests for the repository listing page
- **`repository-detail.cy.ts`** - Tests for individual repository detail page
- **`navigation.cy.ts`** - Tests for application routing and navigation

### Custom Commands

Located in `cypress/support/commands.ts`:

- `cy.waitForAppReady()` - Waits for the application to be fully loaded
- `cy.visitRepositoryList()` - Navigates to repository list and waits for load
- `cy.visitRepository(repoName)` - Navigates to specific repository detail page
- `cy.mockGithubApi(mockType)` - Mocks GitHub API responses

## Running Tests

### Local Development

```bash
# Install dependencies
pnpm install

# Open Cypress Test Runner (interactive mode)
pnpm run cypress:open

# Run tests headlessly
pnpm run cypress:run

# Run specific test file
pnpm run cypress:run --spec "cypress/e2e/repository-list.cy.ts"
```

## Configuration

### Cypress Configuration (`cypress.config.ts`)

Key settings:

- **Base URL**: `http://localhost:5173` (Vite dev server)
- **Viewport**: 1280x720 (desktop default)
- **Environment Variables**: API URL and test organization

### Environment Variables

```typescript
env: {
  apiUrl: 'https://api.github.com',
  testOrg: 'godaddy', // Default organization
}
```
