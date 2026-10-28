export interface KPIs {
  competing_teams: number;
  seasons_in_play: number;
  race_outcomes_logged: number;
  circuits_raced: number;
  circuits_showcased: number;
  drivers_count: number;
  countries_count: number;
  total_podiums: number;
  total_dnfs: number;
  overall_reliability_pct: number;
}

export interface FilterOptions {
  seasons: number[];
  teams: string[];
  drivers: string[];
  countries: string[];
  circuits: string[];
  tyres: string[];
  dnf_reasons: string[];
}

export interface ActiveFilters {
  season: string; // 'All' or specific year
  driver: string;
  team: string;
  country: string;
  circuit: string;
  outcome: string; // 'All', 'Finished', 'DNF', or specific reason
  tyre: string;
}

export interface DriverPerformance {
  driver: string;
  points: number;
  races: number;
  wins: number;
  podiums: number;
  dnfs: number;
  avg_finish: number;
  country: string;
  country_code: string;
  flag: string;
  team: string;
  team_color: string;
}

export interface TeamPerformance {
  team: string;
  points: number;
  races: number;
  wins: number;
  podiums: number;
  dnfs: number;
  color: string;
}

export interface TeamSeasonTrend {
  seasons: number[];
  teams: {
    team: string;
    color: string;
    points_by_season: number[];
  }[];
}

export interface DriverReliabilityItem {
  driver: string;
  total_races: number;
  finished: number;
  dnf_total: number;
  reliability_rate: number;
  reasons: Record<string, number>;
}

export interface DriverReliabilityData {
  categories: string[];
  drivers: DriverReliabilityItem[];
}

export interface TyreUsageItem {
  compound: string;
  count: number;
  percentage: number;
  color: string;
}

export interface CountryParticipationItem {
  country: string;
  races_hosted: number;
  total_entries: number;
  circuits_count: number;
}

export interface CircuitShowcasedItem {
  country: string;
  count: number;
  circuits: string[];
}

export interface PodiumAchievementItem {
  driver: string;
  team: string;
  total_podiums: number;
  p1_wins: number;
  p2_count: number;
  p3_count: number;
  points: number;
  team_color: string;
}

export interface GlobalDriverGeoItem {
  country: string;
  country_code: string;
  lat: number;
  lng: number;
  count: number;
  drivers: string[];
  flag: string;
}

export interface CircuitGeoItem {
  circuit_id: string;
  circuit_name: string;
  country: string;
  city: string;
  type: string;
  lap_km: number;
  laps: number;
  altitude_m: number;
  direction: string;
  lat: number;
  lng: number;
  flag: string;
}

export interface RaceRecord {
  race_id: string;
  season: number;
  round: number;
  circuit: string;
  country: string;
  driver: string;
  team: string;
  pos: number | null;
  grid: number | null;
  pts: number;
  dnf: number;
  dnf_reason: string;
  tyre: string;
}

export interface F1DashboardPayload {
  kpis: KPIs;
  filters: FilterOptions;
  driver_performance: DriverPerformance[];
  team_performance: TeamPerformance[];
  team_season_trends: TeamSeasonTrend;
  driver_reliability: DriverReliabilityData;
  tyre_usage: TyreUsageItem[];
  country_participation: CountryParticipationItem[];
  circuits_showcased: CircuitShowcasedItem[];
  podium_achievements: PodiumAchievementItem[];
  global_driver_geo: GlobalDriverGeoItem[];
  circuits_geo: CircuitGeoItem[];
  race_records: RaceRecord[];
}
