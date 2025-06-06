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
  Heart, 
  Shield, 
  CheckCircle,
  School,
  ArrowLeft
} from 'lucide-react';
import type { NguoiDung, VaiTroNguoiDung } from '../../types';

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
      await new Promise(resolve => setTimeout(resolve, 1000));

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
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-20 w-32 h-32 bg-blue-200 bg-opacity-20 rounded-full blur-xl'></div>
        <div className='absolute bottom-20 right-20 w-40 h-40 bg-purple-200 bg-opacity-20 rounded-full blur-xl'></div>
        <div className='absolute top-1/2 left-1/3 w-24 h-24 bg-green-200 bg-opacity-20 rounded-full blur-xl'></div>
      </div>

      <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Left side - Branding & Information */}
          <div className='hidden lg:block'>
            <div className='mb-8'>
              <Link to='/' className='inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors group'>
                <ArrowLeft className='h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform' />
                Quay lại trang chủ
              </Link>
            </div>
            
            <div className='flex items-center mb-8'>
              <div className='bg-blue-600 p-4 rounded-2xl mr-4'>
                <Stethoscope className='h-10 w-10 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>Trường THPT Nguyễn Du</h1>
                <p className='text-gray-600 text-lg'>Hệ thống quản lý y tế</p>
              </div>
            </div>

            <h2 className='text-4xl font-bold text-gray-900 mb-6 leading-tight'>
              Chào mừng trở lại với 
              <span className='text-blue-600 block'>hệ thống y tế trường</span>
            </h2>
            
            <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
              Đăng nhập để truy cập vào hệ thống quản lý sức khỏe hiện đại của trường THPT Nguyễn Du.
            </p>

            {/* Features */}
            <div className='space-y-4'>
              {[
                {
                  icon: Shield,
                  title: 'Bảo mật tuyệt đối',
                  description: 'Thông tin được mã hóa và bảo vệ'
                },
                {
                  icon: Heart,
                  title: 'Chăm sóc toàn diện',
                  description: 'Theo dõi sức khỏe 24/7'
                },
                {
                  icon: School,
                  title: 'Chuyên nghiệp',
                  description: 'Đội ngũ y tế giàu kinh nghiệm'
                }
              ].map((feature, index) => (
                <div key={index} className='flex items-center'>
                  <div className='bg-blue-100 p-3 rounded-xl mr-4'>
                    <feature.icon className='h-6 w-6 text-blue-600' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900'>{feature.title}</h3>
                    <p className='text-gray-600 text-sm'>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className='w-full max-w-md mx-auto lg:mx-0'>
            {/* Mobile header */}
            <div className='lg:hidden text-center mb-8'>
              <div className='flex items-center justify-center mb-4'>
                <div className='bg-blue-600 p-3 rounded-xl mr-3'>
                  <Stethoscope className='h-8 w-8 text-white' />
                </div>
                <div>
                  <h1 className='text-2xl font-bold text-gray-900'>THPT Nguyễn Du</h1>
                  <p className='text-gray-600'>Hệ thống y tế</p>
                </div>
              </div>
              <Link to='/' className='inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors'>
                <ArrowLeft className='h-4 w-4 mr-2' />
                Quay lại trang chủ
              </Link>
            </div>

            <div className='bg-white rounded-3xl shadow-2xl p-8 relative border border-gray-100'>
              {/* Form header */}
              <div className='text-center mb-8'>
                <div className='inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4'>
                  <User className='h-4 w-4 mr-2' />
                  Đăng nhập hệ thống
                </div>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>Xin chào!</h2>
                <p className='text-gray-600'>Vui lòng đăng nhập để tiếp tục</p>
              </div>

              <form onSubmit={handleLogin} className='space-y-6'>
                {/* Username field */}
                <div>
                  <label className='block text-gray-700 text-sm font-semibold mb-3' htmlFor='username'>
                    Tên đăng nhập
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                      <User className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                      type='text'
                      id='username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className='w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white'
                      placeholder='Nhập tên đăng nhập'
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label className='block text-gray-700 text-sm font-semibold mb-3' htmlFor='password'>
                    Mật khẩu
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                      <Lock className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white'
                      placeholder='Nhập mật khẩu'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
                    >
                      {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className='bg-red-50 border border-red-200 rounded-xl p-4'>
                    <p className='text-red-600 text-sm font-medium'>{error}</p>
                  </div>
                )}

                {/* Demo accounts info */}
                <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
                  <h4 className='text-blue-800 font-semibold text-sm mb-2'>Tài khoản demo:</h4>
                  <div className='text-blue-700 text-xs space-y-1'>
                    <p><strong>Admin:</strong> admin / admin</p>
                    <p><strong>Y tá:</strong> yta / yta</p>
                    <p><strong>Phụ huynh:</strong> phuhuynh / phuhuynh</p>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center justify-center'
                >
                  {isLoading ? (
                    <>
                      <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
                      Đang đăng nhập...
                    </>
                  ) : (
                    <>
                      Đăng nhập
                      <ChevronRight className='h-5 w-5 ml-2' />
                    </>
                  )}
                </button>
              </form>

              {/* Additional links */}
              <div className='text-center mt-8 pt-6 border-t border-gray-100'>
                <p className='text-gray-600 text-sm mb-4'>
                  Cần hỗ trợ? Liên hệ với đội ngũ kỹ thuật
                </p>
                <div className='flex items-center justify-center space-x-4 text-sm'>
                  <a href='#' className='text-blue-600 hover:text-blue-700 transition-colors font-medium'>
                    Quên mật khẩu?
                  </a>
                  <span className='text-gray-300'>|</span>
                  <a href='#' className='text-blue-600 hover:text-blue-700 transition-colors font-medium'>
                    Hỗ trợ kỹ thuật
                  </a>
                </div>
              </div>

              {/* Trust indicators */}
              <div className='flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-100'>
                <div className='flex items-center text-xs text-gray-500'>
                  <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
                  Bảo mật SSL
                </div>
                <div className='flex items-center text-xs text-gray-500'>
                  <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
                  Dữ liệu được mã hóa
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
