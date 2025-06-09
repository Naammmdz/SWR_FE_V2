package com.example.schoolhealth.dtos;

import lombok.Data;

@Data
public class VaccinationCampaignDTO {
    private String id;
    private String tenChienDich; // campaignName
    private String tenVaccine; // vaccineName
    private String moTaVaccine; // vaccineDescription
    private String doiTuongApDung; // targetAudience
    private String thoiGianDuKienBatDau; // expectedStartDate - ISO Date
    private String thoiGianDuKienKetThuc; // expectedEndDate - ISO Date
    private String diaDiemTiemChung; // location
    private String ghiChuChung; // generalNotes
    private String tieuChiThamGia; // participationCriteria
    private String trangThai; // status
    private String idNguoiTao; // createdBy (User ID)
    private String idNguoiDuyet; // approvedBy (User ID)
    private String ngayTao; // createdAt - ISO Date
    private String ngayDuyet; // approvedAt - ISO Date
    private String lyDoHuy; // cancellationReason
}
