import api from './api';

export const leaveService = {
  getAllLeaves: async () => {
    const response = await api.get('/api/leaves');
    return response.data;
  },

  getPendingLeaves: async () => {
    const response = await api.get('/api/leaves/pending');
    return response.data;
  },

  applyLeave: async (leaveData) => {
    const response = await api.post('/api/leaves', leaveData);
    return response.data;
  },

  approveLeave: async (id, approverId) => {
    const response = await api.put(`/api/leaves/${id}/approve?approverId=${approverId || ''}`);
    return response.data;
  },

  deleteLeave: async (id) => {
    const response = await api.delete(`/api/leaves/${id}`);
    return response.data;
  }
};

export default leaveService;
