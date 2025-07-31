import React from 'react';
import { useParams } from 'react-router-dom';
import RepositoryDetail from './RepositoryDetail';
import Spinner from '../Spinner';
import Message from '../Message';
import { useRepository } from 'src/hooks/useRepository';
import type { Repository as RepositoryT } from 'src/types';

import './index.scss';

type RepositoryDetailProps = {
  data?: RepositoryT;
  isLoading: boolean;
  error: Error | null;
};

const RepositoryContent: React.FC<RepositoryDetailProps> = ({ data, isLoading, error }) => {
  if (isLoading) return <Spinner />;
  if (error) return <Message title={`Error loading repository: ${error.message}`} />;
  if (!data) return <Message title="Repository found" />;

  return <RepositoryDetail repository={data} />;
};

const Repository: React.FC = () => {
  const { repo } = useParams<{ repo: string }>();
  const { data, isLoading, error } = useRepository(repo!);

  return (
    <section className="repository-layout">
      <RepositoryContent data={data} isLoading={isLoading} error={error} />
    </section>
  );
};

export default Repository;
