import api from './api';

export interface MedicalSupply {
  id: number;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  expirationDate?: string;
  manufacturer?: string;
  description?: string;
  minimumStock: number;
  location: string;
}

export interface MedicineRequest {
  id: number;
  studentId: number;
  studentName: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
  requestDate: string;
  approvedBy?: string;
  approvedDate?: string;
}

export const inventoryService = {
  // Quản lý kho thuốc và vật tư y tế
  async getMedicalSupplies(page: number = 0, size: number = 10, category?: string) {
    const params = { page, size, category };
    const response = await api.get('/inventory/supplies', { params });
    return response.data;
  },

  async addMedicalSupply(data: Omit<MedicalSupply, 'id'>) {
    const response = await api.post('/inventory/supplies', data);
    return response.data;
  },

  async updateMedicalSupply(id: number, data: Partial<MedicalSupply>) {
    const response = await api.put(`/inventory/supplies/${id}`, data);
    return response.data;
  },

  async deleteMedicalSupply(id: number) {
    const response = await api.delete(`/inventory/supplies/${id}`);
    return response.data;
  },

  // Quản lý yêu cầu cấp phát thuốc
  async getMedicineRequests(page: number = 0, size: number = 10, status?: MedicineRequest['status']) {
    const params = { page, size, status };
    const response = await api.get('/medicine-requests', { params });
    return response.data;
  },

  async createMedicineRequest(data: {
    studentId: number;
    medicineName: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
    reason: string;
    notes?: string;
  }) {
    const response = await api.post('/medicine-requests', data);
    return response.data;
  },

  async updateMedicineRequestStatus(
    requestId: number,
    status: MedicineRequest['status'],
    notes?: string
  ) {
    const response = await api.patch(`/medicine-requests/${requestId}/status`, {
      status,
      notes
    });
    return response.data;
  },

  // Quản lý nhập xuất kho
  async getInventoryLogs(
    page: number = 0,
    size: number = 10,
    type?: 'IN' | 'OUT',
    startDate?: string,
    endDate?: string
  ) {
    const params = { page, size, type, startDate, endDate };
    const response = await api.get('/inventory/logs', { params });
    return response.data;
  },

  async addInventoryLog(data: {
    supplyId: number;
    type: 'IN' | 'OUT';
    quantity: number;
    reason: string;
    notes?: string;
  }) {
    const response = await api.post('/inventory/logs', data);
    return response.data;
  },

  // Thống kê và báo cáo
  async getInventoryStatistics(startDate: string, endDate: string) {
    const params = { startDate, endDate };
    const response = await api.get('/inventory/statistics', { params });
    return response.data;
  },

  async getLowStockAlerts() {
    const response = await api.get('/inventory/low-stock-alerts');
    return response.data;
  },

  async getExpirationAlerts(daysThreshold: number = 30) {
    const params = { daysThreshold };
    const response = await api.get('/inventory/expiration-alerts', { params });
    return response.data;
  }
};
