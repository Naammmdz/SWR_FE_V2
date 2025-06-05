import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ClipboardPlus, PlusCircle, CheckSquare, Eye, Edit, CalendarHeart, Syringe } from "lucide-react";
import { ChienDichTiemChung, ChienDichKhamSucKhoe, TrangThaiChienDich } from "../../types";
import {
    mockVaccinationCampaigns, updateCampaignStatus as updateVaccinationCampaignStatus,
    mockHealthCheckupCampaigns, updateHealthCheckupCampaignStatus
} from "../../data/mockCampaigns";
import { useAuth } from "../../contexts/AuthContext";

type CampaignType = "vaccination" | "health_checkup";

const getStatusLabelAndColor = (status: TrangThaiChienDich): { label: string; color: string } => {
  switch (status) {
    case "moi_tao": return { label: "Mới tạo", color: "bg-gray-400" };
    case "cho_duyet": return { label: "Chờ duyệt", color: "bg-yellow-500" };
    case "da_duyet": return { label: "Đã duyệt", color: "bg-green-500" };
    case "da_thong_bao_phu_huynh": return { label: "Đã TB Phụ huynh", color: "bg-sky-500" };
    case "dang_dien_ra": return { label: "Đang diễn ra", color: "bg-blue-500" };
    case "tam_dung": return { label: "Tạm dừng", color: "bg-orange-500" };
    case "hoan_thanh": return { label: "Hoàn thành", color: "bg-purple-500" };
    case "da_huy": return { label: "Đã hủy", color: "bg-red-600" };
    default: return { label: status, color: "bg-gray-300" };
  }
};

const ManageCampaignsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [vaccinationCampaigns, setVaccinationCampaigns] = useState<ChienDichTiemChung[]>(mockVaccinationCampaigns);
  const [healthCheckupCampaigns, setHealthCheckupCampaigns] = useState<ChienDichKhamSucKhoe[]>(mockHealthCheckupCampaigns);
  const [activeTab, setActiveTab] = useState<CampaignType>("vaccination");

  const handleApproveVaccinationCampaign = (id: string) => {
    if (currentUser && currentUser.vaiTro === "admin") {
      if (updateVaccinationCampaignStatus(id, "da_duyet", currentUser.id)) {
        setVaccinationCampaigns([...mockVaccinationCampaigns]);
        alert(\`Chiến dịch tiêm chủng ${id} đã được phê duyệt.\`);
      }
    } else { alert("Bạn không có quyền phê duyệt chiến dịch."); }
  };

  const handleApproveHealthCheckupCampaign = (id: string) => {
    if (currentUser && currentUser.vaiTro === "admin") {
      if (updateHealthCheckupCampaignStatus(id, "da_duyet", currentUser.id)) {
        setHealthCheckupCampaigns([...mockHealthCheckupCampaigns]);
        alert(\`Chiến dịch khám sức khỏe ${id} đã được phê duyệt.\`);
      }
    } else { alert("Bạn không có quyền phê duyệt chiến dịch."); }
  };

  if (!currentUser || currentUser.vaiTro !== "admin") {
    return <div className="p-6 text-red-500">Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="text-3xl font-semibold text-blue-700 flex items-center"><ShieldAlert className="mr-2"/>Quản Lý Chiến Dịch</h2>
        {activeTab === "vaccination" && (
            <Link to="/admin/chien-dich/tiem-chung/tao-moi" className="btn-primary flex items-center">
                <Syringe size={18} className="mr-2" /> Tạo Chiến Dịch Tiêm Chủng
            </Link>
        )}
        {activeTab === "health_checkup" && (
            <Link to="/admin/chien-dich/kham-suc-khoe/tao-moi" className="btn-primary-teal flex items-center">
                <CalendarHeart size={18} className="mr-2" /> Tạo Chiến Dịch Khám Sức Khỏe
            </Link>
        )}
      </div>
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab("vaccination")}
            className={\`${activeTab === "vaccination" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
                        whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center\`}>
            <Syringe size={16} className="mr-2" /> Tiêm Chủng ({vaccinationCampaigns.length})
          </button>
          <button onClick={() => setActiveTab("health_checkup")}
            className={\`${activeTab === "health_checkup" ? "border-teal-500 text-teal-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
                        whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center\`}>
            <CalendarHeart size={16} className="mr-2" /> Khám Sức Khỏe ({healthCheckupCampaigns.length})
          </button>
        </nav>
      </div>
      {activeTab === "vaccination" && (
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Danh sách Chiến Dịch Tiêm Chủng</h3>
          {vaccinationCampaigns.length === 0 ? <p className="text-gray-600">Chưa có chiến dịch tiêm chủng nào.</p> : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr>
                    <th className="th-cell">Tên Chiến Dịch</th><th className="th-cell">Vắc xin</th><th className="th-cell">Đối tượng</th>
                    <th className="th-cell">Thời gian</th><th className="th-cell text-center">Trạng Thái</th><th className="th-cell">Hành động</th>
                </tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vaccinationCampaigns.map(campaign => {
                    const statusStyle = getStatusLabelAndColor(campaign.trangThai);
                    return (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="td-cell font-medium">{campaign.tenChienDich}</td>
                        <td className="td-cell">{campaign.tenVaccine}</td>
                        <td className="td-cell text-xs">{campaign.doiTuongApDung}</td>
                        <td className="td-cell text-xs">
                          {new Date(campaign.thoiGianDuKienBatDau).toLocaleDateString("vi-VN")} -
                          {new Date(campaign.thoiGianDuKienKetThuc).toLocaleDateString("vi-VN")}
                        </td>
                        <td className="td-cell text-center"><span className={\`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusStyle.color}\`}>{statusStyle.label}</span></td>
                        <td className="td-cell space-x-2 whitespace-nowrap">
                          <button onClick={() => alert("Xem chi tiết: " + campaign.id)} className="text-blue-600 hover:text-blue-800 text-xs flex items-center"><Eye size={14} className="mr-1"/>Xem</button>
                          {(campaign.trangThai === "moi_tao" || campaign.trangThai === "cho_duyet") &&
                            <button onClick={() => handleApproveVaccinationCampaign(campaign.id)} className="text-green-600 hover:text-green-800 text-xs flex items-center"><CheckSquare size={14} className="mr-1"/>Duyệt</button>}
                        </td>
                      </tr>);
                  })}
                </tbody>
              </table></div>)}</section>)}
      {activeTab === "health_checkup" && (
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Danh sách Chiến Dịch Khám Sức Khỏe</h3>
          {healthCheckupCampaigns.length === 0 ? <p className="text-gray-600">Chưa có chiến dịch khám sức khỏe nào.</p> : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr>
                    <th className="th-cell">Tên Chiến Dịch</th><th className="th-cell">Loại khám</th><th className="th-cell">Đối tượng</th>
                    <th className="th-cell">Thời gian DK</th><th className="th-cell text-center">Trạng Thái</th><th className="th-cell">Hành động</th>
                </tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {healthCheckupCampaigns.map(campaign => {
                    const statusStyle = getStatusLabelAndColor(campaign.trangThai);
                    return (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="td-cell font-medium">{campaign.tenChienDich}</td>
                        <td className="td-cell text-xs">{campaign.loaiKham.join(", ")}</td>
                        <td className="td-cell text-xs">{campaign.doiTuongApDung}</td>
                        <td className="td-cell text-xs">{new Date(campaign.thoiGianDuKien).toLocaleDateString("vi-VN")}</td>
                        <td className="td-cell text-center"><span className={\`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusStyle.color}\`}>{statusStyle.label}</span></td>
                        <td className="td-cell space-x-2 whitespace-nowrap">
                          <button onClick={() => alert("Xem chi tiết: " + campaign.id)} className="text-blue-600 hover:text-blue-800 text-xs flex items-center"><Eye size={14} className="mr-1"/>Xem</button>
                           {(campaign.trangThai === "moi_tao" || campaign.trangThai === "cho_duyet") &&
                            <button onClick={() => handleApproveHealthCheckupCampaign(campaign.id)} className="text-green-600 hover:text-green-800 text-xs flex items-center"><CheckSquare size={14} className="mr-1"/>Duyệt</button>}
                        </td></tr>); })}</tbody></table></div>)}</section>)}
      <style jsx global>{`
        .th-cell { padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #4B5563; text-transform: uppercase; letter-spacing: 0.05em; }
        .td-cell { padding: 0.75rem 1rem; font-size: 0.875rem; color: #374151; }
        .btn-primary { padding: 0.5rem 0.75rem; background-color: #2563EB; color: white; border-radius: 0.375rem; font-weight: 500; font-size: 0.875rem; }
        .btn-primary:hover { background-color: #1D4ED8; }
        .btn-primary-teal { padding: 0.5rem 0.75rem; background-color: #0D9488; color: white; border-radius: 0.375rem; font-weight: 500; font-size: 0.875rem; }
        .btn-primary-teal:hover { background-color: #0F766E; }
      `}</style>
    </div>
  );
};
export default ManageCampaignsPage;
