package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.Thuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDate;

@Repository
public interface ThuocRepository extends JpaRepository<Thuoc, Long> {
    List<Thuoc> findByTenThuocContainingIgnoreCase(String tenThuoc);
    List<Thuoc> findByMaThuoc(String maThuoc);
    List<Thuoc> findByIdNguoiQuanLy(Long idNguoiQuanLy);
    List<Thuoc> findByNgayHetHanBefore(LocalDate date);
    List<Thuoc> findBySoLuongTonKhoLessThanEqual(Integer soLuong);
}
