import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GlobalDemandProps {
  idea: string;
}

export default function GlobalDemandMap({ }: GlobalDemandProps) {
  // Sample global demand data - in real scenario, this would come from backend analysis
  const globalDemandData = [
    { region: 'North America', demand: 92, color: '#00e676' },
    { region: 'Europe', demand: 87, color: '#22c55e' },
    { region: 'Asia Pacific', demand: 94, color: '#10b981' },
    { region: 'Middle East', demand: 72, color: '#f97316' },
    { region: 'South America', demand: 68, color: '#f59e0b' },
    { region: 'Africa', demand: 55, color: '#ef4444' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-cyan-500 rounded p-3 text-xs text-white">
          <p className="font-semibold">{payload[0].payload.region}</p>
          <p className="text-cyan-400">Demand: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="glass-effect p-8 rounded-lg h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold gradient-text mb-2">🌍 Global Demand Distribution</h3>
          <p className="text-xs text-gray-400">Market demand by region</p>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart 
            data={globalDemandData} 
            layout="vertical" 
            margin={{ top: 0, right: 30, bottom: 0, left: 130 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              stroke="#888"
              tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.5)' }}
            />
            <YAxis 
              dataKey="region" 
              type="category" 
              width={120}
              stroke="#888" 
              tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.6)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="demand" 
              radius={[0, 8, 8, 0]} 
              animationDuration={1200}
            >
              {globalDemandData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Regional Insights */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/10">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-sm font-bold text-green-400">94%</div>
            <div className="text-xs text-gray-400 mt-1">Asia Top</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-sm font-bold text-cyan-400">92%</div>
            <div className="text-xs text-gray-400 mt-1">N. America</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-sm font-bold text-orange-400">55%</div>
            <div className="text-xs text-gray-400 mt-1">Africa</div>
          </motion.div>
        </div>

        {/* Recommendation */}
        <motion.div 
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded p-3 mt-4"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-xs text-gray-300">
            💡 <span className="font-semibold text-cyan-400">Recommendation:</span> Focus on Asia Pacific and North America for highest demand potential
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
