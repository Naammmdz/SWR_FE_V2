package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.MedicineRequestDTO;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.models.MedicineRequest;
import com.example.schoolhealth.models.Student;
import com.example.schoolhealth.repositories.MedicineRequestRepository;
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
public class MedicineRequestService {

    private static final String STATUS_PENDING = "PENDING";
    private static final String STATUS_APPROVED = "APPROVED";
    private static final String STATUS_REJECTED = "REJECTED";

    @Autowired
    private MedicineRequestRepository medicineRequestRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<MedicineRequestDTO> getAllMedicineRequests() {
        return medicineRequestRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MedicineRequestDTO getMedicineRequestById(Long id) {
        MedicineRequest request = medicineRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicineRequest not found with id: " + id));
        return convertToDTO(request);
    }

    @Transactional
    public MedicineRequestDTO createMedicineRequest(MedicineRequestDTO requestDTO) {
        Student student = studentRepository.findById(Long.parseLong(requestDTO.getStudentId()))
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + requestDTO.getStudentId()));

        MedicineRequest request = convertToEntity(requestDTO);
        request.setStudent(student);
        request.setRequestDate(LocalDate.now());
        request.setStatus(STATUS_PENDING);

        MedicineRequest savedRequest = medicineRequestRepository.save(request);
        return convertToDTO(savedRequest);
    }

    @Transactional
    public MedicineRequestDTO approveMedicineRequest(Long id, String approverId) {
        MedicineRequest request = medicineRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicineRequest not found with id: " + id));

        request.setStatus(STATUS_APPROVED);
        request.setApprovedBy(approverId);
        request.setApprovedDate(LocalDate.now());

        MedicineRequest updatedRequest = medicineRequestRepository.save(request);
        return convertToDTO(updatedRequest);
    }

    @Transactional
    public MedicineRequestDTO rejectMedicineRequest(Long id, String rejectorId, String staffNotes) {
        MedicineRequest request = medicineRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicineRequest not found with id: " + id));

        request.setStatus(STATUS_REJECTED);
        request.setApprovedBy(rejectorId); // User who actioned it
        request.setApprovedDate(LocalDate.now());
        request.setStaffNotes(staffNotes); // Add or append notes

        MedicineRequest updatedRequest = medicineRequestRepository.save(request);
        return convertToDTO(updatedRequest);
    }

    @Transactional(readOnly = true)
    public List<MedicineRequestDTO> getMedicineRequestsByStudentId(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            // Or just return empty list if student not found, depending on requirements
            throw new ResourceNotFoundException("Student not found with id: " + studentId);
        }
        return medicineRequestRepository.findByStudentId(studentId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private MedicineRequestDTO convertToDTO(MedicineRequest request) {
        MedicineRequestDTO dto = modelMapper.map(request, MedicineRequestDTO.class);
        if (request.getStudent() != null) {
            dto.setStudentId(request.getStudent().getId().toString());
        }
        // Format dates to ISO string
        if (request.getStartDate() != null) dto.setStartDate(request.getStartDate().format(DateTimeFormatter.ISO_DATE));
        if (request.getEndDate() != null) dto.setEndDate(request.getEndDate().format(DateTimeFormatter.ISO_DATE));
        if (request.getRequestDate() != null) dto.setRequestDate(request.getRequestDate().format(DateTimeFormatter.ISO_DATE));
        if (request.getApprovedDate() != null) dto.setApprovedDate(request.getApprovedDate().format(DateTimeFormatter.ISO_DATE));
        return dto;
    }

    private MedicineRequest convertToEntity(MedicineRequestDTO dto) {
        MedicineRequest request = modelMapper.map(dto, MedicineRequest.class);
        // Student is set in the calling method (create)
        // Dates are parsed from ISO string
        if (dto.getStartDate() != null && !dto.getStartDate().isEmpty()) request.setStartDate(LocalDate.parse(dto.getStartDate(), DateTimeFormatter.ISO_DATE));
        if (dto.getEndDate() != null && !dto.getEndDate().isEmpty()) request.setEndDate(LocalDate.parse(dto.getEndDate(), DateTimeFormatter.ISO_DATE));
        if (dto.getRequestDate() != null && !dto.getRequestDate().isEmpty()) request.setRequestDate(LocalDate.parse(dto.getRequestDate(), DateTimeFormatter.ISO_DATE));
        if (dto.getApprovedDate() != null && !dto.getApprovedDate().isEmpty()) request.setApprovedDate(LocalDate.parse(dto.getApprovedDate(), DateTimeFormatter.ISO_DATE));

        // ID is handled by DB for new entities.
        if (dto.getId() != null) {
             try {
                request.setId(Long.parseLong(dto.getId()));
            } catch (NumberFormatException e) {
                // Let ModelMapper or DB handle ID; or throw validation error
            }
        }
        return request;
    }
}
