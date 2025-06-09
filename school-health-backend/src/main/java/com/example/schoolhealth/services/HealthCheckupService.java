package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.HealthCheckupDTO;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.models.HealthCheckup;
import com.example.schoolhealth.models.Student;
import com.example.schoolhealth.repositories.HealthCheckupRepository;
import com.example.schoolhealth.repositories.StudentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HealthCheckupService {

    @Autowired
    private HealthCheckupRepository healthCheckupRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<HealthCheckupDTO> getAllHealthCheckups() {
        return healthCheckupRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public HealthCheckupDTO getHealthCheckupById(Long id) {
        HealthCheckup checkup = healthCheckupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HealthCheckup not found with id: " + id));
        return convertToDTO(checkup);
    }

    @Transactional
    public HealthCheckupDTO createHealthCheckup(HealthCheckupDTO checkupDTO) {
        Student student = studentRepository.findById(Long.parseLong(checkupDTO.getStudentId()))
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + checkupDTO.getStudentId()));

        HealthCheckup checkup = convertToEntity(checkupDTO);
        checkup.setStudent(student);
        calculateAndSetBmi(checkup);

        HealthCheckup savedCheckup = healthCheckupRepository.save(checkup);
        return convertToDTO(savedCheckup);
    }

    @Transactional
    public HealthCheckupDTO updateHealthCheckup(Long id, HealthCheckupDTO checkupDTO) {
        HealthCheckup existingCheckup = healthCheckupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HealthCheckup not found with id: " + id));

        // Update basic fields from DTO using ModelMapper, then handle specific fields
        modelMapper.map(checkupDTO, existingCheckup);
        existingCheckup.setId(id); // Ensure ID is not changed by map

        if (checkupDTO.getCheckupDate() != null && !checkupDTO.getCheckupDate().isEmpty()) {
            existingCheckup.setCheckupDate(LocalDate.parse(checkupDTO.getCheckupDate(), DateTimeFormatter.ISO_DATE));
        }

        // If studentId is part of the DTO and can be changed
        if (checkupDTO.getStudentId() != null && !checkupDTO.getStudentId().equals(existingCheckup.getStudent().getId().toString())) {
            Student student = studentRepository.findById(Long.parseLong(checkupDTO.getStudentId()))
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + checkupDTO.getStudentId()));
            existingCheckup.setStudent(student);
        }

        calculateAndSetBmi(existingCheckup);

        HealthCheckup updatedCheckup = healthCheckupRepository.save(existingCheckup);
        return convertToDTO(updatedCheckup);
    }

    @Transactional
    public void deleteHealthCheckup(Long id) {
        if (!healthCheckupRepository.existsById(id)) {
            throw new ResourceNotFoundException("HealthCheckup not found with id: " + id);
        }
        healthCheckupRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<HealthCheckupDTO> getHealthCheckupsByStudentId(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new ResourceNotFoundException("Student not found with id: " + studentId);
        }
        return healthCheckupRepository.findByStudentId(studentId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private void calculateAndSetBmi(HealthCheckup checkup) {
        if (checkup.getHeight() != null && checkup.getWeight() != null && checkup.getHeight() > 0) {
            double heightInMeters = checkup.getHeight() / 100.0;
            double bmi = checkup.getWeight() / (heightInMeters * heightInMeters);
            checkup.setBmi(Math.round(bmi * 100.0) / 100.0); // Round to 2 decimal places
        } else {
            checkup.setBmi(null);
        }
    }

    private HealthCheckupDTO convertToDTO(HealthCheckup checkup) {
        HealthCheckupDTO dto = modelMapper.map(checkup, HealthCheckupDTO.class);
        if (checkup.getStudent() != null) {
            dto.setStudentId(checkup.getStudent().getId().toString());
        }
        if (checkup.getCheckupDate() != null) {
            dto.setCheckupDate(checkup.getCheckupDate().format(DateTimeFormatter.ISO_DATE));
        }
        return dto;
    }

    private HealthCheckup convertToEntity(HealthCheckupDTO dto) {
        HealthCheckup checkup = modelMapper.map(dto, HealthCheckup.class);
         // Student will be set in the calling method (create/update)
        if (dto.getCheckupDate() != null && !dto.getCheckupDate().isEmpty()) {
            checkup.setCheckupDate(LocalDate.parse(dto.getCheckupDate(), DateTimeFormatter.ISO_DATE));
        }
        // ID is handled by DB for new entities. For updates, it's set in update method.
        if (dto.getId() != null) {
             try {
                checkup.setId(Long.parseLong(dto.getId()));
            } catch (NumberFormatException e) {
                // Let ModelMapper or DB handle ID; or throw validation error
            }
        }
        return checkup;
    }
}
