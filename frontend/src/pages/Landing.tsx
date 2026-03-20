import { motion } from 'framer-motion';
import { useState } from 'react';
import { Upload, Loader } from 'lucide-react';

interface LandingProps {
  onValidate: (idea: string) => void;
  loading: boolean;
  error: string;
}

const exampleIdeas = [
  'AI-powered platform for remote team productivity analytics',
  'Sustainable fashion e-commerce with AI-powered style recommendations',
  'Healthcare chatbot for preventive medical advice',
];

export default function Landing({ onValidate, loading, error }: LandingProps) {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onValidate(idea);
    }
  };

  const selectExample = (example: string) => {
    setIdea(example);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-card to-dark flex flex-col items-center justify-center px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">✓</span>
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">AI Business Idea Validator</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-2">
            Validate startup ideas using AI, LangGraph, and real-time market data
          </p>
          <p className="text-sm text-gray-500">
            Get instant analysis on feasibility, market demand, competition, and risk
          </p>
        </div>

        {/* Main Input Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative group p-8 mb-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Glass morphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl backdrop-blur-2xl border border-white/20 shadow-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Form Content */}
          <div className="relative space-y-6">
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-3">
                Describe your business idea
              </label>
              <textarea
                className="w-full h-40 p-4 bg-dark/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 resize-none"
                placeholder="e.g., 'An AI-powered SaaS platform that analyzes employee productivity...'"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                disabled={loading}
              />
            </div>

          {error && (
            <motion.div
              className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={!idea.trim() || loading}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing your idea...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Validate Idea
              </>
            )}
          </motion.button>
          </div>
        </motion.form>

        {/* Example Ideas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-gray-400 mb-3 text-center">
            Try one of these examples:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {exampleIdeas.map((example, idx) => (
              <motion.button
                key={idx}
                onClick={() => selectExample(example)}
                className="relative group p-4 text-left text-sm text-gray-300 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Glass morphism background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-xl backdrop-blur-xl border border-white/20 group-hover:border-white/40 group-hover:from-white/10 transition-all"></div>
                
                {/* Content */}
                <div className="relative">
                  <div className="text-cyan-400 text-xs font-semibold mb-1">
                    Example {idx + 1}
                  </div>
                  <p>{example}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
