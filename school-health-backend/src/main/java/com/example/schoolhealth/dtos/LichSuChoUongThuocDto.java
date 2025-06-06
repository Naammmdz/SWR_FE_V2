package com.example.schoolhealth.dtos;

import com.example.schoolhealth.models.TrangThaiLichSuUongThuoc;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LichSuChoUongThuocDto {

    private String id;

    @NotBlank(message = "ID yêu cầu gửi thuốc không được để trống")
    private String idYeuCauGuiThuoc; // Keep for potential standalone use, though mapped by parent in entity

    @NotBlank(message = "Thời gian kế hoạch không được để trống")
    private String thoiGianKeHoach; // ISO DateTime string

    private String thoiGianThucTe; // ISO DateTime string

    private String idYTaChoUong; // String

    private String ghiChuYTa;

    @NotNull(message = "Trạng thái lịch sử uống thuốc không được để trống")
    private TrangThaiLichSuUongThuoc trangThai;
}
