package com.example.schoolhealth.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietLucDto {
    private String matTrai; // Specific field name as per frontend type
    private String matPhai; // Specific field name as per frontend type
    private String ngayKham; // ISO Date string
    private String ghiChu;
}
