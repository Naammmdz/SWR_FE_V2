package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.HealthRecordDTO;
import com.example.schoolhealth.dtos.StudentDTO;
// Replaced HealthCheckupDTO with KetQuaKhamSucKhoeHocSinhDTO for this specific endpoint
import com.example.schoolhealth.dtos.KetQuaKhamSucKhoeHocSinhDTO;
import com.example.schoolhealth.dtos.MedicineRequestDTO;
import com.example.schoolhealth.services.StudentService;
import com.example.schoolhealth.services.HealthCheckupService; // Added service
import com.example.schoolhealth.services.MedicineRequestService; // Added service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin; // Added CrossOrigin import
import com.example.schoolhealth.exceptions.ResourceNotFoundException; // Added ResourceNotFoundException import

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;
    private final HealthCheckupService healthCheckupService;
    private final MedicineRequestService medicineRequestService;

    @Autowired
    public StudentController(StudentService studentService,
                             HealthCheckupService healthCheckupService,
                             MedicineRequestService medicineRequestService) {
        this.studentService = studentService;
        this.healthCheckupService = healthCheckupService;
        this.medicineRequestService = medicineRequestService;
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        try {
            StudentDTO studentDTO = studentService.getStudentById(id);
            return ResponseEntity.ok(studentDTO);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<StudentDTO> createStudent(@RequestBody StudentDTO studentDTO) {
        StudentDTO createdStudent = studentService.createStudent(studentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
        try {
            StudentDTO updatedStudent = studentService.updateStudent(id, studentDTO);
            return ResponseEntity.ok(updatedStudent);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        try {
            studentService.deleteStudent(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}/health-record")
    public ResponseEntity<HealthRecordDTO> getHealthRecordByStudentId(@PathVariable Long id) {
        try {
            HealthRecordDTO healthRecord = studentService.getHealthRecordByStudentId(id);
            return ResponseEntity.ok(healthRecord);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}/health-record")
    public ResponseEntity<HealthRecordDTO> updateHealthRecordForStudent(@PathVariable Long id, @RequestBody HealthRecordDTO healthRecordDTO) {
        // Placeholder:
        HealthRecordDTO updatedRecord = studentService.updateHealthRecordForStudent(id, healthRecordDTO);
        return ResponseEntity.ok(updatedRecord);
    }

    // Method name in file is getHealthCheckupsByStudentId, but prompt refers to getStudentHealthCheckups
    // I will update the existing method name and signature.
    @GetMapping("/{id}/health-checkups")
    public ResponseEntity<List<KetQuaKhamSucKhoeHocSinhDTO>> getHealthCheckupsByStudentId(@PathVariable Long id) {
        List<KetQuaKhamSucKhoeHocSinhDTO> healthCheckups = healthCheckupService.getHealthCheckupResultsForStudent(id);
        return ResponseEntity.ok(healthCheckups);
    }

    // Method name in file is getMedicineRequestsByStudentId, but prompt refers to getStudentMedicineRequests
    // I will update the existing method name and signature.
    @GetMapping("/{id}/medicine-requests")
    public ResponseEntity<List<MedicineRequestDTO>> getMedicineRequestsByStudentId(@PathVariable Long id) {
        List<MedicineRequestDTO> medicineRequests = medicineRequestService.getMedicineRequestsForStudent(id);
        return ResponseEntity.ok(medicineRequests);
    }
}
