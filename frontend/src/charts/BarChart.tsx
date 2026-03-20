import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { Score, Competitor } from '../types';

interface BarChartComponentProps {
  scores: Score;
  competitors?: Competitor[];
}

interface CompetitorData {
  name: string;
  marketStrength: number;
  growthPotential: number;
  size: number;
}

export default function BarChartComponent({ scores, competitors = [] }: BarChartComponentProps) {
  // Prepare scattered data: show competitors and your idea positioning
  const competitorData: CompetitorData[] = [
    ...competitors.map((comp) => ({
      name: comp.name,
      marketStrength: comp.strength || 50,
      growthPotential: 15 + Math.random() * 30,
      size: 120 + Math.random() * 200,
    })),
  ];

  // Add your idea positioned based on feasibility and demand scores
  const yourIdeaData: CompetitorData = {
    name: 'Your Idea',
    marketStrength: Math.round(scores.feasibility * 100),
    growthPotential: 35,
    size: 300,
  };

  const CustomTooltip = ({ payload }: any) => {
    if (payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-cyan-500 rounded p-3 text-xs text-white">
          <p className="font-semibold">{data.name}</p>
          <p className="text-cyan-400">Market Strength: {data.marketStrength}%</p>
          <p className="text-green-400">Growth Potential: {Math.round(data.growthPotential)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={380}>
        <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 90 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="marketStrength"
            type="number"
            name="Market Strength"
            unit="%"
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            label={{ value: 'Market Strength (%)', position: 'bottom', offset: 20 }}
          />
          <YAxis
            dataKey="growthPotential"
            type="number"
            name="Growth Potential"
            unit="%"
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            label={{ value: 'Growth Potential (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.6)', paddingTop: '30px', marginTop: '20px' }} />
          <Scatter
            name="Competitors"
            data={competitorData}
            fill="#00bcd4"
          >
            {competitorData.map((_, index) => (
              <Cell key={`comp-${index}`} fill="#00bcd4" />
            ))}
          </Scatter>
          {yourIdeaData && (
            <Scatter
              name="Your Idea"
              data={[yourIdeaData]}
              fill="#00e676"
            >
              <Cell fill="#00e676" />
            </Scatter>
          )}
        </ScatterChart>
      </ResponsiveContainer>
      
      {/* Competitive Analysis Summary */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-sm text-gray-400 mb-3">📊 <span className="text-cyan-400 font-semibold">Competitive Position:</span></p>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="bg-white/5 p-3 rounded border border-cyan-500/30">
            <p className="text-gray-400">Your Strength</p>
            <p className="text-green-400 text-lg font-bold mt-1">{Math.round(scores.feasibility * 100)}%</p>
          </div>
          <div className="bg-white/5 p-3 rounded border border-orange-500/30">
            <p className="text-gray-400">Growth Potential</p>
            <p className="text-orange-400 text-lg font-bold mt-1">35%</p>
          </div>
          <div className="bg-white/5 p-3 rounded border border-blue-500/30">
            <p className="text-gray-400">Market Competitors</p>
            <p className="text-blue-400 text-lg font-bold mt-1">{competitors.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
