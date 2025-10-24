import React, { useState } from 'react';
import NewsInputForm from '../components/NewsInputForm';
import ResultDisplay from '../components/ResultDisplay';
import '../styles/DetectorPage.css';
import { analyzeNews } from '../services/newsService';

function DetectorPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleNewsSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await analyzeNews(data);
      setResult(response);
      setHistory([response, ...history.slice(0, 9)]); // Keep last 10 results
    } catch (error) {
      console.error('Error analyzing news:', error);
      setResult({
        prediction: 'error',
        confidence: 0,
        reasoning: 'Failed to analyze the news. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detector-page">
      <div className="detector-container">
        <NewsInputForm onSubmit={handleNewsSubmit} />
        <ResultDisplay result={result} loading={loading} />

        {history.length > 0 && (
          <div className="history-section">
            <h2>Recent Analyses</h2>
            <div className="history-list">
              {history.map((item, index) => (
                <div
                  key={index}
                  className={`history-item ${item.prediction}`}
                  onClick={() => setResult(item)}
                >
                  <span className="history-prediction">
                    {item.prediction === 'real' ? '✓ Real' : '✗ Fake'}
                  </span>
                  <span className="history-confidence">
                    {Math.round(item.confidence * 100)}% confidence
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetectorPage;
