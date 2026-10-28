import React from 'react';
import { Layers, FileSpreadsheet, Download, ExternalLink, CheckCircle2, ShieldCheck, Database } from 'lucide-react';

export const TableauEmbedView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-[#121620] via-[#1A2234] to-[#121620] border border-[#242B3D] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E10600]/5 rounded-bl-full pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E10600]/10 border border-[#E10600]/20 text-[#E10600] text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Tableau Desktop & Public Integration</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            F1 Racing Analysis Tableau Workbook
          </h2>
          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            Preserved and enhanced directly from the provided workbook <code className="text-[#FFC900] bg-black/40 px-1.5 py-0.5 rounded">F_1_Racing_Analysis_u.twb</code>.
            All datasource connection paths have been updated to portable relative paths, and a self-contained packaged workbook (<code className="text-[#00D2BE] bg-black/40 px-1.5 py-0.5 rounded">F_1_Racing_Analysis.twbx</code>) has been generated so anyone can open it with zero broken references.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
              <span>Packaged .twbx with embedded data</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-blue-400 bg-blue-950/30 border border-blue-900/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
              <span>12 Worksheets & 2 Executive Dashboards</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-purple-400 bg-purple-950/30 border border-purple-900/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
              <span>Tableau Public 2026.3 Compatible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau Worksheets & Dashboards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Card 1: Executive Dashboard */}
        <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#E10600] font-bold uppercase tracking-wider mb-2">
              <span>Main Dashboard</span>
              <span className="px-2 py-0.5 bg-[#E10600]/10 rounded border border-[#E10600]/20">Interactive</span>
            </div>
            <h3 className="text-base font-bold text-white">F1 Dashboard</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Consolidated command center featuring top KPI cards (Races, Seasons, Teams), Race Map by country, DNF failure reasons, Champions by season, and constructor win progression.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1E2330] text-[11px] text-gray-500 font-mono">
            Zone Layout: 12 interconnected worksheet views
          </div>
        </div>

        {/* Card 2: Storyline */}
        <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#FFC900] font-bold uppercase tracking-wider mb-2">
              <span>Storyline Flow</span>
              <span className="px-2 py-0.5 bg-[#FFC900]/10 rounded border border-[#FFC900]/20">Narrative</span>
            </div>
            <h3 className="text-base font-bold text-white">F1 Story</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Guided presentation story points detailing era-by-era domination: Red Bull V8 supremacy, Mercedes Hybrid dominance, and the ground-effect regulatory shifts.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1E2330] text-[11px] text-gray-500 font-mono">
            Target Audience: Race strategists & team executives
          </div>
        </div>

        {/* Card 3: Datasources */}
        <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#00D2BE] font-bold uppercase tracking-wider mb-2">
              <span>Datasource Models</span>
              <span className="px-2 py-0.5 bg-[#00D2BE]/10 rounded border border-[#00D2BE]/20">Relational</span>
            </div>
            <h3 className="text-base font-bold text-white">3 Federated Sources</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              1. <strong className="text-gray-200">Races</strong> (6,464 records across 42 race metrics)<br />
              2. <strong className="text-gray-200">Standings</strong> (311 season championship standing entries)<br />
              3. <strong className="text-gray-200">Lap Intelligence</strong> (3,814 telemetry lap points)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1E2330] text-[11px] text-gray-500 font-mono">
            Source: F1 Racing Project Dataset.xlsx
          </div>
        </div>

      </div>

      {/* Workbook File Details & Instructions */}
      <div className="bg-[#121620] border border-[#1E2330] rounded-xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
          <FileSpreadsheet className="w-5 h-5 text-[#FFC900]" />
          <span>Tableau Deliverables Included in Git Repository</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[#0B0E14] border border-[#1E2330]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-[#FF8000]">tableau/F_1_Racing_Analysis.twbx</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#FF8000]/15 text-[#FF8000] rounded font-semibold">Recommended</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Tableau Packaged Workbook (2.02 MB). Bundles the cleaned XML definitions and the complete multi-sheet Excel dataset. Double-click to open anywhere in Tableau Desktop or Tableau Public without data reconnection warnings.
            </p>
            <div className="text-[11px] text-gray-500 font-mono">
              Status: Verified & Built
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#0B0E14] border border-[#1E2330]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-gray-200">tableau/F_1_Racing_Analysis_u.twb</span>
              <span className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-300 rounded font-semibold">Raw XML</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Original Tableau Workbook XML (460 KB) with sanitized relative paths pointing to <code className="text-gray-200">../data/raw/F1 Racing Project Dataset.xlsx</code>. Suitable for version control diffs and Git tracking.
            </p>
            <div className="text-[11px] text-gray-500 font-mono">
              Status: Path Updated for Portability
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
