import React, { useState, useEffect } from 'react';
import { generateForecast } from './utils/aiForecast';
import DemandQueryForm from './components/DemandQueryForm';
import ForecastPanel from './components/ForecastPanel';
import RecentAnalyses from './components/RecentAnalyses';
import './App.css';

function App() {
  const [forecastData, setForecastData] = useState(null);
  const [loadedAnalysis, setLoadedAnalysis] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Load any saved analyses on mount
    const stored = localStorage.getItem('shelfsense_analyses');
    if (stored) {
      try {
        const analyses = JSON.parse(stored);
        if (analyses.length > 0) {
          // Optionally load the most recent analysis
          // setForecastData(analyses[0]);
        }
      } catch (e) {
        console.error('Error loading analyses:', e);
      }
    }
  }, []);

  const handleAnalyze = (formData) => {
    // Simulate AI processing with a brief delay for better UX
    setIsAnalyzing(true);
    
    // Simulate processing time (500ms) to show loading state
    setTimeout(() => {
      // Step 1: Generate forecast using AI simulation
      const forecast = generateForecast(formData);
      
      // Step 2: Display forecast results
      setForecastData(forecast);
      setLoadedAnalysis(null);
      
      // Step 3: Save to localStorage for sidebar access
      const stored = localStorage.getItem('shelfsense_analyses');
      let analyses = [];
      if (stored) {
        try {
          analyses = JSON.parse(stored);
        } catch (e) {
          console.error('Error parsing stored analyses:', e);
        }
      }
      
      // Add new analysis at the beginning
      analyses.unshift(forecast);
      
      // Keep only last 10 analyses
      if (analyses.length > 10) {
        analyses = analyses.slice(0, 10);
      }
      
      localStorage.setItem('shelfsense_analyses', JSON.stringify(analyses));
      setRefreshTrigger(prev => prev + 1); // Trigger refresh of RecentAnalyses
      setIsAnalyzing(false);
    }, 500);
  };

  const handleLoadAnalysis = (analysis) => {
    setForecastData(analysis);
    setLoadedAnalysis(analysis);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📦</span>
            <h1>ShelfSense</h1>
          </div>
          <p className="tagline">AI-Driven Inventory Forecasting Dashboard</p>
        </div>
      </header>

      <main className="app-main">
        <div className="main-content">
          <div className="left-section">
            <DemandQueryForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
          <div className="middle-section">
            <ForecastPanel forecastData={forecastData} isAnalyzing={isAnalyzing} />
          </div>
          <div className="right-section">
            <RecentAnalyses onLoadAnalysis={handleLoadAnalysis} refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 ShelfSense – Smarter Inventory Decisions with AI.</p>
      </footer>
    </div>
  );
}

export default App;

