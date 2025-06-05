import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { ChienDichKhamSucKhoe, TrangThaiChienDich } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { addHealthCheckupCampaign } from "../../data/mockCampaigns";
import { ClipboardPlus, CalendarHeart } from "lucide-react";

type HealthCheckupCampaignFormData = Omit<ChienDichKhamSucKhoe, "id" | "trangThai" | "idNguoiTao" | "idNguoiDuyet" | "ngayTao" | "ngayDuyet" | "lyDoHuy"> & {
    loaiKhamArray: string[];
};

const loaiKhamOptions = [
    { id: "kham_mat", label: "Mắt" }, { id: "kham_rang_mieng", label: "Răng miệng" },
    { id: "kham_tai_mui_hong", label: "Tai mũi họng" }, { id: "kham_the_luc", label: "Thể lực (Chiều cao, cân nặng, BMI)" },
    { id: "kham_noi_khoa", label: "Nội khoa (Tuần hoàn, hô hấp, tiêu hóa)" }, { id: "kham_ngoai_khoa", label: "Ngoại khoa (Cơ xương khớp, cột sống)" },
    { id: "kham_tam_than", label: "Sức khỏe tinh thần (Cơ bản)" }, { id: "kham_tong_quat", label: "Khám tổng quát (Bao gồm nhiều chuyên khoa)" },
];

const CreateHealthCheckupCampaignPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors } } = useForm<HealthCheckupCampaignFormData>({
    defaultValues: {
      tenChienDich: "", loaiKhamArray: ["kham_tong_quat"], doiTuongApDung: "", thoiGianDuKien: "",
      diaDiemKham: "Phòng Y tế Trường", donViThucHienKham: "Đội ngũ y tế trường", ghiChuChung: "",
    }
  });

  const onSubmit: SubmitHandler<HealthCheckupCampaignFormData> = (data) => {
    if (!currentUser) { alert("Lỗi: Không tìm thấy thông tin người dùng."); return; }
    const newCampaign: ChienDichKhamSucKhoe = {
      ...data, loaiKham: data.loaiKhamArray, id: 'hcamp' + Date.now(),
      idNguoiTao: currentUser.id, trangThai: "moi_tao" as TrangThaiChienDich, ngayTao: new Date().toISOString(),
    };
    addHealthCheckupCampaign(newCampaign);
    console.log("New Health Checkup Campaign:", newCampaign);
    alert("Chiến dịch khám sức khỏe mới đã được tạo (chờ duyệt)!");
    navigate("/admin/chien-dich");
  };

  if (!currentUser || (currentUser.vaiTro !== "admin" && currentUser.vaiTro !== "y_ta")) {
    return <p className="p-6 text-red-500">Bạn không có quyền tạo chiến dịch.</p>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6 border-b pb-3 flex items-center">
        <ClipboardPlus size={32} className="mr-3 text-teal-600"/> Tạo Chiến Dịch Khám Sức Khỏe Mới
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="tenChienDich" className="label-style">Tên chiến dịch (*)</label>
          <input type="text" id="tenChienDich" {...register("tenChienDich", { required: "Tên chiến dịch là bắt buộc" })} className="input-style" />
          {errors.tenChienDich && <p className="error-msg">{errors.tenChienDich.message}</p>}
        </div>
        <div>
            <label className="label-style">Loại khám (*)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1 border p-3 rounded-md">
                {loaiKhamOptions.map(option => (
                    <div key={option.id} className="flex items-center">
                        <input type="checkbox" id={option.id} value={option.label}
                               {...register("loaiKhamArray", { required: "Chọn ít nhất một loại khám" })}
                               className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                        <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">{option.label}</label>
                    </div>
                ))}
            </div>
            {errors.loaiKhamArray && <p className="error-msg">{errors.loaiKhamArray.message}</p>}
        </div>
        <div>
          <label htmlFor="doiTuongApDung" className="label-style">Đối tượng áp dụng (*)</label>
          <input type="text" id="doiTuongApDung" {...register("doiTuongApDung", { required: "Đối tượng là bắt buộc" })} className="input-style" placeholder="VD: Học sinh khối 1, 2; Toàn trường" />
          {errors.doiTuongApDung && <p className="error-msg">{errors.doiTuongApDung.message}</p>}
        </div>
        <div>
            <label htmlFor="thoiGianDuKien" className="label-style">Thời gian dự kiến (*)</label>
            <input type="datetime-local" id="thoiGianDuKien" {...register("thoiGianDuKien", { required: "Thời gian dự kiến là bắt buộc" })} className="input-style" />
            {errors.thoiGianDuKien && <p className="error-msg">{errors.thoiGianDuKien.message}</p>}
        </div>
         <div>
            <label htmlFor="diaDiemKham" className="label-style">Địa điểm khám (*)</label>
            <input type="text" id="diaDiemKham" {...register("diaDiemKham", { required: "Địa điểm là bắt buộc" })} className="input-style" />
            {errors.diaDiemKham && <p className="error-msg">{errors.diaDiemKham.message}</p>}
        </div>
        <div>
            <label htmlFor="donViThucHienKham" className="label-style">Đơn vị thực hiện khám</label>
            <input type="text" id="donViThucHienKham" {...register("donViThucHienKham")} className="input-style" placeholder="VD: Đội ngũ y tế trường, Bệnh viện XYZ"/>
        </div>
        <div>
            <label htmlFor="ghiChuChung" className="label-style">Ghi chú chung (thông tin cho phụ huynh)</label>
            <textarea id="ghiChuChung" rows={3} {...register("ghiChuChung")} className="input-style"></textarea>
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Link to="/admin/chien-dich" className="btn-secondary">Hủy</Link>
          <button type="submit" className="btn-primary flex items-center"><CalendarHeart size={18} className="mr-2"/>Lưu Chiến Dịch Khám</button>
        </div>
      </form>
      <style jsx global>{`
        .label-style { display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151; }
        .input-style { display: block; width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3B82F6; box-shadow: 0 0 0 2px #BFDBFE; }
        .error-msg { color: #EF4444; font-size: 0.75rem; margin-top: 0.25rem; }
        .btn-primary { padding: 0.5rem 1rem; background-color: #10B981; color: white; border-radius: 0.375rem; font-weight: 500; }
        .btn-primary:hover { background-color: #059669; }
        .btn-secondary { padding: 0.5rem 1rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; font-weight: 500; color: #374151; }
        .btn-secondary:hover { background-color: #F3F4F6; }
      `}</style>
    </div>
  );
};
export default CreateHealthCheckupCampaignPage;
