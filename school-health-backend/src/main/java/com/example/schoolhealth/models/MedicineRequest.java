package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "medicine_requests")
public class MedicineRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String medicineName;
    private String dosage; // e.g., "1 tablet", "10ml"
    private String frequency; // e.g., "Twice a day", "As needed"

    @Column(columnDefinition = "TEXT")
    private String reason; // Reason for medication

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate requestDate; // Date the request was made
    private String status; // e.g., "PENDING", "APPROVED", "REJECTED", "COMPLETED"

    @Column(columnDefinition = "TEXT")
    private String parentNotes;
    @Column(columnDefinition = "TEXT")
    private String staffNotes; // Notes from school staff/nurse

    private String approvedBy; // User ID or name of staff who approved/rejected
    private LocalDate approvedDate; // Date of approval/rejection
    private String schoolId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    // Using String for requesterParentId as decided for simplicity
    private String requesterParentId;
}
