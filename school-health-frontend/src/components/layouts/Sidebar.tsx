import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ShieldAlert, 
  Stethoscope, 
  Archive, 
  Syringe, 
  Activity, 
  Settings, 
  BriefcaseMedical,
  ClipboardPlus, 
  BookUser, 
  BellRing,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Heart
} from 'lucide-react';

interface SidebarProps {
  userRole: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  path: string;
  name: string;
  icon: React.ElementType;
  roles: string[];
  badge?: string;
}

const navItems: NavItem[] = [
  // Common
  { path: '/dashboard', name: 'Bảng điều khiển', icon: Home, roles: ['admin', 'y_ta', 'phu_huynh'] },
  { path: '/thong-bao', name: 'Thông báo', icon: BellRing, roles: ['admin', 'y_ta', 'phu_huynh'], badge: '3' },

  // Admin
  { path: '/admin/nguoi-dung', name: 'Quản lý người dùng', icon: Users, roles: ['admin'] },
  { path: '/admin/chien-dich', name: 'Quản lý chiến dịch', icon: ShieldAlert, roles: ['admin'] },
  { path: '/admin/bao-cao', name: 'Báo cáo & Thống kê', icon: BarChart3, roles: ['admin'] },
  { path: '/admin/cau-hinh', name: 'Cấu hình hệ thống', icon: Settings, roles: ['admin'] },

  // Y tá
  { path: '/y-ta/yeu-cau-thuoc', name: 'Yêu cầu thuốc', icon: ClipboardPlus, roles: ['y_ta'], badge: '2' },
  { path: '/y-ta/su-co-y-te', name: 'Sự cố y tế', icon: Activity, roles: ['y_ta'], badge: '1' },
  { path: '/y-ta/kho-thuoc-vat-tu', name: 'Quản lý kho', icon: Archive, roles: ['y_ta'] },
  { path: '/y-ta/tiem-chung', name: 'Tiêm chủng', icon: Syringe, roles: ['y_ta'] },
  { path: '/y-ta/kham-suc-khoe', name: 'Khám sức khỏe', icon: Stethoscope, roles: ['y_ta'] },
  { path: '/y-ta/tra-cuu-hoc-sinh', name: 'Tra cứu hồ sơ', icon: BookUser, roles: ['y_ta'] },

  // Phụ huynh
  { path: '/phu-huynh/ho-so-con', name: 'Hồ sơ sức khỏe', icon: Heart, roles: ['phu_huynh'] },
  { path: '/phu-huynh/gui-thuoc', name: 'Yêu cầu thuốc', icon: BriefcaseMedical, roles: ['phu_huynh'] },
];

const Sidebar: React.FC<SidebarProps> = ({ userRole, isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'y_ta': return 'Y tá';
      case 'phu_huynh': return 'Phụ huynh';
      default: return 'Người dùng';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return '👨‍💼';
      case 'y_ta': return '👩‍⚕️';
      case 'phu_huynh': return '👪';
      default: return '👤';
    }
  };

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-blue-100 flex flex-col transition-all duration-300 ease-in-out shadow-xl relative`}>      {/* Toggle Button */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className='absolute -right-3 top-8 bg-white text-blue-600 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-200 z-10 border border-blue-100'
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      )}

      {/* Header */}
      <div className='p-6 border-b border-blue-100'>
        <div className='flex items-center space-x-3'>
          <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg'>
            <span className='text-2xl'>{getRoleIcon(userRole)}</span>
          </div>
          {!isCollapsed && (
            <div className='flex-1'>
              <h2 className='text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                THPT Nguyễn Du
              </h2>
              <p className='text-sm text-gray-600 font-medium'>{getRoleTitle(userRole)}</p>
            </div>
          )}
        </div>
      </div>      {/* Navigation */}
      <nav className='flex-1 px-4 py-6'>
        <ul className='space-y-2'>
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`group relative flex items-center p-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-lg border border-blue-200' 
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 hover:shadow-md'
                  }`}
                >
                  <div className='flex items-center space-x-3 flex-1'>
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                    }`}>
                      <item.icon 
                        size={18} 
                        className='transition-transform duration-200 group-hover:scale-110'
                      />
                    </div>
                    {!isCollapsed && (
                      <span className='font-semibold truncate'>{item.name}</span>
                    )}
                  </div>
                  
                  {/* Badge */}
                  {item.badge && (
                    <span className={`${isCollapsed ? 'absolute -top-1 -right-1' : ''} bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full px-2 py-1 font-bold min-w-[20px] text-center shadow-lg`}>
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && hoveredItem === item.path && (
                    <div className='absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-xl shadow-xl whitespace-nowrap z-50 border border-gray-700'>
                      {item.name}
                      <div className='absolute top-1/2 -left-2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 -translate-y-1/2'></div>
                    </div>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className='absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-l-full shadow-sm'></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>      {/* Footer */}
      <div className='p-4 border-t border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50'>
        {!isCollapsed ? (
          <div className='text-center'>
            <div className='flex items-center justify-center space-x-2 mb-2'>
              <div className='w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>🏥</span>
              </div>
              <span className='text-sm font-semibold text-gray-700'>Y tế trường học</span>
            </div>
            <p className='text-xs text-gray-500'>© {new Date().getFullYear()} THPT Nguyễn Du</p>
            <p className='text-xs text-gray-500'>Hệ thống quản lý y tế</p>
          </div>
        ) : (
          <div className='text-center'>
            <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl mx-auto flex items-center justify-center shadow-lg'>
              <span className='text-white text-sm font-bold'>🏥</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
