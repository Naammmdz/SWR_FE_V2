package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.HealthCheckup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthCheckupRepository extends JpaRepository<HealthCheckup, Long> {
    // Custom query methods specific to health checkup campaigns can be added here if needed.
    // For example:
    // List<HealthCheckup> findByStatus(String status);
    // List<HealthCheckup> findByExpectedDateBetween(LocalDate startDate, LocalDate endDate);
}
