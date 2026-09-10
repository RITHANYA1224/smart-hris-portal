import api from './api';

export const appraisalService = {
  startAppraisalCycle: async (cycleYear) => {
    const response = await api.post(`/api/appraisals/start${cycleYear ? `?cycleYear=${cycleYear}` : ''}`);
    return response.data;
  },

  getAttritionAnalytics: async () => {
    const response = await api.get('/api/analytics/attrition');
    return response.data;
  }
};

export default appraisalService;
