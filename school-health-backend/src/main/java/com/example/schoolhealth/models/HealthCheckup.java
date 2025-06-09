package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "health_checkups")
public class HealthCheckup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate checkupDate;
    private Double height; // in cm
    private Double weight; // in kg
    private Double bmi; // Calculated: weight (kg) / (height (m))^2

    private String visionLeft; // e.g., "20/20"
    private String visionRight;

    private String hearingLeft; // e.g., "Normal"
    private String hearingRight;

    private String dentalHealth; // e.g., "Good", "Cavities Found"
    private String scoliosis; // e.g., "Not Detected", "Suspected"

    @Column(columnDefinition = "TEXT")
    private String otherObservations;
    @Column(columnDefinition = "TEXT")
    private String recommendations;

    private String doctorName;
    private String location; // e.g., "School Clinic", "City Hospital"
    private String eventType; // "ROUTINE_CHECKUP", "EMERGENCY", etc.
    private String schoolId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
}
