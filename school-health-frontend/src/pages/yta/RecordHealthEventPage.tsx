import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { SuKienYTe, HocSinh, LoaiSuCoYTe, MucDoNghiemTrong, Thuoc, VatTuYTe } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { PlusCircle, Trash2, ListChecks, ShieldAlert } from 'lucide-react';

// Mock data - In a real app, this would come from an API / global state
const mockStudents: HocSinh[] = [
  { id: 'hs001', hoTen: 'Nguyễn Văn An', lop: '1A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-05-10T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs002', hoTen: 'Trần Thị Bình', lop: '3C', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2014-09-15T00:00:00.000Z', gioiTinh: 'nu' },
  { id: 'hs003', hoTen: 'Lê Minh Đức', lop: '2B', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph002', ngaySinh: '2015-02-20T00:00:00.000Z', gioiTinh: 'nam' },
];

// Mock inventory (simplified)
const mockSchoolMedicines: Partial<Thuoc>[] = [
    { id: 'thuoc001', tenThuoc: 'Paracetamol 250mg', donViTinh: 'gói' },
    { id: 'thuoc002', tenThuoc: 'Betadine Sát Khuẩn', donViTinh: 'chai' },
    { id: 'thuoc003', tenThuoc: 'Nước muối sinh lý', donViTinh: 'chai' },
];
const mockSchoolSupplies: Partial<VatTuYTe>[] = [
    { id: 'vt001', tenVatTu: 'Băng gạc cá nhân', donViTinh: 'cái' },
    { id: 'vt002', tenVatTu: 'Bông y tế', donViTinh: 'gói' },
    { id: 'vt003', tenVatTu: 'Nhiệt kế điện tử', donViTinh: 'cái' },
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
  const [students, setStudents] = useState<HocSinh[]>(mockStudents); // In real app, fetch or search

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
     return <div className='p-6 text-red-500'>Bạn không có quyền truy cập vào trang này.</div>;
  }

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6 border-b pb-3'>
        <h2 className='text-3xl font-semibold text-blue-700 flex items-center'><ShieldAlert size={32} className='mr-2 text-red-500'/>Ghi Nhận Sự Cố Y Tế</h2>
        <Link to='/y-ta/su-co-y-te/danh-sach' className='text-sm text-blue-600 hover:underline flex items-center'>
            <ListChecks size={18} className='mr-1'/> Xem danh sách sự cố
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='idHocSinh' className='block text-sm font-medium text-gray-700 mb-1'>Học sinh (*)</label>
            <select id='idHocSinh' {...register('idHocSinh', { required: 'Vui lòng chọn học sinh' })} className='w-full input-style'>
              <option value=''>-- Chọn học sinh --</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>{student.hoTen} - Lớp {student.lop}</option>
              ))}
            </select>
            {errors.idHocSinh && <p className='text-red-500 text-xs mt-1'>{errors.idHocSinh.message}</p>}
          </div>
          <div>
            <label htmlFor='thoiGianXayRa' className='block text-sm font-medium text-gray-700 mb-1'>Thời gian xảy ra (*)</label>
            <input type='datetime-local' id='thoiGianXayRa' {...register('thoiGianXayRa', { required: 'Thời gian không được trống' })} className='w-full input-style' />
            {errors.thoiGianXayRa && <p className='text-red-500 text-xs mt-1'>{errors.thoiGianXayRa.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor='diaDiemXayRa' className='block text-sm font-medium text-gray-700 mb-1'>Địa điểm xảy ra</label>
          <input type='text' id='diaDiemXayRa' {...register('diaDiemXayRa')} className='w-full input-style' placeholder='VD: Sân trường, lớp 3A, nhà vệ sinh...'/>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
                <label htmlFor='loaiSuCo' className='block text-sm font-medium text-gray-700 mb-1'>Loại sự cố (*)</label>
                <select id='loaiSuCo' {...register('loaiSuCo', { required: 'Loại sự cố là bắt buộc' })} className='w-full input-style'>
                {loaiSuCoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                {errors.loaiSuCo && <p className='text-red-500 text-xs mt-1'>{errors.loaiSuCo.message}</p>}
            </div>
            <div>
                <label htmlFor='mucDoNghiemTrong' className='block text-sm font-medium text-gray-700 mb-1'>Mức độ nghiêm trọng (*)</label>
                <select id='mucDoNghiemTrong' {...register('mucDoNghiemTrong', { required: 'Mức độ là bắt buộc' })} className='w-full input-style'>
                {mucDoNghiemTrongOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                {errors.mucDoNghiemTrong && <p className='text-red-500 text-xs mt-1'>{errors.mucDoNghiemTrong.message}</p>}
            </div>
        </div>

        <div>
          <label htmlFor='moTaChiTiet' className='block text-sm font-medium text-gray-700 mb-1'>Mô tả chi tiết sự cố (*)</label>
          <textarea id='moTaChiTiet' rows={3} {...register('moTaChiTiet', { required: 'Mô tả không được trống' })} className='w-full input-style'></textarea>
          {errors.moTaChiTiet && <p className='text-red-500 text-xs mt-1'>{errors.moTaChiTiet.message}</p>}
        </div>

        <div>
          <label htmlFor='bienPhapXuLyBanDau' className='block text-sm font-medium text-gray-700 mb-1'>Biện pháp xử lý ban đầu của y tá (*)</label>
          <textarea id='bienPhapXuLyBanDau' rows={3} {...register('bienPhapXuLyBanDau', { required: 'Biện pháp xử lý không được trống' })} className='w-full input-style'></textarea>
          {errors.bienPhapXuLyBanDau && <p className='text-red-500 text-xs mt-1'>{errors.bienPhapXuLyBanDau.message}</p>}
        </div>

        {/* Thuốc đã sử dụng */}
        <div className='border p-3 rounded-md'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Thuốc đã sử dụng (nếu có)</label>
            {thuocFields.map((field, index) => (
                <div key={field.id} className='grid grid-cols-1 md:grid-cols-4 gap-2 mb-2 items-center'>
                    <select {...register(`thuocDaSuDung.${index}.idThuoc`, {required: 'Chọn thuốc'})} className='input-style md:col-span-2'>
                        <option value=''>-- Chọn thuốc --</option>
                        {mockSchoolMedicines.map(m => <option key={m.id} value={m.id}>{m.tenThuoc}</option>)}
                    </select>
                    <input type='number' {...register(`thuocDaSuDung.${index}.soLuong`, {required: 'Số lượng', valueAsNumber: true, min: 1})} placeholder='Số lượng' className='input-style'/>
                    <input type='text' {...register(`thuocDaSuDung.${index}.donVi`, {required: 'Đơn vị'})} placeholder='Đơn vị (viên, gói)' className='input-style'/>
                    {/* Hidden field for tenThuoc if needed, or look up on submit */}
                    {/* <input type='hidden' {...register(`thuocDaSuDung.${index}.tenThuoc`)} /> */}
                    <button type='button' onClick={() => removeThuoc(index)} className='text-red-500 hover:text-red-700 p-1'><Trash2 size={18} /></button>
                </div>
            ))}
            <button type='button' onClick={() => appendThuoc({ idThuoc: '', tenThuoc: '', soLuong: 1, donVi: '' })} className='text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1'>
                <PlusCircle size={18} className='mr-1'/> Thêm thuốc
            </button>
        </div>

        {/* Vật tư đã sử dụng */}
         <div className='border p-3 rounded-md'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Vật tư y tế đã sử dụng (nếu có)</label>
            {vatTuFields.map((field, index) => (
                <div key={field.id} className='grid grid-cols-1 md:grid-cols-4 gap-2 mb-2 items-center'>
                     <select {...register(`vatTuDaSuDung.${index}.idVatTu`, {required: 'Chọn vật tư'})} className='input-style md:col-span-2'>
                        <option value=''>-- Chọn vật tư --</option>
                        {mockSchoolSupplies.map(s => <option key={s.id} value={s.id}>{s.tenVatTu}</option>)}
                    </select>
                    <input type='number' {...register(`vatTuDaSuDung.${index}.soLuong`, {required: 'Số lượng', valueAsNumber: true, min: 1})} placeholder='Số lượng' className='input-style'/>
                    <input type='text' {...register(`vatTuDaSuDung.${index}.donVi`, {required: 'Đơn vị'})} placeholder='Đơn vị (cái, gói)' className='input-style'/>
                    <button type='button' onClick={() => removeVatTu(index)} className='text-red-500 hover:text-red-700 p-1'><Trash2 size={18} /></button>
                </div>
            ))}
            <button type='button' onClick={() => appendVatTu({ idVatTu: '', tenVatTu: '', soLuong: 1, donVi: '' })} className='text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1'>
                <PlusCircle size={18} className='mr-1'/> Thêm vật tư
            </button>
        </div>

        <div>
          <label htmlFor='tinhTrangHocSinhSauXuLy' className='block text-sm font-medium text-gray-700 mb-1'>Tình trạng học sinh sau xử lý (*)</label>
          <textarea id='tinhTrangHocSinhSauXuLy' rows={2} {...register('tinhTrangHocSinhSauXuLy', { required: 'Tình trạng học sinh không được trống' })} className='w-full input-style'></textarea>
          {errors.tinhTrangHocSinhSauXuLy && <p className='text-red-500 text-xs mt-1'>{errors.tinhTrangHocSinhSauXuLy.message}</p>}
        </div>

        <div className='border-t pt-4 space-y-4'>
            <div className='flex items-center'>
                <input type='checkbox' id='daThongBaoPhuHuynh' {...register('daThongBaoPhuHuynh')} className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2' />
                <label htmlFor='daThongBaoPhuHuynh' className='text-sm font-medium text-gray-700'>Đã thông báo cho phụ huynh</label>
            </div>
            {daThongBaoPhuHuynhWatch && (
                <div>
                    <label htmlFor='thoiGianThongBaoPhuHuynh' className='block text-sm font-medium text-gray-700 mb-1'>Thời gian thông báo cho phụ huynh</label>
                    <input type='datetime-local' id='thoiGianThongBaoPhuHuynh' {...register('thoiGianThongBaoPhuHuynh')} className='w-full md:w-1/2 input-style' />
                </div>
            )}
        </div>

        <div>
          <label htmlFor='ghiChuThemCuaYTa' className='block text-sm font-medium text-gray-700 mb-1'>Ghi chú thêm của y tá</label>
          <textarea id='ghiChuThemCuaYTa' rows={2} {...register('ghiChuThemCuaYTa')} className='w-full input-style'></textarea>
        </div>

        <div className='flex justify-end space-x-3 pt-4 border-t mt-6'>
          <button type='button' onClick={() => navigate('/dashboard')} className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'>
            Hủy
          </button>
          <button
            type='submit'
            className='px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Ghi Nhận Sự Cố
          </button>
        </div>
      </form>
      <style jsx global>{`
        .input-style {
          display: block;
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #D1D5DB; /* gray-300 */
          border-radius: 0.375rem; /* rounded-md */
          box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .input-style:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
          border-color: #3B82F6; /* blue-500 */
          box-shadow: 0 0 0 2px #BFDBFE; /* ring-blue-500 with opacity */
        }
      `}</style>
    </div>
  );
};

export default RecordHealthEventPage;
