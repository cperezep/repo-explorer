import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { FallbackProps, ErrorBoundaryProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" aria-live="assertive" aria-atomic="true">
      <h2>Error: Something went wrong</h2>
      <p>
        <span className="sr-only">Error message: </span>
        <code style={{ whiteSpace: 'pre-wrap', display: 'block' }}>{error.message}</code>
      </p>
      <button aria-label="Try again and reload the page" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

function ErrorBoundary(props: Pick<ErrorBoundaryProps, 'onReset' | 'resetKeys'> & { children: React.ReactNode }) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback} {...props}></ReactErrorBoundary>;
}

export { ErrorBoundary };
