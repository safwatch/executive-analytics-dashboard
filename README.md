# Executive Analytics Dashboard

> A high-performance, reactive Business Intelligence (BI) and Executive Decision Support Dashboard engineered with **Vue.js 2.7**, **Nuxt.js**, **Vuex**, and **AG-Grid Enterprise**. Built to visualize multi-dimensional urban, civic, and operational datasets with instant reactivity, interactive mapping, and real-time event updates.

[![Vue](https://img.shields.io/badge/Vue.js-2.7.16-4FC08D.svg?logo=vuedotjs)](https://vuejs.org/)
[![Nuxt](https://img.shields.io/badge/Nuxt.js-2.14-00DC82.svg?logo=nuxtdotjs)](https://nuxtjs.org/)
[![Vuex](https://img.shields.io/badge/Vuex-3.5-35495E.svg)](https://vuex.vuejs.org/)
[![AG--Grid](https://img.shields.io/badge/AG--Grid-Enterprise%2027-006CE4.svg)](https://www.ag-grid.com/)
[![ECharts](https://img.shields.io/badge/ECharts-5.5-AA344D.svg)](https://echarts.apache.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900.svg)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## Architectural Highlights

This platform serves as a unified analytical command center, turning large-scale heterogeneous data sources into intuitive, responsive visualizations:

```
executive-analytics-dashboard/
├── api/                     # Centralized API service layers & endpoints
├── assets/                  # SCSS theme tokens, custom icons, and vector maps
├── components/              # 144 modular, reactive UI components
│   ├── widgets/             # Specialized analytical widgets & GeoJSON layers
│   ├── charts/              # ECharts, Highcharts, ApexCharts wrappers
│   └── tables/              # AG-Grid Enterprise data grid configurations
├── layouts/                 # Dynamic layout templates & navigation shells
├── locales/                 # Internationalization dictionaries
├── middleware/              # Client-side route guards & auth verification
├── pages/                   # 75 analytical dashboards & module routes
├── plugins/                 # Third-party integrations (Pusher, Firebase, Leaflet)
├── static/                  # Static assets & service workers
└── store/                   # Centralized Vuex reactive state modules
```

---

## Key Front-End & UX Engineering Features

### 1. Complex Reactive State Management (Vuex)
- Fine-grained reactivity powered by **Vuex 3.5**, decoupling data ingestion from visualization layers.
- Cross-component synchronization: Updating a regional filter or date range instantly propagates reactive re-renders across all active charts, grids, and maps simultaneously without manual page refreshes.

### 2. Multi-Engine Interactive Data Visualization
- **ECharts 5 & Highcharts:** Complex drill-down bar charts, stacked area distributions, scatter plots, and time-series projections with smooth canvas transitions.
- **ApexCharts & Chart.js:** Compact sparklines, donut distribution rings, and executive summary KPI metrics.
- **Leaflet & GeoJSON Geospatial Maps:** Interactive regional map layers with dynamic color scaling (choropleth maps), polygon hover effects, and spatial point clustering.

### 3. Enterprise Data Grid (AG-Grid Enterprise 27)
- Virtualized scrolling handling high-volume datasets smoothly at 60fps.
- Advanced analytical features enabled: server-side row models, multi-level column grouping, range selections, integrated chart generation, custom cell renderers, and native Excel export.

### 4. Real-Time Telemetry & Event Streaming
- Integrated **Pusher.js** and **Firebase Cloud Messaging** for push-driven telemetry alerts and live status updates.
- Optimistic UI updates with debounced search inputs to maintain peak rendering responsiveness.

### 5. Motion, Feedback & Performance
- Choreographed entrance transitions using **GSAP 3** and lightweight vector animations via **Lottie Web**.
- Skeleton loading shimmers preventing layout shift during asynchronous data fetches.

---

## Getting Started

### Prerequisites
- Node.js `^16.0.0 || ^18.0.0`
- Yarn `1.22+`

### Installation
```bash
git clone https://github.com/safwatch/executive-analytics-dashboard.git
cd executive-analytics-dashboard
yarn install
```

### Local Development
```bash
# Start development server
yarn dev
```
Navigate to `http://localhost:3000` to explore the dashboard.

### Production Build
```bash
# Build optimized client bundles
yarn build

# Start production server
yarn start
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
