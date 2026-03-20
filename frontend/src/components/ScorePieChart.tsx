import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import type { Score } from '../types';

interface ScorePieChartProps {
  scores: Score;
}

const COLORS = {
  feasibility: '#00e676',
  demand: '#22c55e',
  competition: '#f97316',
  risk: '#ef4444',
};

const scoreLabels = {
  feasibility: 'Feasibility',
  demand: 'Market Demand',
  competition: 'Competition',
  risk: 'Risk Level',
};

export default function ScorePieChart({ scores }: ScorePieChartProps) {
  const data = [
    {
      name: scoreLabels.feasibility,
      value: Math.round(scores.feasibility),
      color: COLORS.feasibility,
    },
    {
      name: scoreLabels.demand,
      value: Math.round(scores.demand),
      color: COLORS.demand,
    },
    {
      name: scoreLabels.competition,
      value: Math.round(scores.competition),
      color: COLORS.competition,
    },
    {
      name: scoreLabels.risk,
      value: Math.round(scores.risk),
      color: COLORS.risk,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-cyan-500 rounded p-2 text-xs text-white">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-cyan-400">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl backdrop-blur-2xl border border-white/20 shadow-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-center mb-6 gradient-text">
          📊 Performance Metrics
        </h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-gray-300 text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Summary stats below pie chart */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center">
          <div className="text-lg font-bold gradient-text">
            {Math.round(scores.feasibility * 100)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Feasibility</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">
            {Math.round(scores.demand * 100)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Demand</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-400">
            {Math.round(scores.competition * 100)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Competition</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-400">
            {Math.round(scores.risk * 100)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Risk</div>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
