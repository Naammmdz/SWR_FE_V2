import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Pill, 
  Package, 
  Edit3, 
  AlertTriangle, 
  ListOrdered, 
  Search,
  TrendingDown,
  TrendingUp,
  Package2,
  Archive,
  CheckCircle,
  XCircle
} from 'lucide-react';
import type { Thuoc, VatTuYTe, LyDoXuatKho } from '../../types';
import { mockSchoolMedicines, mockSchoolSupplies, updateMockMedicineStock, updateMockSupplyStock } from '../../data/mockInventory';
import { useAuth } from '../../contexts/AuthContext';

type ItemType = 'thuoc' | 'vat_tu';
interface AdjustableItem {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  type: ItemType;
}

const ManageInventoryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [medicines, setMedicines] = useState<Thuoc[]>(mockSchoolMedicines);
  const [supplies, setSupplies] = useState<VatTuYTe[]>(mockSchoolSupplies);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<AdjustableItem | null>(null);
  const [adjustment, setAdjustment] = useState(0);
  const [adjustmentReason, setAdjustmentReason] = useState<LyDoXuatKho>('khac');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'thuoc' | 'vat_tu'>('thuoc');

  const openAdjustModal = (item: Thuoc | VatTuYTe, type: ItemType) => {
    setCurrentItem({ id: item.id, name: type === 'thuoc' ? (item as Thuoc).tenThuoc : (item as VatTuYTe).tenVatTu, currentStock: item.soLuongTonKho, unit: item.donViTinh, type });
    setAdjustment(0);
    setAdjustmentReason('khac');
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
    }    if (success) {
        console.log(`Stock for ${currentItem.name} adjusted by ${quantityChange}. New stock: ${currentItem.currentStock + quantityChange}`);
    } else {
        console.error(`Failed to update stock for ${currentItem.name}`);
    }
    setShowAdjustModal(false);
    setCurrentItem(null);
  };
  if (!currentUser || (currentUser.vaiTro !== 'y_ta' && currentUser.vaiTro !== 'admin')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
          <div className="flex items-center text-red-600 mb-4">
            <AlertTriangle size={24} className="mr-2" />
            <span className="text-lg font-semibold">Không có quyền truy cập</span>
          </div>
          <p className="text-gray-600">Bạn không có quyền truy cập trang này.</p>
        </div>
      </div>
    );
  }

  const renderStockLevel = (currentStock: number, threshold?: number) => {
    if (threshold && currentStock < threshold) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <TrendingDown size={12} className="mr-1" />
          {currentStock}
        </span>
      );
    } else if (threshold && currentStock < threshold * 1.5) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertTriangle size={12} className="mr-1" />
          {currentStock}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <TrendingUp size={12} className="mr-1" />
        {currentStock}
      </span>
    );
  };

  // Filter items based on search term
  const filteredMedicines = medicines.filter(med => 
    med.tenThuoc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.maThuoc && med.maThuoc.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredSupplies = supplies.filter(supply => 
    supply.tenVatTu.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (supply.maVatTu && supply.maVatTu.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate statistics
  const lowStockMedicines = medicines.filter(med => med.soLuongTonKho < (med.nguongCanhBaoTonKho || 0));
  const lowStockSupplies = supplies.filter(supply => supply.soLuongTonKho < (supply.nguongCanhBaoTonKho || 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-green-600 p-3 rounded-xl mr-4">
                <Package2 size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Quản Lý Kho Thuốc & Vật Tư Y Tế</h1>
                <p className="text-gray-600 mt-1">Theo dõi và quản lý tồn kho thuốc, vật tư y tế</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-100 to-green-100 px-4 py-2 rounded-lg">
                <span className="text-blue-800 font-medium">Y tá: {currentUser?.thongTinCaNhan?.hoTen}</span>
              </div>
              <Link 
                to="/y-ta/kho-thuoc-vat-tu/lich-su-xuat-nhap" 
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <ListOrdered size={18} className="mr-2" />
                Lịch sử xuất/nhập
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Pill className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng thuốc</p>
                <p className="text-2xl font-bold text-gray-900">{medicines.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <Package className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng vật tư</p>
                <p className="text-2xl font-bold text-gray-900">{supplies.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Thuốc sắp hết</p>
                <p className="text-2xl font-bold text-red-600">{lowStockMedicines.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <Archive className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Vật tư sắp hết</p>
                <p className="text-2xl font-bold text-orange-600">{lowStockSupplies.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Tabs and Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('thuoc')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'thuoc'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Pill size={16} className="inline mr-1" />
                  Thuốc ({medicines.length})
                </button>
                <button
                  onClick={() => setActiveTab('vat_tu')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'vat_tu'
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Package size={16} className="inline mr-1" />
                  Vật tư ({supplies.length})
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={`Tìm kiếm ${activeTab === 'thuoc' ? 'thuốc' : 'vật tư'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'thuoc' ? (
              <div className="space-y-4">
                {filteredMedicines.length === 0 ? (
                  <div className="text-center py-8">
                    <Pill className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">
                      {searchTerm ? 'Không tìm thấy thuốc nào phù hợp.' : 'Chưa có thuốc nào trong kho.'}
                    </p>
                  </div>
                ) : (
                  filteredMedicines.map(thuoc => (
                    <div key={thuoc.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${
                      thuoc.soLuongTonKho < (thuoc.nguongCanhBaoTonKho || 0) ? 'border-red-200 bg-red-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            thuoc.soLuongTonKho < (thuoc.nguongCanhBaoTonKho || 0) ? 'bg-red-100' : 'bg-blue-100'
                          }`}>
                            <Pill className={`${
                              thuoc.soLuongTonKho < (thuoc.nguongCanhBaoTonKho || 0) ? 'text-red-600' : 'text-blue-600'
                            }`} size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {thuoc.tenThuoc} {thuoc.hamLuong && `(${thuoc.hamLuong})`}
                            </h3>
                            <p className="text-sm text-gray-600">Mã: {thuoc.maThuoc || 'N/A'}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-600 mr-2">Tồn kho:</span>
                                {renderStockLevel(thuoc.soLuongTonKho, thuoc.nguongCanhBaoTonKho)}
                                <span className="text-sm text-gray-600 ml-1">{thuoc.donViTinh}</span>
                              </div>
                              {thuoc.nguongCanhBaoTonKho && (
                                <div className="flex items-center">
                                  <span className="text-sm text-gray-600 mr-1">Ngưỡng CB:</span>
                                  <span className="text-sm font-medium text-gray-700">{thuoc.nguongCanhBaoTonKho}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => openAdjustModal(thuoc, 'thuoc')}
                          className="flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                        >
                          <Edit3 size={14} className="mr-1" />
                          Điều chỉnh
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSupplies.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">
                      {searchTerm ? 'Không tìm thấy vật tư nào phù hợp.' : 'Chưa có vật tư nào trong kho.'}
                    </p>
                  </div>
                ) : (
                  filteredSupplies.map(vatTu => (
                    <div key={vatTu.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${
                      vatTu.soLuongTonKho < (vatTu.nguongCanhBaoTonKho || 0) ? 'border-red-200 bg-red-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            vatTu.soLuongTonKho < (vatTu.nguongCanhBaoTonKho || 0) ? 'bg-red-100' : 'bg-green-100'
                          }`}>
                            <Package className={`${
                              vatTu.soLuongTonKho < (vatTu.nguongCanhBaoTonKho || 0) ? 'text-red-600' : 'text-green-600'
                            }`} size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{vatTu.tenVatTu}</h3>
                            <p className="text-sm text-gray-600">Mã: {vatTu.maVatTu || 'N/A'}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-600 mr-2">Tồn kho:</span>
                                {renderStockLevel(vatTu.soLuongTonKho, vatTu.nguongCanhBaoTonKho)}
                                <span className="text-sm text-gray-600 ml-1">{vatTu.donViTinh}</span>
                              </div>
                              {vatTu.nguongCanhBaoTonKho && (
                                <div className="flex items-center">
                                  <span className="text-sm text-gray-600 mr-1">Ngưỡng CB:</span>
                                  <span className="text-sm font-medium text-gray-700">{vatTu.nguongCanhBaoTonKho}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => openAdjustModal(vatTu, 'vat_tu')}
                          className="flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200"
                        >
                          <Edit3 size={14} className="mr-1" />
                          Điều chỉnh
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Adjustment Modal */}
        {showAdjustModal && currentItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-lg mr-3 ${
                  currentItem.type === 'thuoc' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {currentItem.type === 'thuoc' ? (
                    <Pill className={`${currentItem.type === 'thuoc' ? 'text-blue-600' : 'text-green-600'}`} size={20} />
                  ) : (
                    <Package className="text-green-600" size={20} />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Điều chỉnh tồn kho</h4>
                  <p className="text-sm text-gray-600">{currentItem.name}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">Tồn kho hiện tại:</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentItem.currentStock} {currentItem.unit}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="adjustmentQty" className="block text-sm font-medium text-gray-700 mb-1">
                    Số lượng điều chỉnh:
                  </label>
                  <input
                    type="number"
                    id="adjustmentQty"
                    value={adjustment}
                    onChange={(e) => setAdjustment(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Nhập số lượng (+/-)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nhập số dương để thêm vào kho, số âm để trừ đi.
                  </p>
                  {adjustment !== 0 && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="text-sm text-blue-800">
                        Tồn kho sau điều chỉnh: {currentItem.currentStock + adjustment} {currentItem.unit}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="adjustmentReason" className="block text-sm font-medium text-gray-700 mb-1">
                    Lý do điều chỉnh:
                  </label>
                  <input
                    type="text"
                    id="adjustmentReason"
                    value={adjustmentReason}
                    onChange={(e) => setAdjustmentReason(e.target.value as LyDoXuatKho)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="VD: Kiểm kê, Nhập hàng mới, Hỏng/Mất..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setShowAdjustModal(false)} 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <XCircle size={16} className="mr-1" />
                  Hủy
                </button>
                <button 
                  onClick={handleStockAdjustment} 
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  <CheckCircle size={16} className="mr-1" />
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ManageInventoryPage;
