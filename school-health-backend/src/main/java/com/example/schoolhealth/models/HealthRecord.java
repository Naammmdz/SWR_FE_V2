package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
// Assuming List<String> will be handled as a simple String for now,
// or potentially a more complex type/relationship later.
// For example, using @ElementCollection or a separate entity for list-like fields.

@Entity
@Data
@Table(name = "health_records")
public class HealthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String allergies; // Can be a JSON string or use @ElementCollection if DB supports it
    private String medicalConditions; // Can be a JSON string
    private String medications; // Can be a JSON string
    private String immunizationRecords; // Could be JSON or path to a document
    private String emergencyContacts; // Could be JSON
    private String notes;
    private LocalDate lastUpdated;

    @OneToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id", unique = true)
    private Student student;
}
