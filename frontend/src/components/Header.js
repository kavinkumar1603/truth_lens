import React from 'react';
import { NavLink } from 'react-router-dom';
import MagnifierIcon from '../assets/icons/magnifier.svg';
import NewspaperIcon from '../assets/icons/newspaper.svg';
import ShieldIcon from '../assets/icons/shield.svg';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="brand">
            <div className="logo-icons" aria-hidden="true">
              <img src={NewspaperIcon} alt="News icon" />
            </div>
            <div className="brand-text">
              <h1 className="logo-title">Fake News Detector</h1>
              <p className="logo-subtitle">Identify Real vs Fake News with AI</p>
            </div>
          </div>
        </div>
        <nav className="header-nav">
          <ul>
            <li>
              <NavLink
                to="/detector"
                className={({ isActive }) => isActive ? 'active' : undefined}
              >
                Detector
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/history"
                className={({ isActive }) => isActive ? 'active' : undefined}
              >
                History
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
