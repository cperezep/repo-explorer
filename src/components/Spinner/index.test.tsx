import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Spinner from '.';

describe('Spinner', () => {
  it('renders spinner with proper aria attributes', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('is accessible to screen readers', () => {
    render(<Spinner />);

    const hiddenText = screen.getByText('Loading...');

    expect(hiddenText).toBeInTheDocument();
    expect(hiddenText).toHaveClass('sr-only');
  });
});
