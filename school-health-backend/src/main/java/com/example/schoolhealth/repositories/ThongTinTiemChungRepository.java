package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.ThongTinTiemChung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongTinTiemChungRepository extends JpaRepository<ThongTinTiemChung, Long> {
    List<ThongTinTiemChung> findByHoSoSucKhoeId(Long hoSoSucKhoeId);
}
