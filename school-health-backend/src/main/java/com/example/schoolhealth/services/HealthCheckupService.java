package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.HealthCheckupDTO;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.models.HealthCheckup;
import com.example.schoolhealth.models.User;
import com.example.schoolhealth.repositories.HealthCheckupRepository;
import com.example.schoolhealth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Collections; // Added for Collections.emptyList()
import com.example.schoolhealth.dtos.KetQuaKhamSucKhoeHocSinhDTO; // Added DTO import

@Service
public class HealthCheckupService {

    private static final String STATUS_PLANNED = "PLANNED";
    // Add other status constants as needed, e.g., APPROVED, COMPLETED

    @Autowired
    private HealthCheckupRepository healthCheckupRepository;

    @Autowired
    private UserRepository userRepository;

    // ModelMapper can be used if desired, but manual mapping is shown for clarity with new DTO/Entity
    // @Autowired
    // private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<HealthCheckupDTO> getAllHealthCheckups() {
        return healthCheckupRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public HealthCheckupDTO getHealthCheckupById(Long id) {
        HealthCheckup campaign = healthCheckupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HealthCheckup campaign not found with id: " + id));
        return convertToDTO(campaign);
    }

    @Transactional
    public HealthCheckupDTO createHealthCheckup(HealthCheckupDTO dto) {
        HealthCheckup campaign = convertToEntity(dto);

        if (dto.getIdNguoiTao() != null && !dto.getIdNguoiTao().isEmpty()) {
            User createdByUser = userRepository.findById(Long.parseLong(dto.getIdNguoiTao()))
                    .orElseThrow(() -> new ResourceNotFoundException("User (creator) not found with id: " + dto.getIdNguoiTao()));
            campaign.setCreatedBy(createdByUser);
        }
        campaign.setCreatedAt(LocalDate.now());
        campaign.setStatus(dto.getTrangThai() != null ? dto.getTrangThai() : STATUS_PLANNED); // Use status from DTO or default to PLANNED

        HealthCheckup savedCampaign = healthCheckupRepository.save(campaign);
        return convertToDTO(savedCampaign);
    }

    @Transactional
    public HealthCheckupDTO updateHealthCheckup(Long id, HealthCheckupDTO dto) {
        HealthCheckup existingCampaign = healthCheckupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HealthCheckup campaign not found with id: " + id));

        // Update fields from DTO
        existingCampaign.setCheckupName(dto.getTenChienDich());
        existingCampaign.setCheckupTypes(dto.getLoaiKham());
        existingCampaign.setTargetAudience(dto.getDoiTuongApDung());
        if (dto.getThoiGianDuKien() != null && !dto.getThoiGianDuKien().isEmpty()) {
            existingCampaign.setExpectedDate(LocalDate.parse(dto.getThoiGianDuKien(), DateTimeFormatter.ISO_DATE));
        } else {
            existingCampaign.setExpectedDate(null);
        }
        existingCampaign.setLocation(dto.getDiaDiemKham());
        existingCampaign.setPerformingUnit(dto.getDonViThucHienKham());
        existingCampaign.setGeneralNotes(dto.getGhiChuChung());
        existingCampaign.setStatus(dto.getTrangThai()); // Allow status update

        // Handle approvedBy and approvedAt if ids are provided
        if (dto.getIdNguoiDuyet() != null && !dto.getIdNguoiDuyet().isEmpty()) {
            User approvedByUser = userRepository.findById(Long.parseLong(dto.getIdNguoiDuyet()))
                    .orElseThrow(() -> new ResourceNotFoundException("User (approver) not found with id: " + dto.getIdNguoiDuyet()));
            existingCampaign.setApprovedBy(approvedByUser);
            if (dto.getNgayDuyet() != null && !dto.getNgayDuyet().isEmpty()) {
                existingCampaign.setApprovedAt(LocalDate.parse(dto.getNgayDuyet(), DateTimeFormatter.ISO_DATE));
            } else {
                 // If approver is set but no date, set current date or handle as error/specific logic
                existingCampaign.setApprovedAt(LocalDate.now());
            }
        } else { // If idNguoiDuyet is explicitly null or empty, clear approval info
            existingCampaign.setApprovedBy(null);
            existingCampaign.setApprovedAt(null);
        }
        existingCampaign.setCancellationReason(dto.getLyDoHuy());
        // Note: createdBy and createdAt are generally not updated.

        HealthCheckup updatedCampaign = healthCheckupRepository.save(existingCampaign);
        return convertToDTO(updatedCampaign);
    }

    @Transactional
    public void deleteHealthCheckup(Long id) {
        if (!healthCheckupRepository.existsById(id)) {
            throw new ResourceNotFoundException("HealthCheckup campaign not found with id: " + id);
        }
        healthCheckupRepository.deleteById(id);
    }

    private HealthCheckupDTO convertToDTO(HealthCheckup campaign) {
        HealthCheckupDTO dto = new HealthCheckupDTO();
        dto.setId(campaign.getId() != null ? campaign.getId().toString() : null);
        dto.setTenChienDich(campaign.getCheckupName());
        dto.setLoaiKham(campaign.getCheckupTypes());
        dto.setDoiTuongApDung(campaign.getTargetAudience());
        if (campaign.getExpectedDate() != null) {
            dto.setThoiGianDuKien(campaign.getExpectedDate().format(DateTimeFormatter.ISO_DATE));
        }
        dto.setDiaDiemKham(campaign.getLocation());
        dto.setDonViThucHienKham(campaign.getPerformingUnit());
        dto.setGhiChuChung(campaign.getGeneralNotes());
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

    private HealthCheckup convertToEntity(HealthCheckupDTO dto) {
        HealthCheckup campaign = new HealthCheckup();
        // ID is not set for new entities. For updates, the entity is fetched by ID.
        campaign.setCheckupName(dto.getTenChienDich());
        campaign.setCheckupTypes(dto.getLoaiKham());
        campaign.setTargetAudience(dto.getDoiTuongApDung());
        if (dto.getThoiGianDuKien() != null && !dto.getThoiGianDuKien().isEmpty()) {
            campaign.setExpectedDate(LocalDate.parse(dto.getThoiGianDuKien(), DateTimeFormatter.ISO_DATE));
        }
        campaign.setLocation(dto.getDiaDiemKham());
        campaign.setPerformingUnit(dto.getDonViThucHienKham());
        campaign.setGeneralNotes(dto.getGhiChuChung());
        campaign.setStatus(dto.getTrangThai());
        // createdBy, approvedBy, createdAt, approvedAt are handled in service methods (create/update)
        campaign.setCancellationReason(dto.getLyDoHuy());
        return campaign;
    }

    public List<KetQuaKhamSucKhoeHocSinhDTO> getHealthCheckupResultsForStudent(Long studentId) {
        // TODO: Implement actual logic to fetch health checkup results for a student
        // This might involve querying based on student participation in campaigns,
        // or directly if individual results are stored and linked to students.
        System.out.println("Fetching health checkup results for student ID: " + studentId + " (placeholder implementation)");
        return Collections.emptyList();
    }
}
