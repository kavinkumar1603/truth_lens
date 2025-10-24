import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <h1 className="logo-title">🔍 Fake News Detector</h1>
          <p className="logo-subtitle">Identify Real vs Fake News with AI</p>
        </div>
        <nav className="header-nav">
          <ul>
            <li><Link to="/detector">Detector</Link></li>
            <li><Link to="/history">History</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
