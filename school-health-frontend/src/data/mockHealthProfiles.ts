import { HoSoSucKhoe, ThongTinTiemChung } from '../types';

export let mockHealthProfiles: HoSoSucKhoe[] = [
  {
    id: 'hsk001', // For hs001 - Nguyễn Văn An
    idHocSinh: 'hs001',
    nhomMau: 'A+',
    diUng: ['Phấn hoa', 'Sữa bò (nhẹ)'],
    benhManTinh: ['Hen suyễn (nhẹ, theo mùa)'],
    tienSuDieuTri: 'Năm 2022: Viêm phế quản, điều trị tại BV Nhi Đồng. Thỉnh thoảng dùng Ventolin khi lên cơn hen.',
    thiLuc: { matTrai: '10/10', matPhai: '10/10', ngayKham: '2023-09-01T00:00:00Z', ghiChu: 'Kiểm tra định kỳ tại trường' },
    thinhLuc: { taiTrai: 'Bình thường', taiPhai: 'Bình thường', ngayKham: '2023-09-01T00:00:00Z' },
    tiemChung: [
      { tenVaccine: 'Sởi (Mũi 1)', ngayTiem: '2017-05-10T00:00:00Z', lieuLuong: '0.5ml' },
      { tenVaccine: 'MMR (Mũi 2)', ngayTiem: '2020-06-15T00:00:00Z', lieuLuong: '0.5ml', ghiChu: 'Tiêm tại phường' },
      { tenVaccine: 'Cúm mùa 2023', ngayTiem: '2023-10-20T00:00:00Z' },
    ],
    ghiChuKhac: 'Cháu dễ bị cảm lạnh khi thời tiết thay đổi.',
    ngayCapNhatCuoi: '2024-01-15T00:00:00Z',
    idNguoiCapNhatCuoi: 'ph001', // Parent ID
  },
  {
    id: 'hsk002', // For hs002 - Trần Thị Bình
    idHocSinh: 'hs002',
    nhomMau: 'O-',
    diUng: ['Hải sản (tôm, cua)'],
    benhManTinh: [],
    tienSuDieuTri: 'Không có bệnh lý đặc biệt.',
    tiemChung: [
        { tenVaccine: 'Viêm gan B (3 mũi)', ngayTiem: '2017-03-01T00:00:00Z' },
    ],
    ngayCapNhatCuoi: '2023-11-01T00:00:00Z',
    idNguoiCapNhatCuoi: 'ph001',
  },
  {
    id: 'hsk003', // For hs003 - Lê Minh Đức
    idHocSinh: 'hs003',
    nhomMau: 'B+',
    ngayCapNhatCuoi: '2023-05-01T00:00:00Z',
    idNguoiCapNhatCuoi: 'ph002',
    tiemChung: [], // example of empty array
    diUng: [],
    benhManTinh: [],
  }
];

export const getHealthProfileByStudentId = (studentId: string): HoSoSucKhoe | undefined => {
  return mockHealthProfiles.find(p => p.idHocSinh === studentId);
};

export const updateHealthProfile = (profileId: string, updatedData: Partial<HoSoSucKhoe>, userId: string): boolean => {
  const profileIndex = mockHealthProfiles.findIndex(p => p.id === profileId);
  if (profileIndex !== -1) {
    mockHealthProfiles[profileIndex] = {
      ...mockHealthProfiles[profileIndex],
      ...updatedData,
      ngayCapNhatCuoi: new Date().toISOString(),
      idNguoiCapNhatCuoi: userId,
    };
    console.log(\`Health profile ${profileId} updated by user ${userId}.\`);
    // TODO: Notify nurse if this option is enabled
    return true;
  }
  return false;
};

export const addHealthProfile = (newProfile: HoSoSucKhoe): void => {
    if (!mockHealthProfiles.find(p => p.id === newProfile.id)) {
        mockHealthProfiles.push(newProfile);
    }
};
