import React from 'react';
import { Users, Calendar, Flag, MapPin, Award, ShieldAlert, Activity } from 'lucide-react';
import { KPIs } from '../types';

interface KpiCardsProps {
  kpis: KPIs;
  isFiltered?: boolean;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ kpis, isFiltered }) => {
  return (
    <div className="space-y-3">
      {/* Primary 4 KPI Cards (As required by Specification 4.A) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Competing Teams */}
        <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 relative overflow-hidden group hover:border-[#3671C6]/60 transition-all shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#3671C6]/5 rounded-bl-full pointer-events-none group-hover:bg-[#3671C6]/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Competing Teams
            </span>
            <div className="p-2 rounded-lg bg-[#3671C6]/10 text-[#3671C6]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {kpis.competing_teams}
            </span>
            <span className="text-xs text-gray-400 font-medium">Constructors</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Official FIA Constructors
          </p>
        </div>

        {/* KPI 2: Seasons in Play */}
        <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 relative overflow-hidden group hover:border-[#FFC900]/60 transition-all shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFC900]/5 rounded-bl-full pointer-events-none group-hover:bg-[#FFC900]/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Seasons in Play
            </span>
            <div className="p-2 rounded-lg bg-[#FFC900]/10 text-[#FFC900]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {kpis.seasons_in_play}
            </span>
            <span className="text-xs text-gray-400 font-medium">2010 – 2026</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Consecutive Championship Eras
          </p>
        </div>

        {/* KPI 3: Race Outcomes Logged */}
        <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 relative overflow-hidden group hover:border-[#E10600]/60 transition-all shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E10600]/5 rounded-bl-full pointer-events-none group-hover:bg-[#E10600]/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Race Outcomes Logged
            </span>
            <div className="p-2 rounded-lg bg-[#E10600]/10 text-[#E10600]">
              <Flag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {kpis.race_outcomes_logged.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 font-medium">Race Finishes</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            {isFiltered ? 'Active Filter Selection' : 'Exact Verified Dataset Records'}
          </p>
        </div>

        {/* KPI 4: Circuits Showcased */}
        <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-4 relative overflow-hidden group hover:border-[#00D2BE]/60 transition-all shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D2BE]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00D2BE]/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Circuits Showcased
            </span>
            <div className="p-2 rounded-lg bg-[#00D2BE]/10 text-[#00D2BE]">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {kpis.circuits_showcased}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {kpis.circuits_raced} Grand Prix Tracks
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            24 Active Raced + 5 Reserve / Historic
          </p>
        </div>

      </div>

      {/* Secondary Fast Performance Telemetry Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="bg-[#0F131C] border border-[#1B212D] rounded-lg px-3.5 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-gray-400 font-medium">Podiums Awarded</span>
          </div>
          <span className="text-xs font-bold text-gray-200 font-mono">{kpis.total_podiums.toLocaleString()}</span>
        </div>

        <div className="bg-[#0F131C] border border-[#1B212D] rounded-lg px-3.5 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] text-gray-400 font-medium">Fleet Reliability</span>
          </div>
          <span className="text-xs font-bold text-emerald-400 font-mono">{kpis.overall_reliability_pct}%</span>
        </div>

        <div className="bg-[#0F131C] border border-[#1B212D] rounded-lg px-3.5 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span className="text-[11px] text-gray-400 font-medium">DNF Incidents</span>
          </div>
          <span className="text-xs font-bold text-red-400 font-mono">{kpis.total_dnfs}</span>
        </div>

        <div className="bg-[#0F131C] border border-[#1B212D] rounded-lg px-3.5 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] text-gray-400 font-medium">Featured Drivers</span>
          </div>
          <span className="text-xs font-bold text-cyan-400 font-mono">{kpis.drivers_count}</span>
        </div>
      </div>
    </div>
  );
};
