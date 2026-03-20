import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import LoadingAnimation from './components/LoadingAnimation';
import { validateIdea } from './services/api';
import type { ValidationResult } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [queryTime, setQueryTime] = useState(0);

  const handleValidate = useCallback(async (ideaText: string) => {
    setLoading(true);
    setError('');
    const startTime = Date.now();
    try {
      const data = await validateIdea(ideaText);
      const endTime = Date.now();
      setQueryTime(endTime - startTime);
      setIdea(ideaText);
      setResult(data);
      setLoading(false);
      setCurrentPage('dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setCurrentPage('landing');
    setIdea('');
    setResult(null);
    setError('');
  }, []);

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      <LoadingAnimation isLoading={loading} />
      <AnimatePresence mode="wait">
        {currentPage === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Landing
              onValidate={handleValidate}
              loading={loading}
              error={error}
            />
          </motion.div>
        ) : result ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard
              idea={idea}
              result={result}
              onReset={handleReset}
              queryTime={queryTime}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
