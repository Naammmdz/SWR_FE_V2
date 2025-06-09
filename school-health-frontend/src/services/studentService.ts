import api from './api';
import {
  HocSinh,
  HoSoSucKhoe,
  KetQuaKhamSucKhoeHocSinh, // Assuming this is the correct type for student's checkup results
  YeuCauGuiThuoc
} from '../types';

export const studentService = {
  getAllStudents: () => api.get<HocSinh[]>('/students'),

  getStudent: (id: string) => api.get<HocSinh>(`/students/${id}`),

  createStudent: (studentData: Partial<HocSinh>) => api.post<HocSinh>('/students', studentData),

  updateStudent: (id: string, studentData: Partial<HocSinh>) => api.put<HocSinh>(`/students/${id}`, studentData),

  deleteStudent: (id: string) => api.delete<void>(`/students/${id}`),

  getHealthRecord: (studentId: string) => api.get<HoSoSucKhoe>(`/students/${studentId}/health-record`),

  updateHealthRecord: (studentId: string, data: Partial<HoSoSucKhoe>) =>
    api.put<HoSoSucKhoe>(`/students/${studentId}/health-record`, data),

  getStudentHealthCheckups: (studentId: string) => api.get<KetQuaKhamSucKhoeHocSinh[]>(`/students/${studentId}/health-checkups`),

  getStudentMedicineRequests: (studentId: string) => api.get<YeuCauGuiThuoc[]>(`/students/${studentId}/medicine-requests`),
};
