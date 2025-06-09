package com.school.health.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Students")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StudentId")
    private Integer studentId;

    @Column(name = "FullName", nullable = false, length = 100)
    private String fullName;

    @Column(name = "DateOfBirth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "Gender", nullable = false, length = 10)
    private String gender;

    @Column(name = "ClassName", nullable = false, length = 20)
    private String className;

    @Column(name = "BloodType", length = 5)
    private String bloodType;

    @Column(name = "Allergies", columnDefinition = "TEXT")
    private String allergies;

    @Column(name = "ChronicDiseases", columnDefinition = "TEXT")
    private String chronicDiseases;

    @Column(name = "MedicalHistory", columnDefinition = "TEXT")
    private String medicalHistory;

    @Column(name = "VisionLeft", length = 10)
    private String visionLeft;

    @Column(name = "VisionRight", length = 10)
    private String visionRight;

    @Column(name = "VisionCheckDate")
    private LocalDate visionCheckDate;

    @Column(name = "VisionNotes", length = 500)
    private String visionNotes;

    @Column(name = "HearingLeft", length = 20)
    private String hearingLeft;

    @Column(name = "HearingRight", length = 20)
    private String hearingRight;

    @Column(name = "HearingCheckDate")
    private LocalDate hearingCheckDate;

    @Column(name = "Notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "LastUpdatedAt")
    private LocalDate lastUpdatedAt;

    @Column(name = "LastUpdatedBy")
    private Integer lastUpdatedBy;

    @Column(name = "IsActive")
    private boolean isActive = true;

    @CreationTimestamp
    @Column(name = "CreatedAt")
    private LocalDate createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentId", nullable = false)
    private User parent;

    // Quan hệ với bảng Vaccinations (nếu cần)
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vaccination> vaccinations;

    @PreUpdate
    protected void onUpdate() {
        this.lastUpdatedAt = LocalDate.now();
    }
}
