import instance from './axios';

export const profileAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await instance.get('/api/profile/');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await instance.put('/api/profile/', userData);
    return response.data;
  },
};
