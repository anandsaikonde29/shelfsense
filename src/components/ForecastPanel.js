import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ForecastPanel.css';

function ForecastPanel({ forecastData, isAnalyzing }) {
  if (isAnalyzing) {
    return (
      <div className="forecast-panel">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <h3>Analyzing Demand...</h3>
          <p>Running AI simulation: Time-series projection, trend analysis, and volatility calculation</p>
        </div>
      </div>
    );
  }

  if (!forecastData) {
    return (
      <div className="forecast-panel">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No Forecast Data</h3>
          <p>Fill out the form and click "Analyze Demand" to see AI-powered forecasts</p>
        </div>
      </div>
    );
  }

  const { predictedDemand, historicalSales, volatility, recommendation, confidence, chartData } = forecastData;

  const getRecommendationColor = (action) => {
    switch (action) {
      case 'Increase stock':
        return '#10b981';
      case 'Reduce stock':
        return '#ef4444';
      case 'Maintain':
        return '#1e40af';
      default:
        return '#1e3a8a';
    }
  };

  const getUrgencyBadge = (urgency) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };
    return colors[urgency] || '#6b7280';
  };

  return (
    <div className="forecast-panel fade-in">
      <div className="forecast-header">
        <h2>AI Forecast Results</h2>
        <div className="confidence-badge" style={{ backgroundColor: `rgba(16, 185, 129, ${confidence / 100})` }}>
          {confidence}% Confidence
        </div>
      </div>

      <div className="forecast-content">
        <div className="forecast-chart">
          <h3>SKU Demand Projection</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="week" 
                stroke="#1e3a8a"
                style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
                label={{ value: 'Weeks', position: 'insideBottom', offset: -5, style: { fill: '#1e3a8a', fontFamily: 'Inter, sans-serif' } }}
              />
              <YAxis 
                stroke="#1e3a8a"
                style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
                label={{ value: 'Units Sold', angle: -90, position: 'insideLeft', style: { fill: '#1e3a8a', fontFamily: 'Inter, sans-serif' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif'
                }}
                formatter={(value) => [`${Math.round(value)} units`, 'Demand']}
              />
              <Legend wrapperStyle={{ fontFamily: 'Inter, sans-serif' }} />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Demand"
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6, fill: '#059669' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="forecast-metrics">
          <div className="metric-card">
            <div className="metric-label">Historical Sales</div>
            <div className="metric-value">{historicalSales.toLocaleString()} units</div>
          </div>
          <div className="metric-card highlight">
            <div className="metric-label">Predicted Demand</div>
            <div className="metric-value">{predictedDemand.toLocaleString()} units</div>
            <div className="metric-change" style={{ color: predictedDemand > historicalSales ? '#10b981' : '#ef4444' }}>
              {predictedDemand > historicalSales ? '+' : ''}
              {(((predictedDemand - historicalSales) / historicalSales) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Demand Volatility</div>
            <div className="metric-value">{volatility}%</div>
            <div className="volatility-bar">
              <div 
                className="volatility-fill" 
                style={{ 
                  width: `${volatility}%`,
                  backgroundColor: volatility > 40 ? '#ef4444' : volatility > 25 ? '#f59e0b' : '#10b981'
                }}
              />
            </div>
          </div>
        </div>

        <div className="recommendation-card" style={{ borderLeftColor: getRecommendationColor(recommendation.action) }}>
          <div className="recommendation-header">
            <h3>Recommended Action</h3>
            <span 
              className="urgency-badge"
              style={{ backgroundColor: getUrgencyBadge(recommendation.urgency) }}
            >
              {recommendation.urgency.toUpperCase()}
            </span>
          </div>
          <div className="recommendation-action" style={{ color: getRecommendationColor(recommendation.action) }}>
            {recommendation.action}
          </div>
          <div className="recommendation-reason">
            {recommendation.reason}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForecastPanel;

