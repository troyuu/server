import api from './api';

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getProfile = () => api.get('/auth/profile');
export const getRegisteredUsers = () => api.get('/auth/registered');
export const getLoginHistory = () => api.get('/auth/login-history');
