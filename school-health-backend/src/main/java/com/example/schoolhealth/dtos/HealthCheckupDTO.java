package com.example.schoolhealth.dtos;

import lombok.Data;
import java.util.List;

@Data
public class HealthCheckupDTO {
    private String id;
    private String tenChienDich; // checkupName
    private List<String> loaiKham; // checkupTypes
    private String doiTuongApDung; // targetAudience
    private String thoiGianDuKien; // expectedDate - ISO Date
    private String diaDiemKham; // location
    private String donViThucHienKham; // performingUnit
    private String ghiChuChung; // generalNotes
    private String trangThai; // status
    private String idNguoiTao; // createdBy (User ID)
    private String idNguoiDuyet; // approvedBy (User ID)
    private String ngayTao; // createdAt - ISO Date
    private String ngayDuyet; // approvedAt - ISO Date (nullable)
    private String lyDoHuy; // cancellationReason (nullable)
}
