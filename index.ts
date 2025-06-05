// src/types/index.ts

// Vai trò người dùng
export type VaiTroNguoiDung = 'phu_huynh' | 'y_ta' | 'admin';

// Thông tin cá nhân cơ bản (có thể mở rộng)
export interface ThongTinCaNhan {
  hoTen: string;
  email?: string;
  soDienThoai?: string;
  diaChi?: string;
}

// 1. Người dùng
export interface NguoiDung {
  id: string;
  tenDangNhap: string;
  matKhauHash?: string; // Thường không gửi về client
  vaiTro: VaiTroNguoiDung;
  thongTinCaNhan: ThongTinCaNhan;
  idTruongHoc: string; // Liên kết với trường học
  ngayTao: Date;
  trangThai: 'hoat_dong' | 'khoa';
}

// 2. Học Sinh
export interface HocSinh {
  id: string;
  hoTen: string;
  maHocSinh?: string; // Mã định danh riêng của trường
  ngaySinh: Date;
  gioiTinh: 'nam' | 'nu' | 'khac';
  lop: string; // Ví dụ: 'Lớp 1A', 'Khối 10B2'
  idTruongHoc: string;
  idNguoiGiamHoChinh: string; // id của NguoiDung (phụ huynh)
  cacNguoiGiamHoKhacIds?: string[];
  idHoSoSucKhoe?: string; // Liên kết đến hồ sơ sức khỏe
  anhDaiDienUrl?: string;
  ghiChu?: string;
}

// Thành phần của Hồ sơ sức khỏe
export interface ThongTinTiemChung {
  tenVaccine: string;
  ngayTiem: Date;
  lieuLuong?: string;
  ghiChu?: string;
}

// 3. Hồ sơ sức khỏe học sinh
export interface HoSoSucKhoe {
  id: string;
  idHocSinh: string;
  nhomMau?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  diUng?: string[]; // Danh sách các dị ứng, ví dụ: ['Phấn hoa', 'Đậu phộng']
  benhManTinh?: string[]; // Danh sách bệnh mãn tính
  tienSuDieuTri?: string; // Dạng text mô tả
  thiLuc?: {
    matTrai?: string; // Ví dụ: '10/10'
    matPhai?: string;
    ngayKham?: Date;
    ghiChu?: string;
  };
  thinhLuc?: {
    taiTrai?: string; // Ví dụ: 'Bình thường'
    taiPhai?: string;
    ngayKham?: Date;
    ghiChu?: string;
  };
  tiemChung?: ThongTinTiemChung[];
  ghiChuKhac?: string;
  ngayCapNhatCuoi: Date;
  idNguoiCapNhatCuoi: string; // id của NguoiDung
}

// Trạng thái yêu cầu gửi thuốc
export type TrangThaiYeuCauThuoc =
  | 'moi_tao'
  | 'da_xac_nhan_truong'
  | 'phu_huynh_da_gui_thuoc' // Phụ huynh thông báo đã gửi/đang mang đến
  | 'y_ta_da_nhan_thuoc'
  | 'dang_cho_uong' // Cho các lần uống tiếp theo trong cùng yêu cầu
  | 'da_cho_uong_mot_phan' // Nếu có nhiều lần uống
  | 'hoan_thanh' // Tất cả các lần uống đã xong
  | 'da_huy'
  | 'tu_choi'; // Trường từ chối yêu cầu

// Lịch sử cho học sinh uống thuốc (cho một YeuCauGuiThuoc)
export interface LichSuChoUongThuoc {
  id: string;
  idYeuCauGuiThuoc: string;
  thoiGianKeHoach: Date; // Thời gian dự kiến cho uống
  thoiGianThucTe?: Date; // Thời gian thực tế đã cho uống
  idYTaChoUong?: string;
  ghiChuYTa?: string;
  trangThai: 'chua_den_gio' | 'da_cho_uong' | 'bo_lo' | 'co_van_de';
}

// 4. Yêu cầu gửi thuốc
export interface YeuCauGuiThuoc {
  id: string;
  idHocSinh: string;
  idPhuHuynhGui: string;
  tenThuoc: string;
  hamLuong?: string; // Ví dụ: '500mg'
  donViTinh: string; // Ví dụ: 'viên', 'ml', 'gói'
  soLuongMoiLanUong: number;
  donViUong: string; // 'viên', 'ml'
  duongDung?: string; // 'Uống', 'Bôi ngoài da'
  huongDanSuDung: string; // Mô tả chi tiết
  thoiGianKeHoachUong: Date[]; // Danh sách các thời điểm cụ thể cần cho uống
  lichSuUongThuoc?: LichSuChoUongThuoc[]; // Lịch sử các lần cho uống
  donThuocUrl?: string; // Link đến file đơn thuốc (nếu có)
  ghiChuPhuHuynh?: string;
  lienHeKhanCap: string; // Số điện thoại hoặc tên người liên hệ
  trangThai: TrangThaiYeuCauThuoc;
  idYTaXuLy?: string;
  lyDoHuyHoacTuChoi?: string;
  ngayTao: Date;
  ngayCapNhat: Date;
}

