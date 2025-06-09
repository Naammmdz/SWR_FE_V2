package com.example.schoolhealth.dtos;

import lombok.Data;

@Data
public class HealthRecordDTO {
    private String id;
    private String studentId; // To be mapped from HealthRecord.student.id
    private String allergies;
    private String medicalConditions;
    private String medications;
    private String immunizationRecords;
    private String emergencyContacts;
    private String notes;
    private String lastUpdated; // ISO date format (String)
}
