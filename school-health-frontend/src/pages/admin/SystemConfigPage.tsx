import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Settings,
  Database,
  Shield,
  Bell,
  Users,
  Lock,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Server
} from 'lucide-react';

interface ConfigSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const SystemConfigPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeSection, setActiveSection] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  const configSections: ConfigSection[] = [
    {
      id: 'general',
      title: 'Cấu hình chung',
      description: 'Thiết lập thông tin cơ bản của hệ thống',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'database',
      title: 'Cơ sở dữ liệu',
      description: 'Quản lý kết nối và sao lưu dữ liệu',
      icon: <Database className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'security',
      title: 'Bảo mật',
      description: 'Cấu hình chính sách bảo mật hệ thống',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'notifications',
      title: 'Thông báo',
      description: 'Thiết lập hệ thống thông báo và email',
      icon: <Bell className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'users',
      title: 'Quản lý người dùng',
      description: 'Cấu hình quyền và vai trò người dùng',
      icon: <Users className="w-6 h-6" />,
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  const systemStats = [
    { label: 'Thời gian hoạt động', value: '99.9%', icon: <Server className="w-5 h-5" />, color: 'text-green-600' },
    { label: 'Số người dùng hoạt động', value: '1,234', icon: <Users className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'Dung lượng đã sử dụng', value: '45.2 GB', icon: <Database className="w-5 h-5" />, color: 'text-purple-600' },
    { label: 'Số phiên đăng nhập', value: '856', icon: <Lock className="w-5 h-5" />, color: 'text-orange-600' }
  ];

  const handleSaveConfig = () => {
    // Simulate saving configuration
    setHasChanges(false);
    alert('Cấu hình đã được lưu thành công!');
  };

  const renderGeneralConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên hệ thống
          </label>
          <input
            type="text"
            defaultValue="Hệ thống Quản lý Sức khỏe Trường học"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={() => setHasChanges(true)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên trường
          </label>
          <input
            type="text"
            defaultValue="THPT Nguyễn Du"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={() => setHasChanges(true)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa chỉ
          </label>
          <textarea
            rows={3}
            defaultValue="123 Đường ABC, Phường XYZ, Quận DEF, TP.HCM"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={() => setHasChanges(true)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thông tin liên hệ
          </label>
          <div className="space-y-2">
            <input
              type="tel"
              placeholder="Số điện thoại"
              defaultValue="(028) 123-4567"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={() => setHasChanges(true)}
            />
            <input
              type="email"
              placeholder="Email"
              defaultValue="admin@thptnguyendu.edu.vn"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={() => setHasChanges(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityConfig = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
          <span className="text-yellow-800 font-medium">Cảnh báo bảo mật</span>
        </div>
        <p className="text-yellow-700 text-sm mt-1">
          Thay đổi cấu hình bảo mật có thể ảnh hưởng đến tất cả người dùng
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Chính sách mật khẩu</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Độ dài tối thiểu</span>
              <input
                type="number"
                defaultValue="8"
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={() => setHasChanges(true)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Yêu cầu ký tự đặc biệt</span>
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                onChange={() => setHasChanges(true)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Thời hạn mật khẩu (ngày)</span>
              <input
                type="number"
                defaultValue="90"
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={() => setHasChanges(true)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Phiên đăng nhập</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Thời gian hết hạn (phút)</span>
              <input
                type="number"
                defaultValue="30"
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={() => setHasChanges(true)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Số lần đăng nhập sai tối đa</span>
              <input
                type="number"
                defaultValue="5"
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={() => setHasChanges(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Cấu hình Email</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="SMTP Server"
              defaultValue="smtp.gmail.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              onChange={() => setHasChanges(true)}
            />
            <input
              type="number"
              placeholder="Port"
              defaultValue="587"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              onChange={() => setHasChanges(true)}
            />
            <input
              type="email"
              placeholder="Email gửi"
              defaultValue="noreply@thptnguyendu.edu.vn"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              onChange={() => setHasChanges(true)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Loại thông báo</h3>
          <div className="space-y-3">
            {[
              'Thông báo tiêm chủng',
              'Thông báo khám sức khỏe',
              'Cảnh báo sức khỏe',
              'Báo cáo định kỳ'
            ].map((type, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{type}</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  onChange={() => setHasChanges(true)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralConfig();
      case 'security':
        return renderSecurityConfig();
      case 'notifications':
        return renderNotificationConfig();
      default:
        return (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Chọn một mục cấu hình để bắt đầu</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Cấu hình Hệ thống
                </h1>
                <p className="text-gray-600 mt-2">
                  Quản lý và tùy chỉnh các thiết lập hệ thống
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {hasChanges && (
                  <button
                    onClick={handleSaveConfig}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                  >
                    <Save className="w-5 h-5" />
                    <span>Lưu thay đổi</span>
                  </button>
                )}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
                  {currentUser?.thongTinCaNhan?.hoTen}
                </div>
              </div>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {systemStats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className={stat.color}>{stat.icon}</div>
                    <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Danh mục cấu hình</h2>
                <div className="space-y-2">
                  {configSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${activeSection === section.id ? 'text-white' : 'text-gray-400'}`}>
                          {section.icon}
                        </div>
                        <div>
                          <div className="font-medium">{section.title}</div>
                          <div className={`text-sm ${activeSection === section.id ? 'text-blue-100' : 'text-gray-500'}`}>
                            {section.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {configSections.find(s => s.id === activeSection)?.title || 'Cấu hình'}
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <RefreshCw className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Đang hoạt động</span>
                  </div>
                </div>
              </div>

              {renderCurrentSection()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => setHasChanges(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSaveConfig}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
          >
            <Save className="w-5 h-5" />
            <span>Lưu cấu hình</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemConfigPage;