// Loại sự cố y tế
export type LoaiSuCoYTe =
  | 'tai_nan_nhe' // Trầy xước, va chạm nhẹ
  | 'sot'
  | 'dau_bung'
  | 'non_mua'
  | 'te_nga'
  | 'di_ung_nhe'
  | 'benh_thong_thuong' // Cảm cúm, ho
  | 'can_theo_doi_dac_biet' // Triệu chứng chưa rõ ràng
  | 'tai_nan_can_can_thiep_y_te' // Nghi ngờ gãy xương, vết thương sâu
  | 'benh_lay_nhiem_nghi_ngo'
  | 'khac';

// Mức độ nghiêm trọng của sự cố
export type MucDoNghiemTrong = 'nhe' | 'trung_binh' | 'nghiem_trong' | 'can_cap_cuu';

// 5. Sự kiện y tế học đường
export interface SuKienYTe {
  id: string;
  idHocSinh: string;
  idYTaGhiNhan: string;
  thoiGianXayRa: Date;
  diaDiemXayRa?: string; // Ví dụ: 'Sân trường', 'Lớp học 2B'
  loaiSuCo: LoaiSuCoYTe;
  mucDoNghiemTrong?: MucDoNghiemTrong;
  moTaChiTiet: string;
  bienPhapXuLyBanDau: string; // Y tá đã làm gì
  thuocDaSuDung?: { idThuoc: string; tenThuoc: string; soLuong: number; donVi: string; }[];
  vatTuDaSuDung?: { idVatTu: string; tenVatTu: string; soLuong: number; donVi: string; }[];
  idYeuCauGuiThuocLienQuan?: string; // Nếu sự cố liên quan đến việc cho uống thuốc được gửi
  tinhTrangHocSinhSauXuLy: string; // Ví dụ: 'Đã ổn định', 'Cần theo dõi thêm', 'Đã thông báo phụ huynh đưa về'
  daThongBaoPhuHuynh: boolean;
  thoiGianThongBaoPhuHuynh?: Date;
  ghiChuThemCuaYTa?: string;
  ngayTao: Date;
  ngayCapNhat: Date;
}

// Đơn vị tính cho thuốc/vật tư
export type DonViTinh = 'vien' | 'goi' | 'chai' | 'tuyp' | 'hop' | 'ml' | 'cai' | 'cuon';

// 6. Thuốc (trong kho nhà trường)
export interface Thuoc {
  id: string;
  tenThuoc: string;
  maThuoc?: string; // Mã nội bộ hoặc mã vạch
  hamLuong?: string; // Ví dụ: '250mg', '500mg/5ml'
  donViTinh: DonViTinh; // 'viên', 'chai', 'ống'
  moTaChiTiet?: string;
  soLuongTonKho: number;
  nguongCanhBaoTonKho?: number; // Số lượng tối thiểu trước khi cảnh báo hết hàng
  ngayHetHan?: Date;
  nhaSanXuat?: string;
  ghiChu?: string;
  idNguoiQuanLy: string; // Y tá/Admin chịu trách nhiệm
}

// 7. Vật tư y tế (trong kho nhà trường)
export interface VatTuYTe {
  id: string;
  tenVatTu: string;
  maVatTu?: string;
  donViTinh: DonViTinh; // 'cái', 'hộp', 'cuộn'
  moTaChiTiet?: string;
  soLuongTonKho: number;
  nguongCanhBaoTonKho?: number;
  ngayHetHan?: Date; // Nếu có
  nhaSanXuat?: string;
  ghiChu?: string;
  idNguoiQuanLy: string;
}

// Lý do xuất kho
export type LyDoXuatKho = 'su_dung_cho_su_co_y_te' | 'bo_sung_tu_thuoc_lop' | 'het_han' | 'khac';

// 8. Nhật ký xuất kho (Thuốc hoặc Vật tư)
export interface NhatKyXuatKho {
  id: string;
  idSanPham: string; // id của Thuoc hoặc VatTuYTe
  loaiSanPham: 'thuoc' | 'vat_tu_y_te';
  tenSanPham: string;
  soLuongXuat: number;
  donViTinh: DonViTinh;
  ngayXuat: Date;
  idNguoiXuat: string; // id của NguoiDung (Y tá)
  idSuKienYTeLienQuan?: string; // Nếu xuất cho một sự cố cụ thể
  idChienDichLienQuan?: string; // Nếu xuất cho chiến dịch
  lyDoXuat: LyDoXuatKho;
  ghiChu?: string;
}

// Trạng thái chiến dịch
export type TrangThaiChienDich =
  | 'moi_tao'
  | 'cho_duyet'
  | 'da_duyet'
  | 'da_thong_bao_phu_huynh'
  | 'dang_dien_ra'
  | 'tam_dung'
  | 'hoan_thanh'
  | 'da_huy';

