package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime; // Using LocalDateTime for dates

@Entity
@Table(name = "nguoi_dung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long for auto-increment

    @Column(unique = true, nullable = false)
    private String tenDangNhap;

    private String matKhauHash; // Password should be hashed

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VaiTroNguoiDung vaiTro;

    @Embedded
    private ThongTinCaNhan thongTinCaNhan;

    private String idTruongHoc; // Assuming this is an identifier from another system/table

    @Column(nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Enumerated(EnumType.STRING)
    private TrangThaiNguoiDung trangThai; // Enum for status

    @PrePersist
    protected void onCreate() {
        ngayTao = LocalDateTime.now();
    }
}
