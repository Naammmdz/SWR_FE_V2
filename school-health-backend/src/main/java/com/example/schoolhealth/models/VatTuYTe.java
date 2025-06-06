package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "vat_tu_y_te")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VatTuYTe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false)
    private String tenVatTu;

    private String maVatTu; // Optional

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DonViTinh donViTinh;

    @Lob
    private String moTaChiTiet;

    @Column(nullable = false)
    private Integer soLuongTonKho;

    private Integer nguongCanhBaoTonKho;
    private LocalDate ngayHetHan;
    private String nhaSanXuat;

    @Lob
    private String ghiChu;

    @Column(nullable = false)
    private Long idNguoiQuanLy; // Link to NguoiDung
}
