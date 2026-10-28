import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions, ActiveFilters } from '../types';

interface FilterBarProps {
  options: FilterOptions;
  filters: ActiveFilters;
  onChange: (key: keyof ActiveFilters, value: string) => void;
  onClearAll: () => void;
  filteredCount: number;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  options,
  filters,
  onChange,
  onClearAll,
  filteredCount,
  totalCount,
}) => {
  const activeKeys = (Object.keys(filters) as (keyof ActiveFilters)[]).filter(
    (k) => filters[k] !== 'All'
  );

  return (
    <div className="bg-[#10141D] border-b border-[#1E2330] py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Filter Dropdowns Grid */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-[#E10600]" />
              <span>Filters</span>
            </div>

            {/* Season Filter */}
            <select
              value={filters.season}
              onChange={(e) => onChange('season', e.target.value)}
              className="bg-[#161B26] text-gray-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#242B3D] focus:outline-none focus:border-[#E10600] cursor-pointer"
            >
              <option value="All">All Seasons (17)</option>
              {options.seasons.map((s) => (
                <option key={s} value={String(s)}>Season {s}</option>
              ))}
            </select>

            {/* Driver Filter */}
            <select
              value={filters.driver}
              onChange={(e) => onChange('driver', e.target.value)}
              className="bg-[#161B26] text-gray-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#242B3D] focus:outline-none focus:border-[#E10600] cursor-pointer"
            >
              <option value="All">All Drivers ({options.drivers.length})</option>
              {options.drivers.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Team Filter */}
            <select
              value={filters.team}
              onChange={(e) => onChange('team', e.target.value)}
              className="bg-[#161B26] text-gray-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#242B3D] focus:outline-none focus:border-[#E10600] cursor-pointer"
            >
              <option value="All">All Teams ({options.teams.length})</option>
              {options.teams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Country Filter */}
            <select
              value={filters.country}
              onChange={(e) => onChange('country', e.target.value)}
              className="bg-[#161B26] text-gray-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#242B3D] focus:outline-none focus:border-[#E10600] cursor-pointer"
            >
              <option value="All">All Countries ({options.countries.length})</option>
              {options.countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Circuit Filter */}
            <select
              value={filters.circuit}
              onChange={(e) => onChange('circuit', e.target.value)}
              className="bg-[#161B26] text-gray-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#242B3D] focus:outline-none focus:border-[#E10600] cursor-pointer"
            >
              <option value="All">All Circuits ({options.circuits.length})</option>
              {options.circuits.map((circ) => (
                <option key={circ} value={circ}>{circ}</option>
              ))}
            </select>

            {/* Race Outcome / DNF */}
            <select
              value={filters.outcome}
              onChange={(e) => onChange('outcome', e.target.value)}
              className="bg-[#161B26] text-gray-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#242B3D] focus:outline-none focus:border-[#E10600] cursor-pointer"
            >
              <option value="All">All Race Outcomes</option>
              <option value="Finished">Finished Only</option>
              <option value="DNF">Any DNF</option>
              {options.dnf_reasons.map((r) => (
                <option key={r} value={r}>DNF: {r}</option>
              ))}
            </select>

            {/* Tyre Compound */}
            <select
              value={filters.tyre}
              onChange={(e) => onChange('tyre', e.target.value)}
              className="bg-[#161B26] text-gray-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#242B3D] focus:outline-none focus:border-[#E10600] cursor-pointer"
            >
              <option value="All">All Tyre Compounds</option>
              {options.tyres.map((ty) => (
                <option key={ty} value={ty}>{ty}</option>
              ))}
            </select>
          </div>

          {/* Record counter & active chips */}
          <div className="flex items-center space-x-2 text-xs">
            <div className="px-2.5 py-1 rounded-md bg-[#161B26] border border-[#242B3D] text-gray-300 font-mono">
              Records: <span className="text-[#00D2BE] font-bold">{filteredCount.toLocaleString()}</span> / {totalCount.toLocaleString()}
            </div>

            {activeKeys.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-gray-400 hover:text-red-400 flex items-center px-2 py-1 rounded bg-[#1B202E] border border-[#2B354C] transition-colors"
              >
                <X className="w-3 h-3 mr-1" />
                Clear Filters
              </button>
            )}
          </div>

        </div>

        {/* Active Filter Chips */}
        {activeKeys.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-[#1A202C]">
            <span className="text-[11px] text-gray-400 font-medium mr-1">Active:</span>
            {activeKeys.map((k) => (
              <span
                key={k}
                className="inline-flex items-center text-[11px] font-medium bg-[#1C2333] text-[#60A5FA] px-2 py-0.5 rounded-full border border-[#2B3850]"
              >
                <span className="text-gray-400 uppercase text-[9px] mr-1">{k}:</span> {filters[k]}
                <button
                  onClick={() => onChange(k, 'All')}
                  className="ml-1.5 hover:text-white text-gray-400"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
