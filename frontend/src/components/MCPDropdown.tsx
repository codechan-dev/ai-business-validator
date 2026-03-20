import { motion } from 'framer-motion';

interface MCPDropdownProps {
  value: string;
  onChange: (source: string) => void;
}

const sources = [
  { value: 'reddit', label: '🔴 Reddit Discussions' },
  { value: 'trends', label: '📊 Google Trends' },
  { value: 'product_hunt', label: '🐱 Product Hunt' },
  { value: 'news', label: '📰 News Mentions' },
  { value: 'startups', label: '🚀 Startup Database' },
];

export default function MCPDropdown({ value, onChange }: MCPDropdownProps) {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <label className="block text-sm font-semibold text-cyan-300 mb-3">
        📡 Select Data Source
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 bg-dark-card border border-white/20 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer"
      >
        {sources.map(({ value: val, label }) => (
          <option key={val} value={val}>
            {label}
          </option>
        ))}
      </select>
    </motion.div>
  );
}
