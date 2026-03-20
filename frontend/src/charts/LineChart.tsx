import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface TrendDataPoint {
  month: string;
  [key: string]: string | number;
}

interface LineChartComponentProps {
  data?: TrendDataPoint[];
  growthRate?: number;
}

export default function LineChartComponent({ data, growthRate = 12 }: LineChartComponentProps) {
  // Generate realistic trend data based on growth rate if not provided
  const generateTrendData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    // Convert annual growth rate to monthly: (1 + annualRate)^(1/12) - 1
    const annualMultiplier = 1 + (growthRate / 100);
    const monthlyGrowth = Math.pow(annualMultiplier, 1 / 6) - 1;  // 6 months in chart
    
    return months.map((month, idx) => {
      const baseValue = 40 + (idx * 2);
      const monthlyMultiplier = Math.pow(1 + monthlyGrowth, idx + 1);
      
      return {
        month,
        'Your Idea': Math.round(baseValue * monthlyMultiplier * 1.2),
        'Avg Startup': Math.round(baseValue * monthlyMultiplier),
        'Market Avg': Math.round(baseValue * monthlyMultiplier * 0.9),
      };
    });
  };
  
  const chartData = data || generateTrendData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 border border-cyan-500 rounded p-3 text-xs text-white">
          <p className="font-semibold text-cyan-300">{payload[0].payload.month}</p>
          {payload.map((item: any, idx: number) => (
            <p key={idx} style={{ color: item.color }}>
              {item.name}: <span className="font-bold">{item.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Calculate growth insights
  const firstData = chartData[0];
  const lastData = chartData[chartData.length - 1];
  const firstYourIdea = typeof firstData['Your Idea'] === 'number' ? firstData['Your Idea'] : 0;
  const lastYourIdea = typeof lastData['Your Idea'] === 'number' ? lastData['Your Idea'] : 0;
  const firstMarketAvg = typeof firstData['Market Avg'] === 'number' ? firstData['Market Avg'] : 0;
  const lastMarketAvg = typeof lastData['Market Avg'] === 'number' ? lastData['Market Avg'] : 0;
  const yourIdeaGrowth = firstYourIdea > 0 ? (((lastYourIdea - firstYourIdea) / firstYourIdea) * 100).toFixed(1) : '0';
  const marketAvgGrowth = firstMarketAvg > 0 ? (((lastMarketAvg - firstMarketAvg) / firstMarketAvg) * 100).toFixed(1) : '0';

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 80 }}
        >
          <defs>
            <linearGradient id="colorIdea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00e676" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00e676" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorStartup" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00bcd4" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#00bcd4" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff9800" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#ff9800" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="month"
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            label={{ value: 'Timeline (6 Months)', position: 'bottom', offset: 20 }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            label={{ value: 'Market Value', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '30px', color: 'rgba(255,255,255,0.6)', marginTop: '20px' }}
            verticalAlign="bottom" 
            height={50}
          />
          <ReferenceLine y={40} stroke="rgba(255,255,255,0.1)" strokeDasharray="5 5" />
          <Area
            type="monotone"
            dataKey="Your Idea"
            stroke="#00e676"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorIdea)"
            dot={{ fill: '#00e676', r: 5 }}
            activeDot={{ r: 7 }}
            isAnimationActive={true}
            animationDuration={800}
          />
          <Area
            type="monotone"
            dataKey="Avg Startup"
            stroke="#00bcd4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorStartup)"
            dot={{ fill: '#00bcd4', r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={800}
          />
          <Area
            type="monotone"
            dataKey="Market Avg"
            stroke="#ff9800"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorMarket)"
            dot={{ fill: '#ff9800', r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Growth Insights */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-sm text-gray-400 mb-3">📈 <span className="text-cyan-400 font-semibold">6-Month Growth Projection:</span></p>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-3 rounded border border-green-500/30">
            <p className="text-gray-400">Your Idea</p>
            <p className="text-green-400 text-lg font-bold mt-1">+{yourIdeaGrowth}%</p>
            <p className="text-gray-500 text-xs mt-1">{firstYourIdea} → {lastYourIdea}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-3 rounded border border-orange-500/30">
            <p className="text-gray-400">Market Avg</p>
            <p className="text-orange-400 text-lg font-bold mt-1">+{marketAvgGrowth}%</p>
            <p className="text-gray-500 text-xs mt-1">{firstMarketAvg} → {lastMarketAvg}</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 p-3 rounded border border-cyan-500/30">
            <p className="text-gray-400">Growth Rate</p>
            <p className="text-cyan-400 text-lg font-bold mt-1">{growthRate}%</p>
            <p className="text-gray-500 text-xs mt-1">Annual CAGR</p>
          </div>
        </div>
      </div>
    </div>
  );
}
