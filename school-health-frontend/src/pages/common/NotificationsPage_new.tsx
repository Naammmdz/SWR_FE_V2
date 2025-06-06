// filepath: c:\Users\tagia\OneDrive\Máy tính\SWR_FE_V2\school-health-frontend\src\pages\common\NotificationsPage.tsx
import React, { useState } from 'react';
import type { ThongBao, LoaiThongBao } from '../../types';
import { 
  BellDot, 
  AlertTriangle, 
  CheckCircle2, 
  Bell,
  Filter,
  Search,
  Settings,
  Clock,
  ExternalLink,
  Check,
  Trash2
} from 'lucide-react';

// Mock notifications data
const mockNotifications: ThongBao[] = [
  {
    id: '1',
    idNguoiNhan: 'user123',
    tieuDe: 'Yêu cầu gửi thuốc đã được xác nhận',
    noiDung: 'Yêu cầu gửi thuốc Panadol cho học sinh Nguyễn Văn A đã được y tá xác nhận.',
    loaiThongBao: 'gui_thuoc',
    thoiGianGui: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    trangThaiDoc: 'chua_doc',
    linkLienQuan: '/phu-huynh/gui-thuoc/req001',
    mucDoQuanTrong: 'quan_trong',
  },
  {
    id: '2',
    idNguoiNhan: 'user123',
    tieuDe: 'Sự cố y tế mới được ghi nhận',
    noiDung: 'Học sinh Trần Thị B lớp 2A gặp sự cố té ngã nhẹ ở sân trường.',
    loaiThongBao: 'su_co_y_te',
    thoiGianGui: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    trangThaiDoc: 'da_doc',
    linkLienQuan: '/y-ta/su-co-y-te/evt005',
  },
  {
    id: '3',
    idNguoiNhan: 'user123',
    tieuDe: 'Lịch tiêm chủng sắp tới',
    noiDung: 'Nhắc nhở: Chiến dịch tiêm chủng Vaccine Cúm mùa sẽ diễn ra vào ngày 25/12/2023.',
    loaiThongBao: 'tiem_chung_moi',
    thoiGianGui: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    trangThaiDoc: 'chua_doc',
    linkLienQuan: '/admin/chien-dich/vac002',
    mucDoQuanTrong: 'khan_cap',
  },
];

const NotificationIcon: React.FC<{type: LoaiThongBao, importance?: string}> = ({ type, importance }) => {
  if (importance === 'khan_cap') return <AlertTriangle className='text-red-500' size={20} />;
  if (type === 'gui_thuoc') return <CheckCircle2 className='text-green-500' size={20} />;
  if (type === 'su_co_y_te') return <AlertTriangle className='text-yellow-500' size={20} />;
  return <BellDot className='text-blue-500' size={20} />;
}

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesSearch = notification.tieuDe.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.noiDung.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'unread') return matchesSearch && notification.trangThaiDoc === 'chua_doc';
    if (filter === 'important') return matchesSearch && notification.mucDoQuanTrong === 'khan_cap';
    return matchesSearch;
  });

  const unreadCount = mockNotifications.filter(n => n.trangThaiDoc === 'chua_doc').length;
  const importantCount = mockNotifications.filter(n => n.mucDoQuanTrong === 'khan_cap').length;

  const getNotificationBgColor = (notification: ThongBao) => {
    if (notification.mucDoQuanTrong === 'khan_cap') {
      return notification.trangThaiDoc === 'chua_doc' 
        ? 'bg-gradient-to-r from-red-50 to-red-100' 
        : 'bg-gradient-to-r from-red-25 to-red-50';
    }
    return notification.trangThaiDoc === 'chua_doc' 
      ? 'bg-gradient-to-r from-blue-50 to-blue-100' 
      : 'bg-gradient-to-r from-gray-50 to-gray-100';
  };

  const getNotificationBorderColor = (notification: ThongBao) => {
    if (notification.mucDoQuanTrong === 'khan_cap') return 'border-l-red-500';
    if (notification.trangThaiDoc === 'chua_doc') return 'border-l-blue-500';
    return 'border-l-gray-300';
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center'>
              <div className='p-3 bg-blue-100 rounded-xl mr-4'>
                <Bell className='text-blue-600' size={28}/>
              </div>
              <div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Trung Tâm Thông Báo
                </h1>
                <p className='text-gray-600'>
                  {unreadCount} thông báo chưa đọc • {importantCount} thông báo quan trọng
                </p>
              </div>
            </div>
            <button className='p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200'>
              <Settings className='text-gray-600' size={20}/>
            </button>
          </div>

          {/* Search and Filter */}
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18}/>
              <input
                type='text'
                placeholder='Tìm kiếm thông báo...'
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả ({mockNotifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  filter === 'unread' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Chưa đọc ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('important')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  filter === 'important' 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Quan trọng ({importantCount})
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className='space-y-4'>
          {filteredNotifications.length === 0 ? (
            <div className='bg-white rounded-2xl shadow-xl p-12 text-center border border-blue-100'>
              <div className='p-4 bg-gray-100 rounded-full inline-block mb-4'>
                <Bell className='text-gray-400' size={32}/>
              </div>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                {searchTerm ? 'Không tìm thấy thông báo' : 'Không có thông báo'}
              </h3>
              <p className='text-gray-600'>
                {searchTerm 
                  ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc' 
                  : 'Bạn không có thông báo mới nào'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`${getNotificationBgColor(notification)} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${getNotificationBorderColor(notification)} border border-gray-200`}
              >
                <div className='p-6'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start space-x-4 flex-1'>
                      <div className='flex-shrink-0 mt-1'>
                        <NotificationIcon 
                          type={notification.loaiThongBao} 
                          importance={notification.mucDoQuanTrong} 
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center space-x-2 mb-2'>
                          <h3 className='text-lg font-semibold text-gray-800 truncate'>
                            {notification.tieuDe}
                          </h3>
                          {notification.trangThaiDoc === 'chua_doc' && (
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                              Mới
                            </span>
                          )}
                          {notification.mucDoQuanTrong === 'khan_cap' && (
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                              Khẩn cấp
                            </span>
                          )}
                        </div>
                        <p className='text-gray-700 mb-3 leading-relaxed'>
                          {notification.noiDung}
                        </p>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-4 text-sm text-gray-500'>
                            <div className='flex items-center'>
                              <Clock size={14} className='mr-1'/>
                              {new Date(notification.thoiGianGui).toLocaleString('vi-VN')}
                            </div>
                          </div>
                          {notification.linkLienQuan && (
                            <a 
                              href={notification.linkLienQuan} 
                              className='inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200'
                            >
                              Xem chi tiết
                              <ExternalLink size={14} className='ml-1'/>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center space-x-2 ml-4'>
                      {notification.trangThaiDoc === 'chua_doc' && (
                        <button className='p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200'>
                          <Check size={18}/>
                        </button>
                      )}
                      <button className='p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200'>
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bulk Actions */}
        {filteredNotifications.length > 0 && (
          <div className='bg-white rounded-2xl shadow-xl p-6 mt-8 border border-blue-100'>
            <div className='flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0'>
              <div className='text-gray-600'>
                Hiển thị {filteredNotifications.length} thông báo
              </div>
              <div className='flex space-x-3'>
                <button className='inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors duration-200'>
                  <Check className='mr-2' size={18}/>
                  Đánh dấu tất cả đã đọc
                </button>
                <button className='inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors duration-200'>
                  <Trash2 className='mr-2' size={18}/>
                  Xóa đã chọn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
