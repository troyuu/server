import api from './api';

export const getCategories = () => api.get('/products/categories/all');
export const getCategory = (id) => api.get(`/products/categories/${id}`);
export const createCategory = (data) => api.post('/products/categories', data);
export const updateCategory = (id, data) => api.put(`/products/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/products/categories/${id}`);
