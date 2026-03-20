import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import type { Score } from '../types';

interface RadarChartComponentProps {
  scores: Score;
}

export default function RadarChartComponent({ scores }: RadarChartComponentProps) {
  const avg = (a: number, b: number) => (a + b) / 2;
  
  // Convert scores from 0-1 scale to 0-100 scale for visualization
  const feasibilityScore = scores.feasibility * 100;
  const demandScore = scores.demand * 100;
  const competitionScore = scores.competition * 100;
  const avgScore = avg(feasibilityScore, demandScore);
  
  const data = [
    { metric: 'Feasibility', value: feasibilityScore },
    { metric: 'Demand', value: demandScore },
    { metric: 'Competition', value: competitionScore },
    { metric: 'Revenue Potential', value: avgScore },
    { metric: 'Scalability', value: avgScore },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis
          dataKey="metric"
          stroke="rgba(255,255,255,0.3)"
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
        />
        <PolarRadiusAxis
          stroke="rgba(255,255,255,0.2)"
          tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
          domain={[0, 100]}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="#00bcd4"
          fill="#00bcd4"
          fillOpacity={0.6}
          connectNulls
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(0, 188, 212, 0.5)',
            borderRadius: '8px',
            color: '#fff',
          }}
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px', color: 'rgba(255,255,255,0.6)' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}


