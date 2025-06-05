import { Thuoc, VatTuYTe, NhatKyXuatKho, DonViTinh, LyDoXuatKho } from '../types';

export let mockSchoolMedicines: Thuoc[] = [
  { id: 'thuoc001', tenThuoc: 'Paracetamol 250mg', maThuoc: 'PARA250', hamLuong: '250mg', donViTinh: 'gói', soLuongTonKho: 100, nguongCanhBaoTonKho: 20, idNguoiQuanLy: 'yta001', moTaChiTiet: 'Hạ sốt, giảm đau cho trẻ em' },
  { id: 'thuoc002', tenThuoc: 'Betadine Sát Khuẩn', maThuoc: 'BETA01', donViTinh: 'chai', soLuongTonKho: 50, nguongCanhBaoTonKho: 10, idNguoiQuanLy: 'yta001', moTaChiTiet: 'Dung dịch sát khuẩn vết thương' },
  { id: 'thuoc003', tenThuoc: 'Nước muối sinh lý 0.9%', maThuoc: 'NACL09', donViTinh: 'chai', soLuongTonKho: 200, nguongCanhBaoTonKho: 50, idNguoiQuanLy: 'yta001', moTaChiTiet: 'Rửa mắt, rửa mũi' },
  { id: 'thuoc004', tenThuoc: 'Amoxicillin 500mg', maThuoc: 'AMOX500', hamLuong: '500mg', donViTinh: 'viên', soLuongTonKho: 75, nguongCanhBaoTonKho: 15, idNguoiQuanLy: 'yta001', moTaChiTiet: 'Kháng sinh' },
];

export let mockSchoolSupplies: VatTuYTe[] = [
  { id: 'vt001', tenVatTu: 'Băng gạc cá nhân Urgo', maVatTu: 'URGO01', donViTinh: 'hộp', soLuongTonKho: 100, nguongCanhBaoTonKho: 20, idNguoiQuanLy: 'yta001', moTaChiTiet: 'Hộp 100 miếng' },
  { id: 'vt002', tenVatTu: 'Bông y tế Bạch Tuyết', maVatTu: 'BONG01', donViTinh: 'gói', soLuongTonKho: 50, nguongCanhBaoTonKho: 10, idNguoiQuanLy: 'yta001', moTaChiTiet: 'Gói 50g' },
  { id: 'vt003', tenVatTu: 'Nhiệt kế điện tử Omron', maVatTu: 'NKOM01', donViTinh: 'cái', soLuongTonKho: 10, nguongCanhBaoTonKho: 2, idNguoiQuanLy: 'yta001' },
  { id: 'vt004', tenVatTu: 'Gạc cuộn y tế', maVatTu: 'GAC01', donViTinh: 'cuộn', soLuongTonKho: 30, nguongCanhBaoTonKho: 5, idNguoiQuanLy: 'yta001', moTaChiTiet: 'Size M' },
];

export let mockInventoryLog: NhatKyXuatKho[] = [
  { id: 'log001', idSanPham: 'thuoc001', loaiSanPham: 'thuoc', tenSanPham: 'Paracetamol 250mg', soLuongXuat: 2, donViTinh: 'gói', ngayXuat: new Date(Date.now() - 3600000 * 5).toISOString(), idNguoiXuat: 'yta001', lyDoXuat: 'su_dung_cho_su_co_y_te', idSuKienYTeLienQuan: 'skyt_example01', ghiChu: 'Cho học sinh An lớp 1A bị sốt' },
  { id: 'log002', idSanPham: 'vt001', loaiSanPham: 'vat_tu_y_te', tenSanPham: 'Băng gạc cá nhân Urgo', soLuongXuat: 5, donViTinh: 'cái', ngayXuat: new Date(Date.now() - 3600000 * 3).toISOString(), idNguoiXuat: 'yta001', lyDoXuat: 'su_dung_cho_su_co_y_te', idSuKienYTeLienQuan: 'skyt_example02', ghiChu: 'Sơ cứu cho học sinh Bình lớp 2B' },
];

// Functions to update mock data (simulating backend)
export const updateMockMedicineStock = (id: string, quantityChange: number, reason: LyDoXuatKho, eventId?: string, userId?: string) => {
  const medicine = mockSchoolMedicines.find(m => m.id === id);
  if (medicine) {
    medicine.soLuongTonKho += quantityChange; // quantityChange is negative for issuance
    mockInventoryLog.unshift({
      id: 'log' + Date.now(),
      idSanPham: id,
      loaiSanPham: 'thuoc',
      tenSanPham: medicine.tenThuoc,
      soLuongXuat: Math.abs(quantityChange),
      donViTinh: medicine.donViTinh,
      ngayXuat: new Date().toISOString(),
      idNguoiXuat: userId || 'yta_unknown',
      lyDoXuat: reason,
      idSuKienYTeLienQuan: eventId,
      ghiChu: quantityChange < 0 ? \`Xuất \${reason}\` : \`Nhập \${reason}\`
    });
    return true;
  }
  return false;
};

export const updateMockSupplyStock = (id: string, quantityChange: number, reason: LyDoXuatKho, eventId?: string, userId?: string) => {
  const supply = mockSchoolSupplies.find(s => s.id === id);
  if (supply) {
    supply.soLuongTonKho += quantityChange;
     mockInventoryLog.unshift({
      id: 'log' + Date.now(),
      idSanPham: id,
      loaiSanPham: 'vat_tu_y_te',
      tenSanPham: supply.tenVatTu,
      soLuongXuat: Math.abs(quantityChange),
      donViTinh: supply.donViTinh,
      ngayXuat: new Date().toISOString(),
      idNguoiXuat: userId || 'yta_unknown',
      lyDoXuat: reason,
      idSuKienYTeLienQuan: eventId,
      ghiChu: quantityChange < 0 ? \`Xuất \${reason}\` : \`Nhập \${reason}\`
    });
    return true;
  }
  return false;
};
