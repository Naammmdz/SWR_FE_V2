import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  UserCircle, 
  Mail, 
  Phone, 
  MapPin, 
  School, 
  Calendar, 
  Shield, 
  Edit3, 
  Save,
  X,
  Camera
} from 'lucide-react';

const UserProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!currentUser) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-xl p-8 text-center border border-red-200'>
          <div className='p-4 bg-red-100 rounded-full inline-block mb-4'>
            <X className='text-red-600' size={32}/>
          </div>
          <h3 className='text-xl font-semibold text-red-700 mb-2'>Lỗi đăng nhập</h3>
          <p className='text-red-600'>Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.</p>
        </div>
      </div>
    );
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'y_ta': return 'Y tá';
      case 'phu_huynh': return 'Phụ huynh';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'y_ta': return 'bg-green-100 text-green-700';
      case 'phu_huynh': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Hồ Sơ Cá Nhân
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                isEditing 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
              }`}
            >
              {isEditing ? (
                <>
                  <X className='mr-2' size={18}/>
                  Hủy
                </>
              ) : (
                <>
                  <Edit3 className='mr-2' size={18}/>
                  Chỉnh sửa
                </>
              )}
            </button>
          </div>

          {/* Profile Header */}
          <div className='flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8'>
            {/* Avatar */}
            <div className='relative'>
              <div className='w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg'>
                <UserCircle size={80} className='text-blue-600' />
              </div>
              {isEditing && (
                <button className='absolute bottom-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors duration-200'>
                  <Camera size={16}/>
                </button>
              )}
            </div>

            {/* Basic Info */}
            <div className='flex-1 text-center md:text-left'>
              <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                {currentUser.thongTinCaNhan.hoTen}
              </h2>
              <div className='flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mb-4'>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(currentUser.vaiTro)}`}>
                  <Shield className='mr-1' size={14}/>
                  {getRoleText(currentUser.vaiTro)}
                </span>
                <span className='text-gray-500 text-sm'>
                  Tài khoản: {currentUser.tenDangNhap}
                </span>
              </div>
              <div className='flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 text-sm text-gray-600'>
                <div className='flex items-center justify-center md:justify-start'>
                  <Calendar className='mr-2 text-blue-600' size={16}/>
                  Tham gia: {new Date(currentUser.ngayTao).toLocaleDateString('vi-VN')}
                </div>
                <div className='flex items-center justify-center md:justify-start'>
                  <School className='mr-2 text-green-600' size={16}/>
                  Mã trường: {currentUser.idTruongHoc}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Contact Information */}
          <div className='bg-white rounded-2xl shadow-xl p-6 border border-blue-100'>
            <h3 className='text-xl font-semibold text-gray-800 mb-6 flex items-center'>
              <Mail className='mr-2 text-blue-600' size={20}/>
              Thông tin liên hệ
            </h3>
            <div className='space-y-6'>
              <div className='group'>
                <label className='block text-sm font-medium text-gray-500 mb-2'>Email</label>
                {isEditing ? (
                  <input
                    type='email'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    defaultValue={currentUser.thongTinCaNhan.email || ''}
                    placeholder='Nhập email'
                  />
                ) : (
                  <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                    <Mail className='mr-3 text-gray-400' size={18}/>
                    <span className='text-gray-700'>
                      {currentUser.thongTinCaNhan.email || 'Chưa cập nhật'}
                    </span>
                  </div>
                )}
              </div>

              <div className='group'>
                <label className='block text-sm font-medium text-gray-500 mb-2'>Số điện thoại</label>
                {isEditing ? (
                  <input
                    type='tel'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    defaultValue={currentUser.thongTinCaNhan.soDienThoai || ''}
                    placeholder='Nhập số điện thoại'
                  />
                ) : (
                  <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                    <Phone className='mr-3 text-gray-400' size={18}/>
                    <span className='text-gray-700'>
                      {currentUser.thongTinCaNhan.soDienThoai || 'Chưa cập nhật'}
                    </span>
                  </div>
                )}
              </div>

              <div className='group'>
                <label className='block text-sm font-medium text-gray-500 mb-2'>Địa chỉ</label>
                {isEditing ? (
                  <textarea
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
                    rows={3}
                    defaultValue={currentUser.thongTinCaNhan.diaChi || ''}
                    placeholder='Nhập địa chỉ'
                  />
                ) : (
                  <div className='flex items-start p-3 bg-gray-50 rounded-lg'>
                    <MapPin className='mr-3 text-gray-400 mt-1' size={18}/>
                    <span className='text-gray-700'>
                      {currentUser.thongTinCaNhan.diaChi || 'Chưa cập nhật'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className='bg-white rounded-2xl shadow-xl p-6 border border-blue-100'>
            <h3 className='text-xl font-semibold text-gray-800 mb-6 flex items-center'>
              <Shield className='mr-2 text-green-600' size={20}/>
              Thông tin hệ thống
            </h3>
            <div className='space-y-6'>
              <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium text-blue-700'>Tên đăng nhập</span>
                  <span className='text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded'>Không thể thay đổi</span>
                </div>
                <span className='text-lg font-semibold text-blue-800'>
                  {currentUser.tenDangNhap}
                </span>
              </div>

              <div className='p-4 bg-green-50 rounded-lg border border-green-200'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium text-green-700'>Vai trò</span>
                  <span className='text-xs text-green-600 bg-green-200 px-2 py-1 rounded'>Được phân quyền</span>
                </div>
                <span className='text-lg font-semibold text-green-800'>
                  {getRoleText(currentUser.vaiTro)}
                </span>
              </div>

              <div className='p-4 bg-purple-50 rounded-lg border border-purple-200'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium text-purple-700'>Mã trường học</span>
                  <span className='text-xs text-purple-600 bg-purple-200 px-2 py-1 rounded'>Hệ thống</span>
                </div>
                <span className='text-lg font-semibold text-purple-800'>
                  {currentUser.idTruongHoc}
                </span>
              </div>

              <div className='p-4 bg-gray-50 rounded-lg border border-gray-200'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium text-gray-700'>Ngày tạo tài khoản</span>
                </div>
                <span className='text-lg font-semibold text-gray-800'>
                  {new Date(currentUser.ngayTao).toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className='mt-8 text-center'>
            <button className='inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'>
              <Save className='mr-2' size={20}/>
              Lưu thay đổi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
