package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "thong_bao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThongBao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false)
    private Long idNguoiNhan; // Link to NguoiDung

    @Column(nullable = false)
    private String tieuDe;

    @Lob
    @Column(nullable = false)
    private String noiDung;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoaiThongBao loaiThongBao;

    @Column(nullable = false)
    private LocalDateTime thoiGianGui;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrangThaiDocThongBao trangThaiDoc;

    private String linkLienQuan;
    private Long idNguoiGui; // Optional: Link to NguoiDung who initiated the notification

    @Enumerated(EnumType.STRING)
    private MucDoQuanTrongThongBao mucDoQuanTrong;

    @PrePersist
    protected void onCreate() {
        if (thoiGianGui == null) {
            thoiGianGui = LocalDateTime.now();
        }
        if (trangThaiDoc == null) {
            trangThaiDoc = TrangThaiDocThongBao.CHUA_DOC;
        }
        if (mucDoQuanTrong == null) {
            mucDoQuanTrong = MucDoQuanTrongThongBao.THONG_THUONG;
        }
    }
}
