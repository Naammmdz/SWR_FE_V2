import api from './api';
import { ChienDichTiemChung } from '../types';

// Define a type for the approver information if it's structured
interface ApproveCampaignPayload {
  approverUserId: string;
}

export const campaignService = {
  getVaccinationCampaigns: () =>
    api.get<ChienDichTiemChung[]>('/campaigns/vaccination'),

  createVaccinationCampaign: (data: Partial<ChienDichTiemChung>) =>
    api.post<ChienDichTiemChung>('/campaigns/vaccination', data),

  approveCampaign: (id: string, payload: ApproveCampaignPayload) =>
    api.put<ChienDichTiemChung>(`/campaigns/vaccination/${id}/approve?approverUserId=${payload.approverUserId}`, {}),
  // Backend expects approverUserId as a @RequestParam, so it's added to the URL.
  // An empty object {} is sent as the body for the PUT request if no other data is needed in the body.
};
