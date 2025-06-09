package com.example.schoolhealth.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineRequestDTO {
    private String id;
    private String idHocSinh; // student
    private String idPhuHuynhGui; // requestingParent
    private String tenThuoc; // medicineName
    private String hamLuong; // dosage
    private String donViTinh; // unit
    private Double soLuongMoiLanUong; // quantityPerDose
    private String donViUong; // doseUnit
    private String duongDung; // routeOfAdministration
    private String huongDanSuDung; // usageInstructions
    private List<String> thoiGianKeHoachUong; // plannedSchedule - ISO DateTime strings
    private List<LichSuChoUongThuocDTO> lichSuUongThuoc; // medicationLog
    private String donThuocUrl; // prescriptionUrl
    private String ghiChuPhuHuynh; // parentNotes
    private String lienHeKhanCap; // emergencyContact
    private String trangThai; // status
    private String idYTaXuLy; // processingNurse (User ID, nullable)
    private String lyDoHuyHoacTuChoi; // rejectionOrCancellationReason (nullable)
    private String ngayTao; // createdAt - ISO DateTime
    private String ngayCapNhat; // updatedAt - ISO DateTime
}
