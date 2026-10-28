import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Award } from 'lucide-react';
import { TeamPerformance } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TeamRankingChartProps {
  teams: TeamPerformance[];
}

export const TeamRankingChart: React.FC<TeamRankingChartProps> = ({ teams }) => {
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  const labels = sortedTeams.map((t) => t.team);
  const dataPoints = sortedTeams.map((t) => t.points);
  const backgroundColors = sortedTeams.map((t) => t.color || '#3B82F6');

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Constructors Points',
        data: dataPoints,
        backgroundColor: backgroundColors,
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const, // Horizontal Bar Chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#151922',
        titleColor: '#FFFFFF',
        bodyColor: '#D1D5DB',
        borderColor: '#242B3D',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          afterLabel: (context: any) => {
            const team = sortedTeams[context.dataIndex];
            return `Wins: ${team.wins} | Podiums: ${team.podiums} | Races: ${team.races}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9CA3AF', font: { size: 10, family: 'Inter' } },
        title: {
          display: true,
          text: 'Cumulative Championship Points',
          color: '#6B7280',
          font: { size: 11 },
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: '#E5E7EB',
          font: { size: 11, weight: 'bold' as const, family: 'Inter' },
        },
      },
    },
  };

  return (
    <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-[#00D2BE]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Constructors Championship Ranking
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Horizontal ranking of all 10 constructors by cumulative points total
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-[#00D2BE] px-2 py-0.5 bg-[#00D2BE]/10 rounded border border-[#00D2BE]/20">
          10 Teams
        </span>
      </div>

      <div className="relative flex-1 min-h-[300px]">
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-2 pt-2 border-t border-[#1E2330] flex items-center justify-between text-[11px] text-gray-500 font-mono">
        <span>Leader: {sortedTeams[0]?.team} ({sortedTeams[0]?.points.toLocaleString()} PTS)</span>
        <span>Points Aggregated Over 17 Seasons</span>
      </div>
    </div>
  );
};
