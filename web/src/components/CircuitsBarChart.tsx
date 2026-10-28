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
import { MapPin } from 'lucide-react';
import { CircuitShowcasedItem } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CircuitsBarChartProps {
  data: CircuitShowcasedItem[];
}

export const CircuitsBarChart: React.FC<CircuitsBarChartProps> = ({ data }) => {
  // Sort descending by circuit count, then alphabetically
  const sortedData = [...data].sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.country.localeCompare(b.country);
  });

  const labels = sortedData.map((item) => item.country);
  const counts = sortedData.map((item) => item.count);

  // Blue color palette on dark background as specified in Section 4.J
  const backgroundColors = sortedData.map((item) => {
    if (item.count >= 3) return '#3B82F6'; // Vibrant Blue
    if (item.count === 2) return '#2563EB'; // Royal Blue
    return '#1D4ED8'; // Deep Motorsport Blue
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Circuit Count',
        data: counts,
        backgroundColor: backgroundColors,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#60A5FA',
      },
    ],
  };

  const options = {
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
          label: (context: any) => {
            const item = sortedData[context.dataIndex];
            return ` Circuits: ${item.count}`;
          },
          afterBody: (items: any) => {
            const item = sortedData[items[0].dataIndex];
            return item.circuits.map((c) => ` • ${c}`);
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#9CA3AF',
          font: { size: 10, family: 'Inter' },
          maxRotation: 45,
          minRotation: 45,
        },
        title: {
          display: true,
          text: 'Host Country',
          color: '#6B7280',
          font: { size: 11 },
        },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: {
          color: '#9CA3AF',
          stepSize: 1,
          font: { size: 10, family: 'Inter' },
        },
        title: {
          display: true,
          text: 'Circuits Showcased (Distinct Count)',
          color: '#6B7280',
          font: { size: 11 },
        },
      },
    },
  };

  const totalCircuits = sortedData.reduce((acc, c) => acc + c.count, 0);

  return (
    <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#3B82F6]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Circuits Showcased by Host Country
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Vertical bar chart of unique Grand Prix circuit venues grouped by country in motorsport blue palette
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-[#3B82F6] px-2 py-0.5 bg-[#3B82F6]/10 rounded border border-[#3B82F6]/20">
          {totalCircuits} Circuits Total
        </span>
      </div>

      <div className="relative flex-1 min-h-[300px]">
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-2 pt-2 border-t border-[#1E2330] flex items-center justify-between text-[11px] text-gray-500 font-mono">
        <span>Columns: Country | Rows: Count of Circuits</span>
        <span>USA (3), Italy (3) lead multi-circuit hosting</span>
      </div>
    </div>
  );
};
