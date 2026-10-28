"""
Data Validation and Quality Assurance Test Suite
Verifies data integrity, schema consistency, column non-nullability,
and ensures that all calculations match the underlying records.
"""

import os
import json
import unittest
import pandas as pd

class TestF1DataIntegrity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        cls.raw_excel = os.path.join(cls.base_dir, 'data', 'raw', 'F1 Racing Project Dataset.xlsx')
        cls.json_path = os.path.join(cls.base_dir, 'data', 'processed', 'f1_dashboard_data.json')
        cls.races_csv = os.path.join(cls.base_dir, 'data', 'processed', 'race_results.csv')
        cls.circuits_csv = os.path.join(cls.base_dir, 'data', 'processed', 'circuits.csv')
        
        with open(cls.json_path, 'r', encoding='utf-8') as f:
            cls.dashboard_data = json.load(f)
            
        cls.df_races = pd.read_csv(cls.races_csv)
        cls.df_circuits = pd.read_csv(cls.circuits_csv)

    def test_record_counts(self):
        """Verify the exact count of 6,464 race records."""
        self.assertEqual(len(self.df_races), 6464)
        self.assertEqual(self.dashboard_data['kpis']['race_outcomes_logged'], 6464)

    def test_seasons_count(self):
        """Verify 17 distinct seasons (2010 - 2026)."""
        seasons = sorted(self.df_races['season'].unique())
        self.assertEqual(len(seasons), 17)
        self.assertEqual(seasons[0], 2010)
        self.assertEqual(seasons[-1], 2026)
        self.assertEqual(self.dashboard_data['kpis']['seasons_in_play'], 17)

    def test_teams_count(self):
        """Verify 10 active competing constructors."""
        teams = self.df_races['team'].unique()
        self.assertEqual(len(teams), 10)
        self.assertEqual(self.dashboard_data['kpis']['competing_teams'], 10)

    def test_circuits_count(self):
        """Verify 24 raced circuits in results and 29 total circuits in calendar."""
        self.assertEqual(self.df_races['circuit_id'].nunique(), 24)
        self.assertEqual(len(self.df_circuits), 29)
        self.assertEqual(self.dashboard_data['kpis']['circuits_raced'], 24)
        self.assertEqual(self.dashboard_data['kpis']['circuits_showcased'], 29)

    def test_dnf_consistency(self):
        """Verify DNF sum and breakdown reasons."""
        dnf_total = self.df_races['dnf'].sum()
        self.assertEqual(dnf_total, 396)
        reasons_count = self.df_races['dnf_reason'].dropna().count()
        self.assertEqual(reasons_count, 396)
        self.assertEqual(self.dashboard_data['kpis']['total_dnfs'], 396)

    def test_podium_counting(self):
        """Verify top-3 podium count and no double counting."""
        podiums = self.df_races[self.df_races['finish_position'].isin([1, 2, 3])]
        self.assertEqual(len(podiums), 940)
        self.assertEqual(self.dashboard_data['kpis']['total_podiums'], 940)

    def test_driver_points_sum(self):
        """Verify that cumulative driver leaderboard matches sum of individual race points."""
        total_pts_races = self.df_races['points'].sum()
        total_pts_drivers = sum(d['points'] for d in self.dashboard_data['driver_performance'])
        self.assertEqual(total_pts_races, total_pts_drivers)

    def test_team_points_sum(self):
        """Verify that cumulative constructor points match race points."""
        total_pts_races = self.df_races['points'].sum()
        total_pts_teams = sum(t['points'] for t in self.dashboard_data['team_performance'])
        self.assertEqual(total_pts_races, total_pts_teams)

    def test_tyre_compound_total(self):
        """Verify starting compound counts sum to total records."""
        tyre_sum = sum(t['count'] for t in self.dashboard_data['tyre_usage'])
        self.assertEqual(tyre_sum, 6464)

if __name__ == '__main__':
    unittest.main()
