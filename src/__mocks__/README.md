# Test Mocks

This directory contains mock data for testing purposes.

## Available Mocks

### ApiRepository Mocks

- `mockApiRepository` - A complete repository with all fields populated
- `mockApiRepositoryMinimal` - A repository with null description and language

### Repository Mocks

- `mockRepository` - Mapped version of `mockApiRepository`
- `mockRepositoryMinimal` - Mapped version of `mockApiRepositoryMinimal`

### Collections

- `mockApiRepositoryPairs` - Array of objects with `api` and `mapped` properties for testing mapping functions

## Usage Examples

```typescript
import { mockApiRepository, mockRepository, mockApiRepositoryPairs } from '../__mocks__';

// Testing a service function
it('fetches repository data', async () => {
  const result = await githubService.getRepository('123');

  expect(result).toEqual(mockApiRepository);
});

// Testing mapping function
it('maps API repository correctly', () => {
  mockApiRepositoryPairs.forEach(({ api, mapped }) => {
    expect(mapApiRepositoryToRepository(api)).toEqual(mapped);
  });
});
```
