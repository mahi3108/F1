import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Disc } from 'lucide-react';
import { TyreUsageItem } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TyreCompoundChartProps {
  tyreData: TyreUsageItem[];
}

export const TyreCompoundChart: React.FC<TyreCompoundChartProps> = ({ tyreData }) => {
  const labels = tyreData.map((t) => t.compound);
  const dataCounts = tyreData.map((t) => t.count);
  const backgroundColors = tyreData.map((t) => t.color);

  const totalEntries = tyreData.reduce((acc, t) => acc + t.count, 0);

  const chartData = {
    labels,
    datasets: [
      {
        data: dataCounts,
        backgroundColor: backgroundColors,
        borderColor: '#0B0E14',
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        display: false, // Custom legend below for motorsport styling
      },
      tooltip: {
        backgroundColor: '#151922',
        titleColor: '#FFFFFF',
        bodyColor: '#D1D5DB',
        borderColor: '#242B3D',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context: any) => {
            const count = context.parsed;
            const pct = ((count / totalEntries) * 100).toFixed(1);
            return ` ${context.label}: ${count.toLocaleString()} stints (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Disc className="w-4 h-4 text-[#E10600]" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Tyre Compound Usage Distribution
          </h2>
        </div>
        <span className="text-xs font-mono text-gray-400">Pirelli F1 Tyre Specs</span>
      </div>
      <p className="text-xs text-gray-400 mb-2">
        Breakdown of race starting tyres across all 6,464 race records
      </p>

      {/* Donut Chart with Centered Total */}
      <div className="relative flex-1 min-h-[220px] flex items-center justify-center">
        <Doughnut data={chartData} options={options} />
        <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl font-extrabold text-white font-mono leading-none">
            {totalEntries.toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-semibold">
            Tyre Stints
          </span>
        </div>
      </div>

      {/* Custom Motorsport Tyre Legend */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#1E2330]">
        {tyreData.map((t) => (
          <div
            key={t.compound}
            className="flex items-center justify-between p-1.5 rounded-lg bg-[#0F131C] border border-[#1F2637]"
          >
            <div className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full border border-gray-900 shadow-sm"
                style={{ backgroundColor: t.color }}
              />
              <span className="text-xs font-medium text-gray-200">{t.compound}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-white font-mono mr-1">{t.percentage}%</span>
              <span className="text-[10px] text-gray-500">({t.count.toLocaleString()})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
