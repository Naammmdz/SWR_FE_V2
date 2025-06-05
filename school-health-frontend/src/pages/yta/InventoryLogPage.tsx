import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListOrdered, ArrowLeft } from 'lucide-react';
import { NhatKyXuatKho } from '../../types';
import { mockInventoryLog } from '../../data/mockInventory'; // Assuming logs are also in mockInventory

const InventoryLogPage: React.FC = () => {
  const [logs, setLogs] = useState<NhatKyXuatKho[]>(mockInventoryLog);

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-between items-center mb-6 border-b pb-3'>
        <h2 className='text-3xl font-semibold text-blue-700 flex items-center'><ListOrdered className='mr-2'/>Lịch Sử Xuất/Nhập Kho</h2>
        <Link to='/y-ta/kho-thuoc-vat-tu' className='text-sm text-blue-600 hover:underline flex items-center'>
          <ArrowLeft size={18} className='mr-1'/> Quay lại quản lý kho
        </Link>
      </div>

      {logs.length === 0 ? (
        <p className='text-gray-600'>Chưa có nhật ký xuất/nhập kho nào.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='th-cell'>Ngày</th>
                <th className='th-cell'>Tên Sản Phẩm</th>
                <th className='th-cell'>Loại</th>
                <th className='th-cell text-center'>Số Lượng</th>
                <th className='th-cell'>ĐVT</th>
                <th className='th-cell'>Người Thực Hiện</th>
                <th className='th-cell'>Lý Do</th>
                <th className='th-cell'>Sự kiện YT (nếu có)</th>
                <th className='th-cell'>Ghi Chú</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {logs.map(log => (
                <tr key={log.id} className='hover:bg-gray-50'>
                  <td className='td-cell'>{new Date(log.ngayXuat).toLocaleString('vi-VN')}</td>
                  <td className='td-cell font-medium'>{log.tenSanPham}</td>
                  <td className='td-cell'>{log.loaiSanPham === 'thuoc' ? 'Thuốc' : 'Vật Tư'}</td>
                  <td className='td-cell text-center'>{log.soLuongXuat}</td>
                  <td className='td-cell'>{log.donViTinh}</td>
                  <td className='td-cell'>{log.idNguoiXuat} {/* Replace with name later */}</td>
                  <td className='td-cell'>{log.lyDoXuat.replace(/_/g, ' ')}</td>
                  <td className='td-cell'>{log.idSuKienYTeLienQuan || '-'}</td>
                  <td className='td-cell text-xs'>{log.ghiChu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       <style jsx global>{`
        .th-cell { padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #4B5563; text-transform: uppercase; letter-spacing: 0.05em; }
        .td-cell { padding: 0.75rem 1rem; font-size: 0.875rem; color: #374151; }
      `}</style>
    </div>
  );
};
export default InventoryLogPage;
