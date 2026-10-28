# 🏎️ Formula 1 Race Intelligence Dashboard (2010 – 2026)

[![Build & Test Status](https://github.com/mahi3108/F1/actions/workflows/deploy.yml/badge.svg)](https://github.com/mahi3108/F1/actions)
[![Tableau Public Compatible](https://img.shields.io/badge/Tableau-2026.3%20Compatible-E97627?logo=tableau&logoColor=white)](https://www.tableau.com)
[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11%2B-3776AB?logo=python&logoColor=white)](https://www.python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-grade, interactive Formula 1 motorsport analytics intelligence platform inspired by professional race-engineering telemetry dashboards and Tableau workbooks. Built with a bespoke dark motorsport aesthetic (`#07090E` deep chassis black, neon team accents, and glowing telemetry indicators), this platform unifies historical championship standings, race outcomes, tyre stint strategies, mechanical reliability audits, and geographical track maps across 17 seasons of modern Formula 1 racing.

---

## 📌 Table of Contents

- [Project Overview & Key Objectives](#-project-overview--key-objectives)
- [Audited Dataset Figures & Disclosures](#-audited-dataset-figures--disclosures)
- [Executive Dashboard Layout & Visual Components](#-executive-dashboard-layout--visual-components)
- [Dual-Engine Architecture (Tableau + React Web)](#-dual-engine-architecture-tableau--react-web)
- [Dataset Schema & Architecture](#-dataset-schema--architecture)
- [Technology Stack](#-technology-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Installation & Local Execution](#-installation--local-execution)
- [Automated Testing & Quality Assurance](#-automated-testing--quality-assurance)
- [Data Processing Methodology & KPI Formulas](#-data-processing-methodology--kpi-formulas)
- [License](#-license)

---

## 🎯 Project Overview & Key Objectives

The objective of this project is to synthesize complex multi-season Formula 1 racing records into an actionable visual intelligence suite for motorsport analysts, race strategists, and fans.

### Core Analytical Objectives:
1. **Driver Performance & Standings:** Track career cumulative championship points, race wins, podium conversion rates, and finishing averages.
2. **Constructors' Championship Performance:** Compare total points and evaluate historical season-by-season dominance across regulatory eras.
3. **Driver Reliability & Failure Profiling:** Deconstruct Did Not Finish (DNF) causes across 6 certified categories: *Engine, Hydraulics, Mechanical, Brake Failure, Gearbox, and Collision*.
4. **Tyre Stint Strategy:** Analyze compound usage patterns across *Soft, Medium, Hard, and Intermediate* tyres.
5. **Circuit & Global Distribution:** Map driver nationalities and Grand Prix host venues across street and permanent tracks worldwide.
6. **Podium Achievements Matrix:** Visualize podium achievements (P1, P2, P3 finishes) without double counting.

---

## 📊 Audited Dataset Figures & Disclosures

The dataset was ingested, cleaned, and verified against the official source file (`data/raw/F1 Racing Project Dataset.xlsx`). Below is the verified audit summary:

| Metric | Reference Expectation | Actual Audited Figure | Status / Verification Note |
| :--- | :--- | :--- | :--- |
| **Race Records Logged** | 6,464 records | **6,464 records** | **100% Match** |
| **Championship Seasons** | 17 seasons | **17 seasons** | **100% Match** (2010 to 2026 inclusive) |
| **Competing Constructors** | 10 teams | **10 teams** | **100% Match** (Red Bull, Ferrari, Mercedes, McLaren, Aston Martin, Alpine, Williams, RB, Sauber, Haas) |
| **Circuits Showcased** | 29 circuits | **24 Raced / 29 Total** | **Fully Disclosed**: 24 active Grand Prix tracks appear in race outcomes; 29 total circuits exist in the master calendar registry |
| **Unique Drivers** | 19-20 drivers | **19 drivers** | **100% Match** across 15 nations |
| **Race Podiums Awarded** | Top 3 finishes | **940 podiums** | **Strict Verification**: `finish_position IN (1, 2, 3)` across 6,464 records |
| **Mechanical DNFs** | DNF = 1 | **396 retirements** | **Verified**: 6,068 finished (93.9% reliability rate) vs 396 retirements |

---

## 🖥️ Executive Dashboard Layout & Visual Components

The dashboard features a modular, responsive grid matching the professional Tableau layout:

```
+-----------------------------------------------------------------------------------------+
| [A] KPI CARDS: Competing Teams (10) | Seasons (17) | Race Outcomes (6,464) | Circuits (29)|
+-----------------------------------------------------------------------------------------+
| [B] Global Driver & Circuit Map (Leaflet)     | [C] Driver Reliability & DNF Stacked Bar |
+-----------------------------------------------+-----------------------------------------+
| [D] Driver Leaderboard (Points Ranking)       | [E] Constructors Championship Ranking   |
+-----------------------------------------------+-----------------------------------------+
| [F] Team Season Performance Trend (2010-2026) | [G] Tyre Compound Usage Donut Chart     |
+-----------------------------------------------+-----------------------------------------+
| [H] Country-Wise Race Participation (Treemap) | [I] Podium Achievements Bubble Matrix   |
+-----------------------------------------------------------------------------------------+
| [J] Circuits Showcased by Host Country (Motorsport Blue Vertical Bar Chart)             |
+-----------------------------------------------------------------------------------------+
```

### Visual Sections Breakdown:
- **A. KPI Cards:** 4 primary cards computing distinct counts for Competing Teams, Seasons in Play, Race Outcomes Logged, and Circuits Showcased, with dynamic reactivity to active filter selections.
- **B. Global Driver Distribution:** Interactive Leaflet world map with custom dark tiles (`CartoDB Dark Matter`) mapping driver density and Grand Prix circuit venues with detailed telemetry tooltips.
- **C. Driver Reliability Analysis:** Stacked bar chart comparing drivers by finished races vs specific failure classifications (*Engine: 73, Hydraulics: 70, Mechanical: 67, Brake failure: 64, Gearbox: 62, Collision: 60*).
- **D. Driver Performance Leaderboard:** Descending points ranking with point totals, team colors, race wins, podiums, and multi-factor sorting (*Points, Wins, Podiums, Races*).
- **E. Team Performance Ranking:** Horizontal bar chart comparing all 10 constructors with official team colors and points aggregation.
- **F. Team Championship Multi-Season Trends:** Multi-line trend chart tracking constructor point trajectories across all 17 seasons with interactive team toggling.
- **G. Tyre Compound Usage Distribution:** Donut chart displaying stint breakdown: *Soft (29.2%), Medium (29.1%), Hard (28.6%), Intermediate (13.0%)*.
- **H. Country-Wise Race Participation:** Treemap and mosaic layout sized by driver entries and Grand Prix races hosted.
- **I. Podium Achievements Bubble Matrix:** Scatter/bubble visualization mapping P1 victories ($X$-axis) against total podium finishes ($Y$-axis), with bubble radius reflecting podium volume without double counting.
- **J. Circuits Showcased:** Vertical bar chart matching the reference Tableau style with host country along columns, circuit counts along rows, and counts clearly displayed in a blue palette.

### Interactive Global Filters:
Users can filter the entire executive dashboard by:
1. **Season / Year** (2010 to 2026)
2. **Driver** (19 drivers)
3. **Constructor / Team** (10 teams)
4. **Country** (21 host countries)
5. **Circuit** (24 Grand Prix tracks)
6. **Race Outcome** (Finished vs DNF reasons)
7. **Starting Tyre Compound** (Soft, Medium, Hard, Intermediate)

---

## 🛠️ Dual-Engine Architecture (Tableau + React Web)

To satisfy both visualization paradigms, this repository delivers:

1. **Tableau Analytics Solution (`/tableau`):**
   - **`F_1_Racing_Analysis_u.twb`**: The uploaded Tableau workbook with XML connection strings converted to portable relative paths (`../data/raw/F1 Racing Project Dataset.xlsx`).
   - **`F_1_Racing_Analysis.twbx`**: A self-contained **Tableau Packaged Workbook** bundling the workbook and the complete multi-sheet dataset. Double-click to open in Tableau Desktop or Tableau Public without data connection warnings.
2. **Interactive Web Application (`/web`):**
   - A modern React 18, TypeScript, and Vite single-page application with Leaflet mapping, Chart.js visualizations, and Tailwind CSS motorsport styling.

---

## 📁 Project Directory Structure

```text
F1/
├── .github/
│   └── workflows/
│       └── deploy.yml               # CI/CD pipeline: data testing & GitHub Pages build
├── data/
│   ├── raw/
│   │   └── F1 Racing Project Dataset.xlsx  # Multi-sheet Excel workbook (6,464 records)
│   └── processed/
│       ├── race_results.csv                # 6,464 race records (42 columns)
│       ├── circuits.csv                    # 29 circuits (9 columns)
│       ├── championship_standings.csv      # 311 standing records
│       ├── lap_intelligence.csv            # 3,814 lap records
│       ├── qualifying_results.csv          # 3,130 qualifying records
│       └── f1_dashboard_data.json          # Precomputed analytics dataset (2.2 MB)
├── tableau/
│   ├── F_1_Racing_Analysis_u.twb           # Portable Tableau workbook XML
│   └── F_1_Racing_Analysis.twbx            # Packaged Tableau workbook with embedded data
├── scripts/
│   └── preprocess_data.py                  # Ingestion, validation, and JSON generation
├── tests/
│   └── test_data_integrity.py              # Automated data integrity & KPI assertions
├── web/                                    # Interactive React + Vite application
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── src/
│       ├── App.tsx                         # Main dashboard controller & filter logic
│       ├── types.ts                        # Strict TypeScript interfaces
│       ├── components/
│       │   ├── Header.tsx                  # Top banner with view tabs
│       │   ├── FilterBar.tsx               # 7-axis interactive filter ribbon
│       │   ├── KpiCards.tsx                # Section A: 4 KPI Cards
│       │   ├── DriverMap.tsx               # Section B: Leaflet Map
│       │   ├── DriverReliabilityChart.tsx  # Section C: Stacked DNF Bar Chart
│       │   ├── DriverLeaderboard.tsx       # Section D: Points Leaderboard
│       │   ├── TeamRankingChart.tsx        # Section E: Constructor Ranking
│       │   ├── TeamSeasonTrendChart.tsx    # Section F: Multi-Season Trend
│       │   ├── TyreCompoundChart.tsx       # Section G: Tyre Stint Donut
│       │   ├── CountryParticipationChart.tsx # Section H: Treemap
│       │   ├── PodiumBubbleChart.tsx       # Section I: Podium Bubble Chart
│       │   ├── CircuitsBarChart.tsx        # Section J: Circuits Showcased Bar Chart
│       │   ├── TableauEmbedView.tsx        # Tableau Integration View
│       │   └── DatasetSpecsView.tsx        # Data Schema Specifications View
│       └── data/
│           └── f1Data.json
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🚀 Installation & Local Execution

### Prerequisites:
- **Python 3.10+** (with `pip`)
- **Node.js 18+** (with `npm`)
- **Tableau Desktop or Tableau Public** (optional, for `.twb`/`.twbx`)

### 1. Clone the Repository:
```bash
git clone https://github.com/mahi3108/F1.git
cd F1
```

### 2. Python Data Pipeline & Validation:
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run data preprocessing (cleans raw Excel & exports CSVs and JSON)
python scripts/preprocess_data.py

# Run unit tests & data verification
python tests/test_data_integrity.py
```

### 3. Launch Interactive Web Dashboard:
```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start local Vite development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production:
```bash
npm run build
```
The compiled, optimized static bundle will be generated in `web/dist/`.

### 5. Open in Tableau:
Double-click `tableau/F_1_Racing_Analysis.twbx` to open the packaged dashboard directly in Tableau Public or Tableau Desktop.

---

## 🧪 Automated Testing & Quality Assurance

All metrics, relationships, and distinct counts are validated with an automated test suite:

```bash
python -m unittest discover -s tests -p "test_*.py"
```

### Test Suite Asserts:
1. **Record Count Integrity:** Confirms exactly 6,464 race result records.
2. **Season Continuity:** Confirms exactly 17 seasons spanning 2010 to 2026.
3. **Team Consistency:** Confirms 10 distinct competing constructors.
4. **Circuit Validation:** Confirms 24 raced circuits in results and 29 total in registry.
5. **DNF Balance:** Confirms that DNF count (396) matches the sum of stewarded reason classifications.
6. **Podium Conservation:** Confirms that podium finishes strictly equal 940 places without duplicate counting.
7. **Scoring Integrity:** Asserts that the sum of points across all driver and team aggregates equals the raw race results points sum ($100\%$ conservation).

---

## 📐 Data Processing Methodology & KPI Formulas

1. **Podiums:**
   $$\text{Podiums} = \sum [\text{finish\_position} \in \{1, 2, 3\}]$$
2. **Reliability Rate (%):**
   $$\text{Reliability} = \left(\frac{\text{Total Races} - \text{Total DNFs}}{\text{Total Races}}\right) \times 100$$
3. **Championship Points Aggregation:**
   $$\text{Driver Points} = \sum_{r \in \text{Races}} \text{points}_r$$
   $$\text{Constructor Points} = \sum_{d \in \text{Team}} \text{Driver Points}_d$$
4. **Circuits Showcased:**
   - Active Raced Circuits: $\text{COUNT\_DISTINCT}(\text{circuit\_id}) = 24$
   - Master Registry Grand Prix Venues: $\text{COUNT}(\text{circuits}) = 29$

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
