import React from 'react';
import { ThongBao, LoaiThongBao } from '../../types'; // Assuming ThongBao is in types/index.ts
import { BellDot, AlertTriangle, CheckCircle2 } from 'lucide-react';

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
  if (importance === 'khan_cap') return <AlertTriangle className='text-red-500' size={24} />;
  if (type === 'gui_thuoc') return <CheckCircle2 className='text-green-500' size={24} />;
  if (type === 'su_co_y_te') return <AlertTriangle className='text-yellow-500' size={24} />;
  return <BellDot className='text-blue-500' size={24} />;
}

const NotificationsPage: React.FC = () => {
  // In a real app, fetch notifications for the current user
  // const { currentUser } = useAuth();
  // const [notifications, setNotifications] = useState<ThongBao[]>([]);
  // useEffect(() => { /* fetch notifications */ }, [currentUser]);

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto'>
      <h2 className='text-3xl font-semibold text-blue-700 mb-6 border-b pb-3'>Trung Tâm Thông Báo</h2>
      {mockNotifications.length === 0 ? (
        <p className='text-gray-600'>Bạn không có thông báo mới.</p>
      ) : (
        <ul className='space-y-4'>
          {mockNotifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 rounded-md border-l-4 ${
                notification.trangThaiDoc === 'chua_doc' ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300'
              } ${notification.mucDoQuanTrong === 'khan_cap' ? 'border-red-500' : ''}`}
            >
              <div className='flex items-start space-x-3'>
                <NotificationIcon type={notification.loaiThongBao} importance={notification.mucDoQuanTrong} />
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-gray-800'>{notification.tieuDe}</h3>
                  <p className='text-sm text-gray-600 mb-1'>{notification.noiDung}</p>
                  <div className='text-xs text-gray-500 flex justify-between'>
                    <span>{new Date(notification.thoiGianGui).toLocaleString('vi-VN')}</span>
                    {notification.linkLienQuan && (
                      <a href={notification.linkLienQuan} className='text-blue-600 hover:underline'>Xem chi tiết</a>
                    )}
                  </div>
                </div>
                 {notification.trangThaiDoc === 'chua_doc' && (
                    <span className='text-xs text-white bg-blue-500 px-2 py-1 rounded-full'>Mới</span>
                  )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Add pagination or 'mark all as read' later */}
    </div>
  );
};

export default NotificationsPage;
