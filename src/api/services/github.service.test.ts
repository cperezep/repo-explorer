import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DEFAULT_ORG, fetchRepositories, fetchRepository } from './github.service';
import { mockApiRepository, mockApiRepositoryMinimal, mockRepository, mockRepositoryMinimal } from '../../__mocks__';
import request from '../client/request';

vi.mock('../client/request');

describe('github.service', () => {
  const mockResponse = (data: any, status = 200, statusText = 'OK') => ({
    data,
    status,
    statusText,
    headers: {},
    config: {} as any,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchRepositories', () => {
    it('fetches repositories with default organization', async () => {
      const mockApiRepos = [mockApiRepository, mockApiRepositoryMinimal];
      const mockRepos = [mockRepository, mockRepositoryMinimal];

      vi.mocked(request).mockResolvedValue(mockResponse(mockApiRepos));

      const result = await fetchRepositories();

      expect(request).toHaveBeenCalledWith('GET', `orgs/${DEFAULT_ORG}/repos`);
      expect(result).toEqual(mockRepos);
    });

    it('fetches repositories with custom organization', async () => {
      const customOrg = 'custom-org';
      vi.mocked(request).mockResolvedValue(mockResponse([mockApiRepository]));

      const result = await fetchRepositories(customOrg);

      expect(request).toHaveBeenCalledWith('GET', `orgs/${customOrg}/repos`);
      expect(result).toEqual([mockRepository]);
    });

    it('throws an error when data is undefined', async () => {
      vi.mocked(request).mockResolvedValue(mockResponse(undefined));

      await expect(fetchRepositories()).rejects.toThrow('Something went wrong!');
    });

    it('handles empty repository list', async () => {
      vi.mocked(request).mockResolvedValue(mockResponse([]));

      const result = await fetchRepositories();

      expect(result).toEqual([]);
    });
  });

  describe('fetchRepository', () => {
    const mockRepoName = 'test-repo';

    it('fetches repository with default owner', async () => {
      vi.mocked(request).mockResolvedValue(mockResponse(mockApiRepository));

      const result = await fetchRepository(mockRepoName);

      expect(request).toHaveBeenCalledWith('GET', `repos/${DEFAULT_ORG}/${mockRepoName}`);
      expect(result).toEqual(mockRepository);
    });

    it('fetches repository with custom owner', async () => {
      const mockCustomOwner = 'custom-owner';
      vi.mocked(request).mockResolvedValue(mockResponse(mockApiRepositoryMinimal));

      const result = await fetchRepository(mockRepoName, mockCustomOwner);

      expect(request).toHaveBeenCalledWith('GET', `repos/${mockCustomOwner}/${mockRepoName}`);
      expect(result).toEqual(mockRepositoryMinimal);
    });

    it('throws an error when repository not found', async () => {
      vi.mocked(request).mockResolvedValue(mockResponse(undefined, 404, 'Not Found'));

      await expect(fetchRepository('non-existent')).rejects.toThrow('Repository not found!');
    });
  });
});
