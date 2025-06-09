package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.VaccinationCampaignDTO;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.models.User; // Added User import
import com.example.schoolhealth.models.VaccinationCampaign;
import com.example.schoolhealth.repositories.UserRepository; // Added UserRepository import
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
    private UserRepository userRepository; // Added UserRepository

    @Autowired
    private ModelMapper modelMapper;

    // Define status constants based on FE values if needed, e.g.
    // private static final String STATUS_MOI_TAO = "moi_tao";
    // private static final String STATUS_CHO_DUYET = "cho_duyet"; // Existing DEFAULT_STATUS_PENDING_APPROVAL
    // private static final String STATUS_DA_DUYET = "da_duyet"; // Existing STATUS_APPROVED
    // For now, using existing constants and assuming they match FE's intent for "PENDING_APPROVAL" and "APPROVED"

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

        // Set createdBy User
        if (campaignDTO.getIdNguoiTao() != null && !campaignDTO.getIdNguoiTao().isEmpty()) {
            User createdByUser = userRepository.findById(Long.parseLong(campaignDTO.getIdNguoiTao()))
                    .orElseThrow(() -> new ResourceNotFoundException("User not found for idNguoiTao: " + campaignDTO.getIdNguoiTao()));
            campaign.setCreatedBy(createdByUser);
        }
        campaign.setCreatedAt(LocalDate.now()); // Set current date for createdAt
        campaign.setStatus(DEFAULT_STATUS_PENDING_APPROVAL); // Matches 'cho_duyet' or similar initial status

        VaccinationCampaign savedCampaign = campaignRepository.save(campaign);
        return convertToDTO(savedCampaign);
    }

    @Transactional
    public VaccinationCampaignDTO approveVaccinationCampaign(Long id, String approverUserId) { // Added approverUserId
        VaccinationCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("VaccinationCampaign not found with id: " + id));

        if (approverUserId != null && !approverUserId.isEmpty()) {
            User approvedByUser = userRepository.findById(Long.parseLong(approverUserId))
                    .orElseThrow(() -> new ResourceNotFoundException("User not found for approverUserId: " + approverUserId));
            campaign.setApprovedBy(approvedByUser);
        }
        campaign.setApprovedAt(LocalDate.now()); // Set current date for approvedAt
        campaign.setStatus(STATUS_APPROVED); // Matches 'da_duyet' or similar approved status

        VaccinationCampaign updatedCampaign = campaignRepository.save(campaign);
        return convertToDTO(updatedCampaign);
    }

    private VaccinationCampaignDTO convertToDTO(VaccinationCampaign campaign) {
        VaccinationCampaignDTO dto = new VaccinationCampaignDTO();
        dto.setId(campaign.getId() != null ? campaign.getId().toString() : null);
        dto.setTenChienDich(campaign.getCampaignName());
        dto.setTenVaccine(campaign.getVaccineName());
        dto.setMoTaVaccine(campaign.getVaccineDescription());
        dto.setDoiTuongApDung(campaign.getTargetAudience());
        if (campaign.getExpectedStartDate() != null) {
            dto.setThoiGianDuKienBatDau(campaign.getExpectedStartDate().format(DateTimeFormatter.ISO_DATE));
        }
        if (campaign.getExpectedEndDate() != null) {
            dto.setThoiGianDuKienKetThuc(campaign.getExpectedEndDate().format(DateTimeFormatter.ISO_DATE));
        }
        dto.setDiaDiemTiemChung(campaign.getLocation());
        dto.setGhiChuChung(campaign.getGeneralNotes());
        dto.setTieuChiThamGia(campaign.getParticipationCriteria());
        dto.setTrangThai(campaign.getStatus());
        if (campaign.getCreatedBy() != null) {
            dto.setIdNguoiTao(campaign.getCreatedBy().getId().toString());
        }
        if (campaign.getApprovedBy() != null) {
            dto.setIdNguoiDuyet(campaign.getApprovedBy().getId().toString());
        }
        if (campaign.getCreatedAt() != null) {
            dto.setNgayTao(campaign.getCreatedAt().format(DateTimeFormatter.ISO_DATE));
        }
        if (campaign.getApprovedAt() != null) {
            dto.setNgayDuyet(campaign.getApprovedAt().format(DateTimeFormatter.ISO_DATE));
        }
        dto.setLyDoHuy(campaign.getCancellationReason());
        return dto;
    }

    private VaccinationCampaign convertToEntity(VaccinationCampaignDTO dto) {
        VaccinationCampaign campaign = new VaccinationCampaign();
        // ID is not set from DTO for new entities, ModelMapper would handle it for updates if present.
        // For creation, ID is null. For updates, it should be fetched by ID first.
        // This method is primarily for creation with current service structure.
        // If dto.getId() is present, it implies an update, which this method isn't fully set up for
        // without fetching existing entity. Let's assume for now this is for creation.

        campaign.setCampaignName(dto.getTenChienDich());
        campaign.setVaccineName(dto.getTenVaccine());
        campaign.setVaccineDescription(dto.getMoTaVaccine());
        campaign.setTargetAudience(dto.getDoiTuongApDung());
        if (dto.getThoiGianDuKienBatDau() != null && !dto.getThoiGianDuKienBatDau().isEmpty()) {
            campaign.setExpectedStartDate(LocalDate.parse(dto.getThoiGianDuKienBatDau(), DateTimeFormatter.ISO_DATE));
        }
        if (dto.getThoiGianDuKienKetThuc() != null && !dto.getThoiGianDuKienKetThuc().isEmpty()) {
            campaign.setExpectedEndDate(LocalDate.parse(dto.getThoiGianDuKienKetThuc(), DateTimeFormatter.ISO_DATE));
        }
        campaign.setLocation(dto.getDiaDiemTiemChung());
        campaign.setGeneralNotes(dto.getGhiChuChung());
        campaign.setParticipationCriteria(dto.getTieuChiThamGia());
        campaign.setStatus(dto.getTrangThai()); // Status from DTO will be overridden at creation by service logic
                                                // For updates, this would be relevant.
        // createdBy, approvedBy are handled in service methods.
        if (dto.getNgayTao() != null && !dto.getNgayTao().isEmpty()) {
            campaign.setCreatedAt(LocalDate.parse(dto.getNgayTao(), DateTimeFormatter.ISO_DATE));
        }
        if (dto.getNgayDuyet() != null && !dto.getNgayDuyet().isEmpty()) {
            campaign.setApprovedAt(LocalDate.parse(dto.getNgayDuyet(), DateTimeFormatter.ISO_DATE));
        }
        campaign.setCancellationReason(dto.getLyDoHuy());
        // Note: ModelMapper is not used here anymore for full manual control.
        return campaign;
    }
}
