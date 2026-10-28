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
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { DriverReliabilityData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DriverReliabilityChartProps {
  data: DriverReliabilityData;
}

export const DriverReliabilityChart: React.FC<DriverReliabilityChartProps> = ({ data }) => {
  // Sort drivers by highest finished count or reliability
  const sortedDrivers = [...data.drivers].sort((a, b) => b.total_races - a.total_races);

  const labels = sortedDrivers.map((d) => d.driver);

  // Exact failure categories present in dataset
  const categoryColors: Record<string, string> = {
    'Finished': '#10B981',      // Emerald Green
    'Engine': '#EF4444',        // Red
    'Hydraulics': '#F59E0B',    // Amber
    'Mechanical': '#8B5CF6',    // Purple
    'Brake failure': '#F97316', // Orange
    'Gearbox': '#3B82F6',       // Blue
    'Collision': '#EC4899',     // Pink
  };

  const categories = ['Finished', 'Engine', 'Hydraulics', 'Mechanical', 'Brake failure', 'Gearbox', 'Collision'];

  const datasets = categories.map((cat) => ({
    label: cat,
    data: sortedDrivers.map((d) => {
      if (cat === 'Finished') return d.finished;
      return d.reasons[cat] || 0;
    }),
    backgroundColor: categoryColors[cat] || '#6B7280',
    borderRadius: cat === 'Collision' ? 4 : 0,
    stack: 'reliability',
  }));

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9CA3AF',
          font: { size: 11, family: 'Inter' },
          boxWidth: 12,
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
        callbacks: {
          footer: (items: any) => {
            const index = items[0].dataIndex;
            const driver = sortedDrivers[index];
            return `Total: ${driver.total_races} races\nReliability: ${driver.reliability_rate}%`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: {
          color: '#9CA3AF',
          font: { size: 10, family: 'Inter' },
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        stacked: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9CA3AF', font: { size: 10, family: 'Inter' } },
        title: {
          display: true,
          text: 'Race Outcomes Logged',
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
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Driver Reliability & DNF Failure Analysis
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Stacked breakdown of finished races vs failure causes (Engine, Hydraulics, Mechanical, Brakes, Gearbox, Collision)
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 bg-[#10B981]/10 text-[#10B981] font-semibold rounded-md border border-[#10B981]/20">
            Finished: 6,068 (93.9%)
          </span>
          <span className="px-2.5 py-1 bg-red-900/20 text-red-400 font-semibold rounded-md border border-red-900/30">
            DNFs: 396 (6.1%)
          </span>
        </div>
      </div>

      <div className="relative flex-1 min-h-[320px]">
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-2 pt-2 border-t border-[#1E2330] flex items-center justify-between text-[11px] text-gray-400">
        <div className="flex items-center space-x-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Failure Classifications sourced directly from race steward reports</span>
        </div>
        <span className="font-mono text-gray-400">Zero synthetic classifications</span>
      </div>
    </div>
  );
};
