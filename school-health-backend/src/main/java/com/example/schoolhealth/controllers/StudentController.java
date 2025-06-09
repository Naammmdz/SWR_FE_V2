package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.HealthRecordDTO;
import com.example.schoolhealth.dtos.StudentDTO;
import com.example.schoolhealth.dtos.HealthCheckupDTO;
import com.example.schoolhealth.dtos.MedicineRequestDTO; // Added import
import com.example.schoolhealth.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        try {
            StudentDTO studentDTO = studentService.getStudentById(id);
            return ResponseEntity.ok(studentDTO);
        } catch (RuntimeException e) { // Replace with specific ResourceNotFoundException
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
        } catch (RuntimeException e) { // Replace with specific ResourceNotFoundException
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        try {
            studentService.deleteStudent(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) { // Replace with specific ResourceNotFoundException
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}/health-record")
    public ResponseEntity<HealthRecordDTO> getHealthRecordByStudentId(@PathVariable Long id) {
        // Placeholder:
        HealthRecordDTO healthRecord = studentService.getHealthRecordByStudentId(id);
        if (healthRecord != null && healthRecord.getId() != null) { // Basic check for placeholder
             return ResponseEntity.ok(healthRecord);
        }
        // In a real scenario, this might return NOT_FOUND if the record doesn't exist
        // For now, returning the placeholder directly or a specific response for placeholder
        return ResponseEntity.ok(healthRecord); // Or handle as a placeholder response
    }

    @PutMapping("/{id}/health-record")
    public ResponseEntity<HealthRecordDTO> updateHealthRecordForStudent(@PathVariable Long id, @RequestBody HealthRecordDTO healthRecordDTO) {
        // Placeholder:
        HealthRecordDTO updatedRecord = studentService.updateHealthRecordForStudent(id, healthRecordDTO);
        return ResponseEntity.ok(updatedRecord);
    }

    @GetMapping("/{id}/health-checkups")
    public ResponseEntity<List<HealthCheckupDTO>> getHealthCheckupsByStudentId(@PathVariable Long id) {
        List<HealthCheckupDTO> checkups = studentService.getHealthCheckupsByStudentId(id);
        return ResponseEntity.ok(checkups);
    }

    @GetMapping("/{id}/medicine-requests")
    public ResponseEntity<List<MedicineRequestDTO>> getMedicineRequestsByStudentId(@PathVariable Long id) {
        List<MedicineRequestDTO> requests = studentService.getMedicineRequestsByStudentId(id);
        return ResponseEntity.ok(requests);
    }
}
