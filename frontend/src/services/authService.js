import api from './api';

export const authService = {
  login: async (identifier, password) => {
    const response = await api.post('/api/auth/login', { identifier, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (e) {
      // Ignore network errors on logout cleanup
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
    }
  },

  getCurrentUserProfile: async () => {
    const response = await api.get('/api/users/profile');
    return response.data;
  }
};

export default authService;
