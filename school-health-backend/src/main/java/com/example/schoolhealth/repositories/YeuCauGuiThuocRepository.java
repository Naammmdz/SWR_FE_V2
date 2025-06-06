package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.YeuCauGuiThuoc;
import com.example.schoolhealth.models.TrangThaiYeuCauThuoc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Keep if other methods still return List

@Repository
public interface YeuCauGuiThuocRepository extends JpaRepository<YeuCauGuiThuoc, Long> {
    Page<YeuCauGuiThuoc> findByIdHocSinh(Long idHocSinh, Pageable pageable);
    Page<YeuCauGuiThuoc> findByIdPhuHuynhGui(Long idPhuHuynhGui, Pageable pageable);
    List<YeuCauGuiThuoc> findByIdYTaXuLy(Long idYTaXuLy); // Assuming this doesn't need pagination for now
    List<YeuCauGuiThuoc> findByIdHocSinhAndTrangThai(Long idHocSinh, TrangThaiYeuCauThuoc trangThai); // Assuming this doesn't need pagination for now
}
