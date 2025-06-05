import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pill, Package, Edit3, PlusCircle, ListOrdered, AlertTriangle } from 'lucide-react';
import { Thuoc, VatTuYTe } from '../../types';
import { mockSchoolMedicines, mockSchoolSupplies, updateMockMedicineStock, updateMockSupplyStock } from '../../data/mockInventory';
import { useAuth } from '../../contexts/AuthContext';

type ItemType = 'thuoc' | 'vat_tu';

const ManageInventoryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [medicines, setMedicines] = useState<Thuoc[]>(mockSchoolMedicines);
  const [supplies, setSupplies] = useState<VatTuYTe[]>(mockSchoolSupplies);

  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<{id: string, name: string, currentStock: number, unit: string, type: ItemType} | null>(null);
  const [adjustment, setAdjustment] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState<string>('');

  const openAdjustModal = (item: Thuoc | VatTuYTe, type: ItemType) => {
    setCurrentItem({ id: item.id, name: type === 'thuoc' ? (item as Thuoc).tenThuoc : (item as VatTuYTe).tenVatTu, currentStock: item.soLuongTonKho, unit: item.donViTinh, type });
    setAdjustment(0);
    setAdjustmentReason('');
    setShowAdjustModal(true);
  };

  const handleStockAdjustment = () => {
    if (!currentItem || !currentUser) return;
    const quantityChange = adjustment;
    const reason = adjustmentReason || (quantityChange > 0 ? 'nhap_kho_thu_cong' : 'xuat_kho_thu_cong') as any;

    let success = false;
    if (currentItem.type === 'thuoc') {
      success = updateMockMedicineStock(currentItem.id, quantityChange, reason, undefined, currentUser.id);
      if (success) setMedicines([...mockSchoolMedicines]);
    } else {
      success = updateMockSupplyStock(currentItem.id, quantityChange, reason, undefined, currentUser.id);
      if (success) setSupplies([...mockSchoolSupplies]);
    }

    if(success) {
        console.log(\`Stock for ${currentItem.name} adjusted by ${quantityChange}. New stock: ${currentItem.currentStock + quantityChange}\`);
    } else {
        console.error(\`Failed to update stock for ${currentItem.name}\`);
    }
    setShowAdjustModal(false);
    setCurrentItem(null);
  };

  if (!currentUser || (currentUser.vaiTro !== 'y_ta' && currentUser.vaiTro !== 'admin')) {
     return <div className='p-6 text-red-500'>Bạn không có quyền truy cập vào trang này.</div>;
  }

  const renderStockLevel = (currentStock: number, threshold?: number) => {
    let color = 'text-green-600';
    if (threshold && currentStock < threshold) {
        color = 'text-red-600 font-bold';
    } else if (threshold && currentStock < threshold * 1.5) {
        color = 'text-yellow-600 font-semibold';
    }
    return <span className={color}>{currentStock}</span>;
  }

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-between items-center mb-6 border-b pb-3'>
        <h2 className='text-3xl font-semibold text-blue-700'>Quản Lý Kho Thuốc & Vật Tư Y Tế</h2>
        <Link to='/y-ta/kho-thuoc-vat-tu/lich-su-xuat-nhap' className='text-sm text-blue-600 hover:underline flex items-center'>
          <ListOrdered size={18} className='mr-1'/> Xem lịch sử xuất/nhập kho
        </Link>
      </div>

      <section className='mb-8'>
        <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'><Pill className='mr-2 text-green-500'/>Danh Sách Thuốc</h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='th-cell'>Tên Thuốc (Hàm lượng)</th>
                <th className='th-cell'>Mã Thuốc</th>
                <th className='th-cell text-center'>Tồn Kho</th>
                <th className='th-cell text-center'>Ngưỡng CB</th>
                <th className='th-cell'>ĐVT</th>
                <th className='th-cell'>Hành động</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {medicines.map(thuoc => (
                <tr key={thuoc.id} className={\`hover:bg-gray-50 ${thuoc.soLuongTonKho < (thuoc.nguongCanhBaoTonKho || 0) ? 'bg-red-50' : ''}\`}>
                  <td className='td-cell font-medium'>{thuoc.tenThuoc} {thuoc.hamLuong && \`(${thuoc.hamLuong})\`}
                    {thuoc.soLuongTonKho < (thuoc.nguongCanhBaoTonKho || 0) && <AlertTriangle size={14} className='inline ml-1 text-red-500' title='Dưới ngưỡng cảnh báo'/>}
                  </td>
                  <td className='td-cell'>{thuoc.maThuoc || 'N/A'}</td>
                  <td className='td-cell text-center'>{renderStockLevel(thuoc.soLuongTonKho, thuoc.nguongCanhBaoTonKho)}</td>
                  <td className='td-cell text-center'>{thuoc.nguongCanhBaoTonKho || '-'}</td>
                  <td className='td-cell'>{thuoc.donViTinh}</td>
                  <td className='td-cell'>
                    <button onClick={() => openAdjustModal(thuoc, 'thuoc')} className='text-blue-600 hover:text-blue-800 flex items-center text-xs'>
                      <Edit3 size={14} className='mr-1'/>Điều chỉnh
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'><Package className='mr-2 text-indigo-500'/>Danh Sách Vật Tư Y Tế</h3>
         <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='th-cell'>Tên Vật Tư</th>
                <th className='th-cell'>Mã Vật Tư</th>
                <th className='th-cell text-center'>Tồn Kho</th>
                <th className='th-cell text-center'>Ngưỡng CB</th>
                <th className='th-cell'>ĐVT</th>
                <th className='th-cell'>Hành động</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {supplies.map(vatTu => (
                <tr key={vatTu.id} className={\`hover:bg-gray-50 ${vatTu.soLuongTonKho < (vatTu.nguongCanhBaoTonKho || 0) ? 'bg-red-50' : ''}\`}>
                  <td className='td-cell font-medium'>{vatTu.tenVatTu}
                     {vatTu.soLuongTonKho < (vatTu.nguongCanhBaoTonKho || 0) && <AlertTriangle size={14} className='inline ml-1 text-red-500' title='Dưới ngưỡng cảnh báo'/>}
                  </td>
                  <td className='td-cell'>{vatTu.maVatTu || 'N/A'}</td>
                  <td className='td-cell text-center'>{renderStockLevel(vatTu.soLuongTonKho, vatTu.nguongCanhBaoTonKho)}</td>
                  <td className='td-cell text-center'>{vatTu.nguongCanhBaoTonKho || '-'}</td>
                  <td className='td-cell'>{vatTu.donViTinh}</td>
                  <td className='td-cell'>
                    <button onClick={() => openAdjustModal(vatTu, 'vat_tu')} className='text-blue-600 hover:text-blue-800 flex items-center text-xs'>
                      <Edit3 size={14} className='mr-1'/>Điều chỉnh
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showAdjustModal && currentItem && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
            <h4 className='text-lg font-semibold mb-2'>Điều chỉnh tồn kho cho: {currentItem.name}</h4>
            <p className='text-sm text-gray-600 mb-1'>Tồn kho hiện tại: {currentItem.currentStock} {currentItem.unit}</p>
            <div className='my-4'>
              <label htmlFor='adjustmentQty' className='block text-sm font-medium text-gray-700'>Số lượng điều chỉnh (+/-):</label>
              <input
                type='number'
                id='adjustmentQty'
                value={adjustment}
                onChange={(e) => setAdjustment(parseInt(e.target.value, 10))}
                className='mt-1 w-full input-style'
              />
              <p className='text-xs text-gray-500 mt-1'>Nhập số dương để thêm vào kho, số âm để trừ đi.</p>
            </div>
             <div className='my-4'>
              <label htmlFor='adjustmentReason' className='block text-sm font-medium text-gray-700'>Lý do điều chỉnh (nếu có):</label>
              <input
                type='text'
                id='adjustmentReason'
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                className='mt-1 w-full input-style'
                placeholder='VD: Kiểm kê, Nhập hàng mới, Hỏng/Mất'
              />
            </div>
            <div className='flex justify-end space-x-3 mt-6'>
              <button onClick={() => setShowAdjustModal(false)} className='px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50'>Hủy</button>
              <button onClick={handleStockAdjustment} className='px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700'>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        .th-cell { padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #4B5563; text-transform: uppercase; letter-spacing: 0.05em; }
        .td-cell { padding: 0.75rem 1rem; white-space: nowrap; font-size: 0.875rem; color: #374151; }
        .input-style { display: block; width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3B82F6; box-shadow: 0 0 0 2px #BFDBFE; }
      `}</style>
    </div>
  );
};
export default ManageInventoryPage;
