package com.example.schoolhealth.controllers;

// Removed MedicineActionDTO import
import com.example.schoolhealth.dtos.MedicineRequestDTO;
import com.example.schoolhealth.services.MedicineRequestService;
import com.example.schoolhealth.exceptions.ResourceNotFoundException; // Added ResourceNotFoundException
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin; // Added CrossOrigin

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Added CrossOrigin
@RequestMapping("/api/medicine-requests")
public class MedicineRequestController {

    @Autowired
    private MedicineRequestService medicineRequestService;

    @GetMapping
    public ResponseEntity<List<MedicineRequestDTO>> getAllMedicineRequests() {
        return ResponseEntity.ok(medicineRequestService.getAllMedicineRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineRequestDTO> getMedicineRequestById(@PathVariable Long id) {
        try {
            MedicineRequestDTO requestDTO = medicineRequestService.getMedicineRequestById(id);
            return ResponseEntity.ok(requestDTO);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<MedicineRequestDTO> createMedicineRequest(@RequestBody MedicineRequestDTO requestDTO) {
        // idPhuHuynhGui and idHocSinh must be set in requestDTO from client
        MedicineRequestDTO createdRequest = medicineRequestService.createMedicineRequest(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<MedicineRequestDTO> approveMedicineRequest(@PathVariable Long id, @RequestParam String approverUserId) {
        try {
            MedicineRequestDTO approvedRequest = medicineRequestService.approveMedicineRequest(id, approverUserId);
            return ResponseEntity.ok(approvedRequest);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<MedicineRequestDTO> rejectMedicineRequest(@PathVariable Long id,
                                                                    @RequestParam String rejecterUserId,
                                                                    @RequestParam String reason) {
        try {
            MedicineRequestDTO rejectedRequest = medicineRequestService.rejectMedicineRequest(id, rejecterUserId, reason);
            return ResponseEntity.ok(rejectedRequest);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Endpoint to get requests by student ID, if needed directly on this controller
    // (also available via StudentController)
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<MedicineRequestDTO>> getMedicineRequestsByStudentId(@PathVariable Long studentId) {
        List<MedicineRequestDTO> requests = medicineRequestService.getMedicineRequestsByStudentId(studentId);
        return ResponseEntity.ok(requests);
    }
}
