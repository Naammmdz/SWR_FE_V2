package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "lich_su_cho_uong_thuoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LichSuChoUongThuoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    // idYeuCauGuiThuoc is represented by the ManyToOne relationship below
    // private String idYeuCauGuiThuoc;

    @Column(nullable = false)
    private LocalDateTime thoiGianKeHoach;

    private LocalDateTime thoiGianThucTe;

    private Long idYTaChoUong; // Link to NguoiDung (Y_TA role)

    @Lob
    private String ghiChuYTa;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrangThaiLichSuUongThuoc trangThai;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "yeu_cau_gui_thuoc_id", nullable = false)
    private YeuCauGuiThuoc yeuCauGuiThuoc;
}
