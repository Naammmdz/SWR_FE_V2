import React, { useState } from 'react';
import { Bell, UserCircle, LogOut, Settings, ChevronDown, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser, logout, userRole } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleVietnamese = (role: string | null) => {
    if (!role) return 'Chưa đăng nhập';
    if (role === 'admin') return 'Quản trị viên';
    if (role === 'y_ta') return 'Y tá';
    if (role === 'phu_huynh') return 'Phụ huynh';
    return 'Người dùng';
  };

  return (
    <header className='bg-white shadow-md p-4 flex justify-between items-center'>
      <div>
        <h1 className='text-xl font-semibold text-gray-700'>Hệ thống Sức khỏe Học đường</h1>
        {currentUser && <p className='text-sm text-gray-500'>Vai trò: {getRoleVietnamese(userRole)}</p>}
      </div>
      <div className='flex items-center space-x-4'>
        {currentUser && (
          <>
            <Link to='/thong-bao' className='text-gray-600 hover:text-blue-600 relative'>
              <Bell size={24} />
              {/* Example Notification Badge */}
              {/* <span className='absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'></span> */}
            </Link>
            <div className='relative'>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className='flex items-center text-gray-600 hover:text-blue-600 focus:outline-none'
              >
                <UserCircle size={24} />
                <span className='ml-2 text-sm hidden md:inline'>{currentUser.thongTinCaNhan.hoTen}</span>
                <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5'>
                  <Link
                    to='/ho-so-ca-nhan'
                    onClick={() => setDropdownOpen(false)}
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    <User size={16} className='mr-2'/> Hồ sơ cá nhân
                  </Link>
                  {userRole === 'admin' && (
                    <Link
                      to='/admin/cau-hinh'
                      onClick={() => setDropdownOpen(false)}
                      className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      <Settings size={16} className='mr-2' /> Cấu hình
                    </Link>
                  )}
                  <button
                    onClick={() => { handleLogout(); setDropdownOpen(false); }}
                    className='w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    <LogOut size={16} className='mr-2' /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
