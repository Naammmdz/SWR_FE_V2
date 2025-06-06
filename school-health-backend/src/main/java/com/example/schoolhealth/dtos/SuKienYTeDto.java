package com.example.schoolhealth.dtos;

import com.example.schoolhealth.models.LoaiSuCoYTe;
import com.example.schoolhealth.models.MucDoNghiemTrong;
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
public class SuKienYTeDto {

    private String id;

    @NotBlank(message = "ID học sinh không được để trống")
    private String idHocSinh;

    @NotBlank(message = "ID y tá ghi nhận không được để trống")
    private String idYTaGhiNhan;

    @NotBlank(message = "Thời gian xảy ra không được để trống")
    private String thoiGianXayRa; // ISO DateTime string

    private String diaDiemXayRa;

    @NotNull(message = "Loại sự cố không được để trống")
    private LoaiSuCoYTe loaiSuCo;

    private MucDoNghiemTrong mucDoNghiemTrong;

    @NotBlank(message = "Mô tả chi tiết không được để trống")
    private String moTaChiTiet;

    @NotBlank(message = "Biện pháp xử lý ban đầu không được để trống")
    private String bienPhapXuLyBanDau;

    @Valid
    private List<SanPhamDaSuDungDto> thuocDaSuDung;

    @Valid
    private List<SanPhamDaSuDungDto> vatTuDaSuDung;

    private String idYeuCauGuiThuocLienQuan;

    @NotBlank(message = "Tình trạng học sinh sau xử lý không được để trống")
    private String tinhTrangHocSinhSauXuLy;

    @NotNull(message = "Thông tin 'Đã thông báo phụ huynh' không được để trống")
    private Boolean daThongBaoPhuHuynh; // Changed to Boolean wrapper class to allow null if needed, though frontend sends boolean

    private String thoiGianThongBaoPhuHuynh; // ISO DateTime string
    private String ghiChuThemCuaYTa;
    private String ngayTao; // ISO DateTime string
    private String ngayCapNhat; // ISO DateTime string
}
