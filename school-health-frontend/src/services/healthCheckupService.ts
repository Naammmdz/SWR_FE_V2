import api from './api';
import { ChienDichKhamSucKhoe } from '../types';

export const healthCheckupService = {
  getHealthCheckups: () => api.get<ChienDichKhamSucKhoe[]>('/health-checkups'),

  createHealthCheckup: (data: Partial<ChienDichKhamSucKhoe>) =>
    api.post<ChienDichKhamSucKhoe>('/health-checkups', data),

  updateHealthCheckup: (id: string, data: Partial<ChienDichKhamSucKhoe>) =>
    api.put<ChienDichKhamSucKhoe>(`/health-checkups/${id}`, data),

  deleteHealthCheckup: (id: string) => api.delete<void>(`/health-checkups/${id}`),
};
