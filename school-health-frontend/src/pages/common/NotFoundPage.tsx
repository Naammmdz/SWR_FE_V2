import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, BookOpen } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6'>
      <div className='max-w-2xl w-full text-center'>
        {/* 404 Illustration */}
        <div className='mb-8'>
          <div className='relative'>
            <div className='text-8xl md:text-9xl font-bold text-blue-100 select-none'>404</div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='p-6 bg-white rounded-full shadow-lg border border-blue-200'>
                <Search className='text-blue-600' size={48}/>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className='bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
            Oops! Trang không tìm thấy
          </h1>
          <p className='text-lg text-gray-600 mb-2'>
            Trang bạn đang tìm kiếm có thể đã được di chuyển, xóa hoặc không tồn tại.
          </p>
          <p className='text-gray-500'>
            Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ để tiếp tục.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'
          >
            <ArrowLeft className='mr-2' size={20}/>
            Quay lại
          </button>
          <button
            onClick={() => navigate('/')}
            className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'
          >
            <Home className='mr-2' size={20}/>
            Về trang chủ
          </button>
        </div>

        {/* Quick Links */}
        <div className='bg-white rounded-2xl shadow-xl p-6 border border-blue-100'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center'>
            <BookOpen className='mr-2 text-blue-600' size={20}/>
            Các trang hữu ích
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <button
              onClick={() => navigate('/dashboard')}
              className='p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200'
            >
              <div className='font-medium text-blue-700'>Bảng điều khiển</div>
              <div className='text-sm text-blue-600'>Trang tổng quan chính</div>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className='p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200'
            >
              <div className='font-medium text-green-700'>Hồ sơ cá nhân</div>
              <div className='text-sm text-green-600'>Thông tin tài khoản</div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-500'>
            © 2024 Trường THPT Nguyễn Du - Hệ thống quản lý y tế
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
