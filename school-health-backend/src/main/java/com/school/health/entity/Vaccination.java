package com.school.health.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "Vaccinations")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Vaccination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VaccinationId")
    private Integer vaccinationId;

    @Column(name = "VaccineName", nullable = false, length = 100)
    private String vaccineName;

    @Column(name = "VaccinationDate", nullable = false)
    private LocalDate vaccinationDate;

    @Column(name = "Dosage", length = 50)
    private String dosage;

    @Column(name = "Notes", length = 500)
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "StudentId", nullable = false)
    private Student student;

    @CreationTimestamp
    @Column(name = "CreatedAt")
    private LocalDate createdAt;
}
