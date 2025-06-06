import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart2, 
  Users, 
  Activity, 
  BriefcaseMedical, 
  Stethoscope,
  Heart,
  Shield,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bell,
  BookOpen,
  Target
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-xl p-8 text-center border border-blue-100'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-3 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-700 text-lg font-medium'>Đang tải thông tin người dùng...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, color, bgColor, description }: any) => (
    <div className={`${bgColor} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-opacity-20`}>
      <div className='flex items-center justify-between mb-4'>
        <div className={`p-3 rounded-xl ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : color === 'yellow' ? 'bg-yellow-100' : color === 'purple' ? 'bg-purple-100' : 'bg-indigo-100'}`}>
          <Icon className={`${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'yellow' ? 'text-yellow-600' : color === 'purple' ? 'text-purple-600' : 'text-indigo-600'}`} size={24}/>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${color === 'blue' ? 'bg-blue-100 text-blue-700' : color === 'green' ? 'bg-green-100 text-green-700' : color === 'yellow' ? 'bg-yellow-100 text-yellow-700' : color === 'purple' ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700'}`}>
          {value}
        </div>
      </div>
      <h3 className='text-lg font-semibold text-gray-800 mb-2'>{title}</h3>
      <p className='text-sm text-gray-600'>{description}</p>
    </div>
  );

  let roleSpecificContent = null;

  if (userRole === 'admin') {
    roleSpecificContent = (
      <div className='space-y-8'>
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-blue-100'>
          <div className='flex items-center mb-6'>
            <div className='p-3 bg-blue-100 rounded-xl mr-4'>
              <Shield className='text-blue-600' size={28}/>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>Bảng điều khiển Quản trị</h3>
              <p className='text-gray-600'>Tổng quan hệ thống và quản lý</p>
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <StatCard 
              icon={Users} 
              title="Quản lý người dùng" 
              value="250+"
              color="blue"
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
              description="Thêm, sửa, xóa tài khoản người dùng"
            />
            <StatCard 
              icon={BarChart2} 
              title="Báo cáo & Thống kê" 
              value="15"
              color="green"
              bgColor="bg-gradient-to-br from-green-50 to-green-100"
              description="Xem các số liệu quan trọng"
            />
            <StatCard 
              icon={TrendingUp} 
              title="Hoạt động hệ thống" 
              value="98%"
              color="purple"
              bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
              description="Tình trạng hoạt động ổn định"
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white rounded-2xl shadow-xl p-6 border border-blue-100'>
            <h4 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
              <Bell className='text-blue-600 mr-2' size={20}/>
              Thông báo gần đây
            </h4>
            <div className='space-y-3'>
              <div className='p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400'>
                <p className='text-sm font-medium text-gray-800'>Cập nhật hệ thống</p>
                <p className='text-xs text-gray-600'>Phiên bản mới đã được triển khai</p>
              </div>
              <div className='p-3 bg-green-50 rounded-lg border-l-4 border-green-400'>
                <p className='text-sm font-medium text-gray-800'>Báo cáo tháng</p>
                <p className='text-xs text-gray-600'>Báo cáo tháng 12 đã sẵn sàng</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-6 border border-blue-100'>
            <h4 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
              <Activity className='text-green-600 mr-2' size={20}/>
              Hoạt động hôm nay
            </h4>
            <div className='space-y-3'>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm text-gray-700'>Đăng nhập mới</span>
                <span className='text-sm font-semibold text-green-600'>+24</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm text-gray-700'>Khám sức khỏe</span>
                <span className='text-sm font-semibold text-blue-600'>12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (userRole === 'y_ta') {
    roleSpecificContent = (
      <div className='space-y-8'>
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-blue-100'>
          <div className='flex items-center mb-6'>
            <div className='p-3 bg-green-100 rounded-xl mr-4'>
              <Stethoscope className='text-green-600' size={28}/>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>Bảng điều khiển Y tá</h3>
              <p className='text-gray-600'>Quản lý hoạt động y tế và chăm sóc sức khỏe</p>
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <StatCard 
              icon={AlertTriangle} 
              title="Sự cố y tế chờ xử lý" 
              value="5"
              color="yellow"
              bgColor="bg-gradient-to-br from-yellow-50 to-yellow-100"
              description="Cần xử lý khẩn cấp"
            />
            <StatCard 
              icon={BriefcaseMedical} 
              title="Yêu cầu thuốc từ PH" 
              value="3"
              color="blue"
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
              description="Yêu cầu mới cần duyệt"
            />
            <StatCard 
              icon={CheckCircle} 
              title="Khám sức khỏe hôm nay" 
              value="12"
              color="green"
              bgColor="bg-gradient-to-br from-green-50 to-green-100"
              description="Đã hoàn thành kiểm tra"
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white rounded-2xl shadow-xl p-6 border border-blue-100'>
            <h4 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
              <Calendar className='text-blue-600 mr-2' size={20}/>
              Lịch làm việc hôm nay
            </h4>
            <div className='space-y-3'>
              <div className='p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400'>
                <p className='text-sm font-medium text-gray-800'>08:00 - Kiểm tra sức khỏe lớp 6A</p>
                <p className='text-xs text-gray-600'>20 học sinh</p>
              </div>
              <div className='p-3 bg-green-50 rounded-lg border-l-4 border-green-400'>
                <p className='text-sm font-medium text-gray-800'>10:00 - Tiêm phòng lớp 7B</p>
                <p className='text-xs text-gray-600'>15 học sinh</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-6 border border-blue-100'>
            <h4 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
              <Heart className='text-red-600 mr-2' size={20}/>
              Tình trạng khẩn cấp
            </h4>
            <div className='space-y-3'>
              <div className='flex items-center justify-between p-3 bg-red-50 rounded-lg'>
                <span className='text-sm text-gray-700'>Dị ứng nghiêm trọng</span>
                <span className='text-sm font-semibold text-red-600'>1</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-yellow-50 rounded-lg'>
                <span className='text-sm text-gray-700'>Theo dõi đặc biệt</span>
                <span className='text-sm font-semibold text-yellow-600'>3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (userRole === 'phu_huynh') {
    roleSpecificContent = (
      <div className='space-y-8'>
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-blue-100'>
          <div className='flex items-center mb-6'>
            <div className='p-3 bg-purple-100 rounded-xl mr-4'>
              <Heart className='text-purple-600' size={28}/>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>Bảng điều khiển Phụ huynh</h3>
              <p className='text-gray-600'>Theo dõi sức khỏe và thông tin con em</p>
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <StatCard 
              icon={BookOpen} 
              title="Hồ sơ sức khỏe con" 
              value="Cập nhật"
              color="purple"
              bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
              description="Xem và cập nhật thông tin dị ứng, tiêm chủng"
            />
            <StatCard 
              icon={Calendar} 
              title="Lịch khám sắp tới" 
              value="2"
              color="blue"
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
              description="Cuộc hẹn trong tuần tới"
            />
            <StatCard 
              icon={Target} 
              title="Mục tiêu sức khỏe" 
              value="85%"
              color="green"
              bgColor="bg-gradient-to-br from-green-50 to-green-100"
              description="Tiến độ đạt được tháng này"
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white rounded-2xl shadow-xl p-6 border border-blue-100'>
            <h4 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
              <Bell className='text-purple-600 mr-2' size={20}/>
              Thông báo về con
            </h4>
            <div className='space-y-3'>
              <div className='p-3 bg-green-50 rounded-lg border-l-4 border-green-400'>
                <p className='text-sm font-medium text-gray-800'>Khám định kỳ hoàn thành</p>
                <p className='text-xs text-gray-600'>Kết quả tốt, không có vấn đề</p>
              </div>
              <div className='p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400'>
                <p className='text-sm font-medium text-gray-800'>Nhắc nhở tiêm phòng</p>
                <p className='text-xs text-gray-600'>Vắc xin HPV cần tiêm trong tuần tới</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-6 border border-blue-100'>
            <h4 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
              <Clock className='text-green-600 mr-2' size={20}/>
              Hoạt động gần đây
            </h4>
            <div className='space-y-3'>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm text-gray-700'>Cập nhật chiều cao/cân nặng</span>
                <span className='text-xs text-gray-500'>2 ngày trước</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm text-gray-700'>Xem kết quả xét nghiệm</span>
                <span className='text-xs text-gray-500'>1 tuần trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
      <div className='p-8'>
        {/* Welcome Header */}
        <div className='bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                Chào mừng trở lại!
              </h1>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                {currentUser.thongTinCaNhan.hoTen}
              </h2>
              <p className='text-gray-600'>
                Hôm nay là {new Date().toLocaleDateString('vi-VN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className='hidden md:block'>
              <div className='p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl'>
                <div className='text-2xl'>🏥</div>
              </div>
            </div>
          </div>
        </div>

        {/* Role-specific Content */}
        {roleSpecificContent || (
          <div className='bg-white rounded-2xl shadow-xl p-8 text-center border border-blue-100'>
            <div className='p-4 bg-gray-100 rounded-xl inline-block mb-4'>
              <BriefcaseMedical className='text-gray-500' size={32}/>
            </div>
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>Chưa có thông tin tổng quan</h3>
            <p className='text-gray-600'>Không có thông tin tổng quan cho vai trò này.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
