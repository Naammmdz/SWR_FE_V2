import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  CheckSquare, 
  Eye, 
  CalendarHeart, 
  Syringe,
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  MapPin
} from "lucide-react";
import type { ChienDichTiemChung, ChienDichKhamSucKhoe, TrangThaiChienDich } from "../../types";
import {
    mockVaccinationCampaigns, updateCampaignStatus as updateVaccinationCampaignStatus,
    mockHealthCheckupCampaigns, updateHealthCheckupCampaignStatus
} from "../../data/mockCampaigns";
import { useAuth } from "../../contexts/AuthContext";

type CampaignType = "vaccination" | "health_checkup";

const getStatusConfig = (status: TrangThaiChienDich) => {
  const configs = {
    "moi_tao": { label: "Mới tạo", color: "bg-gray-500", textColor: "text-gray-700", bgColor: "bg-gray-50" },
    "cho_duyet": { label: "Chờ duyệt", color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-50" },
    "da_duyet": { label: "Đã duyệt", color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-50" },
    "da_thong_bao_phu_huynh": { label: "Đã TB Phụ huynh", color: "bg-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-50" },
    "dang_dien_ra": { label: "Đang diễn ra", color: "bg-purple-500", textColor: "text-purple-700", bgColor: "bg-purple-50" },
    "tam_dung": { label: "Tạm dừng", color: "bg-orange-500", textColor: "text-orange-700", bgColor: "bg-orange-50" },
    "hoan_thanh": { label: "Hoàn thành", color: "bg-emerald-500", textColor: "text-emerald-700", bgColor: "bg-emerald-50" },
    "da_huy": { label: "Đã hủy", color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50" },
  };
  return configs[status] || { label: status, color: "bg-gray-400", textColor: "text-gray-700", bgColor: "bg-gray-50" };
};

const ManageCampaignsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [vaccinationCampaigns, setVaccinationCampaigns] = useState<ChienDichTiemChung[]>(mockVaccinationCampaigns);
  const [healthCheckupCampaigns, setHealthCheckupCampaigns] = useState<ChienDichKhamSucKhoe[]>(mockHealthCheckupCampaigns);
  const [activeTab, setActiveTab] = useState<CampaignType>("vaccination");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleApproveVaccinationCampaign = (id: string) => {
    if (currentUser && currentUser.vaiTro === "admin") {
      if (updateVaccinationCampaignStatus(id, "da_duyet", currentUser.id)) {
        setVaccinationCampaigns([...mockVaccinationCampaigns]);
        alert('Chiến dịch tiêm chủng ' + id + ' đã được phê duyệt.');
      }
    } else { 
      alert("Bạn không có quyền phê duyệt chiến dịch."); 
    }
  };

  const handleApproveHealthCheckupCampaign = (id: string) => {
    if (currentUser && currentUser.vaiTro === "admin") {
      if (updateHealthCheckupCampaignStatus(id, "da_duyet", currentUser.id)) {
        setHealthCheckupCampaigns([...mockHealthCheckupCampaigns]);
        alert('Chiến dịch khám sức khỏe ' + id + ' đã được phê duyệt.');
      }
    } else { 
      alert("Bạn không có quyền phê duyệt chiến dịch."); 
    }
  };

  if (!currentUser || currentUser.vaiTro !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 text-lg font-semibold">Bạn không có quyền truy cập trang này.</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredVaccinationCampaigns = vaccinationCampaigns.filter(campaign => {
    const matchesSearch = campaign.tenChienDich.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.tenVaccine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.trangThai === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredHealthCheckupCampaigns = healthCheckupCampaigns.filter(campaign => {
    const matchesSearch = campaign.tenChienDich.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.trangThai === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const CampaignCard: React.FC<{campaign: ChienDichTiemChung | ChienDichKhamSucKhoe, type: CampaignType}> = 
    ({ campaign, type }) => {
    const statusConfig = getStatusConfig(campaign.trangThai);
    const isVaccination = type === "vaccination";
    const vaccinationCampaign = campaign as ChienDichTiemChung;
    const healthCampaign = campaign as ChienDichKhamSucKhoe;

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Header with gradient */}
        <div className={`${isVaccination ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isVaccination ? 
                <Syringe className="w-6 h-6 text-white" /> : 
                <CalendarHeart className="w-6 h-6 text-white" />
              }
              <h3 className="text-white font-semibold text-lg truncate">
                {campaign.tenChienDich}
              </h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color} text-white`}>
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {isVaccination ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Vaccine:</span>
                  <span>{vaccinationCampaign.tenVaccine}</span>
                </div>                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Đối tượng:</span>
                  <span>{vaccinationCampaign.doiTuongApDung}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckSquare className="w-4 h-4" />
                  <span className="font-medium">Loại khám:</span>
                  <span className="truncate">{healthCampaign.loaiKham.join(", ")}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Đối tượng:</span>
                  <span>{healthCampaign.doiTuongApDung}</span>
                </div>
              </div>
            )}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Thời gian:</span>
              <span>
                {isVaccination 
                  ? new Date(vaccinationCampaign.thoiGianDuKienBatDau).toLocaleDateString("vi-VN")
                  : new Date(healthCampaign.thoiGianDuKien).toLocaleDateString("vi-VN")
                }
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Địa điểm:</span>
              <span className="truncate">
                {isVaccination 
                  ? (vaccinationCampaign.diaDiemTiemChung || "Chưa xác định")
                  : (healthCampaign.diaDiemKham || "Chưa xác định")
                }
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => alert("Xem chi tiết: " + campaign.id)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Xem chi tiết</span>
            </button>
            
            {(campaign.trangThai === "moi_tao" || campaign.trangThai === "cho_duyet") && (
              <button
                onClick={() => isVaccination ? 
                  handleApproveVaccinationCampaign(campaign.id) : 
                  handleApproveHealthCheckupCampaign(campaign.id)
                }
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Phê duyệt</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Quản lý Chiến dịch
                </h1>
                <p className="text-gray-600 mt-2">
                  Quản lý và theo dõi các chiến dịch tiêm chủng và khám sức khỏe
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
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
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 border border-blue-100">
          <div className="p-6">
            <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab("vaccination")}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === "vaccination"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Syringe className="w-5 h-5" />
                <span>Tiêm chủng</span>
              </button>
              <button
                onClick={() => setActiveTab("health_checkup")}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === "health_checkup"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <CalendarHeart className="w-5 h-5" />
                <span>Khám sức khỏe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Create Campaign Button */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab === "vaccination" ? "Chiến dịch Tiêm chủng" : "Chiến dịch Khám sức khỏe"}
              </h2>
              <Link
                to={activeTab === "vaccination" ? "/admin/chien-dich/tiem-chung/tao-moi" : "/admin/chien-dich/kham-suc-khoe/tao-moi"}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-white font-medium hover:shadow-lg transition-all ${
                  activeTab === "vaccination" 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                    : "bg-gradient-to-r from-blue-500 to-cyan-500"
                }`}
              >
                <Plus className="w-5 h-5" />
                <span>Tạo chiến dịch mới</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 border border-blue-100">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm chiến dịch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-48"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="moi_tao">Mới tạo</option>
                  <option value="cho_duyet">Chờ duyệt</option>
                  <option value="da_duyet">Đã duyệt</option>
                  <option value="dang_dien_ra">Đang diễn ra</option>
                  <option value="hoan_thanh">Hoàn thành</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Cards */}
        {activeTab === "vaccination" && (
          <div>
            {filteredVaccinationCampaigns.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 border border-blue-100 text-center">
                <Syringe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có chiến dịch tiêm chủng nào</h3>
                <p className="text-gray-500 mb-6">Tạo chiến dịch tiêm chủng đầu tiên để bắt đầu</p>
                <Link 
                  to="/admin/chien-dich/tiem-chung/tao-moi"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tạo chiến dịch</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVaccinationCampaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} type="vaccination" />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "health_checkup" && (
          <div>
            {filteredHealthCheckupCampaigns.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 border border-blue-100 text-center">
                <CalendarHeart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có chiến dịch khám sức khỏe nào</h3>
                <p className="text-gray-500 mb-6">Tạo chiến dịch khám sức khỏe đầu tiên để bắt đầu</p>
                <Link 
                  to="/admin/chien-dich/kham-suc-khoe/tao-moi"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tạo chiến dịch</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHealthCheckupCampaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} type="health_checkup" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCampaignsPage;
