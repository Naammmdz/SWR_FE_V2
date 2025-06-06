// src/types/index.ts - Attempt 3

export type VaiTroNguoiDung = 'phu_huynh' | 'y_ta' | 'admin';

export interface ThongTinCaNhan {
  hoTen: string;
  email?: string;
  soDienThoai?: string;
  diaChi?: string;
}

export interface NguoiDung {
  id: string;
  tenDangNhap: string;
  matKhauHash?: string;
  vaiTro: VaiTroNguoiDung;
  thongTinCaNhan: ThongTinCaNhan;
  idTruongHoc: string;
  ngayTao: string; // ISO Date string
  trangThai: 'hoat_dong' | 'khoa';
}

export interface HocSinh {
  id: string;
  hoTen: string;
  maHocSinh?: string;
  ngaySinh: string; // ISO Date string
  gioiTinh: 'nam' | 'nu' | 'khac';
  lop: string;
  idTruongHoc: string;
  idNguoiGiamHoChinh: string;
  cacNguoiGiamHoKhacIds?: string[];
  idHoSoSucKhoe?: string;
  anhDaiDienUrl?: string;
  ghiChu?: string;
}

export interface ThongTinTiemChung {
  tenVaccine: string;
  ngayTiem: string; // ISO Date string
  lieuLuong?: string;
  ghiChu?: string;
}

export interface HoSoSucKhoe {
  id: string;
  idHocSinh: string;
  nhomMau?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  diUng?: string[];
  benhManTinh?: string[];
  tienSuDieuTri?: string;
  thiLuc?: {
    matTrai?: string;
    matPhai?: string;
    ngayKham?: string; // ISO Date string
    ghiChu?: string;
  };
  thinhLuc?: {
    taiTrai?: string;
    taiPhai?: string;
    ngayKham?: string; // ISO Date string
    ghiChu?: string;
  };
  tiemChung?: ThongTinTiemChung[];
  ghiChuKhac?: string;
  ngayCapNhatCuoi: string; // ISO Date string
  idNguoiCapNhatCuoi: string;
}

export type TrangThaiYeuCauThuoc =
  | 'moi_tao'
  | 'da_xac_nhan_truong'
  | 'phu_huynh_da_gui_thuoc'
  | 'y_ta_da_nhan_thuoc'
  | 'dang_cho_uong'
  | 'da_cho_uong_mot_phan'
  | 'hoan_thanh'
  | 'da_huy'
  | 'tu_choi';

export interface LichSuChoUongThuoc {
  id: string;
  idYeuCauGuiThuoc: string;
  thoiGianKeHoach: string; // ISO Date string
  thoiGianThucTe?: string; // ISO Date string
  idYTaChoUong?: string;
  ghiChuYTa?: string;
  trangThai: 'chua_den_gio' | 'da_cho_uong' | 'bo_lo' | 'co_van_de';
}

export interface YeuCauGuiThuoc {
  id: string;
  idHocSinh: string;
  idPhuHuynhGui: string;
  tenThuoc: string;
  hamLuong?: string;
  donViTinh: string;
  soLuongMoiLanUong: number;
  donViUong: string;
  duongDung?: string;
  huongDanSuDung: string;
  thoiGianKeHoachUong: string[]; // Array of ISO Date strings
  lichSuUongThuoc?: LichSuChoUongThuoc[];
  donThuocUrl?: string;
  ghiChuPhuHuynh?: string;
  lienHeKhanCap: string;
  trangThai: TrangThaiYeuCauThuoc;
  idYTaXuLy?: string;
  lyDoHuyHoacTuChoi?: string;
  ngayTao: string; // ISO Date string
  ngayCapNhat: string; // ISO Date string
}

export type LoaiSuCoYTe =
  | 'tai_nan_nhe'
  | 'sot'
  | 'dau_bung'
  | 'non_mua'
  | 'te_nga'
  | 'di_ung_nhe'
  | 'benh_thong_thuong'
  | 'can_theo_doi_dac_biet'
  | 'tai_nan_can_can_thiep_y_te'
  | 'benh_lay_nhiem_nghi_ngo'
  | 'khac';

export type MucDoNghiemTrong = 'nhe' | 'trung_binh' | 'nghiem_trong' | 'can_cap_cuu';

export interface SuKienYTe {
  id: string;
  idHocSinh: string;
  idYTaGhiNhan: string;
  thoiGianXayRa: string; // ISO Date string
  diaDiemXayRa?: string;
  loaiSuCo: LoaiSuCoYTe;
  mucDoNghiemTrong?: MucDoNghiemTrong;
  moTaChiTiet: string;
  bienPhapXuLyBanDau: string;
  thuocDaSuDung?: { idThuoc: string; tenThuoc: string; soLuong: number; donVi: string; }[];
  vatTuDaSuDung?: { idVatTu: string; tenVatTu: string; soLuong: number; donVi: string; }[];
  idYeuCauGuiThuocLienQuan?: string;
  tinhTrangHocSinhSauXuLy: string;
  daThongBaoPhuHuynh: boolean;
  thoiGianThongBaoPhuHuynh?: string; // ISO Date string
  ghiChuThemCuaYTa?: string;
  ngayTao: string; // ISO Date string
  ngayCapNhat: string; // ISO Date string
}

export type DonViTinh = 'vien' | 'goi' | 'chai' | 'tuyp' | 'hop' | 'ml' | 'cai' | 'cuon';

