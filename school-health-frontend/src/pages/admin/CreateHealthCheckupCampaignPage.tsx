import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import type { ChienDichKhamSucKhoe, TrangThaiChienDich } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { addHealthCheckupCampaign } from "../../data/mockCampaigns";
import { 
  CalendarHeart, 
  Stethoscope, 
  Users, 
  MapPin, 
  Building,
  FileText,
  Save,
  X,
  Shield
} from "lucide-react";

type HealthCheckupCampaignFormData = Omit<ChienDichKhamSucKhoe, "id" | "trangThai" | "idNguoiTao" | "idNguoiDuyet" | "ngayTao" | "ngayDuyet" | "lyDoHuy"> & {
    loaiKhamArray: string[];
};

const loaiKhamOptions = [
    { id: "kham_mat", label: "Khám mắt" }, 
    { id: "kham_rang_mieng", label: "Khám răng miệng" },
    { id: "kham_tai_mui_hong", label: "Khám tai mũi họng" }, 
    { id: "kham_the_luc", label: "Đo thể lực (Chiều cao, cân nặng, BMI)" },
    { id: "kham_noi_khoa", label: "Khám nội khoa (Tim mạch, hô hấp)" }, 
    { id: "kham_ngoai_khoa", label: "Khám ngoại khoa (Cơ xương khớp)" },
    { id: "kham_tam_than", label: "Đánh giá sức khỏe tinh thần" }, 
    { id: "kham_tong_quat", label: "Khám tổng quát toàn diện" },
];

const CreateHealthCheckupCampaignPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<HealthCheckupCampaignFormData>({
    defaultValues: {
      tenChienDich: "", 
      loaiKhamArray: ["kham_tong_quat"], 
      doiTuongApDung: "", 
      thoiGianDuKien: "",
      diaDiemKham: "Phòng Y tế Trường", 
      donViThucHienKham: "Đội ngũ y tế trường", 
      ghiChuChung: "",
    }
  });

  const onSubmit: SubmitHandler<HealthCheckupCampaignFormData> = (data) => {
    if (!currentUser) { 
      alert("Lỗi: Không tìm thấy thông tin người dùng."); 
      return; 
    }
    const newCampaign: ChienDichKhamSucKhoe = {
      ...data, 
      loaiKham: data.loaiKhamArray, 
      id: 'hcamp' + Date.now(),
      idNguoiTao: currentUser.id, 
      trangThai: "moi_tao" as TrangThaiChienDich, 
      ngayTao: new Date().toISOString(),
    };
    addHealthCheckupCampaign(newCampaign);
    console.log("New Health Checkup Campaign:", newCampaign);
    alert("Chiến dịch khám sức khỏe mới đã được tạo (chờ duyệt)!");
    navigate("/admin/chien-dich");
  };

  if (!currentUser || (currentUser.vaiTro !== "admin" && currentUser.vaiTro !== "y_ta")) {
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
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl">
                  <CalendarHeart className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Tạo Chiến dịch Khám sức khỏe
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Tạo chiến dịch khám sức khỏe định kỳ cho học sinh
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Người tạo: <span className="font-medium text-blue-600">{currentUser?.thongTinCaNhan?.hoTen}</span>
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
                      {...register("tenChienDich", { required: "Tên chiến dịch là bắt buộc" })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="VD: Khám sức khỏe định kỳ học kỳ I"
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
                      {...register("doiTuongApDung", { required: "Đối tượng là bắt buộc" })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="VD: Học sinh khối 10, 11, 12"
                    />
                    {errors.doiTuongApDung && (
                      <p className="text-red-500 text-sm mt-1">{errors.doiTuongApDung.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="thoiGianDuKien" className="block text-sm font-medium text-gray-700 mb-2">
                    Thời gian dự kiến <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="thoiGianDuKien"
                    {...register("thoiGianDuKien", { required: "Thời gian dự kiến là bắt buộc" })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.thoiGianDuKien && (
                    <p className="text-red-500 text-sm mt-1">{errors.thoiGianDuKien.message}</p>
                  )}
                </div>
              </div>

              {/* Health Checkup Types */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Stethoscope className="w-6 h-6 mr-3 text-green-500" />
                  Loại khám sức khỏe
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Chọn các loại khám <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 border border-gray-200 rounded-xl bg-gray-50">
                    {loaiKhamOptions.map(option => (
                      <div key={option.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
                        <input
                          type="checkbox"
                          id={option.id}
                          value={option.label}
                          {...register("loaiKhamArray", { required: "Chọn ít nhất một loại khám" })}
                          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                        />
                        <label htmlFor={option.id} className="text-sm text-gray-700 leading-5 cursor-pointer">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.loaiKhamArray && (
                    <p className="text-red-500 text-sm mt-2">{errors.loaiKhamArray.message}</p>
                  )}
                </div>
              </div>

              {/* Location & Provider */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-red-500" />
                  Địa điểm & Đơn vị thực hiện
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="diaDiemKham" className="block text-sm font-medium text-gray-700 mb-2">
                      Địa điểm khám <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="diaDiemKham"
                      {...register("diaDiemKham", { required: "Địa điểm là bắt buộc" })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="VD: Phòng Y tế Trường, Hội trường chính"
                    />
                    {errors.diaDiemKham && (
                      <p className="text-red-500 text-sm mt-1">{errors.diaDiemKham.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="donViThucHienKham" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Building className="w-4 h-4 mr-2 text-blue-500" />
                      Đơn vị thực hiện khám
                    </label>
                    <input
                      type="text"
                      id="donViThucHienKham"
                      {...register("donViThucHienKham")}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="VD: Đội ngũ y tế trường, Bệnh viện ABC"
                    />
                  </div>
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
                    {...register("ghiChuChung")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Thông tin quan trọng dành cho phụ huynh và học sinh về quá trình khám sức khỏe..."
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
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
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

export default CreateHealthCheckupCampaignPage;
