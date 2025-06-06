import React, { useState, useEffect } from 'react';
import { Stethoscope, Users, ChevronDown, ChevronUp, AlertCircle, Calendar, FileText, Search, CheckCircle2, Clock, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { ChienDichKhamSucKhoe, HocSinh, KetQuaKhamSucKhoeHocSinh } from '../../types';
import { mockHealthCheckupCampaigns, mockStudentHealthCheckupResults, addStudentHealthCheckupResult } from '../../data/mockCampaigns';
import { useAuth } from '../../contexts/AuthContext';

// Mock student data
const mockAllStudents: HocSinh[] = [
  { id: 'hs001', hoTen: 'Nguyễn Văn An', lop: '1A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-05-10T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs002', hoTen: 'Trần Thị Bình', lop: '1B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-09-15T00:00:00.000Z', gioiTinh: 'nu' },
  { id: 'hs003', hoTen: 'Lê Minh Đức', lop: '2A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph002', ngaySinh: '2015-02-20T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs004', hoTen: 'Phạm Thị Mai', lop: '2B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph003', ngaySinh: '2015-07-22T00:00:00.000Z', gioiTinh: 'nu' },
  { id: 'hs005', hoTen: 'Vũ Đình Khang', lop: '3A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph004', ngaySinh: '2014-01-10T00:00:00.000Z', gioiTinh: 'nam' },
];

type HealthCheckupRecordFormData = Omit<KetQuaKhamSucKhoeHocSinh, 'id' | 'idChienDichKhamSucKhoe' | 'idHocSinh' | 'daGuiThongBaoKetQuaChoPH' | 'ngayGuiThongBaoKetQua'> & {
    ketQuaChiTietString?: string;
};

const ManageHealthCheckupPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeCampaigns, setActiveCampaigns] = useState<ChienDichKhamSucKhoe[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [eligibleStudents, setEligibleStudents] = useState<HocSinh[]>([]);
  const [studentResults, setStudentResults] = useState<Record<string, KetQuaKhamSucKhoeHocSinh>>({});
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset } = useForm<HealthCheckupRecordFormData>();
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
        ketQuaChiTietString: '{}',
        ketLuanTongQuatCuaBacSi: '',
        deNghiCuaBacSi: '',
        canHenLichTuVan: false,
        idBacSiKham: currentUser?.thongTinCaNhan?.hoTen || '',
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
      id: `kqh${selectedCampaignId}${editingStudentId}${Date.now()}`,
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
    alert(`Đã ghi nhận kết quả khám sức khỏe cho học sinh ${student.hoTen}.`);
    setEditingStudentId(null);
  };
  if (!currentUser || (currentUser.vaiTro !== 'y_ta' && currentUser.vaiTro !== 'admin')) {
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

  const selectedCampaignDetails = mockHealthCheckupCampaigns.find(c => c.id === selectedCampaignId);
  
  const filteredStudents = eligibleStudents.filter(student => 
    student.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      Ghi Nhận Kết Quả Khám Sức Khỏe
                    </h1>
                    <p className="text-gray-600 mt-1">Quản lý và ghi nhận kết quả khám sức khỏe học sinh</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
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

        {/* Campaign Selection */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 border border-blue-100">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-cyan-500" />
              Chọn Chiến Dịch Khám Sức Khỏe
            </h2>
            <select 
              value={selectedCampaignId || ''} 
              onChange={(e) => handleSelectCampaign(e.target.value)}
              className="w-full md:w-1/2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white"
            >
              <option value="">-- Chọn chiến dịch khám sức khỏe --</option>
              {activeCampaigns.map(c => (
                <option key={c.id} value={c.id}>{c.tenChienDich}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Campaign Details */}
        {selectedCampaignDetails && (
          <div className="bg-white rounded-2xl shadow-xl mb-6 border border-blue-100">
            <div className="p-6">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
                <h3 className="text-xl font-semibold text-cyan-700 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  {selectedCampaignDetails.tenChienDich}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                    <span className="font-medium">Loại khám:</span>
                    <span>{selectedCampaignDetails.loaiKham.join(', ')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Users className="w-4 h-4 text-cyan-500" />
                    <span className="font-medium">Đối tượng:</span>
                    <span>{selectedCampaignDetails.doiTuongApDung}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Clock className="w-4 h-4 text-cyan-500" />
                    <span className="font-medium">Thời gian:</span>
                    <span>{new Date(selectedCampaignDetails.thoiGianDuKien).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students List */}
        {selectedCampaignId && (
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-cyan-500" />
                  Danh sách học sinh ({filteredStudents.length})
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm học sinh..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>

              {filteredStudents.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    {eligibleStudents.length === 0 
                      ? "Không có học sinh nào thuộc đối tượng của chiến dịch này"
                      : "Không tìm thấy học sinh phù hợp với từ khóa tìm kiếm"
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredStudents.map(student => {
                    const result = studentResults[student.id];
                    const isEditingThis = editingStudentId === student.id;
                    
                    return (
                      <div key={student.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="bg-gray-50 p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <div className="bg-white p-2 rounded-lg">
                                <Users className="w-5 h-5 text-cyan-500" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800 text-lg">{student.hoTen}</p>
                                <p className="text-gray-600">Lớp: {student.lop}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {result ? (
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Đã có kết quả
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Chưa có kết quả
                                  </span>
                                )}
                                {result && result.canHenLichTuVan && (
                                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Cần tư vấn
                                  </span>
                                )}
                              </div>
                            </div>
                            <button 
                              onClick={() => isEditingThis ? setEditingStudentId(null) : handleEditResult(student.id)}
                              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
                            >
                              {isEditingThis ? (
                                <>
                                  <ChevronUp className="w-4 h-4" />
                                  <span>Đóng</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4" />
                                  <span>{result ? 'Sửa kết quả' : 'Nhập kết quả'}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {isEditingThis && (
                          <div className="p-6 bg-white border-t border-gray-200">
                            <form onSubmit={handleSubmit(onSubmitRecord)} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ngày khám *
                                  </label>
                                  <input 
                                    type="datetime-local" 
                                    {...register('ngayKham', {required: true})} 
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bác sĩ/Người khám
                                  </label>
                                  <input 
                                    type="text" 
                                    {...register('idBacSiKham')} 
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Kết quả chi tiết (JSON hoặc mô tả)
                                </label>
                                <textarea 
                                  {...register('ketQuaChiTietString')} 
                                  rows={4} 
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
                                  placeholder='{"chieuCao": "120cm", "canNang": "25kg", "thiLuc": "10/10"}'
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Nhập dưới dạng JSON hợp lệ hoặc mô tả văn bản
                                </p>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Kết luận tổng quát của bác sĩ *
                                </label>
                                <textarea 
                                  {...register('ketLuanTongQuatCuaBacSi', {required: true})} 
                                  rows={3} 
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                  placeholder="Nhập kết luận tổng quát về tình trạng sức khỏe của học sinh..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Đề nghị của bác sĩ
                                </label>
                                <textarea 
                                  {...register('deNghiCuaBacSi')} 
                                  rows={2} 
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                  placeholder="Đề nghị theo dõi, điều trị hoặc tư vấn thêm (nếu có)..."
                                />
                              </div>

                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  {...register('canHenLichTuVan')} 
                                  id={`consult-${student.id}`} 
                                  className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                                />
                                <label htmlFor={`consult-${student.id}`} className="ml-2 text-sm text-gray-700">
                                  Cần hẹn lịch tư vấn với phụ huynh
                                </label>
                              </div>

                              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button 
                                  type="button" 
                                  onClick={() => setEditingStudentId(null)}
                                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  Hủy
                                </button>
                                <button 
                                  type="submit"
                                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
                                >
                                  Lưu kết quả khám
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageHealthCheckupPage;
