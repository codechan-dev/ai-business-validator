import { motion } from 'framer-motion';
import { ChevronLeft, Download, RotateCcw, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface DashboardNavbarProps {
  idea: string;
  queryTime?: number;
  onReset: () => void;
  onExport: () => void;
  isLoading?: boolean;
}

const navItems: NavItem[] = [
  { id: 'scores', label: 'Scores', icon: '📊' },
  { id: 'analysis', label: 'Analysis', icon: '📈' },
  { id: 'signals', label: 'Signals', icon: '📡' },
  { id: 'recommendation', label: 'Recommendation', icon: '💡' },
];

export default function DashboardNavbar({
  idea,
  queryTime = 0,
  onReset,
  onExport,
  isLoading = false,
}: DashboardNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className="sticky top-0 z-50 glass-effect backdrop-blur-xl border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-4 sm:mb-0">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <button
                onClick={onReset}
                className="p-2 hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
                title="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-bold gradient-text truncate">
                  Validation Results
                </h1>
                <p className="text-xs text-gray-400 truncate">
                  {idea.substring(0, 40)}
                  {idea.length > 40 ? '...' : ''}
                </p>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0 ml-4">
              <motion.button
                onClick={onExport}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-3 sm:px-4 py-2 rounded-lg transition-all disabled:opacity-50 flex items-center gap-2 text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 rounded-lg backdrop-blur-xl border border-cyan-400/30 hover:border-cyan-400/50 hover:from-cyan-400/30 hover:to-blue-500/20 transition-all"></div>
                <div className="relative flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="font-semibold">Export</span>
                </div>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden sm:flex gap-2 pt-4 border-t border-white/10">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-cyan-300 hover:bg-white/10 transition-all"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 top-16 z-40 bg-dark/95 backdrop-blur-xl border-b border-white/10 sm:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-cyan-300 hover:bg-white/10 transition-all"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}

            {/* Mobile Action Buttons */}
            <div className="pt-4 border-t border-white/20 space-y-2">
              <motion.button
                onClick={onExport}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative px-4 py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 rounded-lg border border-cyan-400/30"></div>
                <div className="relative flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="font-semibold">Export PPT</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
