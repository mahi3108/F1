"""
Formula 1 Race Intelligence - Data Preprocessing & Analytics Pipeline
Reads official dataset from data/raw/F1 Racing Project Dataset.xlsx,
performs validation, data cleaning, feature engineering, and exports:
1. data/processed/*.csv (clean CSV files for all sheets)
2. data/processed/f1_dashboard_data.json (complete precomputed analytics & raw data for web dashboard)
"""

import os
import json
import pandas as pd
import numpy as np

# Coordinates for F1 Circuits
CIRCUIT_COORDINATES = {
    'bahrain': {'lat': 26.0325, 'lng': 50.5106, 'flag': '🇧🇭'},
    'jeddah': {'lat': 21.6319, 'lng': 39.1044, 'flag': '🇸🇦'},
    'albert_park': {'lat': -37.8497, 'lng': 144.9680, 'flag': '🇦🇺'},
    'suzuka': {'lat': 34.8431, 'lng': 136.5410, 'flag': '🇯🇵'},
    'shanghai': {'lat': 31.3389, 'lng': 121.2200, 'flag': '🇨🇳'},
    'miami': {'lat': 25.9581, 'lng': -80.2389, 'flag': '🇺🇸'},
    'imola': {'lat': 44.3439, 'lng': 11.7167, 'flag': '🇮🇹'},
    'monaco': {'lat': 43.7347, 'lng': 7.4206, 'flag': '🇲🇨'},
    'villeneuve': {'lat': 45.5000, 'lng': -73.5228, 'flag': '🇨🇦'},
    'catalunya': {'lat': 41.5700, 'lng': 2.2611, 'flag': '🇪🇸'},
    'red_bull_ring': {'lat': 47.2197, 'lng': 14.7647, 'flag': '🇦🇹'},
    'silverstone': {'lat': 52.0786, 'lng': -1.0169, 'flag': '🇬🇧'},
    'hungaroring': {'lat': 47.5789, 'lng': 19.2486, 'flag': '🇭🇺'},
    'spa': {'lat': 50.4372, 'lng': 5.9714, 'flag': '🇧🇪'},
    'zandvoort': {'lat': 52.3888, 'lng': 4.5409, 'flag': '🇳🇱'},
    'monza': {'lat': 45.6156, 'lng': 9.2811, 'flag': '🇮🇹'},
    'baku': {'lat': 40.3725, 'lng': 49.8533, 'flag': '🇦🇿'},
    'marina_bay': {'lat': 1.2914, 'lng': 103.8640, 'flag': '🇸🇬'},
    'cota': {'lat': 30.1328, 'lng': -97.6411, 'flag': '🇺🇸'},
    'rodriguez': {'lat': 19.4042, 'lng': -99.0907, 'flag': '🇲🇽'},
    'interlagos': {'lat': -23.7036, 'lng': -46.6997, 'flag': '🇧🇷'},
    'las_vegas': {'lat': 36.1147, 'lng': -115.1728, 'flag': '🇺🇸'},
    'losail': {'lat': 25.4900, 'lng': 51.4542, 'flag': '🇶🇦'},
    'yas_marina': {'lat': 24.4672, 'lng': 54.6031, 'flag': '🇦🇪'},
    'portimao': {'lat': 37.2270, 'lng': -8.6267, 'flag': '🇵🇹'},
    'mugello': {'lat': 43.9975, 'lng': 11.3719, 'flag': '🇮🇹'},
    'istanbul': {'lat': 40.9517, 'lng': 29.4050, 'flag': '🇹🇷'},
    'sochi': {'lat': 43.4057, 'lng': 39.9578, 'flag': '🇷🇺'},
    'nurburgring': {'lat': 50.3356, 'lng': 6.9475, 'flag': '🇩🇪'}
}

