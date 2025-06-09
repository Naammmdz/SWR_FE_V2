package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.HealthRecordDTO;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.models.HealthRecord;
import com.example.schoolhealth.models.Student;
import com.example.schoolhealth.repositories.HealthRecordRepository;
import com.example.schoolhealth.repositories.StudentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class HealthRecordService {

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public HealthRecordDTO getHealthRecordByStudentId(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        HealthRecord healthRecord = healthRecordRepository.findByStudentId(studentId)
                .orElseGet(() -> {
                    // Return a new/empty DTO or a minimal HealthRecord entity if no record exists
                    // Depending on requirements, could also throw ResourceNotFoundException
                    // For now, creating a new HealthRecord associated with the student
                    HealthRecord newRecord = new HealthRecord();
                    newRecord.setStudent(student);
                    newRecord.setLastUpdated(LocalDate.now()); // Set a default last updated date
                    // Initialize other fields to default/empty values if necessary
                    newRecord.setAllergies("");
                    newRecord.setMedicalConditions("");
                    newRecord.setMedications("");
                    newRecord.setImmunizationRecords("");
                    newRecord.setEmergencyContacts("");
                    newRecord.setNotes("");
                    return healthRecordRepository.save(newRecord); // Save the new record
                });

        HealthRecordDTO dto = modelMapper.map(healthRecord, HealthRecordDTO.class);
        dto.setStudentId(student.getId().toString());
        if (healthRecord.getLastUpdated() != null) {
            dto.setLastUpdated(healthRecord.getLastUpdated().format(DateTimeFormatter.ISO_DATE));
        }
        return dto;
    }

    @Transactional
    public HealthRecordDTO createOrUpdateHealthRecordForStudent(Long studentId, HealthRecordDTO healthRecordDTO) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        HealthRecord healthRecord = healthRecordRepository.findByStudentId(studentId)
                .orElse(new HealthRecord());

        // Map DTO to entity
        modelMapper.map(healthRecordDTO, healthRecord); // map basic fields
        healthRecord.setStudent(student); // Set the student relationship

        if (healthRecordDTO.getLastUpdated() != null && !healthRecordDTO.getLastUpdated().isEmpty()) {
            healthRecord.setLastUpdated(LocalDate.parse(healthRecordDTO.getLastUpdated(), DateTimeFormatter.ISO_DATE));
        } else {
            healthRecord.setLastUpdated(LocalDate.now());
        }

        // Ensure ID is not overwritten if it's an update
        if (healthRecordDTO.getId() != null && !healthRecordDTO.getId().isEmpty()){
             try {
                healthRecord.setId(Long.parseLong(healthRecordDTO.getId()));
            } catch (NumberFormatException e) {
                // Handle invalid ID format if necessary, or assume ID is managed by DB
            }
        }


        HealthRecord savedHealthRecord = healthRecordRepository.save(healthRecord);

        HealthRecordDTO resultDTO = modelMapper.map(savedHealthRecord, HealthRecordDTO.class);
        resultDTO.setStudentId(savedHealthRecord.getStudent().getId().toString());
         if (savedHealthRecord.getLastUpdated() != null) {
            resultDTO.setLastUpdated(savedHealthRecord.getLastUpdated().format(DateTimeFormatter.ISO_DATE));
        }
        return resultDTO;
    }
}
