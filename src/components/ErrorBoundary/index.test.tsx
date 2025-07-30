import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { ErrorBoundary } from '.';

describe('ErrorBoundary', () => {
  it('renders alert when error occurs', () => {
    const testErrorMessage = 'An error occurrred';
    const ThrowError = () => {
      throw new Error(testErrorMessage);
    };
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage);
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('calls onReset when "Try again" button is clicked', async () => {
    const onReset = vi.fn();
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary onReset={onReset}>
        <ThrowError />
      </ErrorBoundary>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(onReset).toHaveBeenCalled();
  });
});