# Driver Nationality & Geographic Coordinates
DRIVER_METADATA = {
    'Max Verstappen': {'country': 'Netherlands', 'code': 'NED', 'flag': '🇳🇱', 'lat': 52.1326, 'lng': 5.2913},
    'Sergio Perez': {'country': 'Mexico', 'code': 'MEX', 'flag': '🇲🇽', 'lat': 23.6345, 'lng': -102.5528},
    'Lewis Hamilton': {'country': 'United Kingdom', 'code': 'GBR', 'flag': '🇬🇧', 'lat': 55.3781, 'lng': -3.4360},
    'George Russell': {'country': 'United Kingdom', 'code': 'GBR', 'flag': '🇬🇧', 'lat': 55.3781, 'lng': -3.4360},
    'Lando Norris': {'country': 'United Kingdom', 'code': 'GBR', 'flag': '🇬🇧', 'lat': 55.3781, 'lng': -3.4360},
    'Oscar Piastri': {'country': 'Australia', 'code': 'AUS', 'flag': '🇦🇺', 'lat': -25.2744, 'lng': 133.7751},
    'Charles Leclerc': {'country': 'Monaco', 'code': 'MCO', 'flag': '🇲🇨', 'lat': 43.7384, 'lng': 7.4246},
    'Carlos Sainz': {'country': 'Spain', 'code': 'ESP', 'flag': '🇪🇸', 'lat': 40.4637, 'lng': -3.7492},
    'Fernando Alonso': {'country': 'Spain', 'code': 'ESP', 'flag': '🇪🇸', 'lat': 40.4637, 'lng': -3.7492},
    'Pierre Gasly': {'country': 'France', 'code': 'FRA', 'flag': '🇫🇷', 'lat': 46.2276, 'lng': 2.2137},
    'Esteban Ocon': {'country': 'France', 'code': 'FRA', 'flag': '🇫🇷', 'lat': 46.2276, 'lng': 2.2137},
    'Alex Albon': {'country': 'Thailand', 'code': 'THA', 'flag': '🇹🇭', 'lat': 15.8700, 'lng': 100.9925},
    'Valtteri Bottas': {'country': 'Finland', 'code': 'FIN', 'flag': '🇫🇮', 'lat': 61.9241, 'lng': 25.7482},
    'Zhou Guanyu': {'country': 'China', 'code': 'CHN', 'flag': '🇨🇳', 'lat': 35.8617, 'lng': 104.1954},
    'Yuki Tsunoda': {'country': 'Japan', 'code': 'JPN', 'flag': '🇯🇵', 'lat': 36.2048, 'lng': 138.2529},
    'Liam Lawson': {'country': 'New Zealand', 'code': 'NZL', 'flag': '🇳🇿', 'lat': -40.9006, 'lng': 174.8860},
    'Lance Stroll': {'country': 'Canada', 'code': 'CAN', 'flag': '🇨🇦', 'lat': 56.1304, 'lng': -106.3468},
    'Nico Hülkenberg': {'country': 'Germany', 'code': 'GER', 'flag': '🇩🇪', 'lat': 51.1657, 'lng': 10.4515},
    'Kevin Magnussen': {'country': 'Denmark', 'code': 'DEN', 'flag': '🇩🇰', 'lat': 56.2639, 'lng': 9.5018}
}

# Team Colors (Hex Codes for dark motorsport UI)
TEAM_COLORS = {
    'Red Bull Racing': '#3671C6',
    'Ferrari': '#E80020',
    'Mercedes': '#27F4D2',
    'McLaren': '#FF8000',
    'Aston Martin': '#229971',
    'Alpine': '#FF87BC',
    'Williams': '#64C4FF',
    'RB (AlphaTauri)': '#6692FF',
    'Kick Sauber': '#52E252',
    'Haas': '#B6BABD'
}

