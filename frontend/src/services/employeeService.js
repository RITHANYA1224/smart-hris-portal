import api from './api';

export const employeeService = {
  getAllEmployees: async () => {
    const response = await api.get('/api/employees');
    return response.data;
  },

  getEmployeeById: async (id) => {
    const response = await api.get(`/api/employees/${id}`);
    return response.data;
  },

  createEmployee: async (employeeData) => {
    const response = await api.post('/api/employees', employeeData);
    return response.data;
  },

  updateEmployee: async (id, employeeData) => {
    const response = await api.put(`/api/employees/${id}`, employeeData);
    return response.data;
  },

  deleteEmployee: async (id) => {
    const response = await api.delete(`/api/employees/${id}`);
    return response.data;
  },

  searchEmployees: async (query) => {
    const response = await api.get(`/api/employees/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },

  getOrgChart: async () => {
    const response = await api.get('/api/employees/org-chart');
    return response.data;
  }
};

export default employeeService;
