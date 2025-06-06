import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Download, 
  Calendar,
  Users,
  Activity,
  Shield,
  PieChart,
  ArrowUpRight,
  Filter
} from 'lucide-react';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: {
    value: string;
    change: string;
    trend: 'up' | 'down';
  };
}

const ReportsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReportType, setSelectedReportType] = useState('all');

  const reportCards: ReportCard[] = [
    {
      id: 'health-checkup',
      title: 'Báo cáo Khám sức khỏe',
      description: 'Thống kê tình hình khám sức khỏe học sinh',
      icon: <Activity className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      stats: { value: '1,234', change: '+12%', trend: 'up' }
    },
    {
      id: 'vaccination',
      title: 'Báo cáo Tiêm chủng',
      description: 'Thống kê tình hình tiêm chủng và vaccine',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      stats: { value: '856', change: '+8%', trend: 'up' }
    },
    {
      id: 'attendance',
      title: 'Báo cáo Tham gia',
      description: 'Tỷ lệ tham gia các chương trình y tế',
      icon: <Users className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      stats: { value: '92%', change: '+5%', trend: 'up' }
    },
    {
      id: 'trends',
      title: 'Báo cáo Xu hướng',
      description: 'Phân tích xu hướng sức khỏe theo thời gian',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      stats: { value: '15', change: '-3%', trend: 'down' }
    }
  ];
  const quickReports = [
    { name: 'Báo cáo hàng ngày', period: 'Hôm nay', count: 45 },
    { name: 'Báo cáo tuần này', period: 'Tuần này', count: 312 },
    { name: 'Báo cáo tháng này', period: 'Tháng này', count: 1247 },
    { name: 'Báo cáo quý này', period: 'Quý này', count: 3891 }
  ];

  const generateReport = (reportId: string) => {
    // Simulate report generation
    alert(`Đang tạo báo cáo: ${reportCards.find(r => r.id === reportId)?.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Báo cáo & Thống kê
                </h1>
                <p className="text-gray-600 mt-2">
                  Trung tâm báo cáo và phân tích dữ liệu sức khỏe học sinh
                </p>
              </div>
              <div className="flex items-center space-x-4">                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
                  {currentUser?.thongTinCaNhan?.hoTen}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('vi-VN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="day">Hôm nay</option>
                  <option value="week">Tuần này</option>
                  <option value="month">Tháng này</option>
                  <option value="quarter">Quý này</option>
                  <option value="year">Năm này</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-blue-500" />
                <select 
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tất cả báo cáo</option>
                  <option value="health">Khám sức khỏe</option>
                  <option value="vaccination">Tiêm chủng</option>
                  <option value="attendance">Tham gia</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reportCards.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => generateReport(report.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${report.color} text-white p-3 rounded-xl`}>
                  {report.icon}
                </div>
                <div className="flex items-center text-sm">
                  <span className={`font-semibold ${report.stats.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    {report.stats.change}
                  </span>
                  <ArrowUpRight className={`w-4 h-4 ml-1 ${report.stats.trend === 'up' ? 'text-green-600' : 'text-red-500 rotate-90'}`} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{report.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{report.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {report.stats.value}
                </span>
                <Download className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Reports */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Báo cáo nhanh</h2>
              <PieChart className="w-6 h-6 text-blue-500" />
            </div>
            
            <div className="space-y-4">
              {quickReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all">
                  <div>
                    <h3 className="font-semibold text-gray-800">{report.name}</h3>
                    <p className="text-sm text-gray-600">{report.period}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-blue-600">{report.count.toLocaleString()}</span>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Biểu đồ thống kê</h2>
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600">Biểu đồ sẽ được hiển thị tại đây</p>
                <p className="text-sm text-gray-500 mt-2">Tích hợp với thư viện biểu đồ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Xuất báo cáo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all">
              <Download className="w-5 h-5" />
              <span>Xuất Excel</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all">
              <FileText className="w-5 h-5" />
              <span>Xuất PDF</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all">
              <BarChart3 className="w-5 h-5" />
              <span>Xuất biểu đồ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
