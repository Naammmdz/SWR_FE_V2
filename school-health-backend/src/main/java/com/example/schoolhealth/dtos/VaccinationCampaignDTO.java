package com.example.schoolhealth.dtos;

import lombok.Data;

@Data
public class VaccinationCampaignDTO {
    private String id;
    private String name;
    private String description;
    private String vaccineType;
    private String startDate; // ISO date format
    private String endDate; // ISO date format
    private String targetAgeGroup;
    private String status;
    private String location;
    private String notes;
    private String schoolId;
}
