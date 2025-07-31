import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchRepository } from 'src/api/services/github.service';
import { mockRepository } from 'src/__mocks__';

import { useRepository } from '.';

vi.mock('src/api/services/github.service', () => ({
  fetchRepository: vi.fn(),
}));

describe('useRepository', () => {
  const mockRepoName = 'test-repo';
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries for tests
        },
      },
    });

    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('fetches repository data successfully', async () => {
    vi.mocked(fetchRepository).mockResolvedValueOnce(mockRepository);

    const { result } = renderHook(() => useRepository(mockRepoName), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockRepository);
    expect(fetchRepository).toHaveBeenCalledWith(mockRepoName);
    expect(fetchRepository).toHaveBeenCalledTimes(1);
  });

  it('handles fetch errors', async () => {
    const mockError = new Error('Failed to fetch repository');
    vi.mocked(fetchRepository).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useRepository(mockRepoName), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });

  it('uses correct query key', () => {
    renderHook(() => useRepository(mockRepoName), { wrapper });

    const queryState = queryClient.getQueryState(['repository', mockRepoName]);
    expect(queryState).toBeDefined();
  });
});
