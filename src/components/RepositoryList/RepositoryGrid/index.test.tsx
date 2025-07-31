import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import type { Repository } from 'src/types';
import { mockRepository, mockRepositoryMinimal } from 'src/__mocks__';

import RepositoryGrid from '.';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('RepositoryGrid', () => {
  const multipleRepositories: Repository[] = [mockRepository, mockRepositoryMinimal];

  const renderComponent = (repositories: Repository[] = [mockRepository]) => {
    return render(
      <MemoryRouter>
        <RepositoryGrid repositories={repositories} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders repositories list with correct heading and count', () => {
    renderComponent(multipleRepositories);

    expect(screen.getByRole('heading', { name: 'Repositories', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('renders repository items with correct accessibility attributes', () => {
    renderComponent();

    const repositoryItem = screen.getByRole('button', {
      name: `View details for ${mockRepository.title} repository`,
    });

    expect(repositoryItem).toBeInTheDocument();
    expect(repositoryItem).toHaveAttribute('aria-label', `View details for ${mockRepository.title} repository`);

    expect(screen.getByRole('heading', { name: mockRepository.title, level: 3 })).toBeInTheDocument();
  });

  it('navigates to repository detail page when clicked', async () => {
    renderComponent();

    const repositoryItem = screen.getByRole('button', {
      name: `View details for ${mockRepository.title} repository`,
    });

    await userEvent.click(repositoryItem);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`/repository/${mockRepository.title}`);
  });

  it('renders repository with undefined description', () => {
    const repositoryWithoutDescription: Repository = {
      ...mockRepository,
      description: undefined,
    };

    renderComponent([repositoryWithoutDescription]);

    const repositoryItem = screen.getByRole('button', {
      name: `View details for ${repositoryWithoutDescription.title} repository`,
    });

    expect(repositoryItem).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: repositoryWithoutDescription.title, level: 3 })).toBeInTheDocument();
  });

  it('handles empty repositories array', () => {
    renderComponent([]);

    expect(screen.getByRole('heading', { name: 'Repositories' })).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
