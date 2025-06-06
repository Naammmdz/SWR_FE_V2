import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Stethoscope, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ArrowLeft
} from 'lucide-react';
import type { NguoiDung } from '../../types';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock authentication
      if (username === 'admin' && password === 'admin') {
        const adminUser: NguoiDung = {
          id: 'admin001',
          tenDangNhap: 'admin',
          vaiTro: 'admin',
          thongTinCaNhan: { hoTen: 'Quản Trị Viên Chính' },
          idTruongHoc: 'TH001',
          ngayTao: new Date().toISOString(),
          trangThai: 'hoat_dong',
        };
        login(adminUser);
        navigate('/dashboard');
      } else if (username === 'yta' && password === 'yta') {
        const ytaUser: NguoiDung = {
          id: 'yta001',
          tenDangNhap: 'yta',
          vaiTro: 'y_ta',
          thongTinCaNhan: { hoTen: 'Y Tá Trần Thị B' },
          idTruongHoc: 'TH001',
          ngayTao: new Date().toISOString(),
          trangThai: 'hoat_dong',
        };
        login(ytaUser);
        navigate('/dashboard');
      } else if (username === 'phuhuynh' && password === 'phuhuynh') {
        const phuhuynhUser: NguoiDung = {
          id: 'ph001',
          tenDangNhap: 'phuhuynh',
          vaiTro: 'phu_huynh',
          thongTinCaNhan: { hoTen: 'Phụ Huynh Nguyễn Văn A' },
          idTruongHoc: 'TH001',
          ngayTao: new Date().toISOString(),
          trangThai: 'hoat_dong',
        };
        login(phuhuynhUser);
        navigate('/dashboard');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-24 h-24 bg-blue-200 bg-opacity-30 rounded-full blur-xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-200 bg-opacity-30 rounded-full blur-xl'></div>
      </div>      <div className='w-full max-w-xs relative z-10'>
        {/* Compact Header */}
        <div className='text-center mb-4'>
          <Link to='/' className='inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-3 text-sm'>
            <ArrowLeft className='h-3 w-3 mr-1' />
            Trang chủ
          </Link>
          <div className='flex items-center justify-center mb-3'>
            <div className='bg-blue-600 p-2 rounded-lg mr-2'>
              <Stethoscope className='h-5 w-5 text-white' />
            </div>
            <div>
              <h1 className='text-base font-bold text-gray-900'>THPT Nguyễn Du</h1>              <p className='text-xs text-gray-600'>Hệ thống y tế</p>
            </div>
          </div>
        </div>

        {/* Compact Login Form */}
        <div className='bg-white rounded-xl shadow-lg p-4 border border-gray-100'>
          <div className='text-center mb-4'>
            <h2 className='text-lg font-bold text-gray-900 mb-1'>Đăng nhập</h2>
            <p className='text-gray-600 text-xs'>Vui lòng đăng nhập để tiếp tục</p>
          </div>          <form onSubmit={handleLogin} className='space-y-3'>
            {/* Username */}
            <div>
              <label className='block text-gray-700 text-xs font-medium mb-1' htmlFor='username'>
                Tên đăng nhập
              </label>
              <div className='relative'>
                <User className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <input
                  type='text'
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm'
                  placeholder='Nhập tên đăng nhập'
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className='block text-gray-700 text-xs font-medium mb-1' htmlFor='password'>
                Mật khẩu
              </label>
              <div className='relative'>
                <Lock className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pl-8 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm'
                  placeholder='Nhập mật khẩu'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                </button>
              </div>
            </div>            {/* Error */}
            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-2'>
                <p className='text-red-600 text-xs'>{error}</p>
              </div>
            )}

            {/* Demo info */}
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-2'>
              <p className='text-blue-800 font-medium text-xs mb-1'>Demo:</p>
              <div className='text-blue-700 text-xs'>
                <p>admin/admin • yta/yta • phuhuynh/phuhuynh</p>
              </div>
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center text-sm'
            >
              {isLoading ? (
                <>
                  <div className='animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2'></div>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  Đăng nhập
                  <ChevronRight className='h-3 w-3 ml-2' />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className='text-center mt-3 pt-3 border-t border-gray-100'>
            <div className='flex items-center justify-center space-x-3 text-xs'>
              <a href='#' className='text-blue-600 hover:text-blue-700 transition-colors'>
                Quên mật khẩu?
              </a>
              <span className='text-gray-300'>|</span>
              <a href='#' className='text-blue-600 hover:text-blue-700 transition-colors'>
                Hỗ trợ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
