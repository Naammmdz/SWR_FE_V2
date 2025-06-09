import api from './api';
import { YeuCauGuiThuoc } from '../types';

// Define interfaces for payload data if they are more specific than Partial<YeuCauGuiThuoc>
// For example, for approve/reject actions if they take specific structured data in the body.
// Based on the backend, approve/reject take query parameters.

interface ApproveMedicineRequestParams {
  approverUserId: string;
}

interface RejectMedicineRequestParams {
  rejecterUserId: string;
  reason: string;
}

export const medicineRequestService = {
  getMedicineRequests: () =>
    api.get<YeuCauGuiThuoc[]>('/medicine-requests'),

  getMedicineRequest: (id: string) =>
    api.get<YeuCauGuiThuoc>(`/medicine-requests/${id}`),

  createMedicineRequest: (data: Partial<YeuCauGuiThuoc>) =>
    api.post<YeuCauGuiThuoc>('/medicine-requests', data),

  approveMedicineRequest: (id: string, params: ApproveMedicineRequestParams) =>
    api.put<YeuCauGuiThuoc>(`/medicine-requests/${id}/approve?approverUserId=${params.approverUserId}`, {}),
  // Backend expects approverUserId as a @RequestParam. Empty object for PUT body.

  rejectMedicineRequest: (id: string, params: RejectMedicineRequestParams) =>
    api.put<YeuCauGuiThuoc>(`/medicine-requests/${id}/reject?rejecterUserId=${params.rejecterUserId}&reason=${encodeURIComponent(params.reason)}`, {}),
  // Backend expects rejecterUserId and reason as @RequestParams. Empty object for PUT body.
};
