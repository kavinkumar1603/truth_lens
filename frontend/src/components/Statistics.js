import React from 'react';
import '../styles/Statistics.css';

function Statistics({ stats = {} }) {
  const {
    totalAnalyzed = 0,
    realNewsCount = 0,
    fakeNewsCount = 0,
    accuracy = 0,
  } = stats;

  const calculatePercentage = (count, total) => {
    return total === 0 ? 0 : Math.round((count / total) * 100);
  };

  const realPercentage = calculatePercentage(realNewsCount, totalAnalyzed);
  const fakePercentage = calculatePercentage(fakeNewsCount, totalAnalyzed);

  return (
    <div className="statistics-container">
      <h2 className="stats-title">Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <p className="stat-number">{totalAnalyzed}</p>
            <p className="stat-label">Total Analyzed</p>
          </div>
        </div>

        <div className="stat-card real">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <p className="stat-number">{realNewsCount}</p>
            <p className="stat-label">Real News ({realPercentage}%)</p>
          </div>
        </div>

        <div className="stat-card fake">
          <div className="stat-icon">✗</div>
          <div className="stat-content">
            <p className="stat-number">{fakeNewsCount}</p>
            <p className="stat-label">Fake News ({fakePercentage}%)</p>
          </div>
        </div>

        <div className="stat-card accuracy">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <p className="stat-number">{accuracy}%</p>
            <p className="stat-label">Model Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
