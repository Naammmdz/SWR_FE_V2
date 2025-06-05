import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col items-center justify-center p-8'>
      <header className='text-center mb-12'>
        <h1 className='text-5xl font-bold mb-4'>Chào mừng đến với Trường XYZ</h1>
        <p className='text-xl text-blue-100 mb-8'>Hệ thống Quản lý Sức khỏe Học đường Hiện đại</p>
        <Link
          to='/login'
          className='bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-50 transition-transform transform hover:scale-105'
        >
          Đăng nhập vào hệ thống
        </Link>
      </header>

      <main className='grid md:grid-cols-3 gap-8 text-center max-w-4xl'>
        <div className='bg-white bg-opacity-20 p-6 rounded-lg shadow-xl backdrop-blur-md'>
          <h2 className='text-2xl font-semibold mb-3 text-blue-50'>Tài liệu Sức khỏe</h2>
          <p className='text-blue-100'>Truy cập các tài liệu và hướng dẫn chăm sóc sức khỏe cho học sinh.</p>
        </div>
        <div className='bg-white bg-opacity-20 p-6 rounded-lg shadow-xl backdrop-blur-md'>
          <h2 className='text-2xl font-semibold mb-3 text-blue-50'>Blog Chia sẻ</h2>
          <p className='text-blue-100'>Đọc các bài viết, kinh nghiệm về y tế học đường từ các chuyên gia.</p>
        </div>
        <div className='bg-white bg-opacity-20 p-6 rounded-lg shadow-xl backdrop-blur-md'>
          <h2 className='text-2xl font-semibold mb-3 text-blue-50'>Liên hệ Phòng Y tế</h2>
          <p className='text-blue-100'>Thông tin liên hệ và giới thiệu về phòng y tế của nhà trường.</p>
        </div>
      </main>

      <footer className='mt-16 text-center text-blue-200'>
        <p>&copy; {new Date().getFullYear()} Trường XYZ. Phát triển bởi Nhóm Sức Khỏe Học Đường.</p>
      </footer>
    </div>
  );
};

export default HomePage;
