import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, CheckSquare, Square } from 'lucide-react';
import { TeamSeasonTrend } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TeamSeasonTrendChartProps {
  trendData: TeamSeasonTrend;
}

export const TeamSeasonTrendChart: React.FC<TeamSeasonTrendChartProps> = ({ trendData }) => {
  // Allow toggling specific teams
  const [selectedTeams, setSelectedTeams] = useState<string[]>(
    trendData.teams.slice(0, 5).map((t) => t.team) // Default top 5 teams
  );

  const toggleTeam = (teamName: string) => {
    if (selectedTeams.includes(teamName)) {
      if (selectedTeams.length > 1) {
        setSelectedTeams(selectedTeams.filter((t) => t !== teamName));
      }
    } else {
      setSelectedTeams([...selectedTeams, teamName]);
    }
  };

  const selectAll = () => {
    setSelectedTeams(trendData.teams.map((t) => t.team));
  };

  const selectTop3 = () => {
    setSelectedTeams(trendData.teams.slice(0, 3).map((t) => t.team));
  };

  const seasonsLabels = trendData.seasons.map((s) => String(s));

  const activeDatasets = trendData.teams
    .filter((t) => selectedTeams.includes(t.team))
    .map((t) => ({
      label: t.team,
      data: t.points_by_season,
      borderColor: t.color,
      backgroundColor: `${t.color}20`,
      tension: 0.3,
      borderWidth: 2.5,
      pointRadius: 3,
      pointHoverRadius: 6,
    }));

  const chartData = {
    labels: seasonsLabels,
    datasets: activeDatasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9CA3AF',
          font: { size: 10, family: 'Inter' },
          boxWidth: 10,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#151922',
        titleColor: '#FFFFFF',
        bodyColor: '#D1D5DB',
        borderColor: '#242B3D',
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9CA3AF', font: { size: 10, family: 'Inter' } },
        title: {
          display: true,
          text: 'F1 Championship Season (2010 - 2026)',
          color: '#6B7280',
          font: { size: 11 },
        },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9CA3AF', font: { size: 10, family: 'Inter' } },
        title: {
          display: true,
          text: 'Championship Points',
          color: '#6B7280',
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 shadow-lg flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-[#FF8000]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Team Championship Performance Across Seasons
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Historical points progression for constructors across all 17 championship seasons (2010–2026)
          </p>
        </div>

        {/* Quick selection shortcuts */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={selectTop3}
            className="px-2 py-0.5 rounded bg-[#1A202C] text-gray-300 hover:text-white border border-[#2B354C]"
          >
            Top 3
          </button>
          <button
            onClick={selectAll}
            className="px-2 py-0.5 rounded bg-[#1A202C] text-gray-300 hover:text-white border border-[#2B354C]"
          >
            Select All
          </button>
        </div>
      </div>

      {/* Team Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {trendData.teams.map((t) => {
          const isSelected = selectedTeams.includes(t.team);
          return (
            <button
              key={t.team}
              onClick={() => toggleTeam(t.team)}
              className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all border ${
                isSelected
                  ? 'border-opacity-80 text-white font-bold'
                  : 'bg-[#10141D] text-gray-500 border-[#1E2330] opacity-60 hover:opacity-100'
              }`}
              style={{
                borderColor: isSelected ? t.color : '#242B3D',
                backgroundColor: isSelected ? `${t.color}25` : '#10141D',
              }}
            >
              {isSelected ? (
                <CheckSquare className="w-3 h-3" style={{ color: t.color }} />
              ) : (
                <Square className="w-3 h-3 text-gray-500" />
              )}
              <span>{t.team}</span>
            </button>
          );
        })}
      </div>

      <div className="relative flex-1 min-h-[300px]">
        <Line data={chartData} options={options} />
      </div>

      <div className="mt-2 pt-2 border-t border-[#1E2330] flex items-center justify-between text-[11px] text-gray-500 font-mono">
        <span>Displaying {selectedTeams.length} of {trendData.teams.length} constructors</span>
        <span>17 Seasons Tracked</span>
      </div>
    </div>
  );
};
