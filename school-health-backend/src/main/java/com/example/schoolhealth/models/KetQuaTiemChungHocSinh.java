package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime; // Using LocalDateTime for timestamps
import java.time.LocalDate; // For specific dates like ngayTiemThucTe

@Entity
@Table(name = "ket_qua_tiem_chung_hoc_sinh")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KetQuaTiemChungHocSinh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false)
    private Long idChienDichTiemChung; // Link to ChienDichTiemChung

    @Column(nullable = false)
    private Long idHocSinh; // Link to HocSinh

    private Long idPhuHuynh; // Link to NguoiDung (PhuHuynh) who responded

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrangThaiThamGiaTiemChung trangThaiThamGia;

    private LocalDateTime ngayDongYHoacTuChoi;
    private LocalDate ngayTiemThucTe;
    private String loVaccine;
    private String tenCanBoTiem;

    @Lob
    private String phanUngSauTiem;

    @Lob
    private String ghiChuCuaYTa;

    private boolean daGuiThongBaoKetQuaChoPH;
    private LocalDateTime ngayGuiThongBaoKetQua;
}
