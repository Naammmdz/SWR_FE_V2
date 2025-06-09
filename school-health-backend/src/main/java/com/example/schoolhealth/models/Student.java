package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String studentCode;
    private LocalDate dateOfBirth;
    private String gender;
    private String className;
    private Long schoolId; // Assuming this is an ID from another microservice or a simple type

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private User parent;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private HealthRecord healthRecord;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<HealthCheckup> healthCheckups = new java.util.ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<MedicineRequest> medicineRequests = new java.util.ArrayList<>();
}
