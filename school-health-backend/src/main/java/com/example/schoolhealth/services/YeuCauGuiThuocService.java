package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.YeuCauGuiThuocDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable; // In case we need a list endpoint later

public interface YeuCauGuiThuocService {
    YeuCauGuiThuocDto createYeuCauGuiThuoc(YeuCauGuiThuocDto yeuCauGuiThuocDto);
    Page<YeuCauGuiThuocDto> getAllYeuCauGuiThuoc(Pageable pageable);
    Page<YeuCauGuiThuocDto> getYeuCauGuiThuocByHocSinhId(Long hocSinhId, Pageable pageable);
    Page<YeuCauGuiThuocDto> getYeuCauGuiThuocByPhuHuynhId(Long phuHuynhId, Pageable pageable);
    YeuCauGuiThuocDto getYeuCauGuiThuocById(Long id);
    YeuCauGuiThuocDto updateYeuCauGuiThuoc(Long id, YeuCauGuiThuocDto yeuCauGuiThuocDto);
    YeuCauGuiThuocDto updateTrangThaiYeuCau(Long id, String trangThai, String lyDo, Long idYTaXuLy); // Specific method for status updates
    void deleteYeuCauGuiThuoc(Long id); // Usually, requests are cancelled/archived, not hard-deleted.
}
