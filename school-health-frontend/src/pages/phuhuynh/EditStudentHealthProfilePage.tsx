import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { HoSoSucKhoe, ThongTinTiemChung } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { getHealthProfileByStudentId, updateHealthProfile, addHealthProfile } from "../../data/mockHealthProfiles";
import { Save, XSquare, PlusCircle, Trash2 } from "lucide-react";

type HealthProfileFormData = Omit<HoSoSucKhoe, "id" | "idHocSinh" | "ngayCapNhatCuoi" | "idNguoiCapNhatCuoi"> & {
    diUngTemp: {value: string}[];
    benhManTinhTemp: {value: string}[];
};

const bloodGroupOptions = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditStudentHealthProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const [profile, setProfile] = useState<HoSoSucKhoe | null | undefined>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm<HealthProfileFormData>({
    defaultValues: {
      nhomMau: "", diUngTemp: [], benhManTinhTemp: [], tienSuDieuTri: "",
      thiLuc: { matTrai: "", matPhai: "", ngayKham: "", ghiChu: "" },
      thinhLuc: { taiTrai: "", taiPhai: "", ngayKham: "", ghiChu: "" },
      tiemChung: [], ghiChuKhac: "",
    }
  });

  const { fields: diUngFields, append: appendDiUng, remove: removeDiUng } = useFieldArray({ control, name: "diUngTemp" });
  const { fields: benhManTinhFields, append: appendBenhManTinh, remove: removeBenhManTinh } = useFieldArray({ control, name: "benhManTinhTemp" });
  const { fields: tiemChungFields, append: appendTiemChung, remove: removeTiemChung } = useFieldArray({ control, name: "tiemChung" });

  useEffect(() => {
    if (studentId) {
      const existingProfile = getHealthProfileByStudentId(studentId);
      if (existingProfile) {
        setProfile(existingProfile);
        reset({
          ...existingProfile,
          diUngTemp: existingProfile.diUng?.map(d => ({value: d})) || [],
          benhManTinhTemp: existingProfile.benhManTinh?.map(b => ({value: b})) || [],
          thiLuc: existingProfile.thiLuc || { matTrai: "", matPhai: "", ngayKham: "", ghiChu: "" },
          thinhLuc: existingProfile.thinhLuc || { taiTrai: "", taiPhai: "", ngayKham: "", ghiChu: "" },
          tiemChung: existingProfile.tiemChung?.map(tc => ({...tc, ngayTiem: tc.ngayTiem ? new Date(tc.ngayTiem).toISOString().split('T')[0] : ""})) || [],
        });
      } else {
        setIsCreatingNew(true);
        reset({
          nhomMau: "", diUngTemp: [], benhManTinhTemp: [], tienSuDieuTri: "",
          thiLuc: { matTrai: "", matPhai: "", ngayKham: "", ghiChu: "" },
          thinhLuc: { taiTrai: "", taiPhai: "", ngayKham: "", ghiChu: "" },
          tiemChung: [], ghiChuKhac: "",
        });
      }
    }
  }, [studentId, reset]);

  const onSubmit: SubmitHandler<HealthProfileFormData> = (data) => {
    if (!currentUser || !studentId) { alert("Lỗi: Thiếu thông tin người dùng hoặc học sinh."); return; }

    const processedData: Partial<HoSoSucKhoe> = {
        ...data,
        diUng: data.diUngTemp.map(d => d.value).filter(d => d && d.trim() !== ""),
        benhManTinh: data.benhManTinhTemp.map(b => b.value).filter(b => b && b.trim() !== ""),
        thiLuc: data.thiLuc?.ngayKham ? {...data.thiLuc, ngayKham: new Date(data.thiLuc.ngayKham).toISOString()} : data.thiLuc,
        thinhLuc: data.thinhLuc?.ngayKham ? {...data.thinhLuc, ngayKham: new Date(data.thinhLuc.ngayKham).toISOString()} : data.thinhLuc,
        tiemChung: data.tiemChung?.map(tc => ({...tc, ngayTiem: tc.ngayTiem ? new Date(tc.ngayTiem).toISOString() : new Date(0).toISOString() })).filter(tc => tc.tenVaccine?.trim() !== ""),
    };
    delete (processedData as any).diUngTemp;
    delete (processedData as any).benhManTinhTemp;

    if (isCreatingNew) {
        const newProfileData: HoSoSucKhoe = {
            id: 'hsk' + studentId,
            idHocSinh: studentId,
            ...processedData,
            ngayCapNhatCuoi: new Date().toISOString(),
            idNguoiCapNhatCuoi: currentUser.id,
        } as HoSoSucKhoe;
        addHealthProfile(newProfileData);
        alert("Hồ sơ sức khỏe đã được tạo thành công!");
    } else if (profile) {
        updateHealthProfile(profile.id, processedData, currentUser.id);
        alert("Hồ sơ sức khỏe đã được cập nhật!");
    }
    navigate(\`/phu-huynh/ho-so-con\`);
  };

  if (!currentUser || !studentId) return <p className="p-4">Đang tải hoặc có lỗi...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 border-b pb-3">
        {isCreatingNew ? "Tạo Mới" : "Chỉnh Sửa"} Hồ Sơ Sức Khỏe (HS ID: {studentId})
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Fieldset legend="Thông tin cơ bản">
            <div>
                <label htmlFor="nhomMau" className="label-style">Nhóm máu</label>
                <select id="nhomMau" {...register("nhomMau")} className="input-style">
                    {bloodGroupOptions.map(bg => <option key={bg} value={bg}>{bg || "-- Chọn --"}</option>)}
                </select>
            </div>
        </Fieldset>
        <DynamicListField title="Dị ứng" name="diUngTemp" fields={diUngFields} append={appendDiUng} remove={removeDiUng} register={register} errors={errors} placeholder="Tên dị ứng (VD: Phấn hoa)"/>
        <DynamicListField title="Bệnh mãn tính" name="benhManTinhTemp" fields={benhManTinhFields} append={appendBenhManTinh} remove={removeBenhManTinh} register={register} errors={errors} placeholder="Tên bệnh (VD: Hen suyễn)"/>
        <Fieldset legend="Tiền sử điều trị">
            <textarea {...register("tienSuDieuTri")} rows={3} className="input-style" placeholder="Mô tả các bệnh đã mắc, quá trình điều trị..."/>
        </Fieldset>
        <Fieldset legend="Thị lực">
            <div className="grid md:grid-cols-2 gap-4">
                <div><label className="label-style">Mắt trái</label><input type="text" {...register("thiLuc.matTrai")} className="input-style" placeholder="VD: 10/10"/></div>
                <div><label className="label-style">Mắt phải</label><input type="text" {...register("thiLuc.matPhai")} className="input-style" placeholder="VD: 9/10"/></div>
            </div>
            <div><label className="label-style">Ngày khám thị lực</label><input type="date" {...register("thiLuc.ngayKham")} className="input-style"/></div>
            <div><label className="label-style">Ghi chú thị lực</label><textarea {...register("thiLuc.ghiChu")} rows={2} className="input-style"/></div>
        </Fieldset>
        <Fieldset legend="Thính lực">
             <div className="grid md:grid-cols-2 gap-4">
                <div><label className="label-style">Tai trái</label><input type="text" {...register("thinhLuc.taiTrai")} className="input-style" placeholder="VD: Bình thường"/></div>
                <div><label className="label-style">Tai phải</label><input type="text" {...register("thinhLuc.taiPhai")} className="input-style" placeholder="VD: Nghe kém"/></div>
            </div>
            <div><label className="label-style">Ngày khám thính lực</label><input type="date" {...register("thinhLuc.ngayKham")} className="input-style"/></div>
            <div><label className="label-style">Ghi chú thính lực</label><textarea {...register("thinhLuc.ghiChu")} rows={2} className="input-style"/></div>
        </Fieldset>
        <Fieldset legend="Lịch sử tiêm chủng (do phụ huynh khai báo)">
            {tiemChungFields.map((field, index) => (
                <div key={field.id} className="p-3 border rounded-md mb-3 space-y-2 bg-gray-50 relative">
                    <input type="text" {...register(\`tiemChung.\${index}.tenVaccine\` as const, {required: "Tên vắc xin là bắt buộc"})} placeholder="Tên vắc xin (*)" className="input-style"/>
                    {errors.tiemChung?.[index]?.tenVaccine && <p className="error-msg text-xs">{errors.tiemChung[index]?.tenVaccine?.message}</p>}
                    <input type="date" {...register(\`tiemChung.\${index}.ngayTiem\` as const, {required: "Ngày tiêm là bắt buộc"})} className="input-style"/>
                    {errors.tiemChung?.[index]?.ngayTiem && <p className="error-msg text-xs">{errors.tiemChung[index]?.ngayTiem?.message}</p>}
                    <input type="text" {...register(\`tiemChung.\${index}.lieuLuong\` as const)} placeholder="Liều lượng (VD: 0.5ml)" className="input-style"/>
                    <textarea {...register(\`tiemChung.\${index}.ghiChu\` as const)} placeholder="Ghi chú (VD: Tiêm tại phường)" rows={1} className="input-style"/>
                    <button type="button" onClick={() => removeTiemChung(index)} className="absolute top-1 right-1 text-red-500 hover:text-red-700 p-1 bg-white rounded-full">
                        <Trash2 size={16}/>
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => appendTiemChung({ tenVaccine: "", ngayTiem: "", lieuLuong: "", ghiChu: "" })}
                className="btn-secondary-outline text-sm flex items-center">
                <PlusCircle size={16} className="mr-1"/> Thêm mũi tiêm
            </button>
        </Fieldset>
        <Fieldset legend="Ghi chú khác">
            <textarea {...register("ghiChuKhac")} rows={3} className="input-style"/>
        </Fieldset>
        <div className="flex justify-end space-x-3 pt-5 border-t">
          <Link to="/phu-huynh/ho-so-con" className="btn-secondary flex items-center"><XSquare size={18} className="mr-1"/>Hủy</Link>
          <button type="submit" className="btn-primary flex items-center"><Save size={18} className="mr-1"/>Lưu Thay Đổi</button>
        </div>
      </form>
      <style jsx global>{\`
        .label-style { display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151; }
        .input-style { display: block; width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; }
        .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3B82F6; }
        .error-msg { color: #EF4444; font-size: 0.75rem; margin-top: 0.25rem; }
        .btn-primary { padding: 0.5rem 1rem; background-color: #2563EB; color: white; border-radius: 0.375rem; font-weight: 500; }
        .btn-secondary { padding: 0.5rem 1rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; font-weight: 500; color: #374151; }
        .btn-secondary-outline { padding: 0.375rem 0.75rem; border: 1px solid #D1D5DB; color: #374151; border-radius: 0.375rem; }
      \`}</style>
    </div>
  );
};

const Fieldset: React.FC<{legend: string, children: React.ReactNode}> = ({legend, children}) => (
    <fieldset className="border border-gray-300 p-4 rounded-md space-y-3">
        <legend className="px-2 text-gray-700 font-medium text-sm">{legend}</legend>
        {children}
    </fieldset>
);

const DynamicListField: React.FC<any> = ({title, name, fields, append, remove, register, errors, placeholder}) => (
    <Fieldset legend={title}>
        {fields.map((field: any, index: number) => (
            <div key={field.id} className="flex items-center space-x-2">
                <input type="text" {...register(\`\${name}.\${index}.value\` as const, { required: \`\${title} không được trống nếu thêm dòng\` })}
                       placeholder={placeholder || "Giá trị"} className="input-style flex-grow"/>
                <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 size={18}/>
                </button>
            </div>
        ))}
        {errors[name] && <p className="error-msg text-xs">Có lỗi trong danh sách {title.toLowerCase()}.</p>}
        <button type="button" onClick={() => append({value: ""})} className="btn-secondary-outline text-sm flex items-center">
            <PlusCircle size={16} className="mr-1"/> Thêm {title.toLowerCase()}
        </button>
    </Fieldset>
);

export default EditStudentHealthProfilePage;
