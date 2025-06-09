package com.example.schoolhealth.config;

import com.example.schoolhealth.dtos.HealthCheckupDTO;
import com.example.schoolhealth.models.HealthCheckup;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Custom mapping for HealthCheckup -> HealthCheckupDTO for studentId
        TypeMap<HealthCheckup, HealthCheckupDTO> healthCheckupToDTOMap = modelMapper.createTypeMap(HealthCheckup.class, HealthCheckupDTO.class);
        healthCheckupToDTOMap.addMappings(mapper -> {
            mapper.map(src -> src.getStudent().getId(), HealthCheckupDTO::setStudentId);
            // Note: Date to String conversion for checkupDate is handled in the service layer for now,
            // but could also be configured here with a custom Converter if preferred for all date fields.
        });

        // Custom mapping for MedicineRequest -> MedicineRequestDTO for studentId
        TypeMap<com.example.schoolhealth.models.MedicineRequest, com.example.schoolhealth.dtos.MedicineRequestDTO> medicineRequestToDTOMap = modelMapper.createTypeMap(com.example.schoolhealth.models.MedicineRequest.class, com.example.schoolhealth.dtos.MedicineRequestDTO.class);
        medicineRequestToDTOMap.addMappings(mapper -> {
            mapper.map(src -> src.getStudent().getId(), com.example.schoolhealth.dtos.MedicineRequestDTO::setStudentId);
            // Date to String conversions are handled in the service layer's convertToDTO method
        });

        // Add other global or specific mappings here if needed in the future

        return modelMapper;
    }
}
