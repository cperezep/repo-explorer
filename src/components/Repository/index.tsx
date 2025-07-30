import React from 'react';
import { useRepositories } from '../../hooks/useRepositories';
import RepositoryList from './RepositoryList';
import Spinner from '../Spinner';
import RepositoryError from './RepositoryError';
import type { Repository as RepositoryType } from '../../types';
import EmptyRepositories from './EmptyRepositories';
import './index.scss';

type RepositoryContentProps = {
  data: RepositoryType[];
  isLoading: boolean;
  error: Error | null;
};

const RepositoryContent: React.FC<RepositoryContentProps> = ({ data, isLoading, error }) => {
  if (isLoading) return <Spinner />;
  if (error) return <RepositoryError message={error.message} />;
  if (!data.length) return <EmptyRepositories />;

  return <RepositoryList repositories={data} />;
};

const Repository: React.FC = () => {
  const { data = [], isLoading, error } = useRepositories();

  return (
    <section className="repository-layout">
      <RepositoryContent data={data} isLoading={isLoading} error={error} />
    </section>
  );
};

export default Repository;
