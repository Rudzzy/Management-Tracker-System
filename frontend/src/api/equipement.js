import api from './axios';

export const getCriticalEquipment = () => api.get('/reports/critical-equipment');
export const getEquipmentList = () => api.get('/equipment'); // Assuming standard CRUD
export const getEquipmentById = (id) => api.get(`/equipment/${id}`);
