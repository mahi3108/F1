import React, { useState, useMemo } from 'react';
import rawData from './data/f1Data.json';
import { F1DashboardPayload, ActiveFilters, KPIs } from './types';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { KpiCards } from './components/KpiCards';
import { DriverMap } from './components/DriverMap';
import { DriverReliabilityChart } from './components/DriverReliabilityChart';
import { DriverLeaderboard } from './components/DriverLeaderboard';
import { TeamRankingChart } from './components/TeamRankingChart';
import { TeamSeasonTrendChart } from './components/TeamSeasonTrendChart';
import { TyreCompoundChart } from './components/TyreCompoundChart';
import { CountryParticipationChart } from './components/CountryParticipationChart';
import { PodiumBubbleChart } from './components/PodiumBubbleChart';
import { CircuitsBarChart } from './components/CircuitsBarChart';
import { TableauEmbedView } from './components/TableauEmbedView';
import { DatasetSpecsView } from './components/DatasetSpecsView';

const data = rawData as unknown as F1DashboardPayload;

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tableau' | 'dataset'>('dashboard');

  const initialFilters: ActiveFilters = {
    season: 'All',
    driver: 'All',
    team: 'All',
    country: 'All',
    circuit: 'All',
    outcome: 'All',
    tyre: 'All',
  };

  const [filters, setFilters] = useState<ActiveFilters>(initialFilters);

  const handleFilterChange = (key: keyof ActiveFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const activeFilterCount = useMemo(() => {
    return (Object.keys(filters) as (keyof ActiveFilters)[]).filter(
      (k) => filters[k] !== 'All'
    ).length;
  }, [filters]);

  // Client-side dynamic filtering of race records
  const filteredRecords = useMemo(() => {
    return data.race_records.filter((r) => {
      if (filters.season !== 'All' && r.season !== Number(filters.season)) return false;
      if (filters.driver !== 'All' && r.driver !== filters.driver) return false;
      if (filters.team !== 'All' && r.team !== filters.team) return false;
      if (filters.country !== 'All' && r.country !== filters.country) return false;
      if (filters.circuit !== 'All' && r.circuit !== filters.circuit) return false;
      if (filters.tyre !== 'All' && r.tyre !== filters.tyre) return false;
      if (filters.outcome !== 'All') {
        if (filters.outcome === 'Finished' && r.dnf !== 0) return false;
        if (filters.outcome === 'DNF' && r.dnf !== 1) return false;
        if (filters.outcome !== 'Finished' && filters.outcome !== 'DNF') {
          if (r.dnf_reason !== filters.outcome) return false;
        }
      }
      return true;
    });
  }, [filters]);

  // Dynamically compute KPIs based on active filter selection
  const computedKPIs: KPIs = useMemo(() => {
    if (activeFilterCount === 0) return data.kpis;

    const distinctTeams = new Set(filteredRecords.map((r) => r.team)).size;
    const distinctSeasons = new Set(filteredRecords.map((r) => r.season)).size;
    const totalOutcomes = filteredRecords.length;
    const distinctCircuits = new Set(filteredRecords.map((r) => r.circuit)).size;
    const distinctDrivers = new Set(filteredRecords.map((r) => r.driver)).size;
    const distinctCountries = new Set(filteredRecords.map((r) => r.country)).size;
    const podiums = filteredRecords.filter((r) => r.pos !== null && [1, 2, 3].includes(r.pos)).length;
    const dnfs = filteredRecords.filter((r) => r.dnf === 1).length;
    const reliability = totalOutcomes > 0 ? Number((((totalOutcomes - dnfs) / totalOutcomes) * 100).toFixed(1)) : 100;

    return {
      competing_teams: distinctTeams,
      seasons_in_play: distinctSeasons,
      race_outcomes_logged: totalOutcomes,
      circuits_raced: distinctCircuits,
      circuits_showcased: distinctCircuits || data.kpis.circuits_showcased,
      drivers_count: distinctDrivers,
      countries_count: distinctCountries,
      total_podiums: podiums,
      total_dnfs: dnfs,
      overall_reliability_pct: reliability,
    };
  }, [filteredRecords, activeFilterCount]);

  return (
    <div className="min-h-screen bg-[#07090E] text-gray-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Header
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Global Interactive Filter Ribbon */}
      <FilterBar
        options={data.filters}
        filters={filters}
        onChange={handleFilterChange}
        onClearAll={handleResetFilters}
        filteredCount={filteredRecords.length}
        totalCount={data.race_records.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Section A: KPI Cards */}
            <section id="section-kpis">
              <KpiCards kpis={computedKPIs} isFiltered={activeFilterCount > 0} />
            </section>

            {/* Row 1: Global Driver Distribution Map (B) & Driver Reliability (C) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <DriverMap
                  driverGeo={data.global_driver_geo}
                  circuitsGeo={data.circuits_geo}
                />
              </div>
              <div className="lg:col-span-6">
                <DriverReliabilityChart data={data.driver_reliability} />
              </div>
            </div>

            {/* Row 2: Driver Leaderboard (D) & Team Performance Ranking (E) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <DriverLeaderboard drivers={data.driver_performance} />
              </div>
              <div className="lg:col-span-6">
                <TeamRankingChart teams={data.team_performance} />
              </div>
            </div>

            {/* Row 3: Team Season Trends (F) & Tyre Compound Usage (G) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <TeamSeasonTrendChart trendData={data.team_season_trends} />
              </div>
              <div className="lg:col-span-4">
                <TyreCompoundChart tyreData={data.tyre_usage} />
              </div>
            </div>

            {/* Row 4: Country-Wise Participation (H) & Podium Achievements Bubble (I) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <CountryParticipationChart data={data.country_participation} />
              </div>
              <div className="lg:col-span-6">
                <PodiumBubbleChart data={data.podium_achievements} />
              </div>
            </div>

            {/* Row 5: Circuits Showcased Bar Chart (J) */}
            <div className="grid grid-cols-1 gap-6">
              <CircuitsBarChart data={data.circuits_showcased} />
            </div>
          </div>
        )}

        {activeTab === 'tableau' && <TableauEmbedView />}

        {activeTab === 'dataset' && <DatasetSpecsView kpis={data.kpis} />}

      </main>

      {/* Footer */}
      <footer className="bg-[#0B0E14] border-t border-[#1E2330] py-4 text-center text-xs text-gray-500 font-mono">
        <div className="max-w-[1700px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Formula 1 Race Intelligence Dashboard • Verified 6,464 Records Across 17 Seasons (2010–2026)</span>
          <span>Tableau Workbook Preserved & Packaged in <code className="text-gray-400">/tableau</code></span>
        </div>
      </footer>
    </div>
  );
};
export default App;
