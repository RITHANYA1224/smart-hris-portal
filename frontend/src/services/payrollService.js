import api from './api';

export const payrollService = {
  getAllPayroll: async () => {
    const response = await api.get('/api/payroll');
    return response.data;
  },

  createPayroll: async (payrollData) => {
    const response = await api.post('/api/payroll', payrollData);
    return response.data;
  },

  runPayrollBatch: async (payPeriod) => {
    const response = await api.post(`/api/payroll/run${payPeriod ? `?payPeriod=${payPeriod}` : ''}`);
    return response.data;
  },

  getPayslip: async (empId, month) => {
    const response = await api.get(`/api/payroll/${empId}/payslip/${month}`);
    return response.data;
  },

  deletePayroll: async (id) => {
    const response = await api.delete(`/api/payroll/${id}`);
    return response.data;
  }
};

export default payrollService;
