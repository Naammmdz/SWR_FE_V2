package com.example.schoolhealth.models;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamDaSuDung {
    // Not linking to Thuoc/VatTuYTe entities directly yet to keep it simple
    // private Long idSanPham; // Could be ThuocId or VatTuYTeId
    private String tenSanPham; // Store name directly for now
    private Double soLuong;    // Changed from int to Double
    private String donVi;      // e.g., "viên", "ml"
}
