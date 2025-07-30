import type { FC } from 'react';
import './index.scss';

const Spinner: FC = () => {
  return (
    <div className="loader" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
