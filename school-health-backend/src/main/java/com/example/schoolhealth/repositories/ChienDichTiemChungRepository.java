package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.ChienDichTiemChung;
import com.example.schoolhealth.models.TrangThaiChienDich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface ChienDichTiemChungRepository extends JpaRepository<ChienDichTiemChung, Long> {
    List<ChienDichTiemChung> findByTrangThai(TrangThaiChienDich trangThai);
    List<ChienDichTiemChung> findByTenVaccineContainingIgnoreCase(String tenVaccine);
    List<ChienDichTiemChung> findByIdNguoiTao(Long idNguoiTao);
    List<ChienDichTiemChung> findByThoiGianDuKienBatDauBetween(LocalDateTime start, LocalDateTime end);
}
