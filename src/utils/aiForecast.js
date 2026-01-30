/**
 * ShelfSense AI Forecast Engine
 * Simulates hybrid AI logic combining time-series analysis and trend signals
 */

/**
 * Calculate time-series smoothed forecast using moving average
 */
function calculateTimeSeriesForecast(historicalSales, periods = 12) {
  // Simulate moving average with slight upward trend
  const baseValue = historicalSales;
  const trend = baseValue * 0.02; // 2% growth trend
  const seasonalVariation = Math.sin(Date.now() / 1000000) * 0.1; // Simulated seasonality
  
  return baseValue + trend + (baseValue * seasonalVariation);
}

/**
 * Apply trend signal multiplier
 */
function applyTrendSignal(baseForecast, trendSignalStrength) {
  // Convert 0-100 signal strength to multiplier (0.7x to 1.5x)
  const multiplier = 0.7 + (trendSignalStrength / 100) * 0.8;
  return baseForecast * multiplier;
}

/**
 * Apply seasonality adjustment
 */
function applySeasonality(forecast, seasonalityIndex) {
  const multipliers = {
    'Low': 0.9,
    'Medium': 1.0,
    'High': 1.2
  };
  return forecast * (multipliers[seasonalityIndex] || 1.0);
}

/**
 * Calculate demand volatility index (0-100%)
 */
function calculateVolatility(historicalSales, trendSignalStrength, seasonalityIndex) {
  const baseVolatility = 15; // Base volatility %
  const trendVolatility = (100 - trendSignalStrength) * 0.2; // Higher signal = lower volatility
  const seasonalityVolatility = seasonalityIndex === 'High' ? 25 : seasonalityIndex === 'Medium' ? 15 : 10;
  
  return Math.min(100, Math.max(5, baseVolatility + trendVolatility + seasonalityVolatility));
}

/**
 * Generate stock recommendation
 */
function generateStockRecommendation(predictedDemand, historicalSales, volatility) {
  const demandChange = ((predictedDemand - historicalSales) / historicalSales) * 100;
  const volatilityThreshold = 30;
  
  if (demandChange > 15 && volatility < volatilityThreshold) {
    return {
      action: 'Increase stock',
      reason: 'Strong demand growth with low volatility',
      urgency: 'high'
    };
  } else if (demandChange > 5) {
    return {
      action: 'Increase stock',
      reason: 'Moderate demand increase expected',
      urgency: 'medium'
    };
  } else if (demandChange < -15 && volatility < volatilityThreshold) {
    return {
      action: 'Reduce stock',
      reason: 'Significant demand decline with stable conditions',
      urgency: 'high'
    };
  } else if (demandChange < -5) {
    return {
      action: 'Reduce stock',
      reason: 'Moderate demand decrease expected',
      urgency: 'medium'
    };
  } else {
    return {
      action: 'Maintain',
      reason: 'Demand remains stable',
      urgency: 'low'
    };
  }
}

/**
 * Calculate forecast confidence (80-95%)
 */
function calculateConfidence(volatility, trendSignalStrength) {
  const baseConfidence = 85;
  const volatilityPenalty = volatility * 0.15; // Higher volatility reduces confidence
  const signalBonus = (trendSignalStrength / 100) * 5; // Strong signals increase confidence
  
  return Math.min(95, Math.max(80, baseConfidence - volatilityPenalty + signalBonus));
}

/**
 * Generate forecast data points for chart (week-based)
 */
function generateForecastDataPoints(historicalSales, predictedDemand, periods = 12) {
  const dataPoints = [];
  const currentDate = new Date();
  
  // Historical data (last 4 weeks)
  for (let i = 3; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - (i * 7));
    dataPoints.push({
      week: `Week ${i === 0 ? 'Current' : `-${i}`}`,
      weekNumber: -i,
      value: historicalSales * (0.95 + Math.random() * 0.1), // Historical with slight variation
      type: 'historical'
    });
  }
  
  // Forecast data (next 8 weeks)
  const growthRate = (predictedDemand - historicalSales) / historicalSales / periods;
  for (let i = 1; i <= periods; i++) {
    const forecastValue = historicalSales * (1 + growthRate * i) * (0.98 + Math.random() * 0.04);
    dataPoints.push({
      week: `Week +${i}`,
      weekNumber: i,
      value: Math.max(0, forecastValue),
      type: 'forecast'
    });
  }
  
  return dataPoints;
}

/**
 * Main AI Forecast Function
 */
export function generateForecast(inputData) {
  const {
    productName,
    category,
    historicalSales,
    trendSignalStrength,
    seasonalityIndex
  } = inputData;
  
  // Step 1: Time-series forecast
  const timeSeriesForecast = calculateTimeSeriesForecast(historicalSales);
  
  // Step 2: Apply trend signal
  const trendAdjustedForecast = applyTrendSignal(timeSeriesForecast, trendSignalStrength);
  
  // Step 3: Apply seasonality
  const finalForecast = applySeasonality(trendAdjustedForecast, seasonalityIndex);
  
  // Step 4: Calculate volatility
  const volatility = calculateVolatility(historicalSales, trendSignalStrength, seasonalityIndex);
  
  // Step 5: Generate recommendation
  const recommendation = generateStockRecommendation(finalForecast, historicalSales, volatility);
  
  // Step 6: Calculate confidence
  const confidence = calculateConfidence(volatility, trendSignalStrength);
  
  // Step 7: Generate chart data
  const chartData = generateForecastDataPoints(historicalSales, finalForecast);
  
  return {
    productName,
    category,
    historicalSales,
    predictedDemand: Math.round(finalForecast),
    volatility: Math.round(volatility * 10) / 10,
    recommendation,
    confidence: Math.round(confidence * 10) / 10,
    chartData,
    timestamp: new Date().toISOString()
  };
}

