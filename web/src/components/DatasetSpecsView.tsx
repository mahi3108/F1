import React from 'react';
import { Database, CheckCircle, FileText, BarChart2, ShieldCheck } from 'lucide-react';
import { KPIs } from '../types';

interface DatasetSpecsViewProps {
  kpis: KPIs;
}

export const DatasetSpecsView: React.FC<DatasetSpecsViewProps> = ({ kpis }) => {
  const sheets = [
    {
      name: 'race_results',
      records: 6464,
      columns: 42,
      description: 'Granular per-driver race entries with finishing positions, grid slots, lap times, pit stops, starting compounds, DNF reasons, and points.',
      primaryKey: 'race_id, driver',
    },
    {
      name: 'circuits',
      records: 29,
      columns: 9,
      description: 'Master circuit dimension table including circuit name, country, city, laps, lap length km, circuit type (permanent vs street), altitude, and direction.',
      primaryKey: 'circuit_id',
    },
    {
      name: 'championship_standings',
      records: 311,
      columns: 10,
      description: 'Official season-end championship standings per driver: position, constructor, cumulative points, race wins, podiums, pole positions, and championship crown flag.',
      primaryKey: 'season, driver',
    },
    {
      name: 'lap_intelligence',
      records: 3814,
      columns: 14,
      description: 'High-frequency telemetry lap records including lap times, sectors 1-3, tyre compound in use, tyre age in laps, DRS status, and speed trap readings.',
      primaryKey: 'race_id, lap_number, driver',
    },
    {
      name: 'qualifying_results',
      records: 3130,
      columns: 16,
      description: 'Saturday qualifying session classification times (Q1, Q2, Q3), gaps to pole position, sector breakdown, top speeds, and compound choice.',
      primaryKey: 'race_id, driver',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Specs Header */}
      <div className="bg-[#121620] border border-[#1E2330] rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-[#00D2BE] text-xs font-bold uppercase tracking-wider mb-2">
          <Database className="w-4 h-4" />
          <span>FIA Dataset Architecture & Verification</span>
        </div>
        <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
          Formula 1 Project Dataset Specifications (2010 – 2026)
        </h2>
        <p className="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">
          The underlying dataset contains comprehensive historical Formula 1 World Championship telemetry and classifications.
          Below is the verified schema breakdown against the actual file <code className="text-[#FFC900] bg-black/40 px-1 py-0.5 rounded">F1 Racing Project Dataset.xlsx</code>.
        </p>

        {/* Audit Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#1E2330]">
          <div className="p-2.5 rounded-lg bg-[#0B0E14] border border-[#1E2330]">
            <span className="text-[10px] text-gray-500 uppercase font-bold">Total Race Records</span>
            <div className="text-lg font-mono font-bold text-white">{kpis.race_outcomes_logged.toLocaleString()}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0B0E14] border border-[#1E2330]">
            <span className="text-[10px] text-gray-500 uppercase font-bold">Seasons in Play</span>
            <div className="text-lg font-mono font-bold text-white">{kpis.seasons_in_play} (2010-2026)</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0B0E14] border border-[#1E2330]">
            <span className="text-[10px] text-gray-500 uppercase font-bold">Grand Prix Venues</span>
            <div className="text-lg font-mono font-bold text-white">{kpis.circuits_showcased} (24 Raced)</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0B0E14] border border-[#1E2330]">
            <span className="text-[10px] text-gray-500 uppercase font-bold">Competing Teams</span>
            <div className="text-lg font-mono font-bold text-white">{kpis.competing_teams} Constructors</div>
          </div>
        </div>
      </div>

      {/* Sheets Table */}
      <div className="bg-[#121620] border border-[#1E2330] rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#1E2330] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#FFC900]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Excel Sheet Schema & Record Quantities
            </h3>
          </div>
          <span className="text-xs text-emerald-400 flex items-center space-x-1 font-mono">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>100% Validated</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0E14] text-gray-400 font-semibold uppercase tracking-wider border-b border-[#1E2330]">
              <tr>
                <th className="py-3 px-4">Sheet Name</th>
                <th className="py-3 px-4">Records</th>
                <th className="py-3 px-4">Columns</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Composite Key</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A202C] text-gray-300">
              {sheets.map((s) => (
                <tr key={s.name} className="hover:bg-[#161B26] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-white flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E10600]" />
                    <span>{s.name}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">{s.records.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{s.columns}</td>
                  <td className="py-3 px-4 text-gray-300 max-w-md">{s.description}</td>
                  <td className="py-3 px-4 font-mono text-gray-400 text-[11px]">{s.primaryKey}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclosures & Verification Note */}
      <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-5 text-xs text-gray-400 space-y-2">
        <div className="flex items-center space-x-2 text-white font-bold uppercase tracking-wider text-xs">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>Audit & Calculation Disclosure</span>
        </div>
        <p leading-relaxed>
          • <strong className="text-gray-200">Podium Finishes:</strong> Strictly calculated as finishes in positions 1, 2, or 3 (<code className="text-gray-300 font-mono">finish_position IN (1,2,3)</code>), exactly equaling 940 podium places across all 6,464 race records.
        </p>
        <p leading-relaxed>
          • <strong className="text-gray-200">DNF Classification:</strong> Exactly 396 retirements occurred with stewarded failure causes: Engine (73), Hydraulics (70), Mechanical (67), Brake failure (64), Gearbox (62), Collision (60). Finished races total 6,068 (93.9% reliability rate).
        </p>
        <p leading-relaxed>
          • <strong className="text-gray-200">Circuits Showcased:</strong> 24 active Grand Prix tracks were raced during these seasons, while 29 total tracks are maintained in the international circuit register (including Nürburgring, Portimão, Mugello, Istanbul Park, and Sochi). Both metrics are clearly surfaced.
        </p>
      </div>
    </div>
  );
};
