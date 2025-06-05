import { ChienDichTiemChung, KetQuaTiemChungHocSinh, TrangThaiChienDich, TrangThaiThamGiaTiemChung } from '../types';

export let mockVaccinationCampaigns: ChienDichTiemChung[] = [
  {
    id: 'vcamp001',
    tenChienDich: 'Tiêm chủng Sởi-Quai bị-Rubella (MMR) Đợt 1 2024',
    tenVaccine: 'MMR II',
    moTaVaccine: 'Vắc xin sống giảm độc lực phòng Sởi, Quai bị, Rubella.',
    doiTuongApDung: 'Học sinh khối 1 và khối 2 chưa tiêm đủ 2 mũi MMR.',
    thoiGianDuKienBatDau: new Date('2024-09-15T08:00:00').toISOString(),
    thoiGianDuKienKetThuc: new Date('2024-09-16T17:00:00').toISOString(),
    diaDiemTiemChung: 'Phòng Y tế Trường Tiểu học XYZ',
    ghiChuChung: 'Phụ huynh vui lòng cho các em ăn sáng đầy đủ. Mang theo sổ tiêm chủng (nếu có).',
    tieuChiThamGia: 'Học sinh có sức khỏe ổn định, không sốt, không mắc bệnh cấp tính.',
    trangThai: 'da_duyet', // 'moi_tao', 'cho_duyet', 'da_duyet', 'dang_dien_ra', 'hoan_thanh', 'da_huy'
    idNguoiTao: 'admin001',
    idNguoiDuyet: 'admin001', // Assume admin self-approved for mock
    ngayTao: new Date('2024-08-01T10:00:00').toISOString(),
    ngayDuyet: new Date('2024-08-02T11:00:00').toISOString(),
  },
  {
    id: 'vcamp002',
    tenChienDich: 'Tiêm chủng Vắc xin Cúm mùa 2024-2025',
    tenVaccine: 'Influvac Tetra',
    doiTuongApDung: 'Toàn thể học sinh và cán bộ nhân viên nhà trường có nhu cầu.',
    thoiGianDuKienBatDau: new Date('2024-10-20T08:00:00').toISOString(),
    thoiGianDuKienKetThuc: new Date('2024-10-22T17:00:00').toISOString(),
    diaDiemTiemChung: 'Hội trường lớn',
    ghiChuChung: 'Tiêm chủng tự nguyện. Chi phí dự kiến: 300.000 VNĐ/mũi.',
    trangThai: 'moi_tao',
    idNguoiTao: 'yta001',
    ngayTao: new Date('2024-08-15T14:00:00').toISOString(),
  }
];

export let mockStudentVaccinationResults: KetQuaTiemChungHocSinh[] = [
    {
        id: 'kq001', idChienDichTiemChung: 'vcamp001', idHocSinh: 'hs001',
        trangThaiThamGia: 'da_tiem', ngayTiemThucTe: new Date('2024-09-15T09:30:00').toISOString(),
        loVaccine: 'LOT2024MMR005', tenCanBoTiem: 'Y Tá Nguyễn Thị Hoa', phanUngSauTiem: 'Không có',
        daGuiThongBaoKetQuaChoPH: true, ngayGuiThongBaoKetQua: new Date('2024-09-15T17:00:00').toISOString()
    },
    // Add more mock results as needed
];

// Helper functions
export const addVaccinationCampaign = (campaign: ChienDichTiemChung) => {
  mockVaccinationCampaigns.push(campaign);
};

export const updateCampaignStatus = (id: string, newStatus: TrangThaiChienDich, userId?: string) => {
  const campaign = mockVaccinationCampaigns.find(c => c.id === id);
  if (campaign) {
    campaign.trangThai = newStatus;
    if (newStatus === 'da_duyet' && userId) {
        campaign.idNguoiDuyet = userId;
        campaign.ngayDuyet = new Date().toISOString();
    }
    // Simulate notification to parents if 'da_duyet'
    if (newStatus === 'da_duyet') {
        console.log(\`Campaign ${id} approved. Notifying parents of students in: ${campaign.doiTuongApDung}\`);
    }
    return true;
  }
  return false;
};

export const addStudentVaccinationResult = (result: KetQuaTiemChungHocSinh) => {
    mockStudentVaccinationResults.push(result);
    // Simulate notification to parent
    console.log(\`Vaccination result for student ${result.idHocSinh} in campaign ${result.idChienDichTiemChung} recorded. Notifying parent.\`);
}
