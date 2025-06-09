package com.example.schoolhealth.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Map;
import java.util.List; // Ensure this is imported if ketQuaChiTiet becomes more specific than Map

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KetQuaKhamSucKhoeHocSinhDTO {
    private String id;
    private String idChienDichKhamSucKhoe;
    private String idHocSinh;
    private String ngayKham; // ISO Date string
    private Map<String, Object> ketQuaChiTiet;
    private String ketLuanTongQuatCuaBacSi;
    private String deNghiCuaBacSi;
    private boolean canHenLichTuVan;
    private String idBacSiKham;
    private boolean daGuiThongBaoKetQuaChoPH;
    private String ngayGuiThongBaoKetQua; // ISO Date string
}
