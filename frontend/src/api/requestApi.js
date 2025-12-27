import api from './axios';

export const getRequests = () => api.get('/requests');
export const getCalendarRequests = () => api.get('/requests/calendar');
export const getWorkCenterRequests = () => api.get('/work-center');
export const getTechnicianLoad = () => api.get('/reports/technician-load');
export const assignRequest = (id, technicianId) => api.patch(`/requests/${id}/assign`, { technician_id: technicianId });
export const createRequest = (data) => api.post('/requests', data);
export const updateRequestStatus = (id, status) => api.patch(`/requests/${id}/status`, { status });
export const getTeams = () => api.get('/teams');
export const getReportsOverview = () => api.get('/reports/overview');
