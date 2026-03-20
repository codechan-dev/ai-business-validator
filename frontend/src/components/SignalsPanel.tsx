import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Signals } from '../types';

interface SignalsPanelProps {
  signals: Signals;
  selectedSource: string;
}

const sourceInfo = {
  reddit: { icon: '🔴', label: 'Reddit', key: 'reddit' },
  trends: { icon: '📊', label: 'Google Trends', key: 'trends' },
  product_hunt: { icon: '🐱', label: 'Product Hunt', key: 'product_hunt' },
  news: { icon: '📰', label: 'News', key: 'news' },
  startups: { icon: '🚀', label: 'Startup DB', key: 'startups' },
};

export default function SignalsPanel({ signals, selectedSource }: SignalsPanelProps) {
  const currentSource = sourceInfo[selectedSource as keyof typeof sourceInfo];
  const sourceKey = currentSource.key as keyof Signals;
  const items = signals[sourceKey] || [];

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="glass-effect p-4 space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span>{currentSource.icon}</span>
          <span className="text-cyan-300">{currentSource.label}</span>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {items && items.length > 0 ? (
            items.slice(0, 5).map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-dark-card/50 p-3 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-white line-clamp-2 flex-1">
                    {item.title}
                  </h4>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex-shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {item.summary}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No signals found</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