export interface Thuoc {
  id: string;
  tenThuoc: string;
  maThuoc?: string;
  hamLuong?: string;
  donViTinh: DonViTinh;
  moTaChiTiet?: string;
  soLuongTonKho: number;
  nguongCanhBaoTonKho?: number;
  ngayHetHan?: string; // ISO Date string
  nhaSanXuat?: string;
  ghiChu?: string;
  idNguoiQuanLy: string;
}

export interface VatTuYTe {
  id: string;
  tenVatTu: string;
  maVatTu?: string;
  donViTinh: DonViTinh;
  moTaChiTiet?: string;
  soLuongTonKho: number;
  nguongCanhBaoTonKho?: number;
  ngayHetHan?: string; // ISO Date string
  nhaSanXuat?: string;
  ghiChu?: string;
  idNguoiQuanLy: string;
}

export type LyDoXuatKho = 'su_dung_cho_su_co_y_te' | 'bo_sung_tu_thuoc_lop' | 'het_han' | 'khac';

export interface NhatKyXuatKho {
  id: string;
  idSanPham: string;
  loaiSanPham: 'thuoc' | 'vat_tu_y_te';
  tenSanPham: string;
  soLuongXuat: number;
  donViTinh: DonViTinh;
  ngayXuat: string; // ISO Date string
  idNguoiXuat: string;
  idSuKienYTeLienQuan?: string;
  idChienDichLienQuan?: string;
  lyDoXuat: LyDoXuatKho;
  ghiChu?: string;
}

export type TrangThaiChienDich =
  | 'moi_tao'
  | 'cho_duyet'
  | 'da_duyet'
  | 'da_thong_bao_phu_huynh'
  | 'dang_dien_ra'
  | 'tam_dung'
  | 'hoan_thanh'
  | 'da_huy';

export interface ChienDichTiemChung {
  id: string;
  tenChienDich: string;
  tenVaccine: string;
  moTaVaccine?: string;
  doiTuongApDung: string;
  thoiGianDuKienBatDau: string; // ISO Date string
  thoiGianDuKienKetThuc: string; // ISO Date string
  diaDiemTiemChung?: string;
  ghiChuChung?: string;
  tieuChiThamGia?: string;
  trangThai: TrangThaiChienDich;
  idNguoiTao: string;
  idNguoiDuyet?: string;
  ngayTao: string; // ISO Date string
  ngayDuyet?: string; // ISO Date string
  lyDoHuy?: string;
}

export type TrangThaiThamGiaTiemChung =
  | 'chua_dang_ky'
  | 'da_dong_y'
  | 'da_tu_choi'
  | 'da_tiem'
  | 'hoan_tiem'
  | 'chong_chi_dinh';

export interface KetQuaTiemChungHocSinh {
  id: string;
  idChienDichTiemChung: string;
  idHocSinh: string;
  idPhuHuynh?: string;
  trangThaiThamGia: TrangThaiThamGiaTiemChung;
  ngayDongYHoacTuChoi?: string; // ISO Date string
  ngayTiemThucTe?: string; // ISO Date string
  loVaccine?: string;
  tenCanBoTiem?: string;
  phanUngSauTiem?: string;
  ghiChuCuaYTa?: string;
  daGuiThongBaoKetQuaChoPH: boolean;
  ngayGuiThongBaoKetQua?: string; // ISO Date string
}

export interface ChienDichKhamSucKhoe {
  id: string;
  tenChienDich: string;
  loaiKham: string[];
  doiTuongApDung: string;
  thoiGianDuKien: string; // ISO Date string
  diaDiemKham?: string;
  donViThucHienKham?: string;
  ghiChuChung?: string;
  trangThai: TrangThaiChienDich;
  idNguoiTao: string;
  idNguoiDuyet?: string;
  ngayTao: string; // ISO Date string
  ngayDuyet?: string; // ISO Date string
  lyDoHuy?: string;
}

export interface KetQuaKhamSucKhoeHocSinh {
  id: string;
  idChienDichKhamSucKhoe: string;
  idHocSinh: string;
  ngayKham: string; // ISO Date string
  ketQuaChiTiet: Record<string, any>;
  ketLuanTongQuatCuaBacSi: string;
  deNghiCuaBacSi?: string;
  canHenLichTuVan: boolean;
  idBacSiKham?: string;
  daGuiThongBaoKetQuaChoPH: boolean;
  ngayGuiThongBaoKetQua?: string; // ISO Date string
}

export type LoaiThongBao =
  | 'he_thong'
  | 'gui_thuoc'
  | 'su_co_y_te'
  | 'tiem_chung_moi'
  | 'tiem_chung_ket_qua'
  | 'kham_suc_khoe_ke_hoach'
  | 'kham_suc_khoe_ket_qua'
  | 'cap_nhat_ho_so_suc_khoe'
  | 'canh_bao_ton_kho'
  | 'nhac_nho_lich_hen';

export interface ThongBao {
  id: string;
  idNguoiNhan: string;
  tieuDe: string;
  noiDung: string;
  loaiThongBao: LoaiThongBao;
  thoiGianGui: string; // ISO Date string
  trangThaiDoc: 'chua_doc' | 'da_doc';
  linkLienQuan?: string;
  idNguoiGui?: string;
  mucDoQuanTrong?: 'thong_thuong' | 'quan_trong' | 'khan_cap';
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}
