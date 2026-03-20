import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, DollarSign, RotateCcw, Loader } from 'lucide-react';
import ScoreCards from '../components/ScoreCards';
import GraphSection from '../components/GraphSection';
import SignalsPanel from '../components/SignalsPanel';
import MCPDropdown from '../components/MCPDropdown';
import AnalysisPanels from '../components/AnalysisPanels';
import Typewriter from '../components/Typewriter';
import GlobalDemandMap from '../components/GlobalDemandMap';
import DataFlowDiagram from '../components/DataFlowDiagram';
import { fetchSignals } from '../services/api';
import type { ValidationResult, Signals } from '../types';

interface DashboardProps {
  idea: string;
  result: ValidationResult;
  onReset: () => void;
  queryTime?: number;
}

export default function Dashboard({ idea, result, onReset, queryTime = 0 }: DashboardProps) {
  const [selectedSource, setSelectedSource] = useState('reddit');
  const [signals, setSignals] = useState<Signals>(result.signals);
  const [loading, setLoading] = useState(false);

  const handleDownloadReport = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8001/download-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `business_validation_${new Date().toISOString().split('T')[0]}.pptx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to download report:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch signals when source changes
  useEffect(() => {
    const loadSignals = async () => {
      setLoading(true);
      try {
        const data = await fetchSignals(selectedSource, idea);
        setSignals(prev => ({
          ...prev,
          [selectedSource]: data || []
        }));
      } catch (error) {
        console.error(`Failed to fetch ${selectedSource} signals:`, error);
        // Keep showing empty array if fetch fails
        setSignals(prev => ({
          ...prev,
          [selectedSource]: []
        }));
      } finally {
        setLoading(false);
      }
    };

    loadSignals();
  }, [selectedSource, idea]);

  return (
    <div className="min-h-screen bg-dark overflow-y-auto">
      {/* Navigation Bar */}
      <motion.nav
        className="sticky top-0 z-50 glass-effect backdrop-blur-xl border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onReset}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
              title="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold gradient-text">Validation Results</h1>
              <p className="text-xs text-gray-400">
                {idea.substring(0, 50)}
                {idea.length > 50 ? '...' : ''}
                {queryTime > 0 && ` • Analyzed in ${(queryTime / 1000).toFixed(2)}s`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleDownloadReport}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-4 py-2 rounded-xl transition-all disabled:opacity-50 group"
              title="Download PowerPoint report"
            >
              {/* Glass effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 rounded-xl backdrop-blur-xl border border-cyan-400/30 group-hover:border-cyan-400/50 group-hover:from-cyan-400/30 group-hover:to-blue-500/20 transition-all"></div>
              {/* Content */}
              <div className="relative flex items-center gap-2">
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <DollarSign className="w-4 h-4" />
                )}
                <span className="text-sm font-semibold">Export PPT</span>
              </div>
            </motion.button>
            <motion.button
              onClick={onReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl transition-all group"
              title="New validation"
            >
              {/* Glass effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-xl border border-white/20 group-hover:border-white/30 group-hover:from-white/15 group-hover:to-white/10 transition-all"></div>
              {/* Content */}
              <div className="relative">
                <RotateCcw className="w-4 h-4" />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Score Cards Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          {/* Glass Effect Background */}
          <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <h2 className="text-2xl font-bold mb-8 text-cyan-300">
              📊 Performance Metrics
            </h2>
            <ScoreCards scores={result.scores} />
          </div>
        </motion.section>

        {/* Charts and Signals Row */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Charts */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-8 text-cyan-300">
              📈 Market Analysis
            </h2>
            <GraphSection 
              scores={result.scores} 
              competitors={result.competitors}
              growthRate={result.analysis.growthRate}
            />
          </div>

          {/* Global Demand Map */}
          <div>
            <GlobalDemandMap idea={idea} />
          </div>
        </motion.section>

        {/* Real-Time Signals Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-cyan-300">
            📡 Real-Time Signals
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <MCPDropdown value={selectedSource} onChange={setSelectedSource} />
          </div>
          {loading && (
            <div className="flex justify-center py-8">
              <Loader className="w-5 h-5 animate-spin text-cyan-400" />
            </div>
          )}
          {!loading && (
            <div className="mt-6">
              <SignalsPanel signals={signals} selectedSource={selectedSource} />
            </div>
          )}
        </motion.section>

        {/* Analysis Panels */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-cyan-300">
            🔍 Detailed Analysis
          </h2>
          <AnalysisPanels analysis={result.analysis} />
        </motion.section>

        {/* Architecture & Data Flow Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <DataFlowDiagram />
        </motion.section>

        {/* Recommendation */}
        <motion.section
          className="glass-effect p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-cyan-300">
            💡 AI Recommendation
          </h2>
          <Typewriter text={result.analysis.recommendation} speed={20} />
        </motion.section>

        {/* Footer */}
        <motion.div
          className="text-center text-gray-400 text-sm py-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            Analysis powered by AI, LangGraph & MCP tools
          </p>
          <p className="mt-2">
            Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
