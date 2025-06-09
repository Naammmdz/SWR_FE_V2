package com.example.schoolhealth.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "medicine_requests")
public class MedicineRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requesting_parent_id", nullable = false)
    private User requestingParent; // Changed name from parent to requestingParent

    private String medicineName; // tenThuoc
    private String dosage; // hamLuong
    private String unit; // donViTinh
    private Double quantityPerDose; // soLuongMoiLanUong
    private String doseUnit; // donViUong
    private String routeOfAdministration; // duongDung

    @Lob
    private String usageInstructions; // huongDanSuDung

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "medicine_request_planned_schedules", joinColumns = @JoinColumn(name = "medicine_request_id"))
    @Column(name = "planned_time")
    private List<LocalDateTime> plannedSchedule; // thoiGianKeHoachUong

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "medicine_request_medication_log", joinColumns = @JoinColumn(name = "medicine_request_id"))
    private List<MedicationLogEntryEmbeddable> medicationLog; // lichSuUongThuoc

    private String prescriptionUrl; // donThuocUrl

    @Lob
    private String parentNotes; // ghiChuPhuHuynh

    private String emergencyContact; // lienHeKhanCap
    private String status; // trangThai

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "processing_nurse_id", nullable = true)
    private User processingNurse; // idYTaXuLy (assignedNurse)

    @Lob
    private String rejectionOrCancellationReason; // lyDoHuyHoacTuChoi (nullable)

    private LocalDateTime createdAt; // ngayTao
    private LocalDateTime updatedAt; // ngayCapNhat
}
