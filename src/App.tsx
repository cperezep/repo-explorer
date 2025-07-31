import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/index.tsx';
import Repository from './components/Repository/index.tsx';
import RepositoryList from './components/RepositoryList/index.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/index.tsx';

function App() {
  return (
    <ErrorBoundary>
      <Navbar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:repo" element={<Repository />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
