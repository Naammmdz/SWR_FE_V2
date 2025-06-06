import React, { useState, useEffect, useRef } from 'react';
import { Bell, UserCircle, LogOut, Settings, ChevronDown, User, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser, logout, userRole } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const getRoleColor = (role: string | null) => {
    if (role === 'admin') return 'bg-red-100 text-red-700';
    if (role === 'y_ta') return 'bg-green-100 text-green-700';
    if (role === 'phu_huynh') return 'bg-purple-100 text-purple-700';
    return 'bg-gray-100 text-gray-700';
  };
  return (
    <header className='bg-white/95 backdrop-blur-md shadow-xl border-b border-blue-100 sticky top-0 z-40'>
      <div className='px-6 py-4'>
        <div className='flex justify-between items-center'>
          {/* Logo and Title */}
          <div className='flex items-center space-x-4'>
            <div className='hidden md:block w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg border border-blue-200'>
              <span className='text-2xl'>🏥</span>            </div>
            <div>
              <h1 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                Trường THPT Nguyễn Du
              </h1>
              <p className='text-sm text-gray-600 hidden md:block font-medium'>
                Hệ thống quản lý y tế học đường
              </p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className='hidden lg:flex flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18}/>
              <input
                type='text'
                placeholder='Tìm kiếm học sinh, thuốc, báo cáo...'
                className='w-full pl-10 pr-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:shadow-lg'
              />
            </div>
          </div>

          {/* Right Section */}
          <div className='flex items-center space-x-3'>
            {currentUser ? (
              <>                {/* Mobile Search Toggle */}
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className='lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 transform hover:scale-105'
                >
                  <Search size={20} />
                </button>

                {/* User Role Badge */}
                <div className={`hidden md:flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getRoleColor(userRole)}`}>
                  {getRoleVietnamese(userRole)}
                </div>

                {/* Notifications */}
                <Link 
                  to='/thong-bao' 
                  className='relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 transform hover:scale-105'
                >
                  <Bell size={20} />
                  {/* Notification Badge */}
                  <span className='absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg'>
                    3
                  </span>
                </Link>

                {/* User Menu */}
                <div className='relative' ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className='flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 transform hover:scale-105'
                  >
                    <div className='w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-sm'>
                      <UserCircle size={20} className='text-blue-600' />
                    </div>
                    <span className='hidden md:block text-sm font-semibold max-w-24 truncate'>
                      {currentUser.thongTinCaNhan.hoTen}
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {dropdownOpen && (
                    <div className='absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-blue-100 py-2 z-50 transform transition-all duration-200 origin-top-right'>                      {/* User Info */}
                      <div className='px-4 py-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50'>
                        <div className='flex items-center space-x-3'>
                          <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg'>
                            <UserCircle size={28} className='text-blue-600' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-bold text-gray-800 truncate'>
                              {currentUser.thongTinCaNhan.hoTen}
                            </p>
                            <p className='text-xs text-gray-600 font-medium'>
                              {currentUser.tenDangNhap}
                            </p>
                          </div>
                        </div>
                        <div className={`mt-3 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getRoleColor(userRole)}`}>
                          {getRoleVietnamese(userRole)}
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className='py-2'>
                        <Link
                          to='/ho-so-ca-nhan'
                          onClick={() => setDropdownOpen(false)}
                          className='flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium'
                        >
                          <User size={16} className='mr-3'/> 
                          Hồ sơ cá nhân
                        </Link>

                        {userRole === 'admin' && (
                          <Link
                            to='/admin/cau-hinh'
                            onClick={() => setDropdownOpen(false)}
                            className='flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium'
                          >
                            <Settings size={16} className='mr-3' /> 
                            Cấu hình hệ thống
                          </Link>
                        )}                        <div className='border-t border-blue-100 mt-2 pt-2'>
                          <button
                            onClick={() => { handleLogout(); setDropdownOpen(false); }}
                            className='w-full text-left flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 font-medium'
                          >
                            <LogOut size={16} className='mr-3' /> 
                            Đăng xuất
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to='/login'
                className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg'
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className='lg:hidden mt-4 pt-4 border-t border-blue-100'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18}/>
              <input
                type='text'
                placeholder='Tìm kiếm học sinh, thuốc, báo cáo...'
                className='w-full pl-10 pr-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:shadow-lg'
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
