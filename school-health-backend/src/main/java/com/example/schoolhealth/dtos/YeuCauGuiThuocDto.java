package com.example.schoolhealth.dtos;

import com.example.schoolhealth.models.TrangThaiYeuCauThuoc;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class YeuCauGuiThuocDto {

    private String id;

    @NotBlank(message = "ID học sinh không được để trống")
    private String idHocSinh;

    @NotBlank(message = "ID phụ huynh gửi không được để trống")
    private String idPhuHuynhGui;

    @NotBlank(message = "Tên thuốc không được để trống")
    private String tenThuoc;

    private String hamLuong;

    @NotBlank(message = "Đơn vị tính không được để trống")
    private String donViTinh;

    @NotNull(message = "Số lượng mỗi lần uống không được để trống")
    @Positive(message = "Số lượng mỗi lần uống phải là số dương")
    private Double soLuongMoiLanUong;

    @NotBlank(message = "Đơn vị uống không được để trống")
    private String donViUong;

    private String duongDung;

    @NotBlank(message = "Hướng dẫn sử dụng không được để trống")
    private String huongDanSuDung;

    @NotEmpty(message = "Thời gian kế hoạch uống không được để trống")
    private List<String> thoiGianKeHoachUong; // List of ISO DateTime strings

    @Valid
    private List<LichSuChoUongThuocDto> lichSuUongThuoc;

    private String donThuocUrl;
    private String ghiChuPhuHuynh;

    @NotBlank(message = "Liên hệ khẩn cấp không được để trống")
    private String lienHeKhanCap;

    @NotNull(message = "Trạng thái không được để trống")
    private TrangThaiYeuCauThuoc trangThai;

    private String idYTaXuLy;
    private String lyDoHuyHoacTuChoi;
    private String ngayTao; // ISO DateTime string
    private String ngayCapNhat; // ISO DateTime string
}
