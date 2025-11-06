import React from 'react';
import '../styles/ResultDisplay.css';

function ResultDisplay({ result, loading }) {
  if (loading) {
    return (
      <div className="result-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Analyzing your news article...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const confidence = Math.round((result.confidence || 0) * 100);
  const isReal = result.prediction === 'real';
  const probReal = result.probability_real != null ? Math.round(result.probability_real * 100) : null;
  const probFake = result.probability_fake != null ? Math.round(result.probability_fake * 100) : null;
  
  return (
    <div className="result-container">
      <div className={`result-card ${isReal ? 'real' : 'fake'}`}>
        <div className="result-header">
          <div className={`result-badge ${isReal ? 'real' : 'fake'}`}>
            {isReal ? '✓ REAL NEWS' : '✗ FAKE NEWS'}
          </div>
          <h2 className="result-title">Analysis Result</h2>
        </div>

        <div className="confidence-section">
          <p className="confidence-label">Confidence Score</p>
          <div className="confidence-bar-container">
            <div 
              className={`confidence-bar ${isReal ? 'real' : 'fake'}`}
              style={{ width: `${confidence}%` }}
            >
              <span className="confidence-text">{confidence}%</span>
            </div>
          </div>
        </div>

        <div className="analysis-details">
          <div className="detail-item">
            <span className="detail-label">Prediction:</span>
            <span className={`detail-value ${isReal ? 'real' : 'fake'}`}>
              {isReal ? 'Real News' : 'Fake News'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Confidence:</span>
            <span className="detail-value">{confidence}%</span>
          </div>
          {(probReal !== null || probFake !== null) && (
            <div className="detail-item">
              <span className="detail-label">Class Probabilities:</span>
              <span className="detail-value">
                {probReal !== null ? `Real: ${probReal}%` : ''}
                {probReal !== null && probFake !== null ? ' • ' : ''}
                {probFake !== null ? `Fake: ${probFake}%` : ''}
              </span>
            </div>
          )}
          {result.reasoning && (
            <div className="detail-item full-width">
              <span className="detail-label">Analysis:</span>
              <p className="detail-value reasoning">{result.reasoning}</p>
            </div>
          )}
        </div>

        <div className={`result-message ${isReal ? 'real' : 'fake'}`}>
          {isReal ? (
            <p>🟢 This article appears to be legitimate news based on our AI analysis.</p>
          ) : (
            <p>🔴 This article shows characteristics of misinformation. Please verify with trusted sources.</p>
          )}
        </div>

        <div className="result-disclaimer">
          <p>⚠️ <strong>Disclaimer:</strong> This is an AI-based prediction and should not be considered 100% accurate. Always verify important news with multiple trusted sources.</p>
        </div>
      </div>
    </div>
  );
}

export default ResultDisplay;
