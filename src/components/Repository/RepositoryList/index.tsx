import React from 'react';
import type { Repository } from '../../../types';
import './index.scss';

type RepositoryListProps = {
  repositories: Repository[];
};

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  return (
    <div className="repository-list">
      <h2 className="repository-list__title">Repositories</h2>
      <p className="repository-list__subtitle">
        {repositories.length} {repositories.length === 1 ? 'repository' : 'repositories'}
      </p>

      <ul className="repository-list__items">
        {repositories.map((repository) => (
          <li key={repository.id} className="repository-item">
            <h3 className="repository-item__title">{repository.title}</h3>
            <p className="repository-item__description">{repository.description || ''}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
