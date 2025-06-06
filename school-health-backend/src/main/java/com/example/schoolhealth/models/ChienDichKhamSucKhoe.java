package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime; // For timestamps
import java.time.LocalDate; // For specific dates like thoiGianDuKien
import java.util.List;

@Entity
@Table(name = "chien_dich_kham_suc_khoe")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChienDichKhamSucKhoe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false)
    private String tenChienDich;

    @ElementCollection
    @CollectionTable(name = "chien_dich_kham_suc_khoe_loai_kham", joinColumns = @JoinColumn(name = "chien_dich_id"))
    @Column(name = "loai_kham", nullable = false)
    private List<String> loaiKham; // e.g., ["Mắt", "Tai mũi họng", "Răng hàm mặt"]

    @Lob
    @Column(nullable = false)
    private String doiTuongApDung;

    @Column(nullable = false)
    private LocalDate thoiGianDuKien; // Date of check-up event

    private String diaDiemKham;
    private String donViThucHienKham;

    @Lob
    private String ghiChuChung;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrangThaiChienDich trangThai;

    @Column(nullable = false)
    private Long idNguoiTao; // Link to NguoiDung

    private Long idNguoiDuyet; // Link to NguoiDung

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
