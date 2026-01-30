import React, { useState } from 'react';
import './DemandQueryForm.css';

function DemandQueryForm({ onAnalyze, isAnalyzing }) {
  const [formData, setFormData] = useState({
    productName: '',
    category: 'Apparel',
    historicalSales: '',
    trendSignalStrength: 50,
    seasonalityIndex: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'trendSignalStrength' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.historicalSales) {
      alert('Please fill in all required fields');
      return;
    }
    onAnalyze(formData);
  };

  return (
    <div className="demand-query-form fade-in">
      <h2>Demand Query Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">
            Product Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Apparel">Apparel</option>
            <option value="Electronics">Electronics</option>
            <option value="Grocery">Grocery</option>
            <option value="Beauty">Beauty</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="historicalSales">
            Historical Sales (units) <span className="required">*</span>
          </label>
          <input
            type="number"
            id="historicalSales"
            name="historicalSales"
            value={formData.historicalSales}
            onChange={handleChange}
            placeholder="Enter historical sales"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="trendSignalStrength">
            Trend Signal Strength: {formData.trendSignalStrength}%
          </label>
          <input
            type="range"
            id="trendSignalStrength"
            name="trendSignalStrength"
            value={formData.trendSignalStrength}
            onChange={handleChange}
            min="0"
            max="100"
            className="slider"
          />
          <div className="slider-labels">
            <span>Weak (0%)</span>
            <span>Strong (100%)</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="seasonalityIndex">Seasonality Index</label>
          <select
            id="seasonalityIndex"
            name="seasonalityIndex"
            value={formData.seasonalityIndex}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit" className="analyze-button" disabled={isAnalyzing}>
          {isAnalyzing ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            'Analyze Demand'
          )}
        </button>
      </form>
    </div>
  );
}

export default DemandQueryForm;

