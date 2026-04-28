import api from './axiosInstance.js';

export const signupApi = (data) => api.post('/auth/signup', data);
export const loginApi = (data) => api.post('/auth/login', data);
export const refreshApi = (refreshToken) => api.post('/auth/refresh', { refreshToken });
export const logoutApi = (refreshToken) => api.post('/auth/logout', { refreshToken });
export const getMeApi = () => api.get('/auth/me');
