package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate; // Using LocalDate for date of birth

@Entity
@Table(name = "hoc_sinh")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HocSinh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long for auto-increment

    @Column(nullable = false)
    private String hoTen;

    private String maHocSinh;

    @Column(nullable = false)
    private LocalDate ngaySinh;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GioiTinh gioiTinh;

    private String lop;

    @Column(nullable = false)
    private String idTruongHoc; // Assuming this is an identifier

    @Column(nullable = false)
    private Long idNguoiGiamHoChinh; // Will be a @ManyToOne relation to NguoiDung

    // For cacNguoiGiamHoKhacIds, consider a @ManyToMany or @ElementCollection later
    // For now, we can skip it or use a simple String if it's a comma-separated list.
    // Let's use @ElementCollection for a list of Longs.
    @ElementCollection
    @CollectionTable(name = "hoc_sinh_giam_ho_khac", joinColumns = @JoinColumn(name = "hoc_sinh_id"))
    @Column(name = "nguoi_giam_ho_id")
    private java.util.List<Long> cacNguoiGiamHoKhacIds;


    private Long idHoSoSucKhoe; // Will be a @OneToOne relation to HoSoSucKhoe

    private String anhDaiDienUrl;

    @Lob // For potentially long text
    private String ghiChu;
}
