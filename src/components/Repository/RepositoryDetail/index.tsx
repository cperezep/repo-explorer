import { useNavigate } from 'react-router-dom';
import type { Repository } from '../../../types';

import './index.scss';

type RepositoryDetailProps = {
  repository: Repository;
};

const RepositoryDetail: React.FC<RepositoryDetailProps> = ({ repository }) => {
  const navigate = useNavigate();

  return (
    <div className="repository-detail">
      <div className="repository-detail__container">
        <div className="repository-detail__header">
          <button
            className="repository-detail__back-btn"
            onClick={() => navigate('/')}
            aria-label="Go back to repository list"
          >
            ← Back to Repositories
          </button>

          <div className="repository-detail__title-section">
            <h1 className="repository-detail__title">{repository.title}</h1>
          </div>
        </div>

        <div className="repository-detail__content">
          <div className="repository-detail__main">
            <div className="repository-detail__description">
              <h2>Description</h2>
              <p>{repository.description ?? 'No description available'}</p>
            </div>

            <div className="repository-detail__stats">
              <h2>Statistics</h2>
              <div className="repository-detail__stats-grid">
                <div className="stat-item">
                  <span className="stat-item__label">Stars</span>
                  <span className="stat-item__value">{repository.stargazersCount.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__label">Forks</span>
                  <span className="stat-item__value">{repository.forksCount.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__label">Watchers</span>
                  <span className="stat-item__value">{repository.watchersCount.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__label">Open Issues</span>
                  <span className="stat-item__value">{repository.openIssuesCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="repository-detail__sidebar">
            <div className="repository-detail__info">
              <h2>Repository Info</h2>
              <div className="info-item">
                <span className="info-item__label">Language</span>
                <span className="info-item__value">{repository.language ?? 'Not specified'}</span>
              </div>
            </div>

            <div className="repository-detail__actions">
              <a
                href={repository.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn action-btn--primary"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetail;
