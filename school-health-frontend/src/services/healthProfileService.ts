import api from './api';

export interface HealthProfile {
  id: number;
  studentId: number;
  studentName: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  height: number;
  weight: number;
  allergies: string[];
  chronicDiseases: string[];
  medications: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  lastUpdated: string;
}

export interface UpdateHealthProfileRequest {
  height?: number;
  weight?: number;
  allergies?: string[];
  chronicDiseases?: string[];
  medications?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export const healthProfileService = {
  // Lấy danh sách hồ sơ sức khỏe
  async getHealthProfiles(page: number = 0, size: number = 10, search?: string) {
    const params = { page, size, search };
    const response = await api.get('/health-profiles', { params });
    return response.data;
  },

  // Lấy chi tiết hồ sơ sức khỏe
  async getHealthProfileById(profileId: number) {
    const response = await api.get(`/health-profiles/${profileId}`);
    return response.data;
  },

  // Cập nhật hồ sơ sức khỏe
  async updateHealthProfile(profileId: number, data: UpdateHealthProfileRequest) {
    const response = await api.put(`/health-profiles/${profileId}`, data);
    return response.data;
  },

  // Lấy lịch sử khám sức khỏe
  async getHealthCheckupHistory(profileId: number, page: number = 0, size: number = 10) {
    const params = { page, size };
    const response = await api.get(`/health-profiles/${profileId}/checkups`, { params });
    return response.data;
  },

  // Thêm kết quả khám sức khỏe mới
  async addHealthCheckupResult(profileId: number, checkupData: {
    date: string;
    height: number;
    weight: number;
    bloodPressure: string;
    symptoms: string[];
    diagnosis: string;
    recommendations: string;
    doctorNotes: string;
  }) {
    const response = await api.post(`/health-profiles/${profileId}/checkups`, checkupData);
    return response.data;
  },

  // Lấy lịch sử tiêm chủng
  async getVaccinationHistory(profileId: number, page: number = 0, size: number = 10) {
    const params = { page, size };
    const response = await api.get(`/health-profiles/${profileId}/vaccinations`, { params });
    return response.data;
  },

  // Thêm thông tin tiêm chủng mới
  async addVaccinationRecord(profileId: number, vaccinationData: {
    date: string;
    vaccineName: string;
    dose: number;
    location: string;
    notes: string;
  }) {
    const response = await api.post(`/health-profiles/${profileId}/vaccinations`, vaccinationData);
    return response.data;
  }
};
