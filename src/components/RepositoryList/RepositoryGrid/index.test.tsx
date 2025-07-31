import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import type { Repository } from 'src/types';
import { mockRepository, mockRepositoryMinimal } from 'src/__mocks__';

import RepositoryGrid from '.';

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
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('renders repository items with correct accessibility attributes', () => {
    renderComponent();

    const repositoryLink = screen.getByRole('link', {
      name: `View details for ${mockRepository.title} repository`,
    });

    expect(repositoryLink).toBeInTheDocument();
    expect(repositoryLink).toHaveAttribute('aria-label', `View details for ${mockRepository.title} repository`);

    expect(screen.getByRole('heading', { name: mockRepository.title, level: 3 })).toBeInTheDocument();
  });

  it('links to the correct repository detail page', () => {
    renderComponent();

    const repositoryLink = screen.getByRole('link', {
      name: `View details for ${mockRepository.title} repository`,
    });

    expect(repositoryLink).toBeInTheDocument();
    expect(repositoryLink).toHaveAttribute('href', `/repository/${mockRepository.title}`);
  });

  it('renders repository with undefined description', () => {
    const repositoryWithoutDescription: Repository = {
      ...mockRepository,
      description: undefined,
    };

    renderComponent([repositoryWithoutDescription]);

    const repositoryLink = screen.getByRole('link', {
      name: `View details for ${repositoryWithoutDescription.title} repository`,
    });

    expect(repositoryLink).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: repositoryWithoutDescription.title, level: 3 })).toBeInTheDocument();
  });

  it('handles empty repositories array', () => {
    renderComponent([]);

    expect(screen.getByRole('heading', { name: 'Repositories' })).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
