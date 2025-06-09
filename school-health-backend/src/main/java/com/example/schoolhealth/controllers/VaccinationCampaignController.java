package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.VaccinationCampaignDTO;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.services.VaccinationCampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns/vaccination")
public class VaccinationCampaignController {

    @Autowired
    private VaccinationCampaignService campaignService;

    @GetMapping
    public ResponseEntity<List<VaccinationCampaignDTO>> getAllVaccinationCampaigns() {
        return ResponseEntity.ok(campaignService.getAllVaccinationCampaigns());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<VaccinationCampaignDTO> createVaccinationCampaign(@RequestBody VaccinationCampaignDTO campaignDTO) {
        VaccinationCampaignDTO createdCampaign = campaignService.createVaccinationCampaign(campaignDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCampaign);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<VaccinationCampaignDTO> approveVaccinationCampaign(@PathVariable Long id) {
        try {
            VaccinationCampaignDTO approvedCampaign = campaignService.approveVaccinationCampaign(id);
            return ResponseEntity.ok(approvedCampaign);
        } catch (ResourceNotFoundException e) {
            // This will be handled by GlobalExceptionHandler if implemented and active
            // Otherwise, returning a 404 directly
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
