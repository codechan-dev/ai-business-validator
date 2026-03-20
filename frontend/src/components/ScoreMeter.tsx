import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScoreMeterProps {
  score: number;
  label: string;
  icon: string;
  color?: string;
}

export default function ScoreMeter({ score, label, icon }: ScoreMeterProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getGaugeColor = (value: number) => {
    if (value >= 75) return '#00e676';
    if (value >= 50) return '#ffc107';
    return '#ff5252';
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="glass-effect p-6 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-gray-300 mb-6">{label}</h3>

      {/* Circular Progress */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="45"
            stroke={getGaugeColor(displayScore)}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        </svg>
        {/* Score text in center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-3xl font-bold gradient-text">
            {displayScore}
          </span>
        </motion.div>
      </div>

      {/* Status text */}
      <div className="text-xs text-gray-400">
        {displayScore >= 75 ? '✓ Excellent' : displayScore >= 50 ? '⚡ Good' : '⚠️ Needs Work'}
      </div>
    </div>
  );
}
