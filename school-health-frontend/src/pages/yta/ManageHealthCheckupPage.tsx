import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Users, ChevronDown, ChevronUp, FilePlus, AlertCircle } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ChienDichKhamSucKhoe, HocSinh, KetQuaKhamSucKhoeHocSinh } from '../../types';
import { mockHealthCheckupCampaigns, mockStudentHealthCheckupResults, addStudentHealthCheckupResult } from '../../data/mockCampaigns';
import { useAuth } from '../../contexts/AuthContext';

// Mock student data (can be expanded or moved to a shared mock file if not already done for vaccination page)
const mockAllStudents: HocSinh[] = [
  { id: 'hs001', hoTen: 'Nguyễn Văn An', lop: '1A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-05-10T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs002', hoTen: 'Trần Thị Bình', lop: '1B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-09-15T00:00:00.000Z', gioiTinh: 'nu' },
  { id: 'hs003', hoTen: 'Lê Minh Đức', lop: '2A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph002', ngaySinh: '2015-02-20T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs004', hoTen: 'Phạm Thị Mai', lop: '2B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph003', ngaySinh: '2015-07-22T00:00:00.000Z', gioiTinh: 'nu' },
  { id: 'hs005', hoTen: 'Vũ Đình Khang', lop: '3A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph004', ngaySinh: '2014-01-10T00:00:00.000Z', gioiTinh: 'nam' },
];

type HealthCheckupRecordFormData = Omit<KetQuaKhamSucKhoeHocSinh, 'id' | 'idChienDichKhamSucKhoe' | 'idHocSinh' | 'daGuiThongBaoKetQuaChoPH' | 'ngayGuiThongBaoKetQua'> & {
    ketQuaChiTietString?: string; // For textarea input of JSON-like data
};

const ManageHealthCheckupPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeCampaigns, setActiveCampaigns] = useState<ChienDichKhamSucKhoe[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [eligibleStudents, setEligibleStudents] = useState<HocSinh[]>([]);
  const [studentResults, setStudentResults] = useState<Record<string, KetQuaKhamSucKhoeHocSinh>>({});
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<HealthCheckupRecordFormData>();

  useEffect(() => {
    const campaigns = mockHealthCheckupCampaigns.filter(c => c.trangThai === 'da_duyet' || c.trangThai === 'dang_dien_ra');
    setActiveCampaigns(campaigns);
  }, []);

  useEffect(() => {
    if (selectedCampaignId) {
      const campaign = mockHealthCheckupCampaigns.find(c => c.id === selectedCampaignId);
      if (campaign) {
        const targetAudienceLower = campaign.doiTuongApDung.toLowerCase();
        const students = mockAllStudents.filter(s => {
            if (targetAudienceLower.includes('toàn trường') || targetAudienceLower.includes('toàn thể')) return true;
            if (targetAudienceLower.includes(s.lop.toLowerCase())) return true;
            if (targetAudienceLower.includes('khối ' + s.lop.charAt(0))) return true;
            return false;
        });
        setEligibleStudents(students);
        const resultsForCampaign = mockStudentHealthCheckupResults.filter(r => r.idChienDichKhamSucKhoe === selectedCampaignId);
        const resultsMap: Record<string, KetQuaKhamSucKhoeHocSinh> = {};
        resultsForCampaign.forEach(r => { resultsMap[r.idHocSinh] = r; });
        setStudentResults(resultsMap);
      } else { setEligibleStudents([]); setStudentResults({}); }
    } else { setEligibleStudents([]); setStudentResults({}); }
  }, [selectedCampaignId]);

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setEditingStudentId(null);
  };

  const handleEditResult = (studentId: string) => {
    setEditingStudentId(studentId);
    const existingResult = studentResults[studentId];
    if (existingResult) {
      reset({
        ngayKham: new Date(existingResult.ngayKham).toISOString().substring(0,16),
        ketQuaChiTietString: JSON.stringify(existingResult.ketQuaChiTiet, null, 2),
        ketLuanTongQuatCuaBacSi: existingResult.ketLuanTongQuatCuaBacSi,
        deNghiCuaBacSi: existingResult.deNghiCuaBacSi,
        canHenLichTuVan: existingResult.canHenLichTuVan,
        idBacSiKham: existingResult.idBacSiKham,
      });
    } else {
      reset({
        ngayKham: new Date().toISOString().substring(0,16),
        ketQuaChiTietString: '{}', // Default to empty JSON
        ketLuanTongQuatCuaBacSi: '',
        deNghiCuaBacSi: '',
        canHenLichTuVan: false,
        idBacSiKham: currentUser?.thongTinCaNhan.hoTen || '',
      });
    }
  };

  const onSubmitRecord: SubmitHandler<HealthCheckupRecordFormData> = (data) => {
    if (!selectedCampaignId || !editingStudentId || !currentUser) {
        alert('Lỗi: Thiếu thông tin chiến dịch, học sinh hoặc người dùng.'); return;
    }
    const student = mockAllStudents.find(s => s.id === editingStudentId);
    if (!student) { alert('Lỗi: Không tìm thấy học sinh.'); return; }

    let parsedKetQuaChiTiet = {};
    try {
        if (data.ketQuaChiTietString) {
            parsedKetQuaChiTiet = JSON.parse(data.ketQuaChiTietString);
        }
    } catch (e) {
        alert('Lỗi định dạng JSON trong Kết quả chi tiết. Vui lòng kiểm tra lại.'); return;
    }

    const newResult: KetQuaKhamSucKhoeHocSinh = {
      id: \`kqh\${selectedCampaignId}\${editingStudentId}\${Date.now()}\`,
      idChienDichKhamSucKhoe: selectedCampaignId,
      idHocSinh: editingStudentId,
      ngayKham: new Date(data.ngayKham).toISOString(),
      ketQuaChiTiet: parsedKetQuaChiTiet,
      ketLuanTongQuatCuaBacSi: data.ketLuanTongQuatCuaBacSi,
      deNghiCuaBacSi: data.deNghiCuaBacSi,
      canHenLichTuVan: data.canHenLichTuVan,
      idBacSiKham: data.idBacSiKham,
      daGuiThongBaoKetQuaChoPH: false,
    };

    addStudentHealthCheckupResult(newResult);
    setStudentResults(prev => ({...prev, [editingStudentId]: newResult}));
    alert(\`Đã ghi nhận kết quả khám sức khỏe cho học sinh \${student.hoTen}.\`);
    setEditingStudentId(null);
  };

  if (!currentUser || (currentUser.vaiTro !== 'y_ta' && currentUser.vaiTro !== 'admin')) {
    return <p className='p-6 text-red-500'>Bạn không có quyền truy cập trang này.</p>;
  }
  const selectedCampaignDetails = mockHealthCheckupCampaigns.find(c => c.id === selectedCampaignId);

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-3xl font-semibold text-blue-700 mb-6 border-b pb-3 flex items-center'>
        <Stethoscope size={32} className='mr-3 text-teal-500'/> Ghi Nhận Kết Quả Khám Sức Khỏe
      </h2>
      <div className='mb-6'>
        <label htmlFor='campaignSelect' className='label-style mb-1'>Chọn chiến dịch khám sức khỏe:</label>
        <select id='campaignSelect' value={selectedCampaignId || ''} onChange={(e) => handleSelectCampaign(e.target.value)}
          className='input-style w-full md:w-1/2'>
          <option value=''>-- Chọn chiến dịch --</option>
          {activeCampaigns.map(c => ( <option key={c.id} value={c.id}>{c.tenChienDich}</option> ))}
        </select>
      </div>

      {selectedCampaignDetails && (
        <div className='mb-6 p-4 border rounded-md bg-teal-50'>
            <h3 className='text-xl font-semibold text-teal-700 mb-1'>{selectedCampaignDetails.tenChienDich}</h3>
            <p className='text-sm text-gray-600'><strong>Loại khám:</strong> {selectedCampaignDetails.loaiKham.join(', ')}</p>
            <p className='text-sm text-gray-600'><strong>Đối tượng:</strong> {selectedCampaignDetails.doiTuongApDung}</p>
            <p className='text-sm text-gray-600'><strong>Thời gian:</strong> {new Date(selectedCampaignDetails.thoiGianDuKien).toLocaleString('vi-VN')}</p>
        </div>
      )}

      {selectedCampaignId && (
        <div>
          <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'>
            <Users size={24} className='mr-2'/> Danh sách học sinh ({eligibleStudents.length})
          </h3>
          {eligibleStudents.length === 0 && <p className='text-gray-500'>Không có học sinh nào thuộc đối tượng của chiến dịch này hoặc chưa chọn chiến dịch.</p>}
          <div className='space-y-3 max-h-[60vh] overflow-y-auto'>
            {eligibleStudents.map(student => {
              const result = studentResults[student.id];
              const isEditingThis = editingStudentId === student.id;
              return (
                <div key={student.id} className='border rounded-lg p-3 shadow-sm'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='font-semibold text-gray-800'>{student.hoTen} - Lớp: {student.lop}</p>
                      {result ? (
                        <span className='text-xs px-2 py-0.5 rounded-full text-white bg-green-500'>Đã có kết quả</span>
                      ) : (
                        <span className='text-xs px-2 py-0.5 rounded-full text-white bg-gray-400'>Chưa có KQ</span>
                      )}
                       {result && result.canHenLichTuVan && <AlertCircle size={14} className='inline ml-1 text-red-500' title='Cần hẹn lịch tư vấn'/>}
                    </div>
                    <button onClick={() => isEditingThis ? setEditingStudentId(null) : handleEditResult(student.id)}
                      className='btn-secondary text-xs p-2 flex items-center'>
                      {isEditingThis ? <ChevronUp size={16} className='mr-1'/> : <ChevronDown size={16} className='mr-1'/>}
                      {isEditingThis ? 'Đóng' : (result ? 'Sửa KQ' : 'Nhập KQ')}
                    </button>
                  </div>
                  {isEditingThis && (
                    <form onSubmit={handleSubmit(onSubmitRecord)} className='mt-3 pt-3 border-t space-y-3 bg-gray-50 p-3 rounded-b-md'>
                      <div>
                        <label className='label-style text-xs'>Ngày khám (*)</label>
                        <input type='datetime-local' {...register('ngayKham', {required: true})} className='input-style input-sm' />
                      </div>
                      <div>
                        <label className='label-style text-xs'>Kết quả chi tiết (JSON hoặc text mô tả)</label>
                        <textarea {...register('ketQuaChiTietString')} rows={4} className='input-style input-sm font-mono text-xs' placeholder='{\"matTrai\": \"10/10\", \"canNang\": \"25kg\"}'></textarea>
                        <p className='text-xs text-gray-500 mt-1'>Lưu ý: Nhập dưới dạng JSON hợp lệ nếu có cấu trúc, hoặc mô tả dạng text.</p>
                      </div>
                      <div>
                        <label className='label-style text-xs'>Kết luận tổng quát của bác sĩ (*)</label>
                        <textarea {...register('ketLuanTongQuatCuaBacSi', {required: true})} rows={3} className='input-style input-sm'></textarea>
                      </div>
                       <div>
                        <label className='label-style text-xs'>Đề nghị của bác sĩ</label>
                        <textarea {...register('deNghiCuaBacSi')} rows={2} className='input-style input-sm'></textarea>
                      </div>
                      <div className='flex items-center'>
                        <input type='checkbox' {...register('canHenLichTuVan')} id={\`consult-${student.id}\`} className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2'/>
                        <label htmlFor={\`consult-${student.id}\`} className='label-style text-xs'>Cần hẹn lịch tư vấn với phụ huynh</label>
                      </div>
                       <div>
                        <label className='label-style text-xs'>Bác sĩ/Người khám</label>
                        <input type='text' {...register('idBacSiKham')} className='input-style input-sm' />
                      </div>
                      <div className='text-right'>
                        <button type='button' onClick={() => setEditingStudentId(null)} className='btn-secondary text-xs mr-2'>Hủy</button>
                        <button type='submit' className='btn-primary-teal text-xs'>Lưu Kết Quả Khám</button>
                      </div>
                    </form>
                  )}
                </div>);})}
          </div>
        </div>)}
      <style jsx global>{\`
        .label-style { display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151; }
        .input-style { display: block; width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .input-style.input-sm { padding: 0.35rem 0.5rem; font-size: 0.875rem; }
        .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3B82F6; box-shadow: 0 0 0 2px #BFDBFE; }
        .btn-primary-teal { padding: 0.5rem 1rem; background-color: #0D9488; color: white; border-radius: 0.375rem; font-weight: 500; }
        .btn-primary-teal:hover { background-color: #0F766E; }
        .btn-primary-teal.text-xs { padding: 0.25rem 0.5rem; }
        .btn-secondary { padding: 0.5rem 1rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; font-weight: 500; color: #374151; }
        .btn-secondary:hover { background-color: #F3F4F6; }
        .btn-secondary.text-xs { padding: 0.25rem 0.5rem; }
      \`}</style>
    </div>);};
export default ManageHealthCheckupPage;
