package com.example.schoolhealth.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LichSuChoUongThuocDTO {
    private String id; // May not directly map from Embeddable's ID. See prompt decision point.
    private String idYeuCauGuiThuoc; // Parent MedicineRequest ID
    private String thoiGianKeHoach; // scheduledTime - ISO DateTime
    private String thoiGianThucTe; // actualTime - ISO DateTime (nullable)
    private String idYTaChoUong; // administeringNurseId - User ID (nullable)
    private String ghiChuYTa; // nurseNotes (nullable)
    private String trangThai; // status
}
