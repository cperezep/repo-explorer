import { describe, it, expect } from 'vitest';
import {
  mockApiRepository,
  mockRepository,
  mockApiRepositoryMinimal,
  mockRepositoryMinimal,
  mockApiRepositoryPairs,
} from 'src/__mocks__';

import { mapApiRepositoryToRepository } from '.';

describe('mapApiRepositoryToRepository', () => {
  it('should map all properties correctly', () => {
    const result = mapApiRepositoryToRepository(mockApiRepository);

    expect(result).toEqual(mockRepository);
  });

  it('should handle null values', () => {
    const result = mapApiRepositoryToRepository(mockApiRepositoryMinimal);

    expect(result).toEqual(mockRepositoryMinimal);
  });

  it('should handle all mock pairs correctly', () => {
    mockApiRepositoryPairs.forEach(({ api, mapped }) => {
      const result = mapApiRepositoryToRepository(api);

      expect(result).toEqual(mapped);
    });
  });
});
