import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, CheckCircle, PackageCheck, Pill } from 'lucide-react';
import { YeuCauGuiThuoc, TrangThaiYeuCauThuoc, NguoiDung, HocSinh } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const allMockMedicineRequests: YeuCauGuiThuoc[] = [
  {
    id: 'req001', idHocSinh: 'hs001', idPhuHuynhGui: 'ph001', tenThuoc: 'Panadol Trẻ Em 250mg', hamLuong: '250mg', donViTinh: 'gói', soLuongMoiLanUong: 1, donViUong: 'gói', huongDanSuDung: 'Pha với nước ấm, uống sau ăn no.', thoiGianKeHoachUong: [new Date(Date.now() + 86400000 * 1).toISOString(), new Date(Date.now() + 86400000 * 1 + 6*3600000).toISOString()], lienHeKhanCap: '090xxxxxxx', trangThai: 'moi_tao', ngayTao: new Date(Date.now() - 3600000 * 2).toISOString(), ngayCapNhat: new Date(Date.now() - 3600000 * 2).toISOString(),
    lichSuUongThuoc: [{id: 'ls001', idYeuCauGuiThuoc: 'req001', thoiGianKeHoach: new Date(Date.now() + 86400000 * 1).toISOString(), trangThai: 'chua_den_gio'}]
  },
  {
    id: 'req002', idHocSinh: 'hs002', idPhuHuynhGui: 'ph001', tenThuoc: 'Siro Ho Astex', donViTinh: 'chai', soLuongMoiLanUong: 5, donViUong: 'ml', huongDanSuDung: 'Uống 3 lần/ngày, mỗi lần 5ml.', thoiGianKeHoachUong: [new Date(Date.now() - 86400000 * 1).toISOString()], lienHeKhanCap: '090xxxxxxx', trangThai: 'da_xac_nhan_truong', ngayTao: new Date(Date.now() - 86400000 * 2).toISOString(), ngayCapNhat: new Date(Date.now() - 86400000 * 1).toISOString(),
    lichSuUongThuoc: [{id: 'ls002', idYeuCauGuiThuoc: 'req002', thoiGianKeHoach: new Date(Date.now() - 86400000 * 1).toISOString(), trangThai: 'chua_den_gio'}]
  },
  {
    id: 'req003', idHocSinh: 'hs001', idPhuHuynhGui: 'ph001', tenThuoc: 'Thuốc nhỏ mắt Tobrex', donViTinh: 'lọ', soLuongMoiLanUong: 1, donViUong: 'giọt', duongDung: 'Nhỏ mắt', huongDanSuDung: 'Nhỏ mỗi bên mắt 1 giọt, ngày 2 lần (sáng, chiều).', thoiGianKeHoachUong: [new Date(Date.now() - 86400000 * 3).toISOString()], lienHeKhanCap: '090xxxxxxx', trangThai: 'y_ta_da_nhan_thuoc', ngayTao: new Date(Date.now() - 86400000 * 5).toISOString(), ngayCapNhat: new Date(Date.now() - 86400000 * 3).toISOString(),
    lichSuUongThuoc: [{id: 'ls003', idYeuCauGuiThuoc: 'req003', thoiGianKeHoach: new Date(Date.now() - 86400000 * 3).toISOString(), trangThai: 'chua_den_gio'}]
  },
  {
    id: 'req004', idHocSinh: 'hs003', idPhuHuynhGui: 'ph002', tenThuoc: 'Amoxicillin 250mg', hamLuong: '250mg', donViTinh: 'viên', soLuongMoiLanUong: 1, donViUong: 'viên', huongDanSuDung: 'Uống mỗi 8 tiếng, sau ăn.', thoiGianKeHoachUong: [new Date().toISOString(), new Date(Date.now() + 8 * 3600000).toISOString()], lienHeKhanCap: '091xxxxxxx', trangThai: 'moi_tao', ngayTao: new Date().toISOString(), ngayCapNhat: new Date().toISOString(),
    lichSuUongThuoc: [
      {id: 'ls004a', idYeuCauGuiThuoc: 'req004', thoiGianKeHoach: new Date().toISOString(), trangThai: 'chua_den_gio'},
      {id: 'ls004b', idYeuCauGuiThuoc: 'req004', thoiGianKeHoach: new Date(Date.now() + 8 * 3600000).toISOString(), trangThai: 'chua_den_gio'}
    ]
  },
];

