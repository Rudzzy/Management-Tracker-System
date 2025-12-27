import api from './axios';

export const getCriticalEquipment = () => api.get('/reports/critical-equipment');
export const getEquipmentList = () => api.get('/equipment');
export const getEquipmentById = (id) => api.get(`/equipment/${id}`);
export const createEquipment = (data) => api.post('/equipment', data);
