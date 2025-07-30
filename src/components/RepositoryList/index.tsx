import React from 'react';
import { useRepositories } from '../../hooks/useRepositories';
import RepositoryGrid from './RepositoryGrid';
import Spinner from '../Spinner';
import Message from '../Message';
import type { Repository } from '../../types';

import './index.scss';

type RepositoryListContentProps = {
  data: Repository[];
  isLoading: boolean;
  error: Error | null;
};

const RepositoryListContent: React.FC<RepositoryListContentProps> = ({ data, isLoading, error }) => {
  if (isLoading) return <Spinner />;
  if (error) return <Message title={`Error loading repositories: ${error.message}`} />;
  if (!data.length) return <Message title="No repositories found" />;

  return <RepositoryGrid repositories={data} />;
};

const RepositoryList: React.FC = () => {
  const { data = [], isLoading, error } = useRepositories();

  return (
    <section className="repository-layout">
      <RepositoryListContent data={data} isLoading={isLoading} error={error} />
    </section>
  );
};

export default RepositoryList;
