package com.example.schoolhealth.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThongTinTiemChungDto {
    private String id; // Optional, but good for updates

    @NotBlank(message = "Tên vaccine không được để trống")
    private String tenVaccine;

    @NotBlank(message = "Ngày tiêm không được để trống")
    private String ngayTiem; // ISO Date string

    private String lieuLuong;
    private String ghiChu;
}
