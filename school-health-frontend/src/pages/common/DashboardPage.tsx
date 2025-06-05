import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart2, Users, Activity, BriefcaseMedical } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return <div className='p-6 text-gray-700'>Đang tải thông tin người dùng...</div>;
  }

  let roleSpecificContent = null;

  if (userRole === 'admin') {
    roleSpecificContent = (
      <>
        <h3 className='text-xl font-semibold text-gray-700 mb-4'>Tổng quan hệ thống (Admin)</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='bg-blue-100 p-4 rounded-lg shadow'>
            <Users className='text-blue-500 mb-2' size={32}/>
            <p className='text-lg font-semibold text-blue-700'>Quản lý người dùng</p>
            <p className='text-sm text-blue-600'>Thêm, sửa, xóa tài khoản.</p>
          </div>
          <div className='bg-green-100 p-4 rounded-lg shadow'>
            <BarChart2 className='text-green-500 mb-2' size={32}/>
            <p className='text-lg font-semibold text-green-700'>Báo cáo & Thống kê</p>
            <p className='text-sm text-green-600'>Xem các số liệu quan trọng.</p>
          </div>
        </div>
      </>
    );
  } else if (userRole === 'y_ta') {
    roleSpecificContent = (
      <>
        <h3 className='text-xl font-semibold text-gray-700 mb-4'>Hoạt động Y tế (Y tá)</h3>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='bg-yellow-100 p-4 rounded-lg shadow'>
            <Activity className='text-yellow-500 mb-2' size={32}/>
            <p className='text-lg font-semibold text-yellow-700'>Sự cố y tế chờ xử lý</p>
            <p className='text-sm text-yellow-600'>5 sự cố mới</p> {/* Dummy data */}
          </div>
          <div className='bg-indigo-100 p-4 rounded-lg shadow'>
            <BriefcaseMedical className='text-indigo-500 mb-2' size={32}/>
            <p className='text-lg font-semibold text-indigo-700'>Yêu cầu thuốc từ PH</p>
            <p className='text-sm text-indigo-600'>3 yêu cầu mới</p> {/* Dummy data */}
          </div>
        </div>
      </>
    );
  } else if (userRole === 'phu_huynh') {
    roleSpecificContent = (
      <>
        <h3 className='text-xl font-semibold text-gray-700 mb-4'>Thông tin Sức khỏe Con (Phụ huynh)</h3>
        {/* Placeholder for parent's dashboard items */}
        <div className='bg-purple-100 p-4 rounded-lg shadow'>
           <BriefcaseMedical className='text-purple-500 mb-2' size={32}/>
          <p className='text-lg font-semibold text-purple-700'>Xem hồ sơ sức khỏe của con</p>
          <p className='text-sm text-purple-600'>Cập nhật thông tin dị ứng, tiêm chủng.</p>
        </div>
      </>
    );
  }

  return (
    <div className='p-6'>
      <h2 className='text-3xl font-semibold text-blue-700 mb-2'>
        Chào mừng trở lại, {currentUser.thongTinCaNhan.hoTen}!
      </h2>
      <p className='text-gray-600 mb-6'>Đây là trang tổng quan dành cho bạn.</p>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        {roleSpecificContent || <p>Không có thông tin tổng quan cho vai trò này.</p>}
      </div>
      {/* More dashboard widgets can be added here */}
    </div>
  );
};

export default DashboardPage;
