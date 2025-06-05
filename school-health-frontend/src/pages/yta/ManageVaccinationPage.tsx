import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Syringe, Users, ListFilter, CheckCircle, XCircle, Edit2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ChienDichTiemChung, HocSinh, KetQuaTiemChungHocSinh, TrangThaiThamGiaTiemChung } from '../../types';
import { mockVaccinationCampaigns, mockStudentVaccinationResults, addStudentVaccinationResult } from '../../data/mockCampaigns';
import { useAuth } from '../../contexts/AuthContext';

// Mock student data (can be expanded or moved to a shared mock file)
const mockAllStudents: HocSinh[] = [
  { id: 'hs001', hoTen: 'Nguyễn Văn An', lop: '1A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-05-10T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs002', hoTen: 'Trần Thị Bình', lop: '1B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-09-15T00:00:00.000Z', gioiTinh: 'nu' },
  { id: 'hs003', hoTen: 'Lê Minh Đức', lop: '2A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph002', ngaySinh: '2015-02-20T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs004', hoTen: 'Phạm Thị Mai', lop: '2B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph003', ngaySinh: '2015-07-22T00:00:00.000Z', gioiTinh: 'nu' },
  { id: 'hs005', hoTen: 'Vũ Đình Khang', lop: '3A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph004', ngaySinh: '2014-01-10T00:00:00.000Z', gioiTinh: 'nam' },
];

type VaccinationRecordFormData = Omit<KetQuaTiemChungHocSinh, 'id' | 'idChienDichTiemChung' | 'idHocSinh' | 'idPhuHuynh' | 'daGuiThongBaoKetQuaChoPH' | 'ngayGuiThongBaoKetQua'>;

const trangThaiTiemOptions: { value: TrangThaiThamGiaTiemChung; label: string }[] = [
    { value: 'da_tiem', label: 'Đã tiêm' },
    { value: 'hoan_tiem', label: 'Hoãn tiêm' },
    { value: 'chong_chi_dinh', label: 'Chống chỉ định' },
    // 'chua_dang_ky', 'da_dong_y', 'da_tu_choi' might not be set by nurse here
];


const ManageVaccinationPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeCampaigns, setActiveCampaigns] = useState<ChienDichTiemChung[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [eligibleStudents, setEligibleStudents] = useState<HocSinh[]>([]);
  const [studentResults, setStudentResults] = useState<Record<string, KetQuaTiemChungHocSinh>>({}); // studentId -> result
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<VaccinationRecordFormData>();

  useEffect(() => {
    // Filter for 'da_duyet' or 'dang_dien_ra' campaigns
    const campaigns = mockVaccinationCampaigns.filter(c => c.trangThai === 'da_duyet' || c.trangThai === 'dang_dien_ra');
    setActiveCampaigns(campaigns);
    if (campaigns.length > 0 && !selectedCampaignId) {
      // setSelectedCampaignId(campaigns[0].id); // Auto-select first one
    }
  }, []);

  useEffect(() => {
    if (selectedCampaignId) {
      const campaign = mockVaccinationCampaigns.find(c => c.id === selectedCampaignId);
      if (campaign) {
        // Simplified eligibility filter - can be made more robust
        const targetAudienceLower = campaign.doiTuongApDung.toLowerCase();
        const students = mockAllStudents.filter(s => {
            if (targetAudienceLower.includes('toàn trường') || targetAudienceLower.includes('toàn thể')) return true;
            if (targetAudienceLower.includes(s.lop.toLowerCase())) return true;
            if (targetAudienceLower.includes(\`khối ${s.lop.charAt(0)}\`)) return true; // e.g. 'Khối 1' matches '1A', '1B'
            return false;
        });
        setEligibleStudents(students);

        // Load existing results for this campaign
        const resultsForCampaign = mockStudentVaccinationResults.filter(r => r.idChienDichTiemChung === selectedCampaignId);
        const resultsMap: Record<string, KetQuaTiemChungHocSinh> = {};
        resultsForCampaign.forEach(r => { resultsMap[r.idHocSinh] = r; });
        setStudentResults(resultsMap);

      } else {
        setEligibleStudents([]);
        setStudentResults({});
      }
    } else {
      setEligibleStudents([]);
      setStudentResults({});
    }
  }, [selectedCampaignId]);

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setEditingStudentId(null); // Close any open edit forms
  };

  const handleEditResult = (studentId: string) => {
    setEditingStudentId(studentId);
    const existingResult = studentResults[studentId];
    if (existingResult) {
      reset({
        trangThaiThamGia: existingResult.trangThaiThamGia,
        ngayTiemThucTe: existingResult.ngayTiemThucTe ? new Date(existingResult.ngayTiemThucTe).toISOString().substring(0,16) : new Date().toISOString().substring(0,16),
        loVaccine: existingResult.loVaccine,
        tenCanBoTiem: existingResult.tenCanBoTiem || currentUser?.thongTinCaNhan.hoTen,
        phanUngSauTiem: existingResult.phanUngSauTiem,
        ghiChuCuaYTa: existingResult.ghiChuCuaYTa,
      });
    } else {
      reset({ // Default values for new record
        trangThaiThamGia: 'da_tiem',
        ngayTiemThucTe: new Date().toISOString().substring(0,16),
        loVaccine: '',
        tenCanBoTiem: currentUser?.thongTinCaNhan.hoTen,
        phanUngSauTiem: '',
        ghiChuCuaYTa: '',
      });
    }
  };

  const onSubmitRecord: SubmitHandler<VaccinationRecordFormData> = (data) => {
    if (!selectedCampaignId || !editingStudentId || !currentUser) {
        alert('Lỗi: Thiếu thông tin chiến dịch, học sinh hoặc người dùng.');
        return;
    }
    const student = mockAllStudents.find(s => s.id === editingStudentId);
    if (!student) {
        alert('Lỗi: Không tìm thấy học sinh.');
        return;
    }

    const newResult: KetQuaTiemChungHocSinh = {
      ...data,
      id: \`kq${selectedCampaignId}${editingStudentId}${Date.now()}\`, // Mock ID
      idChienDichTiemChung: selectedCampaignId,
      idHocSinh: editingStudentId,
      idPhuHuynh: student.idNguoiGiamHoChinh, // Assuming main guardian
      ngayTiemThucTe: data.ngayTiemThucTe ? new Date(data.ngayTiemThucTe).toISOString() : undefined,
      daGuiThongBaoKetQuaChoPH: false, // Will be set true after notification
    };

    addStudentVaccinationResult(newResult); // Add to mock data (this also console.logs notification)
    setStudentResults(prev => ({...prev, [editingStudentId]: newResult})); // Update local display
    alert(\`Đã ghi nhận kết quả tiêm chủng cho học sinh ${student.hoTen}.\`);
    setEditingStudentId(null); // Close form
  };

  if (!currentUser || (currentUser.vaiTro !== 'y_ta' && currentUser.vaiTro !== 'admin')) {
    return <p className='p-6 text-red-500'>Bạn không có quyền truy cập trang này.</p>;
  }

  const selectedCampaignDetails = mockVaccinationCampaigns.find(c => c.id === selectedCampaignId);

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-3xl font-semibold text-blue-700 mb-6 border-b pb-3 flex items-center'>
        <Syringe size={32} className='mr-3 text-red-500'/> Thực Hiện Tiêm Chủng
      </h2>

      {/* Campaign Selection */}
      <div className='mb-6'>
        <label htmlFor='campaignSelect' className='label-style mb-1'>Chọn chiến dịch tiêm chủng:</label>
        <select
          id='campaignSelect'
          value={selectedCampaignId || ''}
          onChange={(e) => handleSelectCampaign(e.target.value)}
          className='input-style w-full md:w-1/2'
        >
          <option value=''>-- Chọn chiến dịch --</option>
          {activeCampaigns.map(c => (
            <option key={c.id} value={c.id}>{c.tenChienDich} ({c.tenVaccine})</option>
          ))}
        </select>
      </div>

      {selectedCampaignDetails && (
        <div className='mb-6 p-4 border rounded-md bg-blue-50'>
            <h3 className='text-xl font-semibold text-blue-700 mb-1'>{selectedCampaignDetails.tenChienDich}</h3>
            <p className='text-sm text-gray-600'><strong>Vắc xin:</strong> {selectedCampaignDetails.tenVaccine}</p>
            <p className='text-sm text-gray-600'><strong>Đối tượng:</strong> {selectedCampaignDetails.doiTuongApDung}</p>
            <p className='text-sm text-gray-600'><strong>Thời gian:</strong>
                {new Date(selectedCampaignDetails.thoiGianDuKienBatDau).toLocaleString('vi-VN')} -
                {new Date(selectedCampaignDetails.thoiGianDuKienKetThuc).toLocaleString('vi-VN')}
            </p>
        </div>
      )}

      {/* Eligible Students List */}
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
                        <span className={\`text-xs px-2 py-0.5 rounded-full text-white ${
                            result.trangThaiThamGia === 'da_tiem' ? 'bg-green-500' :
                            result.trangThaiThamGia === 'hoan_tiem' ? 'bg-yellow-500' :
                            result.trangThaiThamGia === 'chong_chi_dinh' ? 'bg-red-500' : 'bg-gray-400'
                        }\`}>
                          {trangThaiTiemOptions.find(t => t.value === result.trangThaiThamGia)?.label || result.trangThaiThamGia}
                        </span>
                      ) : (
                        <span className='text-xs px-2 py-0.5 rounded-full text-white bg-gray-400'>Chưa ghi nhận</span>
                      )}
                    </div>
                    <button
                        onClick={() => isEditingThis ? setEditingStudentId(null) : handleEditResult(student.id)}
                        className='btn-secondary text-xs p-2 flex items-center'
                    >
                      {isEditingThis ? <ChevronUp size={16} className='mr-1'/> : <ChevronDown size={16} className='mr-1'/>}
                      {isEditingThis ? 'Đóng' : (result ? 'Sửa KQ' : 'Ghi nhận KQ')}
                    </button>
                  </div>
                  {/* Inline Form for Editing/Recording */}
                  {isEditingThis && (
                    <form onSubmit={handleSubmit(onSubmitRecord)} className='mt-3 pt-3 border-t space-y-3 bg-gray-50 p-3 rounded-b-md'>
                      <div>
                        <label className='label-style text-xs'>Trạng thái tiêm (*)</label>
                        <select {...register('trangThaiThamGia', {required: true})} className='input-style input-sm'>
                            {trangThaiTiemOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className='label-style text-xs'>Ngày tiêm thực tế (*)</label>
                        <input type='datetime-local' {...register('ngayTiemThucTe', {required: true})} className='input-style input-sm' />
                      </div>
                      <div>
                        <label className='label-style text-xs'>Số lô vắc xin</label>
                        <input type='text' {...register('loVaccine')} className='input-style input-sm' />
                      </div>
                      <div>
                        <label className='label-style text-xs'>Cán bộ tiêm</label>
                        <input type='text' {...register('tenCanBoTiem')} className='input-style input-sm' />
                      </div>
                      <div>
                        <label className='label-style text-xs'>Phản ứng sau tiêm (nếu có)</label>
                        <textarea {...register('phanUngSauTiem')} rows={2} className='input-style input-sm'></textarea>
                      </div>
                      <div>
                        <label className='label-style text-xs'>Ghi chú của y tá</label>
                        <textarea {...register('ghiChuCuaYTa')} rows={2} className='input-style input-sm'></textarea>
                      </div>
                      <div className='text-right'>
                        <button type='button' onClick={() => setEditingStudentId(null)} className='btn-secondary text-xs mr-2'>Hủy</button>
                        <button type='submit' className='btn-primary text-xs'>Lưu Kết Quả</button>
                      </div>
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <style jsx global>{`
        .label-style { display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151; }
        .input-style { display: block; width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .input-style.input-sm { padding: 0.35rem 0.5rem; font-size: 0.875rem; }
        .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3B82F6; box-shadow: 0 0 0 2px #BFDBFE; }
        .btn-primary { padding: 0.5rem 1rem; background-color: #2563EB; color: white; border-radius: 0.375rem; font-weight: 500; }
        .btn-primary:hover { background-color: #1D4ED8; }
        .btn-secondary { padding: 0.5rem 1rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; font-weight: 500; color: #374151; }
        .btn-secondary:hover { background-color: #F3F4F6; }
        .btn-secondary.text-xs { padding: 0.25rem 0.5rem; }
        .btn-primary.text-xs { padding: 0.25rem 0.5rem; }
      `}</style>
    </div>
  );
};
export default ManageVaccinationPage;
