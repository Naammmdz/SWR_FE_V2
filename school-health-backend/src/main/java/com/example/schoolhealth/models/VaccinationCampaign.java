package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "vaccination_campaigns")
public class VaccinationCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String vaccineType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String targetAgeGroup; // e.g., "5-11 years"
    private String status; // e.g., "PLANNED", "ONGOING", "COMPLETED", "APPROVED", "PENDING_APPROVAL"
    private String location;
    private String notes;
    private String schoolId; // To associate with a specific school
}
