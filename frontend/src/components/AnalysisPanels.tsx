import { motion } from 'framer-motion';
import type { Analysis } from '../types';

interface AnalysisPanelsProps {
  analysis: Analysis;
}

const panels = [
  { key: 'market', label: '🌐 Market Analysis', icon: '📊' },
  { key: 'competitors', label: '⚔️ Competitor Analysis', icon: '👥' },
  { key: 'risks', label: '⚠️ Risk Assessment', icon: '🛡️' },
];

export default function AnalysisPanels({ analysis }: AnalysisPanelsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {panels.map((panel, idx) => (
        <motion.div
          key={panel.key}
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          {/* Glass morphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl backdrop-blur-2xl border border-white/20 shadow-lg"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Content */}
          <div className="relative p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">{panel.icon}</span>
              {panel.label}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {analysis[panel.key as keyof Analysis]}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
