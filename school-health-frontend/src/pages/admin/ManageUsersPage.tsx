import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  Shield
} from 'lucide-react';

// Mock user data
const mockUsers = [
  {
    id: '1',
    hoTen: 'Nguyễn Văn A',
    email: 'admin@thptnguyendu.edu.vn',
    soDienThoai: '0123456789',
    vaiTro: 'admin',
    trangThai: 'hoat_dong',
    ngayTao: '2023-01-15',
    lanDangNhapCuoi: '2023-12-20 14:30'
  },
  {
    id: '2',
    hoTen: 'Trần Thị B',
    email: 'yta.tran@thptnguyendu.edu.vn',
    soDienThoai: '0987654321',
    vaiTro: 'y_ta',
    trangThai: 'hoat_dong',
    ngayTao: '2023-02-20',
    lanDangNhapCuoi: '2023-12-20 09:15'
  },
  {
    id: '3',
    hoTen: 'Lê Văn C',
    email: 'phuhuynh.le@gmail.com',
    soDienThoai: '0369852147',
    vaiTro: 'phu_huynh',
    trangThai: 'tam_khoa',
    ngayTao: '2023-03-10',
    lanDangNhapCuoi: '2023-12-18 16:45'
  },
  {
    id: '4',
    hoTen: 'Phạm Thị D',
    email: 'yta.pham@thptnguyendu.edu.vn',
    soDienThoai: '0258147963',
    vaiTro: 'y_ta',
    trangThai: 'hoat_dong',
    ngayTao: '2023-04-05',
    lanDangNhapCuoi: '2023-12-19 11:20'
  }
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin': return 'bg-red-100 text-red-800';
    case 'y_ta': return 'bg-blue-100 text-blue-800';
    case 'phu_huynh': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'hoat_dong': return 'bg-green-100 text-green-800';
    case 'tam_khoa': return 'bg-yellow-100 text-yellow-800';
    case 'khoa': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'admin': return 'Quản trị viên';
    case 'y_ta': return 'Y tá';
    case 'phu_huynh': return 'Phụ huynh';
    default: return 'Không xác định';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'hoat_dong': return 'Hoạt động';
    case 'tam_khoa': return 'Tạm khóa';
    case 'khoa': return 'Khóa';
    default: return 'Không xác định';
  }
};

const ManageUsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.vaiTro === filterRole;
    const matchesStatus = filterStatus === 'all' || user.trangThai === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center'>
              <div className='p-3 bg-blue-100 rounded-xl mr-4'>
                <Users className='text-blue-600' size={28}/>
              </div>
              <div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Quản Lý Người Dùng
                </h1>
                <p className='text-gray-600'>
                  Quản lý tài khoản và phân quyền người dùng hệ thống
                </p>
              </div>
            </div>
            <button className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1'>
              <Plus className='mr-2' size={20}/>
              Thêm người dùng
            </button>
          </div>

          {/* Search and Filter */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='md:col-span-2 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18}/>
              <input
                type='text'
                placeholder='Tìm kiếm theo tên hoặc email...'
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className='px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            >
              <option value='all'>Tất cả vai trò</option>
              <option value='admin'>Quản trị viên</option>
              <option value='y_ta'>Y tá</option>
              <option value='phu_huynh'>Phụ huynh</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            >
              <option value='all'>Tất cả trạng thái</option>
              <option value='hoat_dong'>Hoạt động</option>
              <option value='tam_khoa'>Tạm khóa</option>
              <option value='khoa'>Khóa</option>
            </select>
          </div>
        </div>

        {/* Users Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredUsers.map((user) => (
            <div key={user.id} className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200'>
              <div className='p-6'>
                {/* User Header */}
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-center'>
                    <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                      {user.hoTen.charAt(0)}
                    </div>
                    <div className='ml-3'>
                      <h3 className='font-semibold text-gray-800'>{user.hoTen}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.vaiTro)}`}>
                        {getRoleLabel(user.vaiTro)}
                      </span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.trangThai)}`}>
                    {getStatusLabel(user.trangThai)}
                  </span>
                </div>

                {/* User Info */}
                <div className='space-y-2 mb-4'>
                  <div className='flex items-center text-sm text-gray-600'>
                    <Mail size={14} className='mr-2'/>
                    {user.email}
                  </div>
                  <div className='flex items-center text-sm text-gray-600'>
                    <Phone size={14} className='mr-2'/>
                    {user.soDienThoai}
                  </div>
                  <div className='flex items-center text-sm text-gray-600'>
                    <Calendar size={14} className='mr-2'/>
                    Tham gia: {new Date(user.ngayTao).toLocaleDateString('vi-VN')}
                  </div>
                  <div className='flex items-center text-sm text-gray-600'>
                    <Shield size={14} className='mr-2'/>
                    Đăng nhập cuối: {user.lanDangNhapCuoi}
                  </div>
                </div>

                {/* Actions */}
                <div className='flex space-x-2'>
                  <button className='flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200'>
                    <Eye size={14} className='mr-1'/>
                    Xem
                  </button>
                  <button className='flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200'>
                    <Edit size={14} className='mr-1'/>
                    Sửa
                  </button>
                  <button className='inline-flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200'>
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className='bg-white rounded-2xl shadow-xl p-12 text-center border border-blue-100'>
            <div className='p-4 bg-gray-100 rounded-full inline-block mb-4'>
              <Users className='text-gray-400' size={32}/>
            </div>
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>
              Không tìm thấy người dùng
            </h3>
            <p className='text-gray-600'>
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className='bg-white rounded-2xl shadow-xl p-6 mt-8 border border-blue-100'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-600'>{mockUsers.length}</div>
              <div className='text-gray-600'>Tổng người dùng</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {mockUsers.filter(u => u.trangThai === 'hoat_dong').length}
              </div>
              <div className='text-gray-600'>Đang hoạt động</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-yellow-600'>
                {mockUsers.filter(u => u.trangThai === 'tam_khoa').length}
              </div>
              <div className='text-gray-600'>Tạm khóa</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-red-600'>
                {mockUsers.filter(u => u.vaiTro === 'admin').length}
              </div>
              <div className='text-gray-600'>Quản trị viên</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;
