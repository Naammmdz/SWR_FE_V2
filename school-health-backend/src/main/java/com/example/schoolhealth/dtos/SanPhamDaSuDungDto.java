package com.example.schoolhealth.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamDaSuDungDto {
    // Field names match frontend: idThuoc/idVatTu. We use a generic idSanPham here.
    // The service layer would determine if it's a Thuoc or VatTu when processing.
    // Or, have separate DTOs: ThuocDaSuDungDto, VatTuDaSuDungDto if structure differs significantly.
    // For now, using a generic one based on current SanPhamDaSuDung entity.
    @NotBlank(message = "ID sản phẩm không được để trống")
    private String idSanPham; // Represents idThuoc or idVatTu from frontend

    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String tenSanPham; // Represents tenThuoc or tenVatTu

    @NotNull(message = "Số lượng không được để trống")
    @Positive(message = "Số lượng phải là số dương")
    private Double soLuong;

    @NotBlank(message = "Đơn vị không được để trống")
    private String donVi;
}
