import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { ChienDichTiemChung, TrangThaiChienDich } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { addVaccinationCampaign } from '../../data/mockCampaigns'; // Import the add function
import { ShieldPlus, CalendarRange } from 'lucide-react';

type CampaignFormData = Omit<ChienDichTiemChung, 'id' | 'trangThai' | 'idNguoiTao' | 'idNguoiDuyet' | 'ngayTao' | 'ngayDuyet' | 'lyDoHuy'>;

const CreateVaccinationCampaignPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CampaignFormData>({
    defaultValues: {
      tenChienDich: '',
      tenVaccine: '',
      moTaVaccine: '',
      doiTuongApDung: '', // E.g., 'Học sinh khối 1, 2', 'Toàn trường'
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
      id: \`vcamp${Date.now()}\`, // Mock ID
      idNguoiTao: currentUser.id,
      trangThai: 'moi_tao' as TrangThaiChienDich,
      ngayTao: new Date().toISOString(),
    };
    addVaccinationCampaign(newCampaign); // Add to mock data
    console.log('New Vaccination Campaign:', newCampaign);
    alert('Chiến dịch tiêm chủng mới đã được tạo (chờ duyệt)!');
    navigate('/admin/chien-dich'); // Navigate to campaign list or admin dashboard
  };

  if (!currentUser || (currentUser.vaiTro !== 'admin' && currentUser.vaiTro !== 'y_ta')) {
    return <p className='p-6 text-red-500'>Bạn không có quyền tạo chiến dịch.</p>;
  }

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto'>
      <h2 className='text-3xl font-semibold text-blue-700 mb-6 border-b pb-3 flex items-center'>
        <ShieldPlus size={32} className='mr-3 text-green-600'/> Tạo Chiến Dịch Tiêm Chủng Mới
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div>
          <label htmlFor='tenChienDich' className='label-style'>Tên chiến dịch (*)</label>
          <input type='text' id='tenChienDich' {...register('tenChienDich', { required: 'Tên chiến dịch là bắt buộc' })} className='input-style' />
          {errors.tenChienDich && <p className='error-msg'>{errors.tenChienDich.message}</p>}
        </div>
        <div className='grid md:grid-cols-2 gap-4'>
            <div>
                <label htmlFor='tenVaccine' className='label-style'>Tên vắc xin (*)</label>
                <input type='text' id='tenVaccine' {...register('tenVaccine', { required: 'Tên vắc xin là bắt buộc' })} className='input-style' />
                {errors.tenVaccine && <p className='error-msg'>{errors.tenVaccine.message}</p>}
            </div>
             <div>
                <label htmlFor='moTaVaccine' className='label-style'>Mô tả vắc xin</label>
                <input type='text' id='moTaVaccine' {...register('moTaVaccine')} className='input-style' />
            </div>
        </div>
        <div>
          <label htmlFor='doiTuongApDung' className='label-style'>Đối tượng áp dụng (*)</label>
          <input type='text' id='doiTuongApDung' {...register('doiTuongApDung', { required: 'Đối tượng là bắt buộc' })} className='input-style' placeholder='VD: Học sinh khối 1, 2; Toàn trường' />
          {errors.doiTuongApDung && <p className='error-msg'>{errors.doiTuongApDung.message}</p>}
        </div>
        <div className='grid md:grid-cols-2 gap-4'>
            <div>
                <label htmlFor='thoiGianDuKienBatDau' className='label-style'>Thời gian bắt đầu dự kiến (*)</label>
                <input type='datetime-local' id='thoiGianDuKienBatDau' {...register('thoiGianDuKienBatDau', { required: 'Thời gian bắt đầu là bắt buộc' })} className='input-style' />
                {errors.thoiGianDuKienBatDau && <p className='error-msg'>{errors.thoiGianDuKienBatDau.message}</p>}
            </div>
            <div>
                <label htmlFor='thoiGianDuKienKetThuc' className='label-style'>Thời gian kết thúc dự kiến (*)</label>
                <input type='datetime-local' id='thoiGianDuKienKetThuc' {...register('thoiGianDuKienKetThuc', { required: 'Thời gian kết thúc là bắt buộc' })} className='input-style' />
                {errors.thoiGianDuKienKetThuc && <p className='error-msg'>{errors.thoiGianDuKienKetThuc.message}</p>}
            </div>
        </div>
         <div>
            <label htmlFor='diaDiemTiemChung' className='label-style'>Địa điểm tiêm chủng (*)</label>
            <input type='text' id='diaDiemTiemChung' {...register('diaDiemTiemChung', { required: 'Địa điểm là bắt buộc' })} className='input-style' />
            {errors.diaDiemTiemChung && <p className='error-msg'>{errors.diaDiemTiemChung.message}</p>}
        </div>
        <div>
            <label htmlFor='tieuChiThamGia' className='label-style'>Tiêu chí tham gia</label>
            <textarea id='tieuChiThamGia' rows={2} {...register('tieuChiThamGia')} className='input-style'></textarea>
        </div>
        <div>
            <label htmlFor='ghiChuChung' className='label-style'>Ghi chú chung (thông tin cho phụ huynh)</label>
            <textarea id='ghiChuChung' rows={3} {...register('ghiChuChung')} className='input-style'></textarea>
        </div>
        <div className='flex justify-end space-x-3 pt-4 border-t'>
          <Link to='/admin/chien-dich' className='btn-secondary'>Hủy</Link>
          <button type='submit' className='btn-primary flex items-center'><CalendarRange size={18} className='mr-2'/>Lưu Chiến Dịch</button>
        </div>
      </form>
      <style jsx global>{`
        .label-style { display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151; }
        .input-style { display: block; width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3B82F6; box-shadow: 0 0 0 2px #BFDBFE; }
        .error-msg { color: #EF4444; font-size: 0.75rem; margin-top: 0.25rem; }
        .btn-primary { padding: 0.5rem 1rem; background-color: #2563EB; color: white; border-radius: 0.375rem; font-weight: 500; }
        .btn-primary:hover { background-color: #1D4ED8; }
        .btn-secondary { padding: 0.5rem 1rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; font-weight: 500; color: #374151; }
        .btn-secondary:hover { background-color: #F3F4F6; }
      `}</style>
    </div>
  );
};
export default CreateVaccinationCampaignPage;
