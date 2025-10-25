import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About</h3>
          <p>Fake News Detector uses advanced AI/ML algorithms to identify misinformation in news articles.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/detector">Detector</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@fakenewsdetector.com</p>
          <p>Follow us on social media</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Fake News Detector. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
