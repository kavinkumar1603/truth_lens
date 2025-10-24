import React, { useState } from 'react';
import '../styles/NewsInputForm.css';

function NewsInputForm({ onSubmit }) {
  const [inputType, setInputType] = useState('text');
  const [newsText, setNewsText] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    setNewsText(e.target.value);
    setError('');
  };

  const handleUrlChange = (e) => {
    setNewsUrl(e.target.value);
    setError('');
  };

  const validateInput = () => {
    if (inputType === 'text' && newsText.trim().length < 50) {
      setError('Please enter at least 50 characters of news text');
      return false;
    }
    if (inputType === 'url' && !isValidUrl(newsUrl)) {
      setError('Please enter a valid URL');
      return false;
    }
    return true;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInput()) return;

    setLoading(true);
    const data = {
      type: inputType,
      content: inputType === 'text' ? newsText : newsUrl,
    };

    try {
      await onSubmit(data);
    } catch (err) {
      setError('Error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNewsText('');
    setNewsUrl('');
    setError('');
    setInputType('text');
  };

  return (
    <div className="input-form-container">
      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-header">
          <h2>Check News Credibility</h2>
          <p>Enter a news article or URL to analyze</p>
        </div>

        <div className="input-type-selector">
          <label className={`type-option ${inputType === 'text' ? 'active' : ''}`}>
            <input
              type="radio"
              value="text"
              checked={inputType === 'text'}
              onChange={(e) => {
                setInputType(e.target.value);
                setError('');
              }}
            />
            <span>📝 Text Input</span>
          </label>
          <label className={`type-option ${inputType === 'url' ? 'active' : ''}`}>
            <input
              type="radio"
              value="url"
              checked={inputType === 'url'}
              onChange={(e) => {
                setInputType(e.target.value);
                setError('');
              }}
            />
            <span>🔗 URL Input</span>
          </label>
        </div>

        {inputType === 'text' ? (
          <div className="form-group">
            <label htmlFor="newsText">Enter News Article</label>
            <textarea
              id="newsText"
              value={newsText}
              onChange={handleTextChange}
              placeholder="Paste your news article here (minimum 50 characters)..."
              rows="8"
              disabled={loading}
            />
            <span className="char-count">{newsText.length} characters</span>
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="newsUrl">Enter News URL</label>
            <input
              id="newsUrl"
              type="url"
              value={newsUrl}
              onChange={handleUrlChange}
              placeholder="https://example.com/news-article"
              disabled={loading}
            />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze News'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewsInputForm;
