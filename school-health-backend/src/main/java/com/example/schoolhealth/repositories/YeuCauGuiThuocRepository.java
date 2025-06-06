package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.YeuCauGuiThuoc;
import com.example.schoolhealth.models.TrangThaiYeuCauThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface YeuCauGuiThuocRepository extends JpaRepository<YeuCauGuiThuoc, Long> {
    List<YeuCauGuiThuoc> findByIdHocSinh(Long idHocSinh);
    List<YeuCauGuiThuoc> findByIdPhuHuynhGui(Long idPhuHuynhGui);
    List<YeuCauGuiThuoc> findByIdYTaXuLy(Long idYTaXuLy);
    List<YeuCauGuiThuoc> findByIdHocSinhAndTrangThai(Long idHocSinh, TrangThaiYeuCauThuoc trangThai);
}
