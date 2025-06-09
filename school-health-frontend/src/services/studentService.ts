import api from './api';
import { Student, HealthRecord, HealthCheckup, MedicineRequest } from '../types'; // Adjust path as needed if types are in a different location

// Assuming HealthCheckup and MedicineRequest types are defined in ../types
// If not, they might be 'any' for now or need to be added by the FE team.

export const studentService = {
  getAllStudents: (): Promise<Student[]> => {
    return api.get('/students');
  },

  getStudent: (id: string): Promise<Student> => {
    return api.get(`/students/${id}`);
  },

  createStudent: (studentData: Omit<Student, 'id'>): Promise<Student> => {
    return api.post('/students', studentData);
  },

  updateStudent: (id: string, studentData: Partial<Student>): Promise<Student> => {
    return api.put(`/students/${id}`, studentData);
  },

  deleteStudent: (id: string): Promise<void> => {
    return api.delete(`/students/${id}`);
  },

  getHealthRecord: (studentId: string): Promise<HealthRecord> => {
    return api.get(`/students/${studentId}/health-record`);
  },

  updateHealthRecord: (studentId: string, data: Partial<HealthRecord>): Promise<HealthRecord> => {
    // Backend's HealthRecordDTO for update might not require studentId in the body,
    // as it's part of the path. 'data' should represent the fields that can be updated.
    return api.put(`/students/${studentId}/health-record`, data);
  },

  getStudentHealthCheckups: (studentId: string): Promise<HealthCheckup[]> => {
    return api.get(`/students/${studentId}/health-checkups`);
  },

  getStudentMedicineRequests: (studentId: string): Promise<MedicineRequest[]> => {
    return api.get(`/students/${studentId}/medicine-requests`);
  },
};
