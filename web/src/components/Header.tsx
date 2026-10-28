import React from 'react';
import { Trophy, RefreshCw, BarChart3, Database, ExternalLink } from 'lucide-react';

interface HeaderProps {
  onResetFilters: () => void;
  activeFilterCount: number;
  activeTab: 'dashboard' | 'tableau' | 'dataset';
  setActiveTab: (tab: 'dashboard' | 'tableau' | 'dataset') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onResetFilters,
  activeFilterCount,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="bg-[#0B0E14] border-b border-[#1E2330] sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E10600] to-[#990000] flex items-center justify-center shadow-lg shadow-red-900/30">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-sans">
                  Formula 1 <span className="text-[#E10600]">Race Intelligence</span>
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold bg-[#1C2230] text-[#00D2BE] rounded border border-[#2B354C]">
                  2010 – 2026
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Professional Motorsport Performance Analytics & Strategy Intelligence
              </p>
            </div>
          </div>

          {/* Navigation & Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* View Tabs */}
            <div className="flex bg-[#121620] p-1 rounded-lg border border-[#242B3D]">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#E10600] text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-[#1B202E]'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Executive Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('tableau')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'tableau'
                    ? 'bg-[#E10600] text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-[#1B202E]'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Tableau Workbook</span>
              </button>

              <button
                onClick={() => setActiveTab('dataset')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'dataset'
                    ? 'bg-[#E10600] text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-[#1B202E]'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Data Specs</span>
              </button>
            </div>

            {/* Reset Filters Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={onResetFilters}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2A1D20] text-red-400 border border-red-900/50 hover:bg-red-900/40 transition-colors"
                title="Reset all active filters"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset ({activeFilterCount})</span>
              </button>
            )}

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/mahi3108/F1.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#161B26] text-gray-300 border border-[#242B3D] hover:bg-[#202737] hover:text-white transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
