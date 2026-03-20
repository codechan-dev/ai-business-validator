import { motion } from 'framer-motion';

export default function DataFlowDiagram() {
  return (
    <motion.div
      className="glass-effect p-8 rounded-lg w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-cyan-300">🏗️ System Architecture & Data Flow</h2>

      {/* Data Sources Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">📊 Data Sources (Real-Time APIs)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded p-4 text-center">
            <div className="text-2xl mb-2">🔴</div>
            <p className="text-sm font-semibold text-blue-300">Reddit</p>
            <p className="text-xs text-gray-400 mt-1">Posts & Comments</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/50 rounded p-4 text-center">
            <div className="text-2xl mb-2">📰</div>
            <p className="text-sm font-semibold text-orange-300">News RSS</p>
            <p className="text-xs text-gray-400 mt-1">TechCrunch, Bloomberg</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded p-4 text-center">
            <div className="text-2xl mb-2">📈</div>
            <p className="text-sm font-semibold text-red-300">Google Trends</p>
            <p className="text-xs text-gray-400 mt-1">Search Interest</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/50 rounded p-4 text-center">
            <div className="text-2xl mb-2">🚀</div>
            <p className="text-sm font-semibold text-pink-300">Product Hunt</p>
            <p className="text-xs text-gray-400 mt-1">New Products</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded p-4 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm font-semibold text-purple-300">Y Combinator</p>
            <p className="text-xs text-gray-400 mt-1">Startups & Funding</p>
          </div>
        </div>
      </div>

      {/* Data Flow Diagram */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">🔄 Processing Pipeline</h3>
        <div className="space-y-4">
          {/* Layer 1: Data Sources */}
          <div className="flex items-center justify-center">
            <div className="text-xs text-gray-400">All APIs →</div>
          </div>

          {/* Layer 2: Backend Agents */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/50 rounded p-4"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-green-300 text-sm">📍 Idea Parser</p>
              <p className="text-xs text-gray-400 mt-1">Extracts business concept</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/50 rounded p-4"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-cyan-300 text-sm">🔍 Market Research</p>
              <p className="text-xs text-gray-400 mt-1">Market size & growth rate</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded p-4"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-yellow-300 text-sm">⚔️ Competitor Analysis</p>
              <p className="text-xs text-gray-400 mt-1">Competitor positioning</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <motion.div
              className="bg-gradient-to-r from-pink-500/20 to-pink-600/20 border border-pink-500/50 rounded p-4"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-pink-300 text-sm">📊 Demand Validation</p>
              <p className="text-xs text-gray-400 mt-1">Market demand level</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/50 rounded p-4"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-orange-300 text-sm">⚠️ Risk Analysis</p>
              <p className="text-xs text-gray-400 mt-1">Identify risks</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/50 rounded p-4"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-red-300 text-sm">⭐ Feasibility Score</p>
              <p className="text-xs text-gray-400 mt-1">Final scoring</p>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-center my-4">
          <div className="text-xs text-gray-400">All Agent Results Combined →</div>
        </div>
      </div>

      {/* Response Data Structure */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">📦 Response Data Package</h3>
        <div className="bg-slate-900/50 border border-cyan-500/30 rounded p-4 overflow-x-auto">
          <pre className="text-xs text-cyan-300 whitespace-pre-wrap break-words">
{`{
  "scores": {
    "feasibility": 0.82,      ← From Feasibility Agent
    "demand": 0.085,          ← From Demand Validation Agent
    "competition": 0.1,       ← From Competitor Analysis
    "risk": 0.06              ← From Risk Analysis
  },
  "analysis": {
    "market": "Market Size: ... Growth: ... Trends: ...",    ← Market Research
    "competitors": "Top competitors with strength rating",   ← Competitor Data
    "risks": "Detailed risk assessment",                     ← Risk Analysis
    "growthRate": 8.0,                                       ← Calculated
    "recommendation": "Strategic insights..."                ← AI Recommendation
  },
  "signals": {
    "reddit": [...],          ← Real-time signals from Reddit
    "news": [...],            ← News feed updates
    "product_hunt": [...],    ← Product Hunt trends
    "startups": [...]         ← Startup ecosystem data
  },
  "competitors": [...]        ← Competitor intelligence
}`}
          </pre>
        </div>
      </div>

      {/* Frontend Components */}
      <div>
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">🎨 Frontend Visualization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded p-4">
            <p className="font-semibold text-cyan-300 text-sm mb-2">📊 Charts (Real-time Data)</p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>✓ Pie Chart - Score Distribution</li>
              <li>✓ Radar Chart - 5 Dimensions</li>
              <li>✓ Scatter Chart - Competitive Position</li>
              <li>✓ Area Chart - Growth Projection</li>
              <li>✓ Bar Chart - Global Demand</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded p-4">
            <p className="font-semibold text-green-300 text-sm mb-2">📋 Information Panels</p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>✓ Market Analysis Panel</li>
              <li>✓ Competitor Analysis Panel</li>
              <li>✓ Risk Assessment Panel</li>
              <li>✓ Real-Time Signals Panel</li>
              <li>✓ AI Recommendation Section</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Flow Summary */}
      <div className="mt-8 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded">
        <p className="text-sm text-cyan-300 font-semibold mb-2">📡 Complete Data Flow</p>
        <p className="text-xs text-gray-400 leading-relaxed">
          User submits business idea → FastAPI backend processes with 6-agent LangGraph workflow → 
          Agents fetch real data from 5 free APIs → All agent outputs combined into ValidationResponse → 
          Data transformed to frontend format → React components render real-time visualizations & insights
        </p>
      </div>
    </motion.div>
  );
}
