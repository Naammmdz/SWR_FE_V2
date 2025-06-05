import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { YeuCauGuiThuoc, HocSinh, TrangThaiYeuCauThuoc } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { PlusCircle, Trash2, CalendarDays, Clock } from 'lucide-react';

// Mock data for parent's children
const mockUserChildren: HocSinh[] = [
  { id: 'hs001', hoTen: 'Nguyễn Văn An', lop: '1A', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2016-05-10T00:00:00.000Z', gioiTinh: 'nam' },
  { id: 'hs002', hoTen: 'Trần Thị Bình', lop: '3C', idTruongHoc: 'TH001', idNguoiGiamHoChinh: 'ph001', ngaySinh: '2014-09-15T00:00:00.000Z', gioiTinh: 'nu' },
];

type MedicineRequestFormData = Omit<YeuCauGuiThuoc, 'id' | 'idPhuHuynhGui' | 'trangThai' | 'ngayTao' | 'ngayCapNhat' | 'lichSuUongThuoc'> & {
  thoiGianUongTemp: { date: string; time: string }[]; // For easier form handling
};

const CreateMedicineRequestPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userChildren, setUserChildren] = useState<HocSinh[]>([]);

  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useForm<MedicineRequestFormData>({
    defaultValues: {
      idHocSinh: '',
      tenThuoc: '',
      hamLuong: '',
      donViTinh: 'viên',
      soLuongMoiLanUong: 1,
      donViUong: 'viên',
      duongDung: 'Uống',
      huongDanSuDung: '',
      thoiGianUongTemp: [{ date: '', time: '' }],
      donThuocUrl: '', // Mock as text input for now
      ghiChuPhuHuynh: '',
      lienHeKhanCap: currentUser?.thongTinCaNhan.soDienThoai || '',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'thoiGianUongTemp'
  });

  useEffect(() => {
    if (currentUser) {
      // In a real app, fetch children of the current parent
      setUserChildren(mockUserChildren.filter(c => c.idNguoiGiamHoChinh === currentUser.id));
      if (mockUserChildren.length > 0) {
         setValue('idHocSinh', mockUserChildren[0].id); // Pre-select first child
      }
       setValue('lienHeKhanCap', currentUser.thongTinCaNhan.soDienThoai || '');
    }
  }, [currentUser, setValue]);


  const onSubmit: SubmitHandler<MedicineRequestFormData> = (data) => {
    if (!currentUser) {
      alert('Lỗi: Không tìm thấy thông tin người dùng.');
      return;
    }

    // Combine date and time for thoiGianKeHoachUong
    const thoiGianKeHoachUong = data.thoiGianUongTemp
      .filter(t => t.date && t.time)
      .map(t => new Date(`${t.date}T${t.time}:00`).toISOString());

    if (thoiGianKeHoachUong.length === 0) {
        alert('Vui lòng nhập ít nhất một thời gian uống thuốc hợp lệ.');
        return;
    }

    const newRequest: YeuCauGuiThuoc = {
      ...data,
      id: `req${Date.now()}`, // Mock ID
      idPhuHuynhGui: currentUser.id,
      thoiGianKeHoachUong,
      trangThai: 'moi_tao' as TrangThaiYeuCauThuoc,
      ngayTao: new Date().toISOString(),
      ngayCapNhat: new Date().toISOString(),
    };

    console.log('New Medicine Request:', newRequest);
    // Here you would typically send the data to a backend API
    // For now, we can simulate by adding to a list or navigating back
    alert('Yêu cầu gửi thuốc đã được tạo thành công (giả lập)!');
    // TODO: Add to a global state or pass data back if needed
    navigate('/phu-huynh/gui-thuoc');
  };

  if (!currentUser) return <p>Vui lòng đăng nhập để sử dụng chức năng này.</p>;

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto'>
      <h2 className='text-3xl font-semibold text-blue-700 mb-6 border-b pb-3'>Tạo Yêu Cầu Gửi Thuốc Mới</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div>
          <label htmlFor='idHocSinh' className='block text-sm font-medium text-gray-700 mb-1'>Chọn học sinh (*)</label>
          <select
            id='idHocSinh'
            {...register('idHocSinh', { required: 'Vui lòng chọn học sinh' })}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          >
            <option value=''>-- Chọn học sinh --</option>
            {userChildren.map(child => (
              <option key={child.id} value={child.id}>{child.hoTen} (Lớp: {child.lop})</option>
            ))}
          </select>
          {errors.idHocSinh && <p className='text-red-500 text-xs mt-1'>{errors.idHocSinh.message}</p>}
        </div>

        <div>
          <label htmlFor='tenThuoc' className='block text-sm font-medium text-gray-700 mb-1'>Tên thuốc (*)</label>
          <input
            type='text'
            id='tenThuoc'
            {...register('tenThuoc', { required: 'Tên thuốc không được để trống' })}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
          {errors.tenThuoc && <p className='text-red-500 text-xs mt-1'>{errors.tenThuoc.message}</p>}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor='hamLuong' className='block text-sm font-medium text-gray-700 mb-1'>Hàm lượng (ví dụ: 500mg)</label>
              <input type='text' id='hamLuong' {...register('hamLuong')} className='w-full input-style' />
            </div>
            <div>
              <label htmlFor='donViTinh' className='block text-sm font-medium text-gray-700 mb-1'>Đơn vị tính (*)</label>
              <input type='text' id='donViTinh' {...register('donViTinh', { required: 'Đơn vị tính là bắt buộc' })} placeholder='viên, gói, ml...' className='w-full input-style' />
              {errors.donViTinh && <p className='text-red-500 text-xs mt-1'>{errors.donViTinh.message}</p>}
            </div>
        </div>

         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <label htmlFor='soLuongMoiLanUong' className='block text-sm font-medium text-gray-700 mb-1'>Số lượng mỗi lần uống (*)</label>
                <input type='number' id='soLuongMoiLanUong' {...register('soLuongMoiLanUong', { required: 'Số lượng là bắt buộc', valueAsNumber: true, min: {value: 0.1, message: 'Số lượng phải lớn hơn 0'} })} className='w-full input-style' />
                {errors.soLuongMoiLanUong && <p className='text-red-500 text-xs mt-1'>{errors.soLuongMoiLanUong.message}</p>}
            </div>
            <div>
                <label htmlFor='donViUong' className='block text-sm font-medium text-gray-700 mb-1'>Đơn vị uống (*)</label>
                <input type='text' id='donViUong' {...register('donViUong', { required: 'Đơn vị uống là bắt buộc' })} placeholder='viên, ml, giọt...' className='w-full input-style' />
                {errors.donViUong && <p className='text-red-500 text-xs mt-1'>{errors.donViUong.message}</p>}
            </div>
        </div>

        <div>
          <label htmlFor='duongDung' className='block text-sm font-medium text-gray-700 mb-1'>Đường dùng (ví dụ: Uống, Bôi ngoài da) (*)</label>
          <input
            type='text'
            id='duongDung'
            {...register('duongDung', { required: 'Đường dùng không được để trống' })}
            className='w-full input-style'
          />
          {errors.duongDung && <p className='text-red-500 text-xs mt-1'>{errors.duongDung.message}</p>}
        </div>

        <div>
          <label htmlFor='huongDanSuDung' className='block text-sm font-medium text-gray-700 mb-1'>Hướng dẫn sử dụng chi tiết (*)</label>
          <textarea
            id='huongDanSuDung'
            rows={3}
            {...register('huongDanSuDung', { required: 'Hướng dẫn sử dụng không được để trống' })}
            className='w-full input-style'
          ></textarea>
          {errors.huongDanSuDung && <p className='text-red-500 text-xs mt-1'>{errors.huongDanSuDung.message}</p>}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Thời gian dự kiến cho uống (*)</label>
          {fields.map((field, index) => (
            <div key={field.id} className='flex items-center space-x-2 mb-2 p-2 border rounded-md'>
              <CalendarDays className='text-gray-500' />
              <Controller
                name={`thoiGianUongTemp.${index}.date`}
                control={control}
                rules={{ required: 'Ngày không được trống' }}
                render={({ field }) => <input type='date' {...field} className='input-style w-auto' />}
              />
              <Clock className='text-gray-500 ml-2' />
              <Controller
                name={`thoiGianUongTemp.${index}.time`}
                control={control}
                rules={{ required: 'Giờ không được trống' }}
                render={({ field }) => <input type='time' {...field} className='input-style w-auto' />}
              />
              {fields.length > 1 && (
                <button type='button' onClick={() => remove(index)} className='text-red-500 hover:text-red-700 p-1'>
                  <Trash2 size={18} />
                </button>
              )}
              {errors.thoiGianUongTemp?.[index]?.date && <p className='text-red-500 text-xs'>{errors.thoiGianUongTemp[index]?.date?.message}</p>}
              {errors.thoiGianUongTemp?.[index]?.time && <p className='text-red-500 text-xs'>{errors.thoiGianUongTemp[index]?.time?.message}</p>}
            </div>
          ))}
          <button
            type='button'
            onClick={() => append({ date: '', time: '' })}
            className='mt-1 text-sm text-blue-600 hover:text-blue-800 flex items-center'
          >
            <PlusCircle size={18} className='mr-1' /> Thêm thời gian uống
          </button>
        </div>

        <div>
          <label htmlFor='donThuocUrl' className='block text-sm font-medium text-gray-700 mb-1'>Đơn thuốc (Link hình ảnh/PDF - nếu có)</label>
          <input type='text' id='donThuocUrl' {...register('donThuocUrl')} className='w-full input-style' placeholder='https://example.com/donthuoc.pdf' />
        </div>

        <div>
          <label htmlFor='ghiChuPhuHuynh' className='block text-sm font-medium text-gray-700 mb-1'>Ghi chú thêm của phụ huynh</label>
          <textarea id='ghiChuPhuHuynh' rows={2} {...register('ghiChuPhuHuynh')} className='w-full input-style'></textarea>
        </div>

        <div>
          <label htmlFor='lienHeKhanCap' className='block text-sm font-medium text-gray-700 mb-1'>Số điện thoại liên hệ khẩn cấp (*)</label>
          <input
            type='tel'
            id='lienHeKhanCap'
            {...register('lienHeKhanCap', { required: 'Số điện thoại khẩn cấp không được để trống' })}
            className='w-full input-style'
          />
          {errors.lienHeKhanCap && <p className='text-red-500 text-xs mt-1'>{errors.lienHeKhanCap.message}</p>}
        </div>

        <div className='flex justify-end space-x-3 pt-4 border-t'>
          <Link to='/phu-huynh/gui-thuoc' className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'>
            Hủy
          </Link>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Gửi Yêu Cầu
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

export default CreateMedicineRequestPage;
