package com.example.schoolhealth.dtos;

import com.example.schoolhealth.models.GioiTinh; // Assuming GioiTinh enum exists
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HocSinhDto {

    private String id;

    @NotBlank(message = "Họ tên không được để trống")
    private String hoTen;

    private String maHocSinh;

    @NotBlank(message = "Ngày sinh không được để trống")
    // Consider adding pattern validation for ISO date string if needed
    private String ngaySinh; // ISO Date string

    @NotNull(message = "Giới tính không được để trống")
    private GioiTinh gioiTinh; // Using the existing Enum directly

    private String lop;

    @NotBlank(message = "ID trường học không được để trống")
    private String idTruongHoc;

    @NotBlank(message = "ID người giám hộ chính không được để trống")
    private String idNguoiGiamHoChinh; // String to match frontend

    private List<String> cacNguoiGiamHoKhacIds; // List of Strings

    private String idHoSoSucKhoe; // String

    private String anhDaiDienUrl;

    private String ghiChu;
}
