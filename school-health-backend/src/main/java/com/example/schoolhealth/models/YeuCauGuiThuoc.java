package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "yeu_cau_gui_thuoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class YeuCauGuiThuoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false)
    private Long idHocSinh; // Link to HocSinh entity

    @Column(nullable = false)
    private Long idPhuHuynhGui; // Link to NguoiDung (PHU_HUYNH role)

    @Column(nullable = false)
    private String tenThuoc;

    private String hamLuong;

    @Column(nullable = false)
    private String donViTinh; // Consider an enum if values are fixed

    @Column(nullable = false)
    private Double soLuongMoiLanUong; // Changed from int to Double for flexibility

    @Column(nullable = false)
    private String donViUong; // e.g., "viên", "ml". Consider an enum.

    private String duongDung; // e.g., "Uống", "Bôi". Consider an enum.

    @Lob
    @Column(nullable = false)
    private String huongDanSuDung;

    @ElementCollection
    @CollectionTable(name = "yeu_cau_gui_thuoc_ke_hoach_uong", joinColumns = @JoinColumn(name = "yeu_cau_id"))
    @Column(name = "thoi_gian_ke_hoach", nullable = false)
    private List<LocalDateTime> thoiGianKeHoachUong; // Array of ISO Date strings

    @OneToMany(mappedBy = "yeuCauGuiThuoc", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<LichSuChoUongThuoc> lichSuUongThuoc;

    private String donThuocUrl;

    @Lob
    private String ghiChuPhuHuynh;

    @Column(nullable = false)
    private String lienHeKhanCap; // Phone number or contact info

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrangThaiYeuCauThuoc trangThai;

    private Long idYTaXuLy; // Link to NguoiDung (Y_TA role)

    @Lob
    private String lyDoHuyHoacTuChoi;

    @Column(nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Column(nullable = false)
    private LocalDateTime ngayCapNhat;

    @PrePersist
    protected void onCreate() {
        ngayTao = LocalDateTime.now();
        ngayCapNhat = LocalDateTime.now();
        if (trangThai == null) { // Default status
            trangThai = TrangThaiYeuCauThuoc.MOI_TAO;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        ngayCapNhat = LocalDateTime.now();
    }
}
