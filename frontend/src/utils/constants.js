// Constants for the application
export const APP_NAME = 'Fake News Detector';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_ENDPOINTS = {
  ANALYZE: '/analyze',
  HISTORY: '/history',
  STATISTICS: '/statistics',
  ANALYSIS: '/analysis',
};

// News prediction types
export const PREDICTION_TYPES = {
  REAL: 'real',
  FAKE: 'fake',
};

// Prediction labels
export const PREDICTION_LABELS = {
  real: 'Real News',
  fake: 'Fake News',
};

// Prediction emojis
export const PREDICTION_EMOJIS = {
  real: '✓',
  fake: '✗',
};

// Colors
export const COLORS = {
  primary: '#2563eb',
  success: '#00d084',
  danger: '#ff6b6b',
  warning: '#ffc107',
  info: '#0dcaf0',
  light: '#f8f9fa',
  dark: '#212529',
};

// Messages
export const MESSAGES = {
  ANALYZE_SUCCESS: 'News analysis completed successfully',
  ANALYZE_ERROR: 'Failed to analyze the news. Please try again.',
  LOADING: 'Analyzing your news article...',
  VALIDATION_ERROR: 'Please enter valid information',
  DISCLAIMER: '⚠️ This is an AI-based prediction and should not be considered 100% accurate.',
};

// Input validation rules
export const VALIDATION_RULES = {
  MIN_TEXT_LENGTH: 50,
  MAX_TEXT_LENGTH: 10000,
  MIN_URL_LENGTH: 10,
};

// Confidence thresholds
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.8,
  MEDIUM: 0.6,
  LOW: 0.4,
};

// Local storage keys
export const LOCAL_STORAGE_KEYS = {
  NEWS_ANALYSIS_HISTORY: 'newsAnalysisHistory',
  USER_PREFERENCES: 'userPreferences',
  CACHED_STATISTICS: 'cachedStatistics',
};

// Default statistics
export const DEFAULT_STATS = {
  totalAnalyzed: 0,
  realNewsCount: 0,
  fakeNewsCount: 0,
  accuracy: 0,
};
