package com.example.schoolhealth.dtos;

import lombok.Data;

@Data
public class MedicineRequestDTO {
    private String id;
    private String studentId;
    private String requesterParentId;
    private String medicineName;
    private String dosage;
    private String frequency;
    private String reason;
    private String startDate; // ISO date format
    private String endDate; // ISO date format
    private String requestDate; // ISO date format
    private String status;
    private String parentNotes;
    private String staffNotes;
    private String approvedBy;
    private String approvedDate; // ISO date format, nullable
    private String schoolId;
}
