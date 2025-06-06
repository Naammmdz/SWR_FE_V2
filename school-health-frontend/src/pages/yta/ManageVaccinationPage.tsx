import { useState, useEffect } from 'react';
import { Syringe, Users, ChevronDown, ChevronUp, Calendar, FileText, Search, CheckCircle2, Clock, Shield, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { ChienDichTiemChung, HocSinh, KetQuaTiemChungHocSinh, TrangThaiThamGiaTiemChung } from '../../types';
import { mockVaccinationCampaigns, mockStudentVaccinationResults, addStudentVaccinationResult } from '../../data/mockCampaigns';
import { useAuth } from '../../contexts/AuthContext';

// Mock student data
const mockAllStudents: HocSinh[] = [
  { id: 'hs001', hoTen: 'Nguyễn Văn An', lop: '1A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-05-10T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs002', hoTen: 'Trần Thị Bình', lop: '1B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-09-15T00:00:00.000Z', gioiTinh: 'nu' },
  { id: 'hs003', hoTen: 'Lê Minh Đức', lop: '2A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph002', ngaySinh: '2015-02-20T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs004', hoTen: 'Phạm Thị Mai', lop: '2B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph003', ngaySinh: '2015-07-22T00:00:00.000Z', gioiTinh: 'nu' },
  { id: 'hs005', hoTen: 'Vũ Đình Khang', lop: '3A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph004', ngaySinh: '2014-01-10T00:00:00.000Z', gioiTinh: 'nam' },
];

type VaccinationRecordFormData = Omit<KetQuaTiemChungHocSinh, 'id' | 'idChienDichTiemChung' | 'idHocSinh' | 'idPhuHuynh' | 'daGuiThongBaoKetQuaChoPH' | 'ngayGuiThongBaoKetQua'>;

const trangThaiTiemOptions: { value: TrangThaiThamGiaTiemChung; label: string; color: string }[] = [
    { value: 'da_tiem', label: 'Đã tiêm', color: 'bg-green-100 text-green-700' },
    { value: 'hoan_tiem', label: 'Hoãn tiêm', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'chong_chi_dinh', label: 'Chống chỉ định', color: 'bg-red-100 text-red-700' },
];


const ManageVaccinationPage = () => {
  const { currentUser } = useAuth();
  const [activeCampaigns, setActiveCampaigns] = useState<ChienDichTiemChung[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [eligibleStudents, setEligibleStudents] = useState<HocSinh[]>([]);
  const [studentResults, setStudentResults] = useState<Record<string, KetQuaTiemChungHocSinh>>({});
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset } = useForm<VaccinationRecordFormData>();

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
            if (targetAudienceLower.includes('khối ' + s.lop.charAt(0))) return true; // e.g. 'Khối 1' matches '1A', '1B'
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
      id: `kq${selectedCampaignId}${editingStudentId}${Date.now()}`, // Mock ID
      idChienDichTiemChung: selectedCampaignId,
      idHocSinh: editingStudentId,
      idPhuHuynh: student.idNguoiGiamHoChinh, // Assuming main guardian
      ngayTiemThucTe: data.ngayTiemThucTe ? new Date(data.ngayTiemThucTe).toISOString() : undefined,
      daGuiThongBaoKetQuaChoPH: false, // Will be set true after notification
    };

    addStudentVaccinationResult(newResult);
    setStudentResults(prev => ({...prev, [editingStudentId]: newResult}));
    alert(`Đã ghi nhận kết quả tiêm chủng cho học sinh ${student.hoTen}.`);
    setEditingStudentId(null);
  };
  if (!currentUser || (currentUser.vaiTro !== 'y_ta' && currentUser.vaiTro !== 'admin')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
          <div className="flex items-center text-red-600 mb-4">
            <AlertTriangle size={24} className="mr-2" />
            <span className="text-lg font-semibold">Không có quyền truy cập</span>
          </div>
          <p className="text-gray-600">Bạn không có quyền truy cập trang này.</p>
        </div>
      </div>
    );
  }

  const selectedCampaignDetails = mockVaccinationCampaigns.find(c => c.id === selectedCampaignId);

  // Filter students based on search term
  const filteredStudents = eligibleStudents.filter(student =>
    student.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 p-3 rounded-xl mr-4">
                <Syringe size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Thực Hiện Tiêm Chủng</h1>
                <p className="text-gray-600 mt-1">Quản lý và ghi nhận kết quả tiêm chủng cho học sinh</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-100 to-pink-100 px-4 py-2 rounded-lg">
              <span className="text-red-800 font-medium">Y tá: {currentUser?.thongTinCaNhan?.hoTen}</span>
            </div>
          </div>
        </div>

        {/* Campaign Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Calendar className="text-blue-600 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Chọn Chiến Dịch Tiêm Chủng</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="campaignSelect" className="block text-sm font-medium text-gray-700 mb-2">
                Chiến dịch tiêm chủng:
              </label>
              <select
                id="campaignSelect"
                value={selectedCampaignId || ''}
                onChange={(e) => handleSelectCampaign(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
              >
                <option value="">-- Chọn chiến dịch --</option>
                {activeCampaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.tenChienDich} ({c.tenVaccine})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        {selectedCampaignDetails && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Shield className="text-green-600 mr-2" size={20} />
              <h3 className="text-xl font-semibold text-gray-800">{selectedCampaignDetails.tenChienDich}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <Syringe className="text-blue-600 mr-2" size={16} />
                  <span className="text-sm font-medium text-blue-800">Vắc xin</span>
                </div>
                <p className="text-blue-700 font-semibold">{selectedCampaignDetails.tenVaccine}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <Users className="text-green-600 mr-2" size={16} />
                  <span className="text-sm font-medium text-green-800">Đối tượng</span>
                </div>
                <p className="text-green-700 font-semibold">{selectedCampaignDetails.doiTuongApDung}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center mb-2">
                  <Calendar className="text-orange-600 mr-2" size={16} />
                  <span className="text-sm font-medium text-orange-800">Thời gian</span>
                </div>
                <p className="text-orange-700 font-semibold text-sm">
                  {new Date(selectedCampaignDetails.thoiGianDuKienBatDau).toLocaleDateString('vi-VN')} - {new Date(selectedCampaignDetails.thoiGianDuKienKetThuc).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Students List */}
        {selectedCampaignId && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center">
                  <Users className="text-blue-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Danh sách học sinh ({filteredStudents.length}/{eligibleStudents.length})
                  </h3>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm học sinh..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-64"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500">
                    {searchTerm ? 'Không tìm thấy học sinh nào phù hợp.' : 'Không có học sinh nào thuộc đối tượng của chiến dịch này.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {filteredStudents.map(student => {
                    const result = studentResults[student.id];
                    const isEditingThis = editingStudentId === student.id;
                    return (
                      <div key={student.id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    {student.hoTen.split(' ').pop()?.charAt(0)}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{student.hoTen}</p>
                                <p className="text-sm text-gray-600">Lớp: {student.lop}</p>
                                {result ? (
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    result.trangThaiThamGia === 'da_tiem' ? 'bg-green-100 text-green-800' :
                                    result.trangThaiThamGia === 'hoan_tiem' ? 'bg-yellow-100 text-yellow-800' :
                                    result.trangThaiThamGia === 'chong_chi_dinh' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {result.trangThaiThamGia === 'da_tiem' && <CheckCircle2 size={12} className="mr-1" />}
                                    {result.trangThaiThamGia === 'hoan_tiem' && <Clock size={12} className="mr-1" />}
                                    {result.trangThaiThamGia === 'chong_chi_dinh' && <AlertTriangle size={12} className="mr-1" />}
                                    {trangThaiTiemOptions.find(t => t.value === result.trangThaiThamGia)?.label || result.trangThaiThamGia}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    <Clock size={12} className="mr-1" />
                                    Chưa ghi nhận
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => isEditingThis ? setEditingStudentId(null) : handleEditResult(student.id)}
                              className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                            >
                              {isEditingThis ? <ChevronUp size={16} className="mr-1" /> : <ChevronDown size={16} className="mr-1" />}
                              {isEditingThis ? 'Đóng' : (result ? 'Sửa KQ' : 'Ghi nhận KQ')}
                            </button>
                          </div>
                          
                          {/* Inline Form for Editing/Recording */}
                          {isEditingThis && (
                            <form onSubmit={handleSubmit(onSubmitRecord)} className="mt-4 pt-4 border-t border-gray-200">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Trạng thái tiêm <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                      {...register('trangThaiThamGia', {required: true})} 
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    >
                                      {trangThaiTiemOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Ngày tiêm thực tế <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                      type="datetime-local" 
                                      {...register('ngayTiemThucTe', {required: true})} 
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số lô vắc xin</label>
                                    <input 
                                      type="text" 
                                      {...register('loVaccine')} 
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                      placeholder="Nhập số lô vắc xin"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cán bộ tiêm</label>
                                    <input 
                                      type="text" 
                                      {...register('tenCanBoTiem')} 
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                      placeholder="Tên cán bộ thực hiện tiêm"
                                    />
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phản ứng sau tiêm (nếu có)
                                  </label>
                                  <textarea 
                                    {...register('phanUngSauTiem')} 
                                    rows={2} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Ghi nhận các phản ứng sau tiêm (nếu có)"
                                  />
                                </div>
                                <div className="mt-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú của y tá</label>
                                  <textarea 
                                    {...register('ghiChuCuaYTa')} 
                                    rows={2} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Ghi chú bổ sung từ y tá"
                                  />
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                  <button 
                                    type="button" 
                                    onClick={() => setEditingStudentId(null)} 
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                  >
                                    Hủy
                                  </button>
                                  <button 
                                    type="submit" 
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm"
                                  >
                                    <FileText size={16} className="inline mr-1" />
                                    Lưu Kết Quả
                                  </button>
                                </div>
                              </div>
                            </form>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>        )}
      </div>
    </div>
  );
};

export default ManageVaccinationPage;
