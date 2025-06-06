package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "nhat_ky_xuat_kho")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NhatKyXuatKho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false)
    private Long idSanPham; // ID of either Thuoc or VatTuYTe

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoaiSanPhamKho loaiSanPham;

    @Column(nullable = false)
    private String tenSanPham; // Denormalized for easier lookup in logs

    @Column(nullable = false)
    private Integer soLuongXuat;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DonViTinh donViTinh; // Denormalized

    @Column(nullable = false)
    private LocalDateTime ngayXuat;

    @Column(nullable = false)
    private Long idNguoiXuat; // Link to NguoiDung

    private Long idSuKienYTeLienQuan; // Link to SuKienYTe
    private Long idChienDichLienQuan; // Link to a Campaign entity (to be defined)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LyDoXuatKho lyDoXuat;

    @Lob
    private String ghiChu;

    @PrePersist
    protected void onCreate() {
        if (ngayXuat == null) {
            ngayXuat = LocalDateTime.now();
        }
    }
}
