import type { ChienDichTiemChung, KetQuaTiemChungHocSinh, TrangThaiChienDich, ChienDichKhamSucKhoe, KetQuaKhamSucKhoeHocSinh } from '../types';

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
    trangThai: 'da_duyet',
    idNguoiTao: 'admin001',
    idNguoiDuyet: 'admin001',
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
];

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
    if (newStatus === 'da_duyet') {
        console.log(`Campaign ${id} approved. Notifying parents of students in: ${campaign.doiTuongApDung}`);
    }
    return true;
  }
  return false;
};

export const addStudentVaccinationResult = (result: KetQuaTiemChungHocSinh) => {
    mockStudentVaccinationResults.push(result);
    console.log(`Vaccination result for student ${result.idHocSinh} in campaign ${result.idChienDichTiemChung} recorded. Notifying parent.`);
};

// --- Health Checkup Campaigns ---

export let mockHealthCheckupCampaigns: ChienDichKhamSucKhoe[] = [
  {
    id: "hcamp001",
    tenChienDich: "Khám sức khỏe tổng quát Khối 1 - Năm học 2024-2025",
    loaiKham: ["Tổng quát", "Mắt", "Răng miệng"],
    doiTuongApDung: "Học sinh khối 1",
    thoiGianDuKien: new Date("2024-11-10T08:00:00").toISOString(),
    diaDiemKham: "Phòng Y tế và Hội trường A",
    donViThucHienKham: "Đội ngũ y tế trường & Bệnh viện Nhi Đồng ABC (hỗ trợ)",
    ghiChuChung: "Vui lòng cho học sinh nhịn ăn sáng nhẹ nếu có xét nghiệm máu (sẽ thông báo cụ thể).",
    trangThai: "da_duyet",
    idNguoiTao: "admin001",
    idNguoiDuyet: "admin001",
    ngayTao: new Date("2024-10-01T00:00:00Z").toISOString(),
    ngayDuyet: new Date("2024-10-02T00:00:00Z").toISOString(),
  },
  {
    id: "hcamp002",
    tenChienDich: "Kiểm tra thị lực toàn trường - Đợt 1",
    loaiKham: ["Mắt"],
    doiTuongApDung: "Toàn trường",
    thoiGianDuKien: new Date("2025-01-15T00:00:00Z").toISOString(),
    diaDiemKham: "Phòng Y tế",
    trangThai: "moi_tao",
    idNguoiTao: "yta001",
    ngayTao: new Date("2024-11-20T00:00:00Z").toISOString(),
  }
];

export let mockStudentHealthCheckupResults: KetQuaKhamSucKhoeHocSinh[] = [
  {
    id: "kqh001",
    idChienDichKhamSucKhoe: "hcamp001",
    idHocSinh: "hs001", // Nguyễn Văn An
    ngayKham: new Date("2024-11-10T09:00:00Z").toISOString(),
    ketQuaChiTiet: {
      chieuCao: "110cm", canNang: "18kg", BMI: "14.8 (Bình thường)",
      matTrai: "10/10", matPhai: "9/10", ketLuanMat: "Cận thị nhẹ mắt phải",
      rangMieng: "Sâu 2 răng hàm dưới, lợi khỏe",
      tuanHoan: "Tim đều, rõ", hoHap: "Phổi thông khí tốt", tieuHoa: "Bụng mềm, không chướng",
    },
    ketLuanTongQuatCuaBacSi: "Học sinh phát triển thể chất bình thường. Cận thị nhẹ mắt phải, cần theo dõi. Sâu răng, cần điều trị nha khoa.",
    deNghiCuaBacSi: "Tái khám mắt sau 6 tháng. Điều trị sâu răng tại nha khoa. Bổ sung dinh dưỡng đa dạng.",
    canHenLichTuVan: true,
    idBacSiKham: "bsNhi001",
    daGuiThongBaoKetQuaChoPH: false, // Placeholder
  }
];

// Helper functions for Health Checkups
export const addHealthCheckupCampaign = (campaign: ChienDichKhamSucKhoe) => {
  mockHealthCheckupCampaigns.push(campaign);
};

export const updateHealthCheckupCampaignStatus = (id: string, newStatus: TrangThaiChienDich, userId?: string) => {
  const campaign = mockHealthCheckupCampaigns.find(c => c.id === id);
  if (campaign) {
    campaign.trangThai = newStatus;
    if (newStatus === "da_duyet" && userId) {
        campaign.idNguoiDuyet = userId;
        campaign.ngayDuyet = new Date().toISOString();
    }
    if (newStatus === "da_duyet") {
        console.log(`Health Checkup Campaign ${id} approved. Notifying parents of students in: ${campaign.doiTuongApDung}`);
    }
    return true;
  }
  return false;
};

export const addStudentHealthCheckupResult = (result: KetQuaKhamSucKhoeHocSinh) => {
    mockStudentHealthCheckupResults.push(result);    console.log(`Health checkup result for student ${result.idHocSinh} in campaign ${result.idChienDichKhamSucKhoe} recorded. Notifying parent.`);
    if (result.canHenLichTuVan) {
        console.log(`Student ${result.idHocSinh} needs consultation scheduling.`);
    }
};
