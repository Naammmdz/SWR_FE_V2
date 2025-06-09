package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.HealthCheckup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthCheckupRepository extends JpaRepository<HealthCheckup, Long> {
    List<HealthCheckup> findByStudentId(Long studentId);
}
