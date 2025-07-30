import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Message from '.';

describe('Message', () => {
  it('renders the title correctly', () => {
    const title = 'Test Message';
    render(<Message title={title} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Message title="Test" />);

    const section = screen.getByRole('alert');
    expect(section).toHaveAttribute('aria-live', 'assertive');
  });
});
