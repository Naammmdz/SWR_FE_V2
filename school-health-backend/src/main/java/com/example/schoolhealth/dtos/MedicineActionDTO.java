package com.example.schoolhealth.dtos;

import lombok.Data;

@Data
public class MedicineActionDTO {
    private String userId; // User performing the action (approving/rejecting)
    private String notes;  // Optional notes, especially for rejection
}
