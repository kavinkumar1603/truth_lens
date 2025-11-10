import React, { useState, useEffect } from 'react';
import '../styles/HistoryPage.css';
import { getHistory, clearAllHistory, deleteAnalysis } from '../services/newsService';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    // Load history from backend on mount
    (async () => {
      try {
        const items = await getHistory();
        setHistory(items);
      } catch (e) {
        console.error('Failed to load history', e);
      }
    })();
  }, []);

  const filteredHistory = history.filter((item) => {
    if (filter === 'real') return item.prediction === 'real';
    if (filter === 'fake') return item.prediction === 'fake';
    return true;
  });

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === 'accuracy') return b.confidence - a.confidence;
    return 0;
  });

  const clearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all history?')) return;
    try {
      await clearAllHistory();
      setHistory([]);
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteAnalysis(id);
      setHistory((prev) => prev.filter((h) => h.id !== id));
    } catch (e) {
      console.error('Failed to delete analysis', e);
    }
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analysis-history.json';
    link.click();
  };

  return (
    <div className="history-page">
      <div className="history-container">
        <div className="history-header">
          <h1>Analysis History</h1>
          <p>View all your previous news analysis results</p>
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h2>No History Yet</h2>
            <p>Your analysis history will appear here</p>
            <a href="/detector" className="btn btn-primary">Start Analyzing</a>
          </div>
        ) : (
          <>
            <div className="history-controls">
              <div className="control-group">
                <label htmlFor="filter">Filter:</label>
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Results</option>
                  <option value="real">Real News Only</option>
                  <option value="fake">Fake News Only</option>
                </select>
              </div>

              <div className="control-group">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="accuracy">Highest Confidence</option>
                </select>
              </div>

              <div className="control-actions">
                <button className="btn btn-secondary" onClick={exportHistory}>
                  📥 Export
                </button>
                <button className="btn btn-danger" onClick={clearHistory}>
                  🗑️ Clear All
                </button>
              </div>
            </div>

            <div className="history-stats">
              <div className="stat">
                <span className="stat-label">Total</span>
                <span className="stat-value">{history.length}</span>
              </div>
              <div className="stat real">
                <span className="stat-label">Real</span>
                <span className="stat-value">{history.filter(h => h.prediction === 'real').length}</span>
              </div>
              <div className="stat fake">
                <span className="stat-label">Fake</span>
                <span className="stat-value">{history.filter(h => h.prediction === 'fake').length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Avg Confidence</span>
                <span className="stat-value">
                  {history.length > 0
                    ? Math.round((history.reduce((sum, h) => sum + h.confidence, 0) / history.length) * 100)
                    : 0}%
                </span>
              </div>
            </div>

            <div className="history-list">
              {sortedHistory.map((item) => (
                <div key={item.id} className={`history-item-card ${item.prediction}`}>
                  <div className="history-item-header">
                    <span className={`prediction-badge ${item.prediction}`}>
                      {item.prediction === 'real' ? '✓ Real News' : '✗ Fake News'}
                    </span>
                    <span className="confidence-badge">
                      {Math.round(item.confidence * 100)}% confident
                    </span>
                  </div>
                  {item.content && (
                    <p className="history-item-content">{item.content.substring(0, 150)}...</p>
                  )}
                  <div className="history-item-footer">
                    <span className="timestamp">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                    <button
                      className="btn-delete"
                      onClick={() => deleteItem(item.id)}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
