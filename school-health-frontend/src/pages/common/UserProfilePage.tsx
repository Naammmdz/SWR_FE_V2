import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserCircle } from 'lucide-react';

const UserProfilePage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div className='p-6 text-red-500'>Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.</div>;
  }

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto'>
      <h2 className='text-3xl font-semibold text-blue-700 mb-6 border-b pb-3'>Hồ Sơ Cá Nhân</h2>
      <div className='flex items-center space-x-6 mb-8'>
        <UserCircle size={80} className='text-blue-500' />
        <div>
          <p className='text-2xl font-bold text-gray-800'>{currentUser.thongTinCaNhan.hoTen}</p>
          <p className='text-md text-gray-600'>Vai trò: {currentUser.vaiTro === 'admin' ? 'Quản trị viên' : currentUser.vaiTro === 'y_ta' ? 'Y tá' : 'Phụ huynh'}</p>
        </div>
      </div>

      <div className='space-y-4'>
        <div>
          <p className='text-sm font-medium text-gray-500'>Tên đăng nhập:</p>
          <p className='text-lg text-gray-700'>{currentUser.tenDangNhap}</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Email:</p>
          <p className='text-lg text-gray-700'>{currentUser.thongTinCaNhan.email || 'Chưa cập nhật'}</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Số điện thoại:</p>
          <p className='text-lg text-gray-700'>{currentUser.thongTinCaNhan.soDienThoai || 'Chưa cập nhật'}</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Địa chỉ:</p>
          <p className='text-lg text-gray-700'>{currentUser.thongTinCaNhan.diaChi || 'Chưa cập nhật'}</p>
        </div>
         <div>
          <p className='text-sm font-medium text-gray-500'>Mã trường học:</p>
          <p className='text-lg text-gray-700'>{currentUser.idTruongHoc}</p>
        </div>
         <div>
          <p className='text-sm font-medium text-gray-500'>Ngày tạo tài khoản:</p>
          <p className='text-lg text-gray-700'>{new Date(currentUser.ngayTao).toLocaleDateString('vi-VN')}</p>
        </div>
      </div>

      {/* Nút chỉnh sửa sẽ được thêm sau */}
      {/* <button className='mt-8 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors'>
        Chỉnh sửa thông tin
      </button> */}
    </div>
  );
};

export default UserProfilePage;
