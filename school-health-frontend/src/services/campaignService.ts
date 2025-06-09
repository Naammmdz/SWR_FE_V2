import api from './api';

export interface Campaign {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'HEALTH_CHECKUP' | 'VACCINATION';
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  targetGroups: string[];
  location: string;
  organizer: string;
}

export interface CreateCampaignRequest {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'HEALTH_CHECKUP' | 'VACCINATION';
  targetGroups: string[];
  location: string;
  organizer: string;
}

export const campaignService = {
  // Lấy danh sách chiến dịch
  async getCampaigns(page: number = 0, size: number = 10, type?: string, status?: string) {
    const params = { page, size, type, status };
    const response = await api.get('/campaigns', { params });
    return response.data;
  },

  // Tạo chiến dịch mới
  async createCampaign(campaignData: CreateCampaignRequest) {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  },

  // Cập nhật thông tin chiến dịch
  async updateCampaign(campaignId: number, campaignData: Partial<CreateCampaignRequest>) {
    const response = await api.put(`/campaigns/${campaignId}`, campaignData);
    return response.data;
  },

  // Xóa chiến dịch
  async deleteCampaign(campaignId: number) {
    const response = await api.delete(`/campaigns/${campaignId}`);
    return response.data;
  },

  // Lấy chi tiết chiến dịch
  async getCampaignById(campaignId: number) {
    const response = await api.get(`/campaigns/${campaignId}`);
    return response.data;
  },

  // Thay đổi trạng thái chiến dịch
  async updateCampaignStatus(campaignId: number, status: Campaign['status']) {
    const response = await api.patch(`/campaigns/${campaignId}/status`, { status });
    return response.data;
  },

  // Thêm người tham gia vào chiến dịch
  async addParticipants(campaignId: number, participantIds: number[]) {
    const response = await api.post(`/campaigns/${campaignId}/participants`, { participantIds });
    return response.data;
  },

  // Lấy danh sách người tham gia chiến dịch
  async getCampaignParticipants(campaignId: number, page: number = 0, size: number = 10) {
    const params = { page, size };
    const response = await api.get(`/campaigns/${campaignId}/participants`, { params });
    return response.data;
  }
};
