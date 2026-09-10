import api from './api';

export const userService = {
  getUserProfile: async (email) => {
    const url = email ? `/api/users/profile?email=${encodeURIComponent(email)}` : '/api/users/profile';
    const response = await api.get(url);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
  }
};

export default userService;
