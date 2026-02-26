import api from './api';

export const getAllUserInfo = () => api.get('/user-info');
export const getUserInfo = (id) => api.get(`/user-info/${id}`);
export const updateUserInfo = (id, data) => api.put(`/user-info/${id}`, data);
export const deleteUserInfo = (id) => api.delete(`/user-info/${id}`);
