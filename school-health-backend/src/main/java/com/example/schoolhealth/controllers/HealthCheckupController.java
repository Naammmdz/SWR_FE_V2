package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.HealthCheckupDTO;
import com.example.schoolhealth.services.HealthCheckupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin; // Added CrossOrigin
import com.example.schoolhealth.exceptions.ResourceNotFoundException; // Added ResourceNotFoundException

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Added CrossOrigin
@RequestMapping("/api/health-checkups")
public class HealthCheckupController {

    @Autowired
    private HealthCheckupService healthCheckupService;

    @GetMapping
    public ResponseEntity<List<HealthCheckupDTO>> getAllHealthCheckups() {
        return ResponseEntity.ok(healthCheckupService.getAllHealthCheckups());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<HealthCheckupDTO> createHealthCheckup(@RequestBody HealthCheckupDTO checkupDTO) {
        HealthCheckupDTO createdCheckup = healthCheckupService.createHealthCheckup(checkupDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCheckup);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HealthCheckupDTO> getHealthCheckupById(@PathVariable Long id) {
        try {
            HealthCheckupDTO checkupDTO = healthCheckupService.getHealthCheckupById(id);
            return ResponseEntity.ok(checkupDTO);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HealthCheckupDTO> updateHealthCheckup(@PathVariable Long id, @RequestBody HealthCheckupDTO checkupDTO) {
        try {
            HealthCheckupDTO updatedCheckup = healthCheckupService.updateHealthCheckup(id, checkupDTO);
            return ResponseEntity.ok(updatedCheckup);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHealthCheckup(@PathVariable Long id) {
        try {
            healthCheckupService.deleteHealthCheckup(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    // Removed getHealthCheckupsByStudentId as it's not relevant to campaign management here
}
