package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.HealthRecordDTO;
import com.example.schoolhealth.dtos.StudentDTO;
import com.example.schoolhealth.dtos.HealthCheckupDTO;
import com.example.schoolhealth.dtos.MedicineRequestDTO; // Added import
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.models.Student;
import com.example.schoolhealth.repositories.StudentRepository;
import org.modelmapper.ModelMapper;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private HealthRecordService healthRecordService;

    @Autowired
    private HealthCheckupService healthCheckupService;

    @Autowired
    private MedicineRequestService medicineRequestService; // Added MedicineRequestService

    @Autowired
    private ModelMapper modelMapper;

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(student -> {
                    StudentDTO dto = modelMapper.map(student, StudentDTO.class);
                    // Manual mapping for fields not automatically handled by ModelMapper if names differ significantly
                    // Or configure ModelMapper for specific mappings
                    dto.setHoTen(student.getFullName());
                    dto.setMaHocSinh(student.getStudentCode());
                    if (student.getDateOfBirth() != null) {
                        dto.setNgaySinh(student.getDateOfBirth().format(DateTimeFormatter.ISO_DATE));
                    }
                    dto.setGioiTinh(student.getGender());
                    dto.setLop(student.getClassName());
                    dto.setIdTruongHoc(student.getSchoolId());
                    if (student.getParent() != null) {
                        dto.setIdNguoiGiamHoChinh(student.getParent().getId());
                    }
                    if (student.getHealthRecord() != null) {
                        dto.setIdHoSoSucKhoe(student.getHealthRecord().getId().toString());
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        StudentDTO dto = modelMapper.map(student, StudentDTO.class);
        dto.setHoTen(student.getFullName());
        dto.setMaHocSinh(student.getStudentCode());
        if (student.getDateOfBirth() != null) {
            dto.setNgaySinh(student.getDateOfBirth().format(DateTimeFormatter.ISO_DATE));
        }
        dto.setGioiTinh(student.getGender());
        dto.setLop(student.getClassName());
        dto.setIdTruongHoc(student.getSchoolId());
        if (student.getParent() != null) {
            dto.setIdNguoiGiamHoChinh(student.getParent().getId());
        }
        if (student.getHealthRecord() != null) {
            dto.setIdHoSoSucKhoe(student.getHealthRecord().getId().toString());
        }
        return dto;
    }

    public StudentDTO createStudent(StudentDTO studentDTO) {
        Student student = modelMapper.map(studentDTO, Student.class);
        // Manual mapping for fields not automatically handled or needing conversion
        student.setFullName(studentDTO.getHoTen());
        student.setStudentCode(studentDTO.getMaHocSinh());
        if (studentDTO.getNgaySinh() != null && !studentDTO.getNgaySinh().isEmpty()) {
            student.setDateOfBirth(LocalDate.parse(studentDTO.getNgaySinh(), DateTimeFormatter.ISO_DATE));
        }
        student.setGender(studentDTO.getGioiTinh());
        student.setClassName(studentDTO.getLop());
        student.setSchoolId(studentDTO.getIdTruongHoc());
        // Assuming parent User and other relations are handled elsewhere or via IDs
        // e.g., fetching User by idNguoiGiamHoChinh if necessary

        Student savedStudent = studentRepository.save(student);
        return modelMapper.map(savedStudent, StudentDTO.class);
    }

    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        // Update fields from DTO
        existingStudent.setFullName(studentDTO.getHoTen());
        existingStudent.setStudentCode(studentDTO.getMaHocSinh());
        if (studentDTO.getNgaySinh() != null && !studentDTO.getNgaySinh().isEmpty()) {
            existingStudent.setDateOfBirth(LocalDate.parse(studentDTO.getNgaySinh(), DateTimeFormatter.ISO_DATE));
        }
        existingStudent.setGender(studentDTO.getGioiTinh());
        existingStudent.setClassName(studentDTO.getLop());
        existingStudent.setSchoolId(studentDTO.getIdTruongHoc());
        // Update relationships if necessary (e.g., parent)

        Student updatedStudent = studentRepository.save(existingStudent);
        StudentDTO resultDTO = modelMapper.map(updatedStudent, StudentDTO.class);
        resultDTO.setHoTen(updatedStudent.getFullName());
        resultDTO.setMaHocSinh(updatedStudent.getStudentCode());
        if (updatedStudent.getDateOfBirth() != null) {
            resultDTO.setNgaySinh(updatedStudent.getDateOfBirth().format(DateTimeFormatter.ISO_DATE));
        }
        resultDTO.setGioiTinh(updatedStudent.getGender());
        resultDTO.setLop(updatedStudent.getClassName());
        resultDTO.setIdTruongHoc(updatedStudent.getSchoolId());
         if (updatedStudent.getParent() != null) {
            resultDTO.setIdNguoiGiamHoChinh(updatedStudent.getParent().getId());
        }
        if (updatedStudent.getHealthRecord() != null) {
            resultDTO.setIdHoSoSucKhoe(updatedStudent.getHealthRecord().getId().toString());
        }
        return resultDTO;
    }

    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    // Updated to use HealthRecordService
    public HealthRecordDTO getHealthRecordByStudentId(Long studentId) {
        return healthRecordService.getHealthRecordByStudentId(studentId);
    }

    // Updated to use HealthRecordService
    public HealthRecordDTO updateHealthRecordForStudent(Long studentId, HealthRecordDTO healthRecordDTO) {
        return healthRecordService.createOrUpdateHealthRecordForStudent(studentId, healthRecordDTO);
    }

    // Updated to use HealthCheckupService and return List<HealthCheckupDTO>
    public List<HealthCheckupDTO> getHealthCheckupsByStudentId(Long studentId) {
        // Ensure student exists before fetching checkups, or let HealthCheckupService handle it
        studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + studentId + " when fetching health checkups."));
        return healthCheckupService.getHealthCheckupsByStudentId(studentId);
    }

    // Updated to use MedicineRequestService and return List<MedicineRequestDTO>
    public List<MedicineRequestDTO> getMedicineRequestsByStudentId(Long studentId) {
        studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + studentId + " when fetching medicine requests."));
        return medicineRequestService.getMedicineRequestsByStudentId(studentId);
    }
}
