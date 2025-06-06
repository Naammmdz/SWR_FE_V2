package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "thuoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Thuoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false)
    private String tenThuoc;

    private String maThuoc; // Optional
    private String hamLuong;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DonViTinh donViTinh;

    @Lob
    private String moTaChiTiet;

    @Column(nullable = false)
    private Integer soLuongTonKho; // Assuming integer for stock quantity

    private Integer nguongCanhBaoTonKho;
    private LocalDate ngayHetHan;
    private String nhaSanXuat;

    @Lob
    private String ghiChu;

    @Column(nullable = false)
    private Long idNguoiQuanLy; // Link to NguoiDung
}
