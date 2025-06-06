package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.KetQuaKhamSucKhoeHocSinh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface KetQuaKhamSucKhoeHocSinhRepository extends JpaRepository<KetQuaKhamSucKhoeHocSinh, Long> {
    List<KetQuaKhamSucKhoeHocSinh> findByIdChienDichKhamSucKhoe(Long idChienDichKhamSucKhoe);
    List<KetQuaKhamSucKhoeHocSinh> findByIdHocSinh(Long idHocSinh);
    Optional<KetQuaKhamSucKhoeHocSinh> findByIdChienDichKhamSucKhoeAndIdHocSinh(Long idChienDichKhamSucKhoe, Long idHocSinh);
    List<KetQuaKhamSucKhoeHocSinh> findByCanHenLichTuVan(boolean canHenLichTuVan);
}
