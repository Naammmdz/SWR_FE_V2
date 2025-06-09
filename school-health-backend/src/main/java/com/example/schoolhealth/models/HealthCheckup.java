package com.example.schoolhealth.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "health_checkup_campaigns") // Renamed table to avoid conflict if an old 'health_checkups' table for individual records exists
public class HealthCheckup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String checkupName; // tenChienDich

    @ElementCollection
    @CollectionTable(name = "health_checkup_types", joinColumns = @JoinColumn(name = "health_checkup_campaign_id"))
    @Column(name = "checkup_type")
    private List<String> checkupTypes; // loaiKham

    private String targetAudience; // doiTuongApDung
    private LocalDate expectedDate; // thoiGianDuKien
    private String location; // diaDiemKham
    private String performingUnit; // donViThucHienKham

    @Lob
    private String generalNotes; // ghiChuChung

    private String status; // trangThai (e.g., PLANNED, APPROVED, IN_PROGRESS, COMPLETED, CANCELLED)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id")
    private User createdBy; // idNguoiTao

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by_user_id", nullable = true)
    private User approvedBy; // idNguoiDuyet

    private LocalDate createdAt; // ngayTao
    private LocalDate approvedAt; // ngayDuyet (nullable)

    @Lob
    private String cancellationReason; // lyDoHuy (nullable)
}