const mockStudents: Record<string, HocSinh> = {
  'hs001': { id: 'hs001', hoTen: 'Nguyễn Văn An', lop: '1A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-05-10T00:00:00.000Z', gioiTinh: 'nam' },
  'hs002': { id: 'hs002', hoTen: 'Trần Thị Bình', lop: '3C', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2014-09-15T00:00:00.000Z', gioiTinh: 'nu' },
  'hs003': { id: 'hs003', hoTen: 'Lê Minh Đức', lop: '2B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph002', ngaySinh: '2015-02-20T00:00:00.000Z', gioiTinh: 'nam' },
};

const mockParents: Record<string, NguoiDung> = {
  'ph001': { id: 'ph001', tenDangNhap: 'phuhuynh', vaiTro: 'phu_huynh', thongTinCaNhan: { hoTen: 'Phụ Huynh Nguyễn Văn A', soDienThoai: '090xxxxxxx' }, idTruongHoc: 'TH001', ngayTao: '', trangThai: 'hoat_dong' },
  'ph002': { id: 'ph002', tenDangNhap: 'phuhuynh2', vaiTro: 'phu_huynh', thongTinCaNhan: { hoTen: 'Phụ Huynh Lê Thị C', soDienThoai: '091xxxxxxx' }, idTruongHoc: 'TH001', ngayTao: '', trangThai: 'hoat_dong' },
};

const getStatusLabel = (status: TrangThaiYeuCauThuoc): string => {
  const labels: Record<TrangThaiYeuCauThuoc, string> = {
    moi_tao: 'Mới tạo', da_xac_nhan_truong: 'Đã xác nhận', phu_huynh_da_gui_thuoc: 'PH đã gửi', y_ta_da_nhan_thuoc: 'Đã nhận thuốc',
    dang_cho_uong: 'Đang chờ uống', da_cho_uong_mot_phan: 'Đã cho uống (1 phần)', hoan_thanh: 'Hoàn thành', da_huy: 'Đã hủy', tu_choi: 'Từ chối',
  };
  return labels[status] || 'Không rõ';
};

const getStatusColor = (status: TrangThaiYeuCauThuoc): string => {
  switch (status) {
    case 'moi_tao': return 'bg-blue-500';
    case 'da_xac_nhan_truong': return 'bg-yellow-600';
    case 'y_ta_da_nhan_thuoc': return 'bg-teal-500';
    case 'dang_cho_uong': return 'bg-purple-500';
    case 'da_cho_uong_mot_phan': return 'bg-indigo-500';
    case 'hoan_thanh': return 'bg-green-500';
    case 'da_huy': case 'tu_choi': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const ManageMedicineRequestsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState<YeuCauGuiThuoc[]>(allMockMedicineRequests);
  const [selectedRequest, setSelectedRequest] = useState<YeuCauGuiThuoc | null>(null);
  const [filterStatus, setFilterStatus] = useState<TrangThaiYeuCauThuoc | 'all'>('all');

  const handleUpdateRequestStatus = (reqId: string, newStatus: TrangThaiYeuCauThuoc, yTaId?: string) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === reqId ? { ...req, trangThai: newStatus, idYTaXuLy: yTaId || req.idYTaXuLy, ngayCapNhat: new Date().toISOString() } : req
      )
    );
    console.log(`Request ${reqId} status updated to ${newStatus}. Notifying parent ${requests.find(r=>r.id===reqId)?.idPhuHuynhGui}`);
    setSelectedRequest(prev => prev && prev.id === reqId ? {...prev, trangThai: newStatus, idYTaXuLy: yTaId || prev.idYTaXuLy, ngayCapNhat: new Date().toISOString()} : prev);
  };

  const handleRecordAdministration = (reqId: string, scheduleItemId: string, yTaId: string) => {
     setRequests(prevRequests => {
        return prevRequests.map(req => {
            if (req.id === reqId) {
                const updatedLichSu = req.lichSuUongThuoc?.map(ls =>
                    ls.id === scheduleItemId ? {...ls, trangThai: 'da_cho_uong', idYTaChoUong: yTaId, thoiGianThucTe: new Date().toISOString()} : ls
                );
                const allAdministered = updatedLichSu?.every(ls => ls.trangThai === 'da_cho_uong');
                const newStatus = allAdministered ? 'hoan_thanh' : 'da_cho_uong_mot_phan';
                console.log(`Request ${reqId}, item ${scheduleItemId} administered. New status ${newStatus}`);
                return { ...req, lichSuUongThuoc: updatedLichSu, trangThai: newStatus, ngayCapNhat: new Date().toISOString() };
            }
            return req;
        });
    });
     setSelectedRequest(prev => {
        if (!prev || prev.id !== reqId) return prev;
        const updatedLichSu = prev.lichSuUongThuoc?.map(ls =>
            ls.id === scheduleItemId ? {...ls, trangThai: 'da_cho_uong', idYTaChoUong: yTaId, thoiGianThucTe: new Date().toISOString()} : ls
        );
        const allAdministered = updatedLichSu?.every(ls => ls.trangThai === 'da_cho_uong');
        const newStatus = allAdministered ? 'hoan_thanh' : 'da_cho_uong_mot_phan';
        return { ...prev, lichSuUongThuoc: updatedLichSu, trangThai: newStatus, ngayCapNhat: new Date().toISOString() };
     });
  };

  const filteredRequests = filterStatus === 'all' ? requests : requests.filter(req => req.trangThai === filterStatus);

  if (!currentUser || (currentUser.vaiTro !== 'y_ta' && currentUser.vaiTro !== 'admin')) {
     return <div className='p-6 text-red-500'>Bạn không có quyền truy cập vào trang này.</div>;
  }

  const RequestDetailsModal: React.FC<{ request: YeuCauGuiThuoc; onClose: () => void; onUpdateStatus: Function; onAdminister: Function; currentYTa: NguoiDung }> =
    ({ request, onClose, onUpdateStatus, onAdminister, currentYTa }) => {
    const student = mockStudents[request.idHocSinh];
    const parent = mockParents[request.idPhuHuynhGui];
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
        <div className='bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
          <h3 className='text-2xl font-semibold text-blue-700 mb-4'>Chi Tiết Yêu Cầu Gửi Thuốc (ID: {request.id})</h3>
          <p><strong>Học sinh:</strong> {student?.hoTen || 'N/A'} - Lớp: {student?.lop || 'N/A'}</p>
          <p><strong>Phụ huynh:</strong> {parent?.thongTinCaNhan.hoTen || 'N/A'} - SĐT: {parent?.thongTinCaNhan.soDienThoai || request.lienHeKhanCap}</p>
          <p><strong>Tên thuốc:</strong> {request.tenThuoc} ({request.hamLuong}) - {request.soLuongMoiLanUong} {request.donViUong} / lần</p>
          <p><strong>Đường dùng:</strong> {request.duongDung || 'Uống'}</p>
          <p><strong>Hướng dẫn:</strong> {request.huongDanSuDung}</p>
          <p><strong>Đơn thuốc:</strong> {request.donThuocUrl ? <a href={request.donThuocUrl} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>Xem đơn</a> : 'Không có'}</p>
          <p><strong>Ghi chú PH:</strong> {request.ghiChuPhuHuynh || 'Không có'}</p>
          <p><strong>Trạng thái hiện tại:</strong> <span className={`font-semibold ${getStatusColor(request.trangThai).replace('bg-', 'text-')}`}>{getStatusLabel(request.trangThai)}</span></p>

          <div className='my-4 border-t pt-4'>
            <h4 className='text-lg font-semibold mb-2'>Lịch sử cho uống:</h4>
            {request.lichSuUongThuoc && request.lichSuUongThuoc.length > 0 ? (
              <ul className='space-y-2 text-sm'>
                {request.lichSuUongThuoc.map(ls => (
                  <li key={ls.id} className='p-2 border rounded-md'>
                    <p>Thời gian kế hoạch: {new Date(ls.thoiGianKeHoach).toLocaleString('vi-VN')}</p>
                    <p>Trạng thái: {ls.trangThai === 'da_cho_uong' ? `Đã cho uống lúc ${ls.thoiGianThucTe ? new Date(ls.thoiGianThucTe).toLocaleString('vi-VN') : ''} (Y tá ID: ${ls.idYTaChoUong})` : ls.trangThai === 'chua_den_gio' ? 'Chưa đến giờ' : 'Bỏ lỡ/Có vấn đề'}</p>
                    {ls.trangThai === 'chua_den_gio' && request.trangThai === 'y_ta_da_nhan_thuoc' && new Date(ls.thoiGianKeHoach) < new Date(Date.now() + 24*3600*1000) && (
                       <button
                        onClick={() => onAdminister(request.id, ls.id, currentYTa.id)}
                        className='mt-1 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 text-xs flex items-center'>
                        <Pill size={14} className='mr-1'/> Ghi nhận đã cho uống
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : <p className='text-sm text-gray-500'>Chưa có lịch sử.</p>}
          </div>

          <div className='mt-6 space-x-2 text-right border-t pt-4'>
            {request.trangThai === 'moi_tao' && (
              <button onClick={() => onUpdateStatus(request.id, 'da_xac_nhan_truong', currentYTa.id)} className='bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600 flex items-center inline-flex'><CheckCircle size={16} className='mr-1'/> Xác nhận Yêu Cầu</button>
            )}
            {request.trangThai === 'da_xac_nhan_truong' && (
              <button onClick={() => onUpdateStatus(request.id, 'y_ta_da_nhan_thuoc', currentYTa.id)} className='bg-teal-500 text-white py-2 px-3 rounded hover:bg-teal-600 flex items-center inline-flex'><PackageCheck size={16} className='mr-1'/> Xác Nhận Đã Nhận Thuốc</button>
            )}
             <button onClick={onClose} className='bg-gray-300 text-gray-800 py-2 px-3 rounded hover:bg-gray-400'>Đóng</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-between items-center mb-6 border-b pb-3'>
        <h2 className='text-3xl font-semibold text-blue-700'>Quản Lý Yêu Cầu Gửi Thuốc</h2>
        <div>
          <label htmlFor='statusFilter' className='text-sm mr-2'>Lọc theo trạng thái:</label>
          <select
            id='statusFilter'
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as TrangThaiYeuCauThuoc | 'all')}
            className='p-2 border rounded-md text-sm'
          >
            <option value='all'>Tất cả</option>
            <option value='moi_tao'>Mới tạo</option>
            <option value='da_xac_nhan_truong'>Đã xác nhận</option>
            <option value='y_ta_da_nhan_thuoc'>Đã nhận thuốc</option>
            <option value='dang_cho_uong'>Đang chờ uống</option>
            <option value='da_cho_uong_mot_phan'>Đã cho uống (1 phần)</option>
            <option value='hoan_thanh'>Hoàn thành</option>
            <option value='da_huy'>Đã hủy</option>
            <option value='tu_choi'>Từ chối</option>
          </select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <p className='text-gray-600'>Không có yêu cầu nào phù hợp.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Học Sinh</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tên Thuốc</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Ngày Gửi</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Trạng Thái</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Hành động</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredRequests.map((req) => {
                const student = mockStudents[req.idHocSinh];
                return (
                  <tr key={req.id} className='hover:bg-gray-50'>
                    <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-700'>{student?.hoTen || req.idHocSinh}</td>
                    <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-700'>{req.tenThuoc}</td>
                    <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'>{new Date(req.ngayTao).toLocaleDateString('vi-VN')}</td>
                    <td className='px-4 py-3 whitespace-nowrap'>
                      <span className={`text-xs font-medium text-white px-2 py-1 rounded-full ${getStatusColor(req.trangThai)}`}>
                        {getStatusLabel(req.trangThai)}
                      </span>
                    </td>
                    <td className='px-4 py-3 whitespace-nowrap text-sm'>
                      <button onClick={() => setSelectedRequest(req)} className='text-blue-600 hover:text-blue-800 flex items-center'>
                        <Eye size={16} className='mr-1'/> Xem/Xử lý
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {selectedRequest && currentUser && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdateStatus={handleUpdateRequestStatus}
          onAdminister={handleRecordAdministration}
          currentYTa={currentUser}
        />
      )}
    </div>
  );
};

export default ManageMedicineRequestsPage;
