import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockRepository } from 'src/__mocks__';

import Repository from '.';

const mockUseRepository = vi.fn();
vi.mock('src/hooks/useRepository', () => ({
  useRepository: () => mockUseRepository(),
}));

describe('Repository', () => {
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

  const renderComponent = (route = '/repository/test-repo') => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Repository />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it('displays repository detail when data is loaded successfully', () => {
    mockUseRepository.mockReturnValue({
      data: mockRepository,
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByTestId('repository-detail')).toBeInTheDocument();
  });

  it('displays spinner when loading', () => {
    mockUseRepository.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    renderComponent();

    const loader = screen.getByRole('status', { name: 'Loading' });

    expect(loader).toBeInTheDocument();
    expect(screen.queryByTestId('repository-detail')).not.toBeInTheDocument();
    expect(screen.queryByTestId('message')).not.toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Network error occurred';
    mockUseRepository.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
    });

    renderComponent();

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(`Error loading repository: ${errorMessage}`)).toBeInTheDocument();
  });

  it('displays generic error message when error has no message', () => {
    mockUseRepository.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(),
    });

    renderComponent();

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Error loading repository:/)).toBeInTheDocument();
  });

  it('displays proper message when no data is available', () => {
    mockUseRepository.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Repository not found')).toBeInTheDocument();
  });
});
