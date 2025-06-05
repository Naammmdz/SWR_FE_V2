import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { HocSinh, HoSoSucKhoe } from '../../types';
import { getHealthProfileByStudentId } from '../../data/mockHealthProfiles';
import { UserSquare2, Edit, ChevronDown, ChevronUp, HeartPulse, ShieldPlus, Droplets, Glasses, Ear, StickyNote } from 'lucide-react';

// Assuming mockAllStudents is available or fetched based on parent
// For this example, let's use a local mock or fetch via AuthContext if available
const mockUserChildrenData: HocSinh[] = [ // This should ideally come from a shared source or AuthContext
  { id: 'hs001', hoTen: 'Nguyễn Văn An', lop: '1A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-05-10T00:00:00.000Z', gioiTinh: 'nam', idHoSoSucKhoe: 'hsk001' },
  { id: 'hs002', hoTen: 'Trần Thị Bình', lop: '1B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-09-15T00:00:00.000Z', gioiTinh: 'nu', idHoSoSucKhoe: 'hsk002' },
];


const StudentHealthProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userChildren, setUserChildren] = useState<HocSinh[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [healthProfile, setHealthProfile] = useState<HoSoSucKhoe | null | undefined>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      // In a real app, fetch children linked to currentUser.id
      const childrenOfCurrentUser = mockUserChildrenData.filter(c => c.idNguoiGiamHoChinh === currentUser.id);
      setUserChildren(childrenOfCurrentUser);
      if (childrenOfCurrentUser.length > 0) {
        // setSelectedChildId(childrenOfCurrentUser[0].id); // Auto-select first child
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedChildId) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const profile = getHealthProfileByStudentId(selectedChildId);
        setHealthProfile(profile);
        setLoading(false);
      }, 300); // Simulate delay
    } else {
      setHealthProfile(null);
    }
  }, [selectedChildId]);

  const handleChildChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChildId(e.target.value);
  };

  if (!currentUser || currentUser.vaiTro !== 'phu_huynh') {
    return <div className='p-6 text-red-500'>Bạn không có quyền truy cập trang này.</div>;
  }

  const selectedChild = userChildren.find(c => c.id === selectedChildId);

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto'>
      <h2 className='text-3xl font-semibold text-blue-700 mb-6 border-b pb-3 flex items-center'>
        <UserSquare2 size={32} className='mr-3 text-blue-600'/> Hồ Sơ Sức Khỏe Của Con
      </h2>

      {userChildren.length === 0 && <p>Không tìm thấy thông tin học sinh nào cho tài khoản của bạn.</p>}

      {userChildren.length > 1 && (
        <div className='mb-6'>
          <label htmlFor='childSelect' className='label-style mb-1'>Chọn con:</label>
          <select id='childSelect' value={selectedChildId || ''} onChange={handleChildChange} className='input-style w-full md:w-1/2'>
            <option value=''>-- Vui lòng chọn --</option>
            {userChildren.map(child => (
              <option key={child.id} value={child.id}>{child.hoTen} - Lớp {child.lop}</option>
            ))}
          </select>
        </div>
      )}
      {userChildren.length === 1 && !selectedChildId && setSelectedChildId(userChildren[0].id)}


      {loading && <p>Đang tải hồ sơ...</p>}

      {!loading && selectedChildId && !healthProfile &&
        <div className='text-center p-6 border rounded-md bg-yellow-50'>
            <p className='text-yellow-700'>Chưa có hồ sơ sức khỏe cho {selectedChild?.hoTen || 'học sinh này'}.</p>
            <button onClick={() => navigate(\`/phu-huynh/ho-so-con/${selectedChildId}/tao-moi\`)} className='btn-primary mt-3'>
                Tạo Hồ Sơ Mới
            </button>
        </div>
      }

      {healthProfile && selectedChild && (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-2xl font-semibold text-gray-800'>Thông tin của: {selectedChild.hoTen}</h3>
            <button
              onClick={() => navigate(\`/phu-huynh/ho-so-con/${selectedChildId}/chinh-sua\`)}
              className='btn-primary-outline flex items-center text-sm'
            >
              <Edit size={16} className='mr-1'/> Chỉnh sửa hồ sơ
            </button>
          </div>

          <div className='space-y-4 text-sm'>
            <InfoRow icon={<Droplets/>} label='Nhóm máu:' value={healthProfile.nhomMau || 'Chưa cập nhật'} />
            <InfoSection icon={<ShieldPlus/>} title='Dị ứng:' items={healthProfile.diUng} />
            <InfoSection icon={<HeartPulse/>} title='Bệnh mãn tính:' items={healthProfile.benhManTinh} />
            <InfoRow icon={<StickyNote/>} label='Tiền sử điều trị:' value={healthProfile.tienSuDieuTri || 'Không có'} multiline />

            <CollapsibleSection title='Thông tin thị lực' icon={<Glasses/>}>
                <InfoRow label='Mắt trái:' value={healthProfile.thiLuc?.matTrai} />
                <InfoRow label='Mắt phải:' value={healthProfile.thiLuc?.matPhai} />
                <InfoRow label='Ngày khám:' value={healthProfile.thiLuc?.ngayKham ? new Date(healthProfile.thiLuc.ngayKham).toLocaleDateString('vi-VN') : ''} />
                <InfoRow label='Ghi chú thị lực:' value={healthProfile.thiLuc?.ghiChu} />
            </CollapsibleSection>

            <CollapsibleSection title='Thông tin thính lực' icon={<Ear/>}>
                <InfoRow label='Tai trái:' value={healthProfile.thinhLuc?.taiTrai} />
                <InfoRow label='Tai phải:' value={healthProfile.thinhLuc?.taiPhai} />
                <InfoRow label='Ngày khám:' value={healthProfile.thinhLuc?.ngayKham ? new Date(healthProfile.thinhLuc.ngayKham).toLocaleDateString('vi-VN') : ''} />
                <InfoRow label='Ghi chú thính lực:' value={healthProfile.thinhLuc?.ghiChu} />
            </CollapsibleSection>

            <CollapsibleSection title='Lịch sử tiêm chủng (do phụ huynh khai báo)' icon={<ShieldPlus className='text-green-600'/>}>
                {healthProfile.tiemChung && healthProfile.tiemChung.length > 0 ? healthProfile.tiemChung.map((tiem, index) => (
                    <div key={index} className='py-1 border-b border-gray-100 last:border-b-0'>
                        <p><strong>Vắc xin:</strong> {tiem.tenVaccine}</p>
                        <p><strong>Ngày tiêm:</strong> {new Date(tiem.ngayTiem).toLocaleDateString('vi-VN')}</p>
                        {tiem.lieuLuong && <p><strong>Liều lượng:</strong> {tiem.lieuLuong}</p>}
                        {tiem.ghiChu && <p><strong>Ghi chú:</strong> {tiem.ghiChu}</p>}
                    </div>
                )) : <p>Chưa có thông tin tiêm chủng.</p>}
            </CollapsibleSection>

            <InfoRow icon={<StickyNote/>} label='Ghi chú khác:' value={healthProfile.ghiChuKhac || 'Không có'} multiline/>
            <InfoRow label='Cập nhật lần cuối:' value={\`${new Date(healthProfile.ngayCapNhatCuoi).toLocaleString('vi-VN')} bởi (ID: ${healthProfile.idNguoiCapNhatCuoi})\`} />
          </div>
        </div>
      )}
      <style jsx global>{`
        .label-style { display: block; font-size: 0.875rem; font-weight: 500; color: #374151; }
        .input-style { display: block; width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; }
        .btn-primary-outline { padding: 0.375rem 0.75rem; border: 1px solid #2563EB; color: #2563EB; border-radius: 0.375rem; }
        .btn-primary-outline:hover { background-color: #EFF6FF; }
        .btn-primary { padding: 0.5rem 1rem; background-color: #2563EB; color: white; border-radius: 0.375rem; font-weight: 500; }
        .btn-primary:hover { background-color: #1D4ED8; }
      `}</style>
    </div>
  );
};

const InfoRow: React.FC<{icon?: React.ReactNode, label: string, value?: string | null, multiline?: boolean}> = ({icon, label, value, multiline}) => (
  <div className='py-2 border-b border-gray-100 last:border-b-0 flex items-start'>
    {icon && <span className='mr-2 text-blue-500 mt-0.5'>{icon}</span>}
    <strong className='w-1/3 text-gray-600'>{label}</strong>
    {multiline ?
        <p className='w-2/3 text-gray-800 whitespace-pre-wrap'>{value || 'Chưa cập nhật'}</p> :
        <p className='w-2/3 text-gray-800'>{value || 'Chưa cập nhật'}</p>
    }
  </div>
);

const InfoSection: React.FC<{icon?: React.ReactNode, title: string, items?: string[] | null}> = ({icon, title, items}) => (
  <div className='py-2 border-b border-gray-100 last:border-b-0'>
    <div className='flex items-start'>
        {icon && <span className='mr-2 text-blue-500 mt-0.5'>{icon}</span>}
        <strong className='w-1/3 text-gray-600'>{title}</strong>
        <div className='w-2/3'>
        {items && items.length > 0 ? (
            <ul className='list-disc list-inside ml-0'>
            {items.map((item, index) => <li key={index} className='text-gray-800'>{item}</li>)}
            </ul>
        ) : <p className='text-gray-800'>Chưa cập nhật</p>}
        </div>
    </div>
  </div>
);

const CollapsibleSection: React.FC<{title: string, icon?: React.ReactNode, children: React.ReactNode}> = ({title, icon, children}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='py-2 border-b border-gray-100 last:border-b-0'>
            <button onClick={() => setIsOpen(!isOpen)} className='w-full flex justify-between items-center text-left text-gray-700 hover:text-blue-600'>
                <div className='flex items-center'>
                    {icon && <span className='mr-2 text-blue-500'>{icon}</span>}
                    <strong className='font-medium'>{title}</strong>
                </div>
                {isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
            </button>
            {isOpen && <div className='mt-2 pl-6 pr-2 space-y-1'>{children}</div>}
        </div>
    )
}

export default StudentHealthProfilePage;
