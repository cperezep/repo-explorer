import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import type { Repository } from 'src/types';
import { mockRepository } from 'src/__mocks__';

import RepositoryDetail from '.';

describe('RepositoryDetail', () => {
  const renderComponent = (repository: Repository = mockRepository) => {
    return render(
      <MemoryRouter>
        <RepositoryDetail repository={repository} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all repository information correctly', () => {
    renderComponent();

    // Check title
    expect(screen.getByRole('heading', { name: mockRepository.title })).toBeInTheDocument();

    // Check description
    expect(screen.getByRole('heading', { name: 'Description' })).toBeInTheDocument();
    expect(screen.getByText(mockRepository.description!)).toBeInTheDocument();

    // Check statistics section
    expect(screen.getByRole('heading', { name: 'Statistics' })).toBeInTheDocument();
    expect(screen.getByText('Stars')).toBeInTheDocument();
    expect(screen.getByText(mockRepository.stargazersCount.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText('Forks')).toBeInTheDocument();
    expect(screen.getByText(mockRepository.forksCount.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText('Watchers')).toBeInTheDocument();
    expect(screen.getByText(mockRepository.watchersCount.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText('Open Issues')).toBeInTheDocument();
    expect(screen.getByText(mockRepository.openIssuesCount.toLocaleString())).toBeInTheDocument();

    // Check repository info
    expect(screen.getByRole('heading', { name: 'Repository Info' })).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText(mockRepository.language!)).toBeInTheDocument();

    // Check GitHub link
    const githubLink = screen.getByRole('link', { name: 'View on GitHub' });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', mockRepository.htmlUrl);
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders back button with correct accessibility attributes', () => {
    renderComponent();

    const backLink = screen.getByRole('link', { name: 'Go back to repository list' });

    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('aria-label', 'Go back to repository list');
  });

  it('displays fallback text when description is not defined', () => {
    const repoWithoutDescription: Repository = {
      ...mockRepository,
      description: undefined,
    };

    renderComponent(repoWithoutDescription);

    expect(screen.getByText('No description available')).toBeInTheDocument();
  });

  it('displays fallback text when language is not defined', () => {
    const repoWithoutLanguage: Repository = {
      ...mockRepository,
      language: undefined,
    };

    renderComponent(repoWithoutLanguage);

    expect(screen.getByText('Not specified')).toBeInTheDocument();
  });

  it('renders back link with correct href', () => {
    renderComponent();

    const backLink = screen.getByRole('link', { name: 'Go back to repository list' });

    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('opens GitHub link in new tab when clicked', async () => {
    renderComponent();

    const githubLink = screen.getByRole('link', { name: 'View on GitHub' });

    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('href', mockRepository.htmlUrl);
  });
});
