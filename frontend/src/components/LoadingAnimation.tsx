import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  isLoading: boolean;
}

export default function LoadingAnimation({ isLoading }: LoadingAnimationProps) {
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    if (!isLoading) {
      setElapsed(0);
      setStatus('Initializing...');
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - startTime;
      setElapsed(Math.round(elapsedMs / 100) / 10); // Convert to seconds with 1 decimal

      // Update status based on elapsed time - FASTER TRANSITIONS
      if (elapsedMs < 1000) {
        setStatus('📡 Initializing agents...');
      } else if (elapsedMs < 2500) {
        setStatus('🔍 Fetching real-time data from APIs...');
      } else if (elapsedMs < 4500) {
        setStatus('📊 Analyzing market trends...');
      } else if (elapsedMs < 6500) {
        setStatus('⚔️ Comparing competitors...');
      } else if (elapsedMs < 8500) {
        setStatus('⚠️ Assessing risks...');
      } else {
        setStatus('⭐ Calculating final score...');
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-effect p-8 rounded-lg max-w-md w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-cyan-300 mb-6">
          🚀 Validating Your Idea
        </h2>

        {/* Timer */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="text-5xl font-bold gradient-text">
              {elapsed.toFixed(1)}s
            </div>
            <p className="text-sm text-gray-400 mt-2">Analyzing in progress</p>
          </motion.div>
        </div>

        {/* Status Message with Icon */}
        <motion.div
          className="mb-8 h-12 flex items-center justify-center"
          key={status}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-center text-cyan-300 font-semibold">{status}</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-6">
          <motion.div
            className="relative h-2 bg-slate-700 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-green-500 to-cyan-500"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min((elapsed / 10) * 100, 95)}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-cyan-500"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Process Steps */}
        <div className="space-y-3">
          <ProcessStep
            icon="📡"
            label="Initialize Agents"
            active={elapsed >= 0}
            completed={elapsed >= 1}
          />
          <ProcessStep
            icon="🔍"
            label="Fetch Real-Time Data"
            active={elapsed >= 1}
            completed={elapsed >= 2.5}
          />
          <ProcessStep
            icon="📊"
            label="Analyze Markets"
            active={elapsed >= 2.5}
            completed={elapsed >= 4.5}
          />
          <ProcessStep
            icon="⚔️"
            label="Compare Competitors"
            active={elapsed >= 4.5}
            completed={elapsed >= 6.5}
          />
          <ProcessStep
            icon="⚠️"
            label="Assess Risks"
            active={elapsed >= 6.5}
            completed={elapsed >= 8.5}
          />
          <ProcessStep
            icon="⭐"
            label="Calculate Score"
            active={elapsed >= 8.5}
            completed={elapsed >= 10}
          />
        </div>

        {/* Footer Message */}
        <motion.p
          className="text-xs text-gray-400 text-center mt-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Please wait while we gather insights...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function ProcessStep({
  icon,
  label,
  active,
  completed,
}: {
  icon: string;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <motion.div
      className={`flex items-center gap-3 p-2 rounded transition-all ${
        completed
          ? 'bg-green-500/10 text-green-300'
          : active
            ? 'bg-cyan-500/10 text-cyan-300'
            : 'bg-slate-700/30 text-gray-500'
      }`}
      animate={active ? { x: [0, 5, 0] } : {}}
      transition={{ duration: 0.6, repeat: active && !completed ? Infinity : 0 }}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-medium flex-1">{label}</span>
      {completed && (
        <motion.span
          className="text-green-400 font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          ✓
        </motion.span>
      )}
      {active && !completed && (
        <motion.span
          className="w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
