package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "su_kien_y_te")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuKienYTe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false)
    private Long idHocSinh; // Link to HocSinh entity

    @Column(nullable = false)
    private Long idYTaGhiNhan; // Link to NguoiDung (Y_TA role)

    @Column(nullable = false)
    private LocalDateTime thoiGianXayRa;

    private String diaDiemXayRa;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoaiSuCoYTe loaiSuCo;

    @Enumerated(EnumType.STRING)
    private MucDoNghiemTrong mucDoNghiemTrong;

    @Lob
    @Column(nullable = false)
    private String moTaChiTiet;

    @Lob
    @Column(nullable = false)
    private String bienPhapXuLyBanDau;

    @ElementCollection
    @CollectionTable(name = "su_kien_y_te_thuoc_da_su_dung", joinColumns = @JoinColumn(name = "su_kien_y_te_id"))
    private List<SanPhamDaSuDung> thuocDaSuDung;

    @ElementCollection
    @CollectionTable(name = "su_kien_y_te_vat_tu_da_su_dung", joinColumns = @JoinColumn(name = "su_kien_y_te_id"))
    private List<SanPhamDaSuDung> vatTuDaSuDung;

    private Long idYeuCauGuiThuocLienQuan; // Link to YeuCauGuiThuoc

    @Lob
    @Column(nullable = false)
    private String tinhTrangHocSinhSauXuLy;

    @Column(nullable = false)
    private boolean daThongBaoPhuHuynh;

    private LocalDateTime thoiGianThongBaoPhuHuynh;

    @Lob
    private String ghiChuThemCuaYTa;

    @Column(nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Column(nullable = false)
    private LocalDateTime ngayCapNhat;

    @PrePersist
    protected void onCreate() {
        ngayTao = LocalDateTime.now();
        ngayCapNhat = LocalDateTime.now();
        if (daThongBaoPhuHuynh == false && thoiGianThongBaoPhuHuynh != null) {
            // This logic might be better in a service layer, but for now:
            // If time is set, assume true. Or clear time if false.
             daThongBaoPhuHuynh = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        ngayCapNhat = LocalDateTime.now();
         if (daThongBaoPhuHuynh == false && thoiGianThongBaoPhuHuynh != null) {
             daThongBaoPhuHuynh = true;
        } else if (daThongBaoPhuHuynh == true && thoiGianThongBaoPhuHuynh == null) {
            // If marked true but no time, maybe set time to now? Or this state is invalid.
            // For now, let's assume service layer handles this consistency.
        }
    }
}
