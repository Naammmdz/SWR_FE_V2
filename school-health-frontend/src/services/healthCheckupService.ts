import api from './api';
import { HealthCheckup } from '../types'; // Adjust path as needed if types are in a different location

export const healthCheckupService = {
  // Get all health checkups
  getHealthCheckups: (): Promise<HealthCheckup[]> => {
    return api.get('/health-checkups');
  },

  // Get a single health checkup by its ID
  getHealthCheckupById: (id: string): Promise<HealthCheckup> => {
    return api.get(`/health-checkups/${id}`);
  },

  // Create a new health checkup
  // studentId must be included in 'data'.
  // bmi is calculated by the backend.
  createHealthCheckup: (data: Omit<HealthCheckup, 'id' | 'bmi'>): Promise<HealthCheckup> => {
    return api.post('/health-checkups', data);
  },

  // Update an existing health checkup
  // studentId can be included in 'data' if it's meant to be updatable.
  // bmi is recalculated by the backend.
  updateHealthCheckup: (id: string, data: Partial<Omit<HealthCheckup, 'id' | 'bmi'>>): Promise<HealthCheckup> => {
    return api.put(`/health-checkups/${id}`, data);
  },

  // Delete a health checkup
  deleteHealthCheckup: (id: string): Promise<void> => {
    return api.delete(`/health-checkups/${id}`);
  },

  // Get health checkups for a specific student
  // This is also available via studentService, but can be here for direct access if preferred.
  getHealthCheckupsByStudent: (studentId: string): Promise<HealthCheckup[]> => {
    return api.get(`/health-checkups/student/${studentId}`);
  }
};
