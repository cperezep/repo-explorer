import type { FC } from 'react';
import './index.scss';

const Spinner: FC = () => {
  return (
    <div className="loader" role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
