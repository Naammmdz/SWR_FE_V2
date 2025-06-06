package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime; // Using LocalDateTime for timestamps

@Entity
@Table(name = "chien_dich_tiem_chung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChienDichTiemChung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false)
    private String tenChienDich;

    @Column(nullable = false)
    private String tenVaccine;

    @Lob
    private String moTaVaccine;

    @Lob
    @Column(nullable = false)
    private String doiTuongApDung; // e.g., "Học sinh khối 1", "Toàn trường"

    @Column(nullable = false)
    private LocalDateTime thoiGianDuKienBatDau;

    @Column(nullable = false)
    private LocalDateTime thoiGianDuKienKetThuc;

    private String diaDiemTiemChung;

    @Lob
    private String ghiChuChung;

    @Lob
    private String tieuChiThamGia; // Eligibility criteria

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrangThaiChienDich trangThai;

    @Column(nullable = false)
    private Long idNguoiTao; // Link to NguoiDung

    private Long idNguoiDuyet; // Link to NguoiDung (Admin/Manager role)

    @Column(nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    private LocalDateTime ngayDuyet;

    @Lob
    private String lyDoHuy;

    @PrePersist
    protected void onCreate() {
        ngayTao = LocalDateTime.now();
        if (trangThai == null) {
            trangThai = TrangThaiChienDich.MOI_TAO;
        }
    }
}
