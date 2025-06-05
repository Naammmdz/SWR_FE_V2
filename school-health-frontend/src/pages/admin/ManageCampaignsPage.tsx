import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, PlusCircle, CheckSquare, Eye, Edit } from 'lucide-react';
import { ChienDichTiemChung, TrangThaiChienDich } from '../../types';
import { mockVaccinationCampaigns, updateCampaignStatus } from '../../data/mockCampaigns';
import { useAuth } from '../../contexts/AuthContext';

const getStatusLabelAndColor = (status: TrangThaiChienDich): { label: string; color: string } => {
  switch (status) {
    case 'moi_tao': return { label: 'Mới tạo', color: 'bg-gray-400' };
    case 'cho_duyet': return { label: 'Chờ duyệt', color: 'bg-yellow-500' };
    case 'da_duyet': return { label: 'Đã duyệt', color: 'bg-green-500' };
    case 'da_thong_bao_phu_huynh': return { label: 'Đã TB Phụ huynh', color: 'bg-sky-500' };
    case 'dang_dien_ra': return { label: 'Đang diễn ra', color: 'bg-blue-500' };
    case 'tam_dung': return { label: 'Tạm dừng', color: 'bg-orange-500' };
    case 'hoan_thanh': return { label: 'Hoàn thành', color: 'bg-purple-500' };
    case 'da_huy': return { label: 'Đã hủy', color: 'bg-red-600' };
    default: return { label: status, color: 'bg-gray-300' };
  }
};

const ManageCampaignsPage: React.FC = () => {
  const { currentUser } = useAuth();
  // Use state to allow re-renders
  const [campaigns, setCampaigns] = useState<ChienDichTiemChung[]>(mockVaccinationCampaigns);
  // Filter logic can be added here

  const handleApproveCampaign = (id: string) => {
    if (currentUser && currentUser.vaiTro === 'admin') { // Only admin can approve
      if (updateCampaignStatus(id, 'da_duyet', currentUser.id)) {
        setCampaigns([...mockVaccinationCampaigns]); // Trigger re-render
        alert(\`Chiến dịch ${id} đã được phê duyệt.\`);
      }
    } else {
      alert('Bạn không có quyền phê duyệt chiến dịch.');
    }
  };

  // Placeholder for viewing campaign details
  const viewCampaignDetails = (campaign: ChienDichTiemChung) => {
    alert(\`Xem chi tiết chiến dịch: ${campaign.tenChienDich}\`);
    // Navigate to a details page: navigate(\`/admin/chien-dich/${campaign.id}\`)
  };

  if (!currentUser || currentUser.vaiTro !== 'admin') {
    // Y tá có thể xem nhưng không tạo/duyệt? For now, restrict to admin.
    // If y_ta can view, adjust this check.
    return <div className='p-6 text-red-500'>Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-between items-center mb-6 border-b pb-3'>
        <h2 className='text-3xl font-semibold text-blue-700 flex items-center'><ShieldAlert className='mr-2'/>Quản Lý Chiến Dịch</h2>
        <Link
          to='/admin/chien-dich/tiem-chung/tao-moi'
          className='btn-primary flex items-center'
        >
          <PlusCircle size={20} className='mr-2' /> Tạo Chiến Dịch Tiêm Chủng
        </Link>
      </div>
      {/* Add tabs or sections for different campaign types if needed (e.g. Health Checkups) */}
      <h3 class='text-xl font-semibold text-gray-700 mb-2'>Chiến Dịch Tiêm Chủng</h3>
      {campaigns.length === 0 ? (
        <p className='text-gray-600'>Chưa có chiến dịch tiêm chủng nào.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='th-cell'>Tên Chiến Dịch</th>
                <th className='th-cell'>Vắc xin</th>
                <th className='th-cell'>Đối tượng</th>
                <th className='th-cell'>Thời gian dự kiến</th>
                <th className='th-cell text-center'>Trạng Thái</th>
                <th className='th-cell'>Hành động</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {campaigns.filter(c => c.tenVaccine).map(campaign => { // Simple filter for vaccination campaigns
                const statusStyle = getStatusLabelAndColor(campaign.trangThai);
                return (
                  <tr key={campaign.id} className='hover:bg-gray-50'>
                    <td className='td-cell font-medium'>{campaign.tenChienDich}</td>
                    <td className='td-cell'>{campaign.tenVaccine}</td>
                    <td className='td-cell text-xs'>{campaign.doiTuongApDung}</td>
                    <td className='td-cell text-xs'>
                      {new Date(campaign.thoiGianDuKienBatDau).toLocaleDateString('vi-VN')} -
                      {new Date(campaign.thoiGianDuKienKetThuc).toLocaleDateString('vi-VN')}
                    </td>
                    <td className='td-cell text-center'>
                      <span className={\`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusStyle.color}\`}>
                        {statusStyle.label}
                      </span>
                    </td>
                    <td className='td-cell space-x-2 whitespace-nowrap'>
                      <button onClick={() => viewCampaignDetails(campaign)} className='text-blue-600 hover:text-blue-800 text-xs flex items-center'><Eye size={14} className='mr-1'/>Xem</button>
                      {/* <button className='text-yellow-600 hover:text-yellow-800 text-xs flex items-center'><Edit size={14} className='mr-1'/>Sửa</button> */}
                      {campaign.trangThai === 'moi_tao' || campaign.trangThai === 'cho_duyet' ? (
                        <button
                            onClick={() => handleApproveCampaign(campaign.id)}
                            className='text-green-600 hover:text-green-800 text-xs flex items-center'>
                            <CheckSquare size={14} className='mr-1'/>Duyệt
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <style jsx global>{`
        .th-cell { padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #4B5563; text-transform: uppercase; letter-spacing: 0.05em; }
        .td-cell { padding: 0.75rem 1rem; font-size: 0.875rem; color: #374151; }
        .btn-primary { padding: 0.5rem 1rem; background-color: #2563EB; color: white; border-radius: 0.375rem; font-weight: 500; }
        .btn-primary:hover { background-color: #1D4ED8; }
      `}</style>
    </div>
  );
};
export default ManageCampaignsPage;
