import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },
};

// User API
export const userAPI = {
  getUser: async (userId) => {
    const response = await api.get(`/api/user/${userId}`);
    return response.data;
  },

  updateUser: async (userId, updates) => {
    const response = await api.put(`/api/user/${userId}`, updates);
    return response.data;
  },
};

// Campaigns API
export const campaignsAPI = {
  getCampaigns: async () => {
    const response = await api.get('/api/campaigns');
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  getUserAnalytics: async (userId) => {
    const response = await api.get(`/api/analytics/${userId}`);
    return response.data;
  },
};

// Loyalty API
export const loyaltyAPI = {
  addPoints: async (userId, points, reason) => {
    const response = await api.post(`/api/loyalty/${userId}/add`, null, {
      params: { points, reason }
    });
    return response.data;
  },

  getTransactions: async (userId) => {
    const response = await api.get(`/api/loyalty/${userId}/transactions`);
    return response.data;
  },
};

export default api;