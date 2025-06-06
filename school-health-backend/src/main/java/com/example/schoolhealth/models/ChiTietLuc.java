package com.example.schoolhealth.models;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietLuc { // Renamed for reusability if structure is identical
    private String trai; // Combined left/right, e.g., matTrai or taiTrai
    private String phai; // Combined left/right, e.g., matPhai or taiPhai
    private LocalDate ngayKham;
    private String ghiChu;
}
