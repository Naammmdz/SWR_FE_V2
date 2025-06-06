package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.KetQuaTiemChungHocSinh;
import com.example.schoolhealth.models.TrangThaiThamGiaTiemChung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface KetQuaTiemChungHocSinhRepository extends JpaRepository<KetQuaTiemChungHocSinh, Long> {
    List<KetQuaTiemChungHocSinh> findByIdChienDichTiemChung(Long idChienDichTiemChung);
    List<KetQuaTiemChungHocSinh> findByIdHocSinh(Long idHocSinh);
    Optional<KetQuaTiemChungHocSinh> findByIdChienDichTiemChungAndIdHocSinh(Long idChienDichTiemChung, Long idHocSinh);
    List<KetQuaTiemChungHocSinh> findByIdChienDichTiemChungAndTrangThaiThamGia(Long idChienDichTiemChung, TrangThaiThamGiaTiemChung trangThai);
}
