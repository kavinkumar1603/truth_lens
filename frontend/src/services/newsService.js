// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Analyze news article
export const analyzeNews = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: data.type,
        content: data.content,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze news');
    }

    const result = await response.json();
    return {
      ...result,
      timestamp: new Date().toISOString(),
      content: data.content,
    };
  } catch (error) {
    console.error('Error analyzing news:', error);
    throw error;
  }
};

// Get analysis history
export const getHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/history`);
    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

// Get statistics
export const getStatistics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/statistics`);
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

// Delete analysis result
export const deleteAnalysis = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analysis/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete analysis');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting analysis:', error);
    throw error;
  }
};

// Clear all history
export const clearAllHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to clear history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error clearing history:', error);
    throw error;
  }
};
