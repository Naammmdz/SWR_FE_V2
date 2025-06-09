package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.VaccinationCampaignDTO;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.models.VaccinationCampaign;
import com.example.schoolhealth.repositories.VaccinationCampaignRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VaccinationCampaignService {

    private static final String DEFAULT_STATUS_PENDING_APPROVAL = "PENDING_APPROVAL";
    private static final String STATUS_APPROVED = "APPROVED";

    @Autowired
    private VaccinationCampaignRepository campaignRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<VaccinationCampaignDTO> getAllVaccinationCampaigns() {
        return campaignRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public VaccinationCampaignDTO getCampaignById(Long id) {
        VaccinationCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("VaccinationCampaign not found with id: " + id));
        return convertToDTO(campaign);
    }

    @Transactional
    public VaccinationCampaignDTO createVaccinationCampaign(VaccinationCampaignDTO campaignDTO) {
        VaccinationCampaign campaign = convertToEntity(campaignDTO);
        campaign.setStatus(DEFAULT_STATUS_PENDING_APPROVAL); // Set default status
        VaccinationCampaign savedCampaign = campaignRepository.save(campaign);
        return convertToDTO(savedCampaign);
    }

    @Transactional
    public VaccinationCampaignDTO approveVaccinationCampaign(Long id) {
        VaccinationCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("VaccinationCampaign not found with id: " + id));
        campaign.setStatus(STATUS_APPROVED);
        VaccinationCampaign updatedCampaign = campaignRepository.save(campaign);
        return convertToDTO(updatedCampaign);
    }

    private VaccinationCampaignDTO convertToDTO(VaccinationCampaign campaign) {
        VaccinationCampaignDTO dto = modelMapper.map(campaign, VaccinationCampaignDTO.class);
        if (campaign.getStartDate() != null) {
            dto.setStartDate(campaign.getStartDate().format(DateTimeFormatter.ISO_DATE));
        }
        if (campaign.getEndDate() != null) {
            dto.setEndDate(campaign.getEndDate().format(DateTimeFormatter.ISO_DATE));
        }
        return dto;
    }

    private VaccinationCampaign convertToEntity(VaccinationCampaignDTO dto) {
        VaccinationCampaign campaign = modelMapper.map(dto, VaccinationCampaign.class);
        if (dto.getStartDate() != null && !dto.getStartDate().isEmpty()) {
            campaign.setStartDate(LocalDate.parse(dto.getStartDate(), DateTimeFormatter.ISO_DATE));
        }
        if (dto.getEndDate() != null && !dto.getEndDate().isEmpty()) {
            campaign.setEndDate(LocalDate.parse(dto.getEndDate(), DateTimeFormatter.ISO_DATE));
        }
        // ID is typically not set from DTO for creation, but handled by DB or service logic for updates
        if (dto.getId() != null) {
            try {
                campaign.setId(Long.parseLong(dto.getId()));
            } catch (NumberFormatException e) {
                // Let ModelMapper or DB handle ID; or throw validation error
            }
        }
        return campaign;
    }
}
