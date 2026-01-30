import React, { useState, useEffect } from 'react';
import './RecentAnalyses.css';

function RecentAnalyses({ onLoadAnalysis, refreshTrigger }) {
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
    loadAnalyses();
  }, [refreshTrigger]);

  const loadAnalyses = () => {
    const stored = localStorage.getItem('shelfsense_analyses');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Filter out invalid analyses and ensure they have required fields
        const validAnalyses = parsed.filter(analysis => 
          analysis && 
          typeof analysis.predictedDemand === 'number' &&
          analysis.recommendation &&
          analysis.recommendation.action
        );
        setAnalyses(validAnalyses);
        
        // Update localStorage with only valid analyses
        if (validAnalyses.length !== parsed.length) {
          localStorage.setItem('shelfsense_analyses', JSON.stringify(validAnalyses));
        }
      } catch (e) {
        console.error('Error loading analyses:', e);
        // Clear corrupted data
        localStorage.removeItem('shelfsense_analyses');
        setAnalyses([]);
      }
    }
  };

  const handleLoad = (analysis) => {
    onLoadAnalysis(analysis);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all saved analyses?')) {
      localStorage.removeItem('shelfsense_analyses');
      setAnalyses([]);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (analyses.length === 0) {
    return (
      <div className="recent-analyses">
        <div className="analyses-header">
          <h3>Recent Analyses</h3>
        </div>
        <div className="empty-analyses">
          <div className="empty-icon">📋</div>
          <p>No analyses yet</p>
          <p className="empty-hint">Your analyses will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-analyses">
      <div className="analyses-header">
        <h3>Recent Analyses</h3>
        <button className="clear-button" onClick={handleClear} title="Clear all">
          🗑️
        </button>
      </div>
      <div className="analyses-list">
        {analyses.map((analysis, index) => {
          // Add null checks and default values
          const predictedDemand = analysis.predictedDemand || 0;
          const recommendation = analysis.recommendation || { action: 'N/A' };
          const productName = analysis.productName || 'Unknown Product';
          const category = analysis.category || 'N/A';
          const confidence = analysis.confidence || 0;
          const timestamp = analysis.timestamp || new Date().toISOString();
          
          return (
            <div 
              key={index} 
              className="analysis-item"
              onClick={() => handleLoad(analysis)}
            >
              <div className="analysis-item-header">
                <div className="analysis-product">{productName}</div>
                <div className="analysis-confidence">{confidence}%</div>
              </div>
              <div className="analysis-details">
                <div className="analysis-category">{category}</div>
                <div className="analysis-date">{formatDate(timestamp)}</div>
              </div>
              <div className="analysis-preview">
                <span className="analysis-action">{recommendation.action}</span>
                <span className="analysis-demand">{predictedDemand.toLocaleString()} units</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentAnalyses;

