package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.VaccinationCampaignDTO;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.services.VaccinationCampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin; // Added CrossOrigin import

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Added CrossOrigin
@RequestMapping("/api/campaigns/vaccination")
public class VaccinationCampaignController {

    @Autowired
    private VaccinationCampaignService campaignService; // Corrected service type

    @GetMapping
    public ResponseEntity<List<VaccinationCampaignDTO>> getAllVaccinationCampaigns() {
        return ResponseEntity.ok(campaignService.getAllVaccinationCampaigns());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<VaccinationCampaignDTO> createVaccinationCampaign(@RequestBody VaccinationCampaignDTO campaignDTO) {
        // Assuming idNguoiTao is set in campaignDTO from the client
        VaccinationCampaignDTO createdCampaign = campaignService.createVaccinationCampaign(campaignDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCampaign);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<VaccinationCampaignDTO> approveVaccinationCampaign(@PathVariable Long id, @RequestParam String approverUserId) {
        try {
            // The service method now expects an approverUserId
            VaccinationCampaignDTO approvedCampaign = campaignService.approveVaccinationCampaign(id, approverUserId);
            return ResponseEntity.ok(approvedCampaign);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Optional: Endpoint to get a campaign by ID, if needed by frontend or for direct access
    @GetMapping("/{id}")
    public ResponseEntity<VaccinationCampaignDTO> getCampaignById(@PathVariable Long id) {
        try {
            VaccinationCampaignDTO campaignDTO = campaignService.getCampaignById(id);
            return ResponseEntity.ok(campaignDTO);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
