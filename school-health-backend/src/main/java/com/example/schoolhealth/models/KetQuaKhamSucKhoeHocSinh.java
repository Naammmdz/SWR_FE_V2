package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime; // For timestamps
import java.time.LocalDate; // For specific dates like ngayKham
// For Record<String, any> -> Map<String, String> or a JSONB type if DB supports
import io.hypersistence.utils.hibernate.type.json.JsonType; // Need to add dependency for this
import org.hibernate.annotations.Type;
import java.util.Map;


@Entity
@Table(name = "ket_qua_kham_suc_khoe_hoc_sinh")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KetQuaKhamSucKhoeHocSinh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed from String to Long

    @Column(nullable = false)
    private Long idChienDichKhamSucKhoe; // Link to ChienDichKhamSucKhoe

    @Column(nullable = false)
    private Long idHocSinh; // Link to HocSinh

    @Column(nullable = false)
    private LocalDate ngayKham;

    @Type(JsonType.class) // Using JsonType for Map<String, Object>
    @Column(columnDefinition = "jsonb") // Or "json" depending on DB
    private Map<String, Object> ketQuaChiTiet; // Store as JSON

    @Lob
    @Column(nullable = false)
    private String ketLuanTongQuatCuaBacSi;

    @Lob
    private String deNghiCuaBacSi;

    private boolean canHenLichTuVan;
    private String idBacSiKham; // Could be an external ID or simple string name

    private boolean daGuiThongBaoKetQuaChoPH;
    private LocalDateTime ngayGuiThongBaoKetQua;
}
