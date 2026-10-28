import React, { useState } from 'react';
import { Trophy, ArrowUpDown } from 'lucide-react';
import { DriverPerformance } from '../types';

interface DriverLeaderboardProps {
  drivers: DriverPerformance[];
}

export const DriverLeaderboard: React.FC<DriverLeaderboardProps> = ({ drivers }) => {
  const [sortBy, setSortBy] = useState<'points' | 'wins' | 'podiums' | 'races'>('points');

  const sortedList = [...drivers].sort((a, b) => b[sortBy] - a[sortBy]);
  const maxVal = Math.max(...sortedList.map((d) => d[sortBy]), 1);

  return (
    <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 shadow-lg flex flex-col h-full">
      {/* Header & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-[#FFC900]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Driver Performance Leaderboard
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Descending ranking of drivers by career championship points with stats
          </p>
        </div>

        {/* Sort Pill Buttons */}
        <div className="flex items-center bg-[#0B0E14] p-1 rounded-lg border border-[#242B3D] text-xs self-start sm:self-auto">
          <span className="text-[10px] text-gray-500 uppercase px-1.5 flex items-center">
            <ArrowUpDown className="w-3 h-3 mr-0.5" /> Sort:
          </span>
          <button
            onClick={() => setSortBy('points')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              sortBy === 'points' ? 'bg-[#FFC900] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Points
          </button>
          <button
            onClick={() => setSortBy('wins')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              sortBy === 'wins' ? 'bg-[#FFC900] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Wins
          </button>
          <button
            onClick={() => setSortBy('podiums')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              sortBy === 'podiums' ? 'bg-[#FFC900] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Podiums
          </button>
          <button
            onClick={() => setSortBy('races')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              sortBy === 'races' ? 'bg-[#FFC900] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Races
          </button>
        </div>
      </div>

      {/* Driver Bars Scrollable Container */}
      <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1.5">
        {sortedList.map((driver, index) => {
          const val = driver[sortBy];
          const pct = Math.max(5, (val / maxVal) * 100);

          return (
            <div
              key={driver.driver}
              className="group bg-[#0E121A] hover:bg-[#161B26] border border-[#1E2330] hover:border-[#2C3446] rounded-lg p-2.5 transition-all"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="w-5 text-right font-mono font-bold text-gray-500 group-hover:text-[#FFC900]">
                    #{index + 1}
                  </span>
                  <span className="text-sm">{driver.flag}</span>
                  <span className="font-bold text-white group-hover:text-[#FFC900] transition-colors">
                    {driver.driver}
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.2 rounded border font-medium text-gray-300"
                    style={{ borderColor: `${driver.team_color}60`, backgroundColor: `${driver.team_color}15` }}
                  >
                    {driver.team}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-right">
                  <span className="text-[11px] text-gray-400 hidden sm:inline">
                    {driver.wins}W • {driver.podiums}P • {driver.dnfs} DNF
                  </span>
                  <span className="font-mono font-extrabold text-[#FFC900] text-xs">
                    {val.toLocaleString()} {sortBy === 'points' ? 'PTS' : ''}
                  </span>
                </div>
              </div>

              {/* Progress Bar with point total marker */}
              <div className="w-full bg-[#181D2A] rounded-full h-2.5 overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: driver.team_color || '#3B82F6',
                    boxShadow: `0 0 8px ${driver.team_color}66`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-[#1E2330] flex items-center justify-between text-[11px] text-gray-500 font-mono">
        <span>Verified Points Total: {drivers.reduce((acc, d) => acc + d.points, 0).toLocaleString()} PTS</span>
        <span>FIA Championship Scoring Matrix Applied</span>
      </div>
    </div>
  );
};
