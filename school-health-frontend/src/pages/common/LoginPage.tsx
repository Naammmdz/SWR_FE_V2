import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { NguoiDung, VaiTroNguoiDung } from '../../types'; // Import types

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-blue-600 mb-6'>Đăng Nhập Hệ Thống</h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='username'>
              Tên đăng nhập
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='ví dụ: admin, yta, phuhuynh'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='password'>
              Mật khẩu
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='ví dụ: admin, yta, phuhuynh'
            />
          </div>
          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold'
          >
            Đăng nhập
          </button>
        </form>
        <p className='text-center text-sm text-gray-600 mt-4'>
          Chưa có tài khoản? <Link to='/register' className='text-blue-600 hover:underline'>Đăng ký</Link> (Chức năng này chưa có)
        </p>
         <p className='text-center text-sm text-gray-600 mt-2'>
          <Link to='/' className='text-blue-600 hover:underline'>Quay lại trang chủ</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
