package com.example.schoolhealth.dtos;

import com.example.schoolhealth.models.NhomMau;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoSoSucKhoeDto {

    private String id;

    @NotBlank(message = "ID học sinh không được để trống")
    private String idHocSinh;

    private NhomMau nhomMau; // Using the enum directly

    private List<String> diUng;
    private List<String> benhManTinh;
    private String tienSuDieuTri;

    @Valid // Enable validation for nested DTO
    private ChiTietLucDto thiLuc;

    @Valid // Enable validation for nested DTO
    private ChiTietLucDto thinhLuc; // Frontend uses this name for the second ChiTietLucDto

    @Valid
    private List<ThongTinTiemChungDto> tiemChung;

    private String ghiChuKhac;

    private String ngayCapNhatCuoi; // ISO DateTime string

    @NotBlank(message = "ID người cập nhật cuối không được để trống")
    private String idNguoiCapNhatCuoi;
}