// 9. Chiến dịch tiêm chủng
export interface ChienDichTiemChung {
  id: string;
  tenChienDich: string;
  tenVaccine: string;
  moTaVaccine?: string;
  doiTuongApDung: string; // Ví dụ: 'Học sinh khối 1', 'Toàn trường', 'Học sinh nữ khối 9-12'
  thoiGianDuKienBatDau: Date;
  thoiGianDuKienKetThuc: Date;
  diaDiemTiemChung?: string; // 'Phòng y tế trường', 'Trung tâm Y tế Quận X'
  ghiChuChung?: string; // Lưu ý chung cho phụ huynh và học sinh
  tieuChiThamGia?: string; // Điều kiện để tham gia
  trangThai: TrangThaiChienDich;
  idNguoiTao: string;
  idNguoiDuyet?: string;
  ngayTao: Date;
  ngayDuyet?: Date;
  lyDoHuy?: string;
}

// Trạng thái đăng ký/tham gia của học sinh
export type TrangThaiThamGiaTiemChung =
  | 'chua_dang_ky' // Hoặc chưa có phản hồi từ PH
  | 'da_dong_y' // PH đồng ý (có thể là ngầm định khi HS có mặt)
  | 'da_tu_choi' // PH từ chối
  | 'da_tiem'
  | 'hoan_tiem'
  | 'chong_chi_dinh';

// 10. Đăng ký/Kết quả tiêm chủng của học sinh cho một chiến dịch
export interface KetQuaTiemChungHocSinh {
  id: string;
  idChienDichTiemChung: string;
  idHocSinh: string;
  idPhuHuynh?: string; // Người giám hộ lúc đăng ký/nhận thông báo
  trangThaiThamGia: TrangThaiThamGiaTiemChung;
  ngayDongYHoacTuChoi?: Date;
  ngayTiemThucTe?: Date;
  loVaccine?: string;
  tenCanBoTiem?: string;
  phanUngSauTiem?: string; // Mô tả phản ứng
  ghiChuCuaYTa?: string;
  daGuiThongBaoKetQuaChoPH: boolean;
  ngayGuiThongBaoKetQua?: Date;
}

// 11. Chiến dịch khám sức khỏe định kỳ
export interface ChienDichKhamSucKhoe {
  id: string;
  tenChienDich: string;
  loaiKham: string[]; // Ví dụ: ['Mắt', 'Răng miệng', 'Tai mũi họng', 'Thể lực']
  doiTuongApDung: string; // Ví dụ: 'Học sinh khối 1, 2, 3', 'Toàn trường'
  thoiGianDuKien: Date;
  diaDiemKham?: string; // 'Phòng y tế', 'Hội trường A'
  donViThucHienKham?: string; // 'Đội ngũ y tế trường', 'Bệnh viện XYZ liên kết'
  ghiChuChung?: string;
  trangThai: TrangThaiChienDich;
  idNguoiTao: string;
  idNguoiDuyet?: string;
  ngayTao: Date;
  ngayDuyet?: Date;
  lyDoHuy?: string;
}

// 12. Kết quả khám sức khỏe của học sinh cho một chiến dịch
export interface KetQuaKhamSucKhoeHocSinh {
  id: string;
  idChienDichKhamSucKhoe: string;
  idHocSinh: string;
  ngayKham: Date;
  // Các trường kết quả khám có thể rất đa dạng, dùng một object linh hoạt
  // Ví dụ cho khám mắt: ketQuaChiTiet: { matTrai: '10/10', matPhai: '9/10', benhVeMat: 'Không' }
  // Ví dụ cho khám tổng quát: ketQuaChiTiet: { chieuCao: 150, canNang: 45, huyetAp: '110/70', ... }
  ketQuaChiTiet: Record<string, any>;
  ketLuanTongQuatCuaBacSi: string;
  deNghiCuaBacSi?: string;
  canHenLichTuVan: boolean;
  idBacSiKham?: string; // Hoặc tên bác sĩ
  daGuiThongBaoKetQuaChoPH: boolean;
  ngayGuiThongBaoKetQua?: Date;
}

// Loại thông báo
export type LoaiThongBao =
  | 'he_thong' // Thông báo chung từ hệ thống
  | 'gui_thuoc'
  | 'su_co_y_te'
  | 'tiem_chung_moi'
  | 'tiem_chung_ket_qua'
  | 'kham_suc_khoe_ke_hoach'
  | 'kham_suc_khoe_ket_qua'
  | 'cap_nhat_ho_so_suc_khoe'
  | 'canh_bao_ton_kho'
  | 'nhac_nho_lich_hen';

// 13. Thông báo
export interface ThongBao {
  id: string;
  idNguoiNhan: string; // id của NguoiDung
  tieuDe: string;
  noiDung: string;
  loaiThongBao: LoaiThongBao;
  thoiGianGui: Date;
  trangThaiDoc: 'chua_doc' | 'da_doc';
  linkLienQuan?: string; // Ví dụ: '/yeu-cau-thuoc/123'
  idNguoiGui?: string; // Ai đã gây ra thông báo này (Y tá A, Admin B)
  mucDoQuanTrong?: 'thong_thuong' | 'quan_trong' | 'khan_cap';
}

// Dùng để phân trang API responses
export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}
