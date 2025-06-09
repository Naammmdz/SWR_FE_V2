package com.example.schoolhealth.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.Embeddable;
import java.time.LocalDateTime;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicationLogEntryEmbeddable {

    private LocalDateTime scheduledTime; // thoiGianKeHoach
    private LocalDateTime actualTime; // thoiGianThucTe (nullable)
    private Long administeringNurseId; // idYTaChoUong (User ID, nullable)
    private String nurseNotes; // ghiChuYTa (nullable)
    private String status; // trangThai in LichSuChoUongThuoc
}
