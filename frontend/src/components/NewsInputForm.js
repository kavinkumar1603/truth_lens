import React, { useState } from 'react';
import '../styles/NewsInputForm.css';

function NewsInputForm({ onSubmit }) {
  const [newsText, setNewsText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const MIN_LEN = 50;

  const handleTextChange = (e) => {
    setNewsText(e.target.value);
    setError('');
  };

  const validateInput = () => {
    if (newsText.trim().length < MIN_LEN) {
      setError(`Please enter at least ${MIN_LEN} characters of news text`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    setLoading(true);
    const data = {
      type: 'text',
      content: newsText,
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
    setError('');
  };

  const charClass = newsText.length === 0 ? '' : newsText.length < MIN_LEN ? 'warning' : '';

  return (
    <div className="input-form-container">
      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-header">
          <h2>Check News Credibility</h2>
          <p>Paste a news article below and we’ll analyze it using the trained model.</p>
        </div>

        <div className="form-group">
          <label htmlFor="newsText">Enter News Article</label>
          <textarea
            id="newsText"
            value={newsText}
            onChange={handleTextChange}
            placeholder={`Paste your news article here (minimum ${MIN_LEN} characters)...`}
            rows="10"
            disabled={loading}
          />
          <span className={`char-count ${charClass}`}>{newsText.length} characters</span>
        </div>

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
