import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockRepository, mockRepositoryMinimal } from 'src/__mocks__';

import RepositoryList from '.';

const mockUseRepositories = vi.fn();
vi.mock('src/hooks/useRepositories', () => ({
  useRepositories: () => mockUseRepositories(),
}));

describe('RepositoryList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RepositoryList />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it('displays repositories grid when data is loaded successfully', () => {
    mockUseRepositories.mockReturnValue({
      data: [mockRepository, mockRepositoryMinimal],
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByRole('heading', { name: 'Repositories', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('displays spinner when loading repositories', () => {
    mockUseRepositories.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Repositories' })).not.toBeInTheDocument();
  });

  it('displays error message when there is an error loading repositories', () => {
    const errorMessage = 'Failed to fetch repositories';
    mockUseRepositories.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
    });

    renderComponent();

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: `Error loading repositories: ${errorMessage}`, level: 2 })
    ).toBeInTheDocument();
  });

  it('displays no repositories message when data array is empty', () => {
    mockUseRepositories.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'No repositories found', level: 2 })).toBeInTheDocument();
  });
});
