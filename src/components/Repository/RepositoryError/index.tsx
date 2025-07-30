import React from 'react';
import './index.scss';

type RepositoryErrorProps = {
  message: string;
};

const RepositoryError: React.FC<RepositoryErrorProps> = ({ message }) => (
  <div className="repository-error" role="alert">
    <p className="repository-error__message">
      <strong className="repository-error__title">Error loading repositories:</strong>{' '}
      <span className="repository-error__details">{message}</span>
    </p>
  </div>
);

export default RepositoryError;
