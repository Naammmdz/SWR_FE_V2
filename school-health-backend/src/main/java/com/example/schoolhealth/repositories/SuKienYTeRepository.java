package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.SuKienYTe;
import com.example.schoolhealth.models.LoaiSuCoYTe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SuKienYTeRepository extends JpaRepository<SuKienYTe, Long> {
    List<SuKienYTe> findByIdHocSinh(Long idHocSinh);
    List<SuKienYTe> findByIdYTaGhiNhan(Long idYTaGhiNhan);
    List<SuKienYTe> findByLoaiSuCo(LoaiSuCoYTe loaiSuCo);
    List<SuKienYTe> findByThoiGianXayRaBetween(LocalDateTime start, LocalDateTime end);
    List<SuKienYTe> findByIdYeuCauGuiThuocLienQuan(Long idYeuCauGuiThuocLienQuan);
}
