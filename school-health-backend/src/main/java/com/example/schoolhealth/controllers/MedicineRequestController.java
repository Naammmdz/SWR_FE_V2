package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.MedicineActionDTO;
import com.example.schoolhealth.dtos.MedicineRequestDTO;
import com.example.schoolhealth.services.MedicineRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
        MedicineRequestDTO requestDTO = medicineRequestService.getMedicineRequestById(id);
        return ResponseEntity.ok(requestDTO);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<MedicineRequestDTO> createMedicineRequest(@RequestBody MedicineRequestDTO requestDTO) {
        MedicineRequestDTO createdRequest = medicineRequestService.createMedicineRequest(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<MedicineRequestDTO> approveMedicineRequest(@PathVariable Long id, @RequestBody MedicineActionDTO actionDTO) {
        // Assuming actionDTO.getUserId() contains the ID of the user approving
        // In a real app, this might come from the authenticated user's security context
        MedicineRequestDTO approvedRequest = medicineRequestService.approveMedicineRequest(id, actionDTO.getUserId());
        return ResponseEntity.ok(approvedRequest);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<MedicineRequestDTO> rejectMedicineRequest(@PathVariable Long id, @RequestBody MedicineActionDTO actionDTO) {
        // Assuming actionDTO.getUserId() contains the ID of the user rejecting
        // And actionDTO.getNotes() contains the reason for rejection
        MedicineRequestDTO rejectedRequest = medicineRequestService.rejectMedicineRequest(id, actionDTO.getUserId(), actionDTO.getNotes());
        return ResponseEntity.ok(rejectedRequest);
    }

    // Endpoint to get requests by student ID, if needed directly on this controller
    // (also available via StudentController)
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<MedicineRequestDTO>> getMedicineRequestsByStudentId(@PathVariable Long studentId) {
        List<MedicineRequestDTO> requests = medicineRequestService.getMedicineRequestsByStudentId(studentId);
        return ResponseEntity.ok(requests);
    }
}
