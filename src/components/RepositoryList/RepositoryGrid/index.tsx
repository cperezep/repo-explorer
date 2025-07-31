import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Repository } from 'src/types';

import './index.scss';

type RepositoryGridProps = {
  repositories: Repository[];
};

const RepositoryGrid: React.FC<RepositoryGridProps> = ({ repositories }) => {
  const navigate = useNavigate();

  const handleRepositoryClick = ({ title }: Repository) => {
    navigate(`/repository/${title}`);
  };

  return (
    <div className="repository-list" data-testid="repository-list">
      <h2 className="repository-list__title">Repositories</h2>
      <p className="repository-list__subtitle">
        {repositories.length} {repositories.length === 1 ? 'repository' : 'repositories'}
      </p>

      <ul className="repository-list__items">
        {repositories.map((repository) => (
          <li
            key={repository.id}
            className="repository-item"
            onClick={() => handleRepositoryClick(repository)}
            role="button"
            aria-label={`View details for ${repository.title} repository`}
          >
            <h3 className="repository-item__title">{repository.title}</h3>
            <p className="repository-item__description">{repository.description ?? 'No description available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryGrid;
