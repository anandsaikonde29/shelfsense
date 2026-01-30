# ShelfSense - AI-Driven Inventory Forecasting Dashboard

A modern React web application that simulates an AI-powered demand forecasting platform for retailers. ShelfSense uses time-series analysis and social signal insights to recommend optimal stock levels at the SKU level.

## Features

- **Demand Query Form**: Input product details, historical sales, trend signals, and seasonality
- **AI Forecast Panel**: Visual forecast charts with demand predictions, volatility analysis, and stock recommendations
- **Recent Analyses**: Sidebar showing previous analyses with localStorage persistence
- **Modern UI**: Beautiful retail dashboard theme with responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
Shelfsense/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── DemandQueryForm.js
│   │   ├── DemandQueryForm.css
│   │   ├── ForecastPanel.js
│   │   ├── ForecastPanel.css
│   │   ├── RecentAnalyses.js
│   │   └── RecentAnalyses.css
│   ├── utils/
│   │   └── aiForecast.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## How It Works

The AI forecasting engine combines:
1. **Time-series smoothing**: Moving average simulation with trend analysis
2. **Trend signal multiplier**: Applies social/seasonal trend strength (0-100%)
3. **Seasonality adjustment**: Low/Medium/High seasonality factors
4. **Volatility calculation**: Demand uncertainty index
5. **Stock recommendation**: Actionable inventory suggestions

## Technologies Used

- React 18
- Recharts (for data visualization)
- CSS3 (modern styling with gradients and animations)
- localStorage (for data persistence)

## License

This project is created for educational/demonstration purposes.


