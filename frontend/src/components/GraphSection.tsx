import { motion } from 'framer-motion';
import RadarChartComponent from '../charts/RadarChart';
import BarChartComponent from '../charts/BarChart';
import LineChartComponent from '../charts/LineChart';
import type { Score, Competitor } from '../types';

interface GraphSectionProps {
  scores: Score;
  competitors?: Competitor[];
  growthRate?: number;
}

export default function GraphSection({ scores, competitors = [], growthRate = 12 }: GraphSectionProps) {
  return (
    <div className="space-y-6">
      {/* Radar Chart */}
      <motion.div
        className="glass-effect p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-cyan-300">
          Capability Radar
        </h3>
        <RadarChartComponent scores={scores} />
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        className="glass-effect p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-cyan-300">
          Competitive Position
        </h3>
        <BarChartComponent scores={scores} competitors={competitors} />
      </motion.div>

      {/* Line Chart */}
      <motion.div
        className="glass-effect p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-cyan-300">
          Market Trend Growth
        </h3>
        <LineChartComponent growthRate={growthRate} />
      </motion.div>
    </div>
  );
}
