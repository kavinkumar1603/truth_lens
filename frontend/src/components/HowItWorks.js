import React from 'react';
import '../styles/HowItWorks.css';

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Input News',
      description: 'Enter a news article or URL you want to verify',
      icon: '📝',
    },
    {
      number: 2,
      title: 'AI Analysis',
      description: 'Our ML model analyzes text patterns and linguistic features',
      icon: '🤖',
    },
    {
      number: 3,
      title: 'Feature Extraction',
      description: 'Extract key features like sentiment, credibility indicators, and language patterns',
      icon: '🔍',
    },
    {
      number: 4,
      title: 'Prediction',
      description: 'Model predicts whether the news is real or fake with confidence score',
      icon: '📊',
    },
  ];

  return (
    <div className="how-it-works-container">
      <div className="how-it-works-content">
        <h2 className="how-it-works-title">How It Works</h2>
        <p className="how-it-works-subtitle">
          Our advanced AI/ML model analyzes news articles to detect misinformation
        </p>

        <div className="steps-container">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="step-card">
                <div className="step-icon">{step.icon}</div>
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-arrow">→</div>}
            </React.Fragment>
          ))}
        </div>

        <div className="technologies-section">
          <h3>Technologies Used</h3>
          <div className="tech-tags">
            <span className="tech-tag">Machine Learning</span>
            <span className="tech-tag">NLP</span>
            <span className="tech-tag">Python</span>
            <span className="tech-tag">React</span>
            <span className="tech-tag">TensorFlow/Keras</span>
            <span className="tech-tag">Deep Learning</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
