package com.example.schoolhealth.models;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThongTinCaNhan {
    private String hoTen;
    private String email;
    private String soDienThoai;
    private String diaChi;
}
