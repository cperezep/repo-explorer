import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

vi.mock('./components/RepositoryList/index.tsx', () => ({
  default: () => <div data-testid="repository-list">Repository List</div>,
}));

vi.mock('./components/Repository/index.tsx', () => ({
  default: () => <div data-testid="repository">Repository</div>,
}));

describe('App', () => {
  it('renders navbar on all routes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('renders RepositoryList on root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('repository-list')).toBeInTheDocument();
  });

  it('renders Repository on /repository/:repo route', () => {
    render(
      <MemoryRouter initialEntries={['/repository/test-repo']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('repository')).toBeInTheDocument();
  });
});
