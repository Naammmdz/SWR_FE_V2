package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ho_so_suc_khoe")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoSoSucKhoe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false, unique = true)
    private Long idHocSinh; // Will be a @OneToOne relation to HocSinh

    @Enumerated(EnumType.STRING)
    private NhomMau nhomMau;

    @ElementCollection
    @CollectionTable(name = "ho_so_suc_khoe_di_ung", joinColumns = @JoinColumn(name = "ho_so_id"))
    @Column(name = "di_ung")
    private List<String> diUng;

    @ElementCollection
    @CollectionTable(name = "ho_so_suc_khoe_benh_man_tinh", joinColumns = @JoinColumn(name = "ho_so_id"))
    @Column(name = "benh_man_tinh")
    private List<String> benhManTinh;

    @Lob
    private String tienSuDieuTri;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name="trai", column=@Column(name="thi_luc_mat_trai")),
        @AttributeOverride(name="phai", column=@Column(name="thi_luc_mat_phai")),
        @AttributeOverride(name="ngayKham", column=@Column(name="thi_luc_ngay_kham")),
        @AttributeOverride(name="ghiChu", column=@Column(name="thi_luc_ghi_chu"))
    })
    private ChiTietLuc thiLuc;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name="trai", column=@Column(name="thinh_luc_tai_trai")),
        @AttributeOverride(name="phai", column=@Column(name="thinh_luc_tai_phai")),
        @AttributeOverride(name="ngayKham", column=@Column(name="thinh_luc_ngay_kham")),
        @AttributeOverride(name="ghiChu", column=@Column(name="thinh_luc_ghi_chu"))
    })
    private ChiTietLuc thinhLuc;

    @OneToMany(mappedBy = "hoSoSucKhoe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ThongTinTiemChung> tiemChung;

    @Lob
    private String ghiChuKhac;

    @Column(nullable = false)
    private LocalDateTime ngayCapNhatCuoi;

    @Column(nullable = false)
    private Long idNguoiCapNhatCuoi; // Will be a @ManyToOne relation to NguoiDung

    @PreUpdate
    @PrePersist
    protected void onUpdate() {
        ngayCapNhatCuoi = LocalDateTime.now();
    }
}
