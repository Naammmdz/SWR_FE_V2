import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import type { ChienDichTiemChung, TrangThaiChienDich } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { addVaccinationCampaign } from '../../data/mockCampaigns';
import { 
  Syringe, 
  CalendarRange, 
  Users, 
  MapPin, 
  FileText,
  Save,
  X,
  Shield
} from 'lucide-react';

type CampaignFormData = Omit<ChienDichTiemChung, 'id' | 'trangThai' | 'idNguoiTao' | 'idNguoiDuyet' | 'ngayTao' | 'ngayDuyet' | 'lyDoHuy'>;

const CreateVaccinationCampaignPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CampaignFormData>({
    defaultValues: {
      tenChienDich: '',
      tenVaccine: '',
      moTaVaccine: '',
      doiTuongApDung: '',
      thoiGianDuKienBatDau: '',
      thoiGianDuKienKetThuc: '',
      diaDiemTiemChung: 'Phòng Y tế Trường',
      ghiChuChung: '',
      tieuChiThamGia: 'Sức khỏe ổn định, không sốt/bệnh cấp tính.',
    }
  });

  const onSubmit: SubmitHandler<CampaignFormData> = (data) => {
    if (!currentUser) {
      alert('Lỗi: Không tìm thấy thông tin người dùng.');
      return;
    }
    const newCampaign: ChienDichTiemChung = {
      ...data,
      id: 'vcamp' + Date.now(),
      idNguoiTao: currentUser.id,
      trangThai: 'moi_tao' as TrangThaiChienDich,
      ngayTao: new Date().toISOString(),
    };
    addVaccinationCampaign(newCampaign);
    console.log('New Vaccination Campaign:', newCampaign);
    alert('Chiến dịch tiêm chủng mới đã được tạo (chờ duyệt)!');
    navigate('/admin/chien-dich');
  };

  if (!currentUser || (currentUser.vaiTro !== 'admin' && currentUser.vaiTro !== 'y_ta')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 text-lg font-semibold">Bạn không có quyền tạo chiến dịch.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl">
                  <Syringe className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Tạo Chiến dịch Tiêm chủng
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Tạo chiến dịch tiêm chủng mới cho học sinh
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Người tạo: <span className="font-medium text-green-600">{currentUser?.thongTinCaNhan?.hoTen}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="space-y-8">
              {/* Campaign Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-blue-500" />
                  Thông tin chiến dịch
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="tenChienDich" className="block text-sm font-medium text-gray-700 mb-2">
                      Tên chiến dịch <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tenChienDich"
                      {...register('tenChienDich', { required: 'Tên chiến dịch là bắt buộc' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="VD: Chiến dịch tiêm vaccine COVID-19"
                    />
                    {errors.tenChienDich && (
                      <p className="text-red-500 text-sm mt-1">{errors.tenChienDich.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="doiTuongApDung" className="block text-sm font-medium text-gray-700 mb-2">
                      Đối tượng áp dụng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="doiTuongApDung"
                      {...register('doiTuongApDung', { required: 'Đối tượng là bắt buộc' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="VD: Học sinh khối 10, 11, 12"
                    />
                    {errors.doiTuongApDung && (
                      <p className="text-red-500 text-sm mt-1">{errors.doiTuongApDung.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Vaccine Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-green-500" />
                  Thông tin vaccine
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="tenVaccine" className="block text-sm font-medium text-gray-700 mb-2">
                      Tên vaccine <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tenVaccine"
                      {...register('tenVaccine', { required: 'Tên vaccine là bắt buộc' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="VD: Pfizer-BioNTech COVID-19"
                    />
                    {errors.tenVaccine && (
                      <p className="text-red-500 text-sm mt-1">{errors.tenVaccine.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="moTaVaccine" className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả vaccine
                    </label>
                    <input
                      type="text"
                      id="moTaVaccine"
                      {...register('moTaVaccine')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Mô tả ngắn về vaccine"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="tieuChiThamGia" className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu chí tham gia
                  </label>
                  <textarea
                    id="tieuChiThamGia"
                    rows={3}
                    {...register('tieuChiThamGia')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Các điều kiện sức khỏe cần thiết..."
                  />
                </div>
              </div>

              {/* Schedule & Location */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <CalendarRange className="w-6 h-6 mr-3 text-purple-500" />
                  Thời gian & Địa điểm
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="thoiGianDuKienBatDau" className="block text-sm font-medium text-gray-700 mb-2">
                      Thời gian bắt đầu <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      id="thoiGianDuKienBatDau"
                      {...register('thoiGianDuKienBatDau', { required: 'Thời gian bắt đầu là bắt buộc' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                    {errors.thoiGianDuKienBatDau && (
                      <p className="text-red-500 text-sm mt-1">{errors.thoiGianDuKienBatDau.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="thoiGianDuKienKetThuc" className="block text-sm font-medium text-gray-700 mb-2">
                      Thời gian kết thúc <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      id="thoiGianDuKienKetThuc"
                      {...register('thoiGianDuKienKetThuc', { required: 'Thời gian kết thúc là bắt buộc' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                    {errors.thoiGianDuKienKetThuc && (
                      <p className="text-red-500 text-sm mt-1">{errors.thoiGianDuKienKetThuc.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="diaDiemTiemChung" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    Địa điểm tiêm chủng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="diaDiemTiemChung"
                    {...register('diaDiemTiemChung', { required: 'Địa điểm là bắt buộc' })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="VD: Phòng Y tế Trường, Hội trường chính"
                  />
                  {errors.diaDiemTiemChung && (
                    <p className="text-red-500 text-sm mt-1">{errors.diaDiemTiemChung.message}</p>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-orange-500" />
                  Thông tin bổ sung
                </h2>
                
                <div>
                  <label htmlFor="ghiChuChung" className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú cho phụ huynh
                  </label>
                  <textarea
                    id="ghiChuChung"
                    rows={4}
                    {...register('ghiChuChung')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Thông tin quan trọng dành cho phụ huynh và học sinh..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200 mt-8">
              <Link
                to="/admin/chien-dich"
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                <X className="w-5 h-5" />
                <span>Hủy bỏ</span>
              </Link>
              
              <button
                type="submit"
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                <Save className="w-5 h-5" />
                <span>Lưu chiến dịch</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVaccinationCampaignPage;
