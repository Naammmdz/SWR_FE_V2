package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.MedicineRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRequestRepository extends JpaRepository<MedicineRequest, Long> {
    List<MedicineRequest> findByStudentId(Long studentId);
}
