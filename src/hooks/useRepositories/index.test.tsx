import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchRepositories } from 'src/api/services/github.service';
import { mockRepository, mockRepositoryMinimal } from 'src/__mocks__';

import { useRepositories } from '.';

vi.mock('src/api/services/github.service', () => ({
  fetchRepositories: vi.fn(),
}));

describe('useRepositories', () => {
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

  it('fetches repositories data successfully', async () => {
    vi.mocked(fetchRepositories).mockResolvedValueOnce([mockRepository, mockRepositoryMinimal]);

    const { result } = renderHook(() => useRepositories(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([mockRepository, mockRepositoryMinimal]);
    expect(fetchRepositories).toHaveBeenCalled();
    expect(fetchRepositories).toHaveBeenCalledTimes(1);
  });

  it('handles fetch errors', async () => {
    const mockError = new Error('Failed to fetch repositories');
    vi.mocked(fetchRepositories).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useRepositories(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });

  it('uses correct query key', () => {
    renderHook(() => useRepositories(), { wrapper });

    const queryState = queryClient.getQueryState(['repositories']);
    expect(queryState).toBeDefined();
  });
});
