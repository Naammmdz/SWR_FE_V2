package com.example.schoolhealth.dtos;

import lombok.Data;

@Data
public class HealthCheckupDTO {
    private String id;
    private String studentId; // To link back to the student
    private String checkupDate; // ISO date format
    private Double height;
    private Double weight;
    private Double bmi;
    private String visionLeft;
    private String visionRight;
    private String hearingLeft;
    private String hearingRight;
    private String dentalHealth;
    private String scoliosis;
    private String otherObservations;
    private String recommendations;
    private String doctorName;
    private String location;
    private String eventType;
    private String schoolId;
}
