import instance from './axios';

export const authAPI = {
  register: async (data) => {
    const response = await instance.post('/api/register/', data);
    return response.data;
  },

  login: async (data) => {
    const response = await instance.post('/api/login/', data);
    return response.data;
  },

  logout: async () => {
    const response = await instance.post('/api/logout/');
    return response.data;
  },

  getProfile: async () => {
    const response = await instance.get('/api/profile/');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await instance.patch('/api/profile/update/', data);
    return response.data;
  }
};