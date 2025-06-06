import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import type { SuKienYTe, HocSinh, LoaiSuCoYTe, MucDoNghiemTrong, Thuoc, VatTuYTe } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { 
  PlusCircle, 
  Trash2, 
  ListChecks, 
  ShieldAlert, 
  User, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Stethoscope,
  Pill,
  Package,
  FileText,
  Phone,
  Save
} from 'lucide-react';

// Mock data - In a real app, this would come from an API / global state
const mockStudents: HocSinh[] = [
  { id: 'hs001', hoTen: 'Nguyễn Văn An', lop: '1A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-05-10T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs002', hoTen: 'Trần Thị Bình', lop: '3C', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2014-09-15T00:00:00.000Z', gioiTinh: 'nu' },
  { id: 'hs003', hoTen: 'Lê Minh Đức', lop: '2B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph002', ngaySinh: '2015-02-20T00:00:00.000Z', gioiTinh: 'nam' },
];

// Mock inventory (simplified)
const mockSchoolMedicines: Partial<Thuoc>[] = [
    { id: 'thuoc001', tenThuoc: 'Paracetamol 250mg', donViTinh: 'goi' },
    { id: 'thuoc002', tenThuoc: 'Betadine Sát Khuẩn', donViTinh: 'chai' },
    { id: 'thuoc003', tenThuoc: 'Nước muối sinh lý', donViTinh: 'chai' },
];
const mockSchoolSupplies: Partial<VatTuYTe>[] = [
    { id: 'vt001', tenVatTu: 'Băng gạc cá nhân', donViTinh: 'cai' },
    { id: 'vt002', tenVatTu: 'Bông y tế', donViTinh: 'goi' },
    { id: 'vt003', tenVatTu: 'Nhiệt kế điện tử', donViTinh: 'cai' },
];


type HealthEventFormData = Omit<SuKienYTe, 'id' | 'idYTaGhiNhan' | 'ngayTao' | 'ngayCapNhat'> & {
    // temp fields if needed for form handling
};

const loaiSuCoOptions: { value: LoaiSuCoYTe; label: string }[] = [
    { value: 'tai_nan_nhe', label: 'Tai nạn nhẹ (trầy xước, va chạm)' },
    { value: 'sot', label: 'Sốt' },
    { value: 'dau_bung', label: 'Đau bụng' },
    { value: 'non_mua', label: 'Nôn/Buồn nôn' },
    { value: 'te_nga', label: 'Té ngã' },
    { value: 'di_ung_nhe', label: 'Dị ứng nhẹ' },
    { value: 'benh_thong_thuong', label: 'Bệnh thông thường (cảm, ho)' },
    { value: 'can_theo_doi_dac_biet', label: 'Cần theo dõi đặc biệt' },
    { value: 'tai_nan_can_can_thiep_y_te', label: 'Tai nạn cần can thiệp y tế (nghi gãy xương, vv)' },
    { value: 'benh_lay_nhiem_nghi_ngo', label: 'Bệnh lây nhiễm (nghi ngờ)' },
    { value: 'khac', label: 'Khác' },
];

const mucDoNghiemTrongOptions: { value: MucDoNghiemTrong; label: string }[] = [
    { value: 'nhe', label: 'Nhẹ' },
    { value: 'trung_binh', label: 'Trung bình' },
    { value: 'nghiem_trong', label: 'Nghiêm trọng' },
    { value: 'can_cap_cuu', label: 'Cần cấp cứu ngay' },
];


const RecordHealthEventPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [students] = useState<HocSinh[]>(mockStudents); // In real app, fetch or search

  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useForm<HealthEventFormData>({
    defaultValues: {
      idHocSinh: '',
      thoiGianXayRa: new Date().toISOString().substring(0, 16), // Default to now
      diaDiemXayRa: '',
      loaiSuCo: 'tai_nan_nhe',
      mucDoNghiemTrong: 'nhe',
      moTaChiTiet: '',
      bienPhapXuLyBanDau: '',
      thuocDaSuDung: [],
      vatTuDaSuDung: [],
      tinhTrangHocSinhSauXuLy: '',
      daThongBaoPhuHuynh: false,
      thoiGianThongBaoPhuHuynh: '',
      ghiChuThemCuaYTa: '',
    }
  });

  const { fields: thuocFields, append: appendThuoc, remove: removeThuoc } = useFieldArray({
    control, name: 'thuocDaSuDung' as 'thuocDaSuDung' // Type assertion
  });
  const { fields: vatTuFields, append: appendVatTu, remove: removeVatTu } = useFieldArray({
    control, name: 'vatTuDaSuDung' as 'vatTuDaSuDung' // Type assertion
  });

  const daThongBaoPhuHuynhWatch = watch('daThongBaoPhuHuynh');

  useEffect(() => {
    if (daThongBaoPhuHuynhWatch && !watch('thoiGianThongBaoPhuHuynh')) {
      setValue('thoiGianThongBaoPhuHuynh', new Date().toISOString().substring(0, 16));
    } else if (!daThongBaoPhuHuynhWatch) {
      setValue('thoiGianThongBaoPhuHuynh', '');
    }
  }, [daThongBaoPhuHuynhWatch, setValue, watch]);


  const onSubmit: SubmitHandler<HealthEventFormData> = (data) => {
    if (!currentUser) {
      alert('Lỗi: Không tìm thấy thông tin y tá.');
      return;
    }
    const newEvent: SuKienYTe = {
      ...data,
      id: `skyt${Date.now()}`, // Mock ID
      idYTaGhiNhan: currentUser.id,
      ngayTao: new Date().toISOString(),
      ngayCapNhat: new Date().toISOString(),
    };

    console.log('New Health Event:', newEvent);
    // TODO: Send data to API
    // TODO: Trigger notification to parent (e.g., mockParents[mockStudents[newEvent.idHocSinh].idNguoiGiamHoChinh])
    alert('Sự kiện y tế đã được ghi nhận thành công (giả lập)! Thông báo cho phụ huynh sẽ được gửi.');
    // For now, navigate to a list page or dashboard. A dedicated list page for events is better.
    navigate('/y-ta/su-co-y-te/danh-sach'); // Assuming a list page route
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-red-500 to-orange-600 p-3 rounded-xl mr-4">
                <ShieldAlert size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Ghi Nhận Sự Cố Y Tế</h1>
                <p className="text-gray-600 mt-1">Ghi nhận và xử lý các sự cố y tế của học sinh</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-100 to-orange-100 px-4 py-2 rounded-lg">
                <span className="text-red-800 font-medium">Y tá: {currentUser?.thongTinCaNhan?.hoTen}</span>
              </div>
              <Link 
                to="/y-ta/su-co-y-te/danh-sach" 
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <ListChecks size={18} className="mr-2" />
                Danh sách sự cố
              </Link>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <FileText className="text-blue-600 mr-2" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Thông Tin Sự Cố</h2>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <User className="text-blue-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-blue-800">Thông Tin Cơ Bản</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="idHocSinh" className="block text-sm font-medium text-gray-700 mb-2">
                    Học sinh <span className="text-red-500">*</span>
                  </label>
                  <select 
                    id="idHocSinh" 
                    {...register('idHocSinh', { required: 'Vui lòng chọn học sinh' })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  >
                    <option value="">-- Chọn học sinh --</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>{student.hoTen} - Lớp {student.lop}</option>
                    ))}
                  </select>
                  {errors.idHocSinh && <p className="text-red-500 text-sm mt-1">{errors.idHocSinh.message}</p>}
                </div>
                <div>
                  <label htmlFor="thoiGianXayRa" className="block text-sm font-medium text-gray-700 mb-2">
                    Thời gian xảy ra <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="datetime-local" 
                      id="thoiGianXayRa" 
                      {...register('thoiGianXayRa', { required: 'Thời gian không được trống' })} 
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                    />
                  </div>
                  {errors.thoiGianXayRa && <p className="text-red-500 text-sm mt-1">{errors.thoiGianXayRa.message}</p>}
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="diaDiemXayRa" className="block text-sm font-medium text-gray-700 mb-2">
                  Địa điểm xảy ra
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    id="diaDiemXayRa" 
                    {...register('diaDiemXayRa')} 
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm" 
                    placeholder="VD: Sân trường, lớp 3A, nhà vệ sinh..."
                  />
                </div>
              </div>
            </div>

            {/* Incident Details */}
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center mb-4">
                <AlertTriangle className="text-orange-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-orange-800">Chi Tiết Sự Cố</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="loaiSuCo" className="block text-sm font-medium text-gray-700 mb-2">
                    Loại sự cố <span className="text-red-500">*</span>
                  </label>
                  <select 
                    id="loaiSuCo" 
                    {...register('loaiSuCo', { required: 'Loại sự cố là bắt buộc' })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  >
                    {loaiSuCoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  {errors.loaiSuCo && <p className="text-red-500 text-sm mt-1">{errors.loaiSuCo.message}</p>}
                </div>
                <div>
                  <label htmlFor="mucDoNghiemTrong" className="block text-sm font-medium text-gray-700 mb-2">
                    Mức độ nghiêm trọng <span className="text-red-500">*</span>
                  </label>
                  <select 
                    id="mucDoNghiemTrong" 
                    {...register('mucDoNghiemTrong', { required: 'Mức độ là bắt buộc' })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  >
                    {mucDoNghiemTrongOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  {errors.mucDoNghiemTrong && <p className="text-red-500 text-sm mt-1">{errors.mucDoNghiemTrong.message}</p>}
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="moTaChiTiet" className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả chi tiết sự cố <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="moTaChiTiet" 
                  rows={4} 
                  {...register('moTaChiTiet', { required: 'Mô tả không được trống' })} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  placeholder="Mô tả chi tiết về sự cố xảy ra..."
                />
                {errors.moTaChiTiet && <p className="text-red-500 text-sm mt-1">{errors.moTaChiTiet.message}</p>}
              </div>
            </div>

            {/* Treatment */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center mb-4">
                <Stethoscope className="text-green-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-green-800">Xử Lý & Điều Trị</h3>
              </div>
              <div className="mb-6">
                <label htmlFor="bienPhapXuLyBanDau" className="block text-sm font-medium text-gray-700 mb-2">
                  Biện pháp xử lý ban đầu của y tá <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="bienPhapXuLyBanDau" 
                  rows={4} 
                  {...register('bienPhapXuLyBanDau', { required: 'Biện pháp xử lý không được trống' })} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  placeholder="Mô tả các biện pháp xử lý đã thực hiện..."
                />
                {errors.bienPhapXuLyBanDau && <p className="text-red-500 text-sm mt-1">{errors.bienPhapXuLyBanDau.message}</p>}
              </div>

              {/* Medicine Used */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <div className="flex items-center mb-4">
                  <Pill className="text-blue-600 mr-2" size={18} />
                  <h4 className="text-md font-semibold text-gray-700">Thuốc đã sử dụng</h4>
                </div>
                {thuocFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                    <select 
                      {...register(`thuocDaSuDung.${index}.idThuoc`, {required: 'Chọn thuốc'})} 
                      className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                    >
                      <option value="">-- Chọn thuốc --</option>
                      {mockSchoolMedicines.map(m => <option key={m.id} value={m.id}>{m.tenThuoc}</option>)}
                    </select>
                    <input 
                      type="number" 
                      {...register(`thuocDaSuDung.${index}.soLuong`, {required: 'Số lượng', valueAsNumber: true, min: 1})} 
                      placeholder="Số lượng" 
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                    />
                    <input 
                      type="text" 
                      {...register(`thuocDaSuDung.${index}.donVi`, {required: 'Đơn vị'})} 
                      placeholder="Đơn vị" 
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                    />
                    <button 
                      type="button" 
                      onClick={() => removeThuoc(index)} 
                      className="flex items-center justify-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => appendThuoc({ idThuoc: '', tenThuoc: '', soLuong: 1, donVi: '' })} 
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <PlusCircle size={16} className="mr-1" />
                  Thêm thuốc
                </button>
              </div>

              {/* Supplies Used */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <div className="flex items-center mb-4">
                  <Package className="text-purple-600 mr-2" size={18} />
                  <h4 className="text-md font-semibold text-gray-700">Vật tư y tế đã sử dụng</h4>
                </div>
                {vatTuFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                    <select 
                      {...register(`vatTuDaSuDung.${index}.idVatTu`, {required: 'Chọn vật tư'})} 
                      className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                    >
                      <option value="">-- Chọn vật tư --</option>
                      {mockSchoolSupplies.map(s => <option key={s.id} value={s.id}>{s.tenVatTu}</option>)}
                    </select>
                    <input 
                      type="number" 
                      {...register(`vatTuDaSuDung.${index}.soLuong`, {required: 'Số lượng', valueAsNumber: true, min: 1})} 
                      placeholder="Số lượng" 
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                    />
                    <input 
                      type="text" 
                      {...register(`vatTuDaSuDung.${index}.donVi`, {required: 'Đơn vị'})} 
                      placeholder="Đơn vị" 
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                    />
                    <button 
                      type="button" 
                      onClick={() => removeVatTu(index)} 
                      className="flex items-center justify-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => appendVatTu({ idVatTu: '', tenVatTu: '', soLuong: 1, donVi: '' })} 
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <PlusCircle size={16} className="mr-1" />
                  Thêm vật tư
                </button>
              </div>

              <div>
                <label htmlFor="tinhTrangHocSinhSauXuLy" className="block text-sm font-medium text-gray-700 mb-2">
                  Tình trạng học sinh sau xử lý <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="tinhTrangHocSinhSauXuLy" 
                  rows={3} 
                  {...register('tinhTrangHocSinhSauXuLy', { required: 'Tình trạng học sinh không được trống' })} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  placeholder="Mô tả tình trạng học sinh sau khi xử lý..."
                />
                {errors.tinhTrangHocSinhSauXuLy && <p className="text-red-500 text-sm mt-1">{errors.tinhTrangHocSinhSauXuLy.message}</p>}
              </div>
            </div>

            {/* Parent Notification */}
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <div className="flex items-center mb-4">
                <Phone className="text-yellow-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-yellow-800">Thông Báo Phụ Huynh</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="daThongBaoPhuHuynh" 
                    {...register('daThongBaoPhuHuynh')} 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3" 
                  />
                  <label htmlFor="daThongBaoPhuHuynh" className="text-sm font-medium text-gray-700">
                    Đã thông báo cho phụ huynh
                  </label>
                </div>
                {daThongBaoPhuHuynhWatch && (
                  <div>
                    <label htmlFor="thoiGianThongBaoPhuHuynh" className="block text-sm font-medium text-gray-700 mb-2">
                      Thời gian thông báo cho phụ huynh
                    </label>
                    <input 
                      type="datetime-local" 
                      id="thoiGianThongBaoPhuHuynh" 
                      {...register('thoiGianThongBaoPhuHuynh')} 
                      className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <FileText className="text-gray-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-800">Ghi Chú Bổ Sung</h3>
              </div>
              <div>
                <label htmlFor="ghiChuThemCuaYTa" className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú thêm của y tá
                </label>
                <textarea 
                  id="ghiChuThemCuaYTa" 
                  rows={3} 
                  {...register('ghiChuThemCuaYTa')} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  placeholder="Ghi chú bổ sung (nếu có)..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button 
                type="button" 
                onClick={() => navigate('/dashboard')} 
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm flex items-center"
              >
                <Save size={16} className="mr-2" />
                Ghi Nhận Sự Cố
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecordHealthEventPage;