def clean_driver_name(name):
    if pd.isna(name):
        return name
    name = str(name).strip()
    if 'H' in name and 'lkenberg' in name:
        return 'Nico Hülkenberg'
    return name

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    raw_excel_path = os.path.join(base_dir, 'data', 'raw', 'F1 Racing Project Dataset.xlsx')
    processed_dir = os.path.join(base_dir, 'data', 'processed')
    os.makedirs(processed_dir, exist_ok=True)

    print(f"Loading raw dataset from: {raw_excel_path}")
    excel_file = pd.ExcelFile(raw_excel_path)
    
    # Read sheets
    df_circuits = excel_file.parse('circuits')
    df_standings = excel_file.parse('championship_standings')
    df_laps = excel_file.parse('lap_intelligence')
    df_qualifying = excel_file.parse('qualifying_results')
    df_races = excel_file.parse('race_results')

    # Normalize driver names
    df_races['driver'] = df_races['driver'].apply(clean_driver_name)
    df_standings['driver'] = df_standings['driver'].apply(clean_driver_name)
    df_laps['driver'] = df_laps['driver'].apply(clean_driver_name)
    df_qualifying['driver'] = df_qualifying['driver'].apply(clean_driver_name)

    # Save clean CSV files
    df_circuits.to_csv(os.path.join(processed_dir, 'circuits.csv'), index=False)
    df_standings.to_csv(os.path.join(processed_dir, 'championship_standings.csv'), index=False)
    df_laps.to_csv(os.path.join(processed_dir, 'lap_intelligence.csv'), index=False)
    df_qualifying.to_csv(os.path.join(processed_dir, 'qualifying_results.csv'), index=False)
    df_races.to_csv(os.path.join(processed_dir, 'race_results.csv'), index=False)
    print("Exported clean CSV files to data/processed/")

    # 1. KPIs
    total_records = int(len(df_races))
    seasons_count = int(df_races['season'].nunique())
    teams_count = int(df_races['team'].nunique())
    circuits_raced_count = int(df_races['circuit_id'].nunique())
    circuits_total_count = int(len(df_circuits))
    unique_drivers_count = int(df_races['driver'].nunique())
    unique_countries_raced = int(df_races['country'].nunique())

    print(f"KPIs Verified:")
    print(f"  - Race records logged: {total_records}")
    print(f"  - Seasons in play: {seasons_count}")
    print(f"  - Competing teams: {teams_count}")
    print(f"  - Circuits showcased (raced / total): {circuits_raced_count} / {circuits_total_count}")

    # 2. Driver Performance Ranking (Cumulative Points)
    driver_points = df_races.groupby('driver').agg(
        total_points=('points', 'sum'),
        races_entered=('race_id', 'count'),
        wins=('finish_position', lambda x: int((x == 1).sum())),
        podiums=('finish_position', lambda x: int((x.isin([1, 2, 3])).sum())),
        dnfs=('dnf', 'sum'),
        avg_finish=('finish_position', lambda x: round(float(x.dropna().mean()), 2))
    ).reset_index().sort_values('total_points', ascending=False)
    
    # Attach driver metadata (country, flag, team)
    driver_team_map = df_races.sort_values('season', ascending=False).groupby('driver')['team'].first().to_dict()
    driver_points_list = []
    for _, row in driver_points.iterrows():
        d_name = row['driver']
        meta = DRIVER_METADATA.get(d_name, {'country': 'Unknown', 'code': 'UNK', 'flag': '🏁', 'lat': 0, 'lng': 0})
        team = driver_team_map.get(d_name, 'Unknown')
        driver_points_list.append({
            'driver': d_name,
            'points': int(row['total_points']),
            'races': int(row['races_entered']),
            'wins': int(row['wins']),
            'podiums': int(row['podiums']),
            'dnfs': int(row['dnfs']),
            'avg_finish': float(row['avg_finish']),
            'country': meta['country'],
            'country_code': meta['code'],
            'flag': meta['flag'],
            'team': team,
            'team_color': TEAM_COLORS.get(team, '#888888')
        })

    # 3. Team Performance Ranking (Cumulative Points)
    team_points = df_races.groupby('team').agg(
        total_points=('points', 'sum'),
        races_entered=('race_id', 'count'),
        wins=('finish_position', lambda x: int((x == 1).sum())),
        podiums=('finish_position', lambda x: int((x.isin([1, 2, 3])).sum())),
        dnfs=('dnf', 'sum')
    ).reset_index().sort_values('total_points', ascending=False)
    team_ranking_list = []
    for _, row in team_points.iterrows():
        t_name = row['team']
        team_ranking_list.append({
            'team': t_name,
            'points': int(row['total_points']),
            'races': int(row['races_entered']),
            'wins': int(row['wins']),
            'podiums': int(row['podiums']),
            'dnfs': int(row['dnfs']),
            'color': TEAM_COLORS.get(t_name, '#555555')
        })

    # 4. Team Season Trend (Championship points over 17 seasons)
    team_season_pivot = df_races.groupby(['season', 'team'])['points'].sum().unstack(fill_value=0)
    seasons_list = sorted([int(s) for s in team_season_pivot.index])
    team_season_trends = []
    for team in sorted(df_races['team'].unique()):
        pts = [int(team_season_pivot.loc[s, team]) if team in team_season_pivot.columns and s in team_season_pivot.index else 0 for s in seasons_list]
        team_season_trends.append({
            'team': team,
            'color': TEAM_COLORS.get(team, '#888888'),
            'points_by_season': pts
        })

    # 5. Driver Reliability Analysis (DNF Reasons & Finished counts)
    df_races['status_category'] = df_races.apply(
        lambda r: 'Finished' if r['dnf'] == 0 else (r['dnf_reason'] if pd.notna(r['dnf_reason']) else 'Other Failure'),
        axis=1
    )
    reliability_df = df_races.groupby(['driver', 'status_category']).size().unstack(fill_value=0)
    dnf_categories = ['Finished', 'Engine', 'Hydraulics', 'Mechanical', 'Brake failure', 'Gearbox', 'Collision']
    driver_reliability_list = []
    for d_name in driver_points['driver']:
        if d_name in reliability_df.index:
            row = reliability_df.loc[d_name]
            total_races = int(row.sum())
            finished = int(row.get('Finished', 0))
            dnf_total = total_races - finished
            reliability_rate = round((finished / total_races * 100), 1) if total_races > 0 else 0
            breakdown = {cat: int(row.get(cat, 0)) for cat in dnf_categories if cat != 'Finished'}
            driver_reliability_list.append({
                'driver': d_name,
                'total_races': total_races,
                'finished': finished,
                'dnf_total': dnf_total,
                'reliability_rate': reliability_rate,
                'reasons': breakdown
            })

    # 6. Tyre Compound Usage
    tyre_counts = df_races['starting_compound'].value_counts()
    total_tyre_entries = int(tyre_counts.sum())
    tyre_distribution = []
    tyre_colors = {
        'Soft': '#E10600',       # F1 Red
        'Medium': '#FFC900',     # F1 Yellow
        'Hard': '#FFFFFF',       # F1 White
        'Intermediate': '#39B54A', # F1 Green
        'Wet': '#0090FF'         # F1 Blue
    }
    for compound, count in tyre_counts.items():
        if pd.notna(compound):
            pct = round((count / total_tyre_entries) * 100, 1)
            tyre_distribution.append({
                'compound': str(compound),
                'count': int(count),
                'percentage': float(pct),
                'color': tyre_colors.get(str(compound), '#888888')
            })

    # 7. Country-wise Race Participation (Treemap / Heatmap data)
    country_participation = df_races.groupby('country').agg(
        races_hosted=('race_id', 'nunique'),
        total_entries=('race_id', 'count'),
        circuits=('circuit_name', 'nunique')
    ).reset_index().sort_values('total_entries', ascending=False)
    country_participation_list = []
    for _, row in country_participation.iterrows():
        country_participation_list.append({
            'country': row['country'],
            'races_hosted': int(row['races_hosted']),
            'total_entries': int(row['total_entries']),
            'circuits_count': int(row['circuits'])
        })

    # 8. Circuits Showcased by Country (Vertical Bar Chart matching Tableau reference)
    # Grouping circuits by country
    circuits_by_country = df_circuits.groupby('country').agg(
        circuit_count=('circuit_name', 'count'),
        circuit_names=('circuit_name', lambda x: list(x))
    ).reset_index().sort_values('circuit_count', ascending=False)
    circuits_bar_list = []
    for _, row in circuits_by_country.iterrows():
        circuits_bar_list.append({
            'country': row['country'],
            'count': int(row['circuit_count']),
            'circuits': row['circuit_names']
        })

    # 9. Podium Achievements by Driver & Team (Bubble Chart)
    podium_df = df_races[df_races['finish_position'].isin([1, 2, 3])]
    podiums_by_driver_team = podium_df.groupby(['driver', 'team']).agg(
        p1=('finish_position', lambda x: int((x == 1).sum())),
        p2=('finish_position', lambda x: int((x == 2).sum())),
        p3=('finish_position', lambda x: int((x == 3).sum())),
        total_podiums=('finish_position', 'count'),
        points=('points', 'sum')
    ).reset_index().sort_values('total_podiums', ascending=False)
    podium_bubble_list = []
    for _, row in podiums_by_driver_team.iterrows():
        podium_bubble_list.append({
            'driver': row['driver'],
            'team': row['team'],
            'total_podiums': int(row['total_podiums']),
            'p1_wins': int(row['p1']),
            'p2_count': int(row['p2']),
            'p3_count': int(row['p3']),
            'points': int(row['points']),
            'team_color': TEAM_COLORS.get(row['team'], '#555555')
        })

    # 10. Global Driver Distribution (World Map Geo Data)
    driver_country_counts = {}
    for d_name, meta in DRIVER_METADATA.items():
        c = meta['country']
        if c not in driver_country_counts:
            driver_country_counts[c] = {
                'country': c,
                'country_code': meta['code'],
                'lat': meta['lat'],
                'lng': meta['lng'],
                'count': 0,
                'drivers': [],
                'flag': meta['flag']
            }
        driver_country_counts[c]['count'] += 1
        driver_country_counts[c]['drivers'].append(d_name)
    driver_geo_list = sorted(list(driver_country_counts.values()), key=lambda x: x['count'], reverse=True)

    # 11. Circuits Map Geo Data
    circuits_geo_list = []
    for _, row in df_circuits.iterrows():
        cid = row['circuit_id']
        coords = CIRCUIT_COORDINATES.get(cid, {'lat': 0, 'lng': 0, 'flag': '🏁'})
        circuits_geo_list.append({
            'circuit_id': cid,
            'circuit_name': row['circuit_name'],
            'country': row['country'],
            'city': row['city'],
            'type': row['type'],
            'lap_km': float(row['lap_km']),
            'laps': int(row['laps']),
            'altitude_m': int(row['altitude_m']) if pd.notna(row['altitude_m']) else 0,
            'direction': row['direction'],
            'lat': coords['lat'],
            'lng': coords['lng'],
            'flag': coords['flag']
        })

    # 12. Compact Filterable Race Records (for client-side dynamic filtering)
    # Include necessary fields for blazing-fast multi-faceted filtering
    client_records = []
    for _, r in df_races.iterrows():
        client_records.append({
            'race_id': r['race_id'],
            'season': int(r['season']),
            'round': int(r['round']),
            'circuit': r['circuit_name'],
            'country': r['country'],
            'driver': r['driver'],
            'team': r['team'],
            'pos': int(r['finish_position']) if pd.notna(r['finish_position']) else None,
            'grid': int(r['grid_position']) if pd.notna(r['grid_position']) else None,
            'pts': int(r['points']) if pd.notna(r['points']) else 0,
            'dnf': int(r['dnf']),
            'dnf_reason': str(r['dnf_reason']) if pd.notna(r['dnf_reason']) else '',
            'tyre': str(r['starting_compound']) if pd.notna(r['starting_compound']) else 'Unknown'
        })

    # 13. Filter Options
    filter_options = {
        'seasons': sorted([int(s) for s in df_races['season'].unique()]),
        'teams': sorted(list(df_races['team'].unique())),
        'drivers': sorted(list(df_races['driver'].unique())),
        'countries': sorted(list(df_races['country'].unique())),
        'circuits': sorted(list(df_races['circuit_name'].unique())),
        'tyres': sorted([str(t) for t in df_races['starting_compound'].dropna().unique()]),
        'dnf_reasons': sorted([str(r) for r in df_races['dnf_reason'].dropna().unique()])
    }

    # Consolidated Dashboard Data Object
    f1_dashboard_data = {
        'kpis': {
            'competing_teams': teams_count,
            'seasons_in_play': seasons_count,
            'race_outcomes_logged': total_records,
            'circuits_raced': circuits_raced_count,
            'circuits_showcased': circuits_total_count,
            'drivers_count': unique_drivers_count,
            'countries_count': unique_countries_raced,
            'total_podiums': int(len(podium_df)),
            'total_dnfs': int(df_races['dnf'].sum()),
            'overall_reliability_pct': round(((total_records - int(df_races['dnf'].sum())) / total_records) * 100, 1)
        },
        'filters': filter_options,
        'driver_performance': driver_points_list,
        'team_performance': team_ranking_list,
        'team_season_trends': {
            'seasons': seasons_list,
            'teams': team_season_trends
        },
        'driver_reliability': {
            'categories': dnf_categories,
            'drivers': driver_reliability_list
        },
        'tyre_usage': tyre_distribution,
        'country_participation': country_participation_list,
        'circuits_showcased': circuits_bar_list,
        'podium_achievements': podium_bubble_list,
        'global_driver_geo': driver_geo_list,
        'circuits_geo': circuits_geo_list,
        'race_records': client_records
    }

    # Save to JSON
    json_path = os.path.join(processed_dir, 'f1_dashboard_data.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(f1_dashboard_data, f, ensure_ascii=False, indent=2)
    print(f"Exported precomputed dashboard data to: {json_path} ({os.path.getsize(json_path)} bytes)")

if __name__ == '__main__':
    main()
