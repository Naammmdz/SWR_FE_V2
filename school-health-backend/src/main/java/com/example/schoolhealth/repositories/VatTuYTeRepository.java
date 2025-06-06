package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.VatTuYTe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDate;

@Repository
public interface VatTuYTeRepository extends JpaRepository<VatTuYTe, Long> {
    List<VatTuYTe> findByTenVatTuContainingIgnoreCase(String tenVatTu);
    List<VatTuYTe> findByMaVatTu(String maVatTu);
    List<VatTuYTe> findByIdNguoiQuanLy(Long idNguoiQuanLy);
    List<VatTuYTe> findByNgayHetHanBefore(LocalDate date);
    List<VatTuYTe> findBySoLuongTonKhoLessThanEqual(Integer soLuong);
}
