import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, ShieldAlert, Stethoscope, Archive, Syringe, FileText, Activity, Settings, BriefcaseMedical,ClipboardPlus, BookUser, BellRing } from 'lucide-react'; // Icons

interface SidebarProps {
  userRole: string; // 'admin', 'y_ta', 'phu_huynh'
}

interface NavItem {
  path: string;
  name: string;
  icon: React.ElementType;
  roles: string[];
}

const navItems: NavItem[] = [
  // Common
  { path: '/dashboard', name: 'Trang chủ Dashboard', icon: Home, roles: ['admin', 'y_ta', 'phu_huynh'] },
  { path: '/thong-bao', name: 'Xem Thông Báo', icon: BellRing, roles: ['admin', 'y_ta', 'phu_huynh'] },

  // Admin
  { path: '/admin/nguoi-dung', name: 'Quản lý người dùng', icon: Users, roles: ['admin'] },
  { path: '/admin/chien-dich', name: 'Quản lý chiến dịch', icon: ShieldAlert, roles: ['admin'] },
  { path: '/admin/bao-cao', name: 'Xem báo cáo', icon: FileText, roles: ['admin'] },
  { path: '/admin/cau-hinh', name: 'Cấu hình hệ thống', icon: Settings, roles: ['admin'] },

  // Y tá
  { path: '/y-ta/yeu-cau-thuoc', name: 'Quản lý yêu cầu thuốc', icon: ClipboardPlus, roles: ['y_ta'] },
  { path: '/y-ta/su-co-y-te', name: 'Ghi nhận sự cố y tế', icon: Activity, roles: ['y_ta'] },
  { path: '/y-ta/kho-thuoc-vat-tu', name: 'Quản lý kho', icon: Archive, roles: ['y_ta'] },
  { path: '/y-ta/tiem-chung', name: 'Quản lý tiêm chủng', icon: Syringe, roles: ['y_ta'] },
  { path: '/y-ta/kham-suc-khoe', name: 'Quản lý khám sức khỏe', icon: Stethoscope, roles: ['y_ta'] },
  { path: '/y-ta/tra-cuu-hoc-sinh', name: 'Tra cứu hồ sơ học sinh', icon: BookUser, roles: ['y_ta'] },

  // Phụ huynh
  { path: '/phu-huynh/ho-so-con', name: 'Hồ sơ sức khỏe con', icon: BriefcaseMedical, roles: ['phu_huynh'] },
  { path: '/phu-huynh/gui-thuoc', name: 'Gửi yêu cầu thuốc', icon: ClipboardPlus, roles: ['phu_huynh'] },
];

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const location = useLocation();

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className='w-64 bg-blue-700 text-white flex flex-col p-4'>
      <div className='text-2xl font-bold mb-6 text-center border-b border-blue-600 pb-4'>
        Trường XYZ
      </div>
      <nav>
        <ul>
          {filteredNavItems.map((item) => (
            <li key={item.path} className='mb-2'>
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-md hover:bg-blue-600 transition-colors ${
                  location.pathname.startsWith(item.path) && item.path !== '/dashboard' ? 'bg-blue-800' :
                  location.pathname === item.path && item.path === '/dashboard' ? 'bg-blue-800' : ''
                }`}
              >
                <item.icon size={20} className='mr-3' />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='mt-auto text-center text-xs'>
        <p>&copy; {new Date().getFullYear()} Sức khỏe học đường</p>
      </div>
    </aside>
  );
};

export default Sidebar;
