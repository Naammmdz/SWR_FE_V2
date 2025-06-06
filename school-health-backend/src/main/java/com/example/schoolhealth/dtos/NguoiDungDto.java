package com.example.schoolhealth.dtos;

import com.example.schoolhealth.models.VaiTroNguoiDung;
import com.example.schoolhealth.models.TrangThaiNguoiDung;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDungDto {

    private String id; // String to match frontend

    @NotBlank(message = "Tên đăng nhập không được để trống")
    @Size(min = 3, max = 50, message = "Tên đăng nhập phải từ 3 đến 50 ký tự")
    private String tenDangNhap;

    // For input only, not for output
    @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự")
    private String password; // Plain password for creation/update requests

    @NotNull(message = "Vai trò không được để trống")
    private VaiTroNguoiDung vaiTro;

    @NotNull(message = "Thông tin cá nhân không được để trống")
    private ThongTinCaNhanDto thongTinCaNhan; // Changed to ThongTinCaNhanDto

    private String idTruongHoc;

    private String ngayTao; // ISO Date string for frontend compatibility

    @NotNull(message = "Trạng thái không được để trống")
    private TrangThaiNguoiDung trangThai;
}
