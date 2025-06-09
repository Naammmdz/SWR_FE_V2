package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.HealthCheckupDTO;
import com.example.schoolhealth.services.HealthCheckupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
        HealthCheckupDTO checkupDTO = healthCheckupService.getHealthCheckupById(id);
        return ResponseEntity.ok(checkupDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HealthCheckupDTO> updateHealthCheckup(@PathVariable Long id, @RequestBody HealthCheckupDTO checkupDTO) {
        HealthCheckupDTO updatedCheckup = healthCheckupService.updateHealthCheckup(id, checkupDTO);
        return ResponseEntity.ok(updatedCheckup);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteHealthCheckup(@PathVariable Long id) {
        healthCheckupService.deleteHealthCheckup(id);
        return ResponseEntity.noContent().build();
    }

    // This endpoint is typically in StudentController, like GET /api/students/{studentId}/health-checkups
    // If a direct endpoint on HealthCheckupController is desired for fetching by studentId:
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<HealthCheckupDTO>> getHealthCheckupsByStudentId(@PathVariable Long studentId) {
        List<HealthCheckupDTO> checkups = healthCheckupService.getHealthCheckupsByStudentId(studentId);
        return ResponseEntity.ok(checkups);
    }
}
