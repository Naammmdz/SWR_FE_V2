import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

// Mock data for SuKienYTe - replace with actual data fetching
const mockHealthEvents: any[] = [
    { id: 'skyt001', idHocSinh: 'hs001', tenHocSinh: 'Nguyễn Văn An', loaiSuCo: 'Sốt', ngayTao: new Date().toISOString(), nguoiGhiNhan: 'Y Tá A' },
    { id: 'skyt002', idHocSinh: 'hs002', tenHocSinh: 'Trần Thị Bình', loaiSuCo: 'Té ngã', ngayTao: new Date(Date.now() - 86400000).toISOString(), nguoiGhiNhan: 'Y Tá A' },
];

const HealthEventsListPage: React.FC = () => {
  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-between items-center mb-6 border-b pb-3'>
        <h2 className='text-3xl font-semibold text-blue-700'>Danh Sách Sự Cố Y Tế</h2>
        <Link
          to='/y-ta/su-co-y-te' // Link to the form page
          className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center'
        >
          <PlusCircle size={20} className='mr-2' /> Ghi nhận sự cố mới
        </Link>
      </div>
      {mockHealthEvents.length === 0 ? (
        <p className='text-gray-600'>Chưa có sự cố y tế nào được ghi nhận.</p>
      ) : (
        <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID Sự Cố</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Học Sinh</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Loại Sự Cố</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Ngày Ghi Nhận</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Người Ghi Nhận</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Hành Động</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {mockHealthEvents.map((event) => (
                <tr key={event.id} className='hover:bg-gray-50'>
                    <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-700'>{event.id}</td>
                    <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-700'>{event.tenHocSinh}</td>
                    <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-700'>{event.loaiSuCo}</td>
                    <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'>{new Date(event.ngayTao).toLocaleDateString('vi-VN')}</td>
                    <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'>{event.nguoiGhiNhan}</td>
                    <td className='px-4 py-3 whitespace-nowrap text-sm'>
                      <Link to={`/y-ta/su-co-y-te/chi-tiet/${event.id}`} className='text-blue-600 hover:underline'>Xem chi tiết</Link>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
    </div>
  );
};
export default HealthEventsListPage;
