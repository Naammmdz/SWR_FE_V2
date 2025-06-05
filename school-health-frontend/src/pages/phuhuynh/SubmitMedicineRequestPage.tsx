import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Eye } from 'lucide-react';
import { YeuCauGuiThuoc, TrangThaiYeuCauThuoc } from '../../types'; // Assuming types are defined
import { useAuth } from '../../contexts/AuthContext'; // To get current user (parent)

// Mock data for initial display
const mockMedicineRequests: YeuCauGuiThuoc[] = [
  {
    id: 'req001',
    idHocSinh: 'hs001', // Link to a student
    idPhuHuynhGui: 'ph001', // Link to parent
    tenThuoc: 'Panadol Trẻ Em',
    hamLuong: '250mg',
    donViTinh: 'gói',
    soLuongMoiLanUong: 1,
    donViUong: 'gói',
    huongDanSuDung: 'Pha với nước ấm, uống sau ăn no.',
    thoiGianKeHoachUong: [new Date(Date.now() + 86400000 * 1).toISOString(), new Date(Date.now() + 86400000 * 1 + 6*3600000).toISOString()], // Tomorrow 8AM and 2PM
    lienHeKhanCap: '090xxxxxxx',
    trangThai: 'moi_tao',
    ngayTao: new Date().toISOString(),
    ngayCapNhat: new Date().toISOString(),
  },
  {
    id: 'req002',
    idHocSinh: 'hs002',
    idPhuHuynhGui: 'ph001',
    tenThuoc: 'Siro Ho Astex',
    donViTinh: 'chai',
    soLuongMoiLanUong: 5,
    donViUong: 'ml',
    huongDanSuDung: 'Uống 3 lần/ngày, mỗi lần 5ml.',
    thoiGianKeHoachUong: [new Date(Date.now() - 86400000 * 1).toISOString()], // Yesterday
    lienHeKhanCap: '090xxxxxxx',
    trangThai: 'da_xac_nhan_truong',
    ngayTao: new Date(Date.now() - 86400000 * 2).toISOString(),
    ngayCapNhat: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'req003',
    idHocSinh: 'hs001',
    idPhuHuynhGui: 'ph001',
    tenThuoc: 'Thuốc nhỏ mắt Tobrex',
    donViTinh: 'lọ',
    soLuongMoiLanUong: 1,
    donViUong: 'giọt',
    duongDung: 'Nhỏ mắt',
    huongDanSuDung: 'Nhỏ mỗi bên mắt 1 giọt, ngày 2 lần (sáng, chiều).',
    thoiGianKeHoachUong: [new Date(Date.now() - 86400000 * 3).toISOString()],
    lienHeKhanCap: '090xxxxxxx',
    trangThai: 'hoan_thanh',
    ngayTao: new Date(Date.now() - 86400000 * 5).toISOString(),
    ngayCapNhat: new Date(Date.now() - 86400000 * 3).toISOString(),
  }
];

// Helper to get Vietnamese status
const getStatusLabel = (status: TrangThaiYeuCauThuoc): string => {
  const labels: Record<TrangThaiYeuCauThuoc, string> = {
    moi_tao: 'Mới tạo',
    da_xac_nhan_truong: 'Trường đã xác nhận',
    phu_huynh_da_gui_thuoc: 'Phụ huynh đã gửi',
    y_ta_da_nhan_thuoc: 'Y tá đã nhận',
    dang_cho_uong: 'Đang chờ uống',
    da_cho_uong_mot_phan: 'Đã cho uống một phần',
    hoan_thanh: 'Hoàn thành',
    da_huy: 'Đã hủy',
    tu_choi: 'Bị từ chối',
  };
  return labels[status] || 'Không rõ';
};

const getStatusColor = (status: TrangThaiYeuCauThuoc): string => {
  switch (status) {
    case 'moi_tao': return 'bg-blue-500';
    case 'da_xac_nhan_truong': return 'bg-yellow-500';
    case 'y_ta_da_nhan_thuoc': return 'bg-teal-500';
    case 'hoan_thanh': return 'bg-green-500';
    case 'da_huy':
    case 'tu_choi': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
}


const SubmitMedicineRequestPage: React.FC = () => {
  const { currentUser } = useAuth();
  // In a real app, fetch requests for the current user
  const [requests, setRequests] = useState<YeuCauGuiThuoc[]>(mockMedicineRequests.filter(r => r.idPhuHuynhGui === (currentUser?.id || 'ph001')));

  // Add new request (this would be handled by the form submission later)
  // For now, this function is not used here but in the Create page.
  const addRequest = (newRequest: YeuCauGuiThuoc) => {
    setRequests(prev => [newRequest, ...prev]);
  };

  if (!currentUser || currentUser.vaiTro !== 'phu_huynh') {
     return <div className='p-6 text-red-500'>Bạn không có quyền truy cập vào trang này.</div>;
  }

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-between items-center mb-6 border-b pb-3'>
        <h2 className='text-3xl font-semibold text-blue-700'>Yêu Cầu Gửi Thuốc Của Tôi</h2>
        <Link
          to='/phu-huynh/gui-thuoc/tao-moi'
          className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center'
        >
          <PlusCircle size={20} className='mr-2' /> Tạo yêu cầu mới
        </Link>
      </div>

      {requests.length === 0 ? (
        <p className='text-gray-600'>Bạn chưa có yêu cầu gửi thuốc nào.</p>
      ) : (
        <div className='space-y-4'>
          {requests.map((req) => (
            <div key={req.id} className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'>
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-800'>{req.tenThuoc}</h3>
                  <p className='text-sm text-gray-500'>Học sinh ID: {req.idHocSinh} (Sẽ thay bằng tên HS)</p>
                  <p className='text-sm text-gray-500'>Ngày tạo: {new Date(req.ngayTao).toLocaleDateString('vi-VN')}</p>
                </div>
                <span className={`text-xs font-medium text-white px-3 py-1 rounded-full ${getStatusColor(req.trangThai)}`}>
                  {getStatusLabel(req.trangThai)}
                </span>
              </div>
              <p className='text-gray-700 mt-2 text-sm'>Hướng dẫn: {req.huongDanSuDung.substring(0,100)}...</p>
              <div className='mt-3 text-right'>
                <Link to={`/phu-huynh/gui-thuoc/chi-tiet/${req.id}`} className='text-blue-600 hover:underline text-sm flex items-center justify-end'>
                  <Eye size={16} className='mr-1'/> Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmitMedicineRequestPage;
