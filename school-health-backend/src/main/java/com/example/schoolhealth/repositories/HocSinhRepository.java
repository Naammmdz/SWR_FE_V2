package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.HocSinh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HocSinhRepository extends JpaRepository<HocSinh, Long> {
    List<HocSinh> findByIdTruongHoc(String idTruongHoc);
    List<HocSinh> findByIdNguoiGiamHoChinh(Long idNguoiGiamHoChinh);
}
