import React, { useState } from 'react';
import { Flag, Layers } from 'lucide-react';
import { CountryParticipationItem } from '../types';

interface CountryParticipationChartProps {
  data: CountryParticipationItem[];
}

export const CountryParticipationChart: React.FC<CountryParticipationChartProps> = ({ data }) => {
  const [metric, setMetric] = useState<'entries' | 'races'>('entries');

  const totalValue = data.reduce(
    (acc, c) => acc + (metric === 'entries' ? c.total_entries : c.races_hosted),
    0
  );

  // Color gradient palette for Treemap tiles
  const getTileColor = (ratio: number) => {
    if (ratio > 0.08) return 'bg-[#1E3A8A] border-[#3B82F6] text-blue-100'; // Deep blue
    if (ratio > 0.05) return 'bg-[#1E293B] border-[#00D2BE] text-cyan-100'; // Cyan blue
    if (ratio > 0.03) return 'bg-[#162032] border-[#2563EB] text-blue-200';
    return 'bg-[#111827] border-[#374151] text-gray-300';
  };

  return (
    <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 shadow-lg flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#0090FF]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Country-Wise Race Participation
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Treemap showing distribution of Formula 1 Grand Prix host nations
          </p>
        </div>

        {/* Metric Selector */}
        <div className="flex bg-[#0B0E14] p-1 rounded-lg border border-[#242B3D] text-xs self-start sm:self-auto">
          <button
            onClick={() => setMetric('entries')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              metric === 'entries' ? 'bg-[#0090FF] text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Total Entries ({totalValue.toLocaleString()})
          </button>
          <button
            onClick={() => setMetric('races')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              metric === 'races' ? 'bg-[#0090FF] text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Races Hosted
          </button>
        </div>
      </div>

      {/* Treemap Mosaic Grid */}
      <div className="flex-1 min-h-[300px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 overflow-y-auto max-h-[380px] p-1">
        {data.map((c) => {
          const val = metric === 'entries' ? c.total_entries : c.races_hosted;
          const ratio = val / totalValue;
          const pct = ((val / totalValue) * 100).toFixed(1);
          const tileClass = getTileColor(ratio);

          return (
            <div
              key={c.country}
              className={`group relative rounded-lg p-2.5 border transition-all hover:scale-[1.02] hover:z-10 shadow-sm flex flex-col justify-between ${tileClass}`}
              title={`${c.country}: ${val} ${metric === 'entries' ? 'race entries' : 'races hosted'} (${pct}%), ${c.circuits_count} circuit(s)`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs truncate text-white group-hover:text-[#00D2BE]">
                    {c.country}
                  </span>
                  <Flag className="w-3 h-3 text-gray-400 opacity-70 group-hover:opacity-100" />
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  {c.circuits_count} {c.circuits_count === 1 ? 'Circuit' : 'Circuits'}
                </div>
              </div>

              <div className="mt-2 pt-1 border-t border-white/10 flex items-baseline justify-between">
                <span className="font-mono text-sm font-extrabold text-white">
                  {val.toLocaleString()}
                </span>
                <span className="font-mono text-[10px] opacity-80">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 pt-2 border-t border-[#1E2330] flex items-center justify-between text-[11px] text-gray-500 font-mono">
        <span>21 Host Countries Total</span>
        <span>Sized by {metric === 'entries' ? 'Driver Entries Logged' : 'Grand Prix Hosted'}</span>
      </div>
    </div>
  );
};
