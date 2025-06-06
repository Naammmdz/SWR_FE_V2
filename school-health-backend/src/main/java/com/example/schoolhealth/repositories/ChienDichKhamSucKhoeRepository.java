package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.ChienDichKhamSucKhoe;
import com.example.schoolhealth.models.TrangThaiChienDich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDate;

@Repository
public interface ChienDichKhamSucKhoeRepository extends JpaRepository<ChienDichKhamSucKhoe, Long> {
    List<ChienDichKhamSucKhoe> findByTrangThai(TrangThaiChienDich trangThai);
    List<ChienDichKhamSucKhoe> findByIdNguoiTao(Long idNguoiTao);
    List<ChienDichKhamSucKhoe> findByThoiGianDuKien(LocalDate thoiGianDuKien);
    // Query for campaigns that include a specific type of examination might be complex with ElementCollection.
    // May need a @Query with JOIN if specific searches on loaiKham are frequent.
    // For now, keeping it simple.
    List<ChienDichKhamSucKhoe> findByLoaiKhamContaining(String loaiKham);
}
