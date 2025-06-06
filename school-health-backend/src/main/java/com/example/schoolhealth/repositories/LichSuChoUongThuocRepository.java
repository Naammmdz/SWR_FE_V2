package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.LichSuChoUongThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuChoUongThuocRepository extends JpaRepository<LichSuChoUongThuoc, Long> {
    List<LichSuChoUongThuoc> findByYeuCauGuiThuocId(Long yeuCauGuiThuocId);
    List<LichSuChoUongThuoc> findByIdYTaChoUong(Long idYTaChoUong);
}
