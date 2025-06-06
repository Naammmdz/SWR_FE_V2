package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.NhatKyXuatKho;
import com.example.schoolhealth.models.LoaiSanPhamKho;
import com.example.schoolhealth.models.LyDoXuatKho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NhatKyXuatKhoRepository extends JpaRepository<NhatKyXuatKho, Long> {
    List<NhatKyXuatKho> findByIdSanPhamAndLoaiSanPham(Long idSanPham, LoaiSanPhamKho loaiSanPham);
    List<NhatKyXuatKho> findByIdNguoiXuat(Long idNguoiXuat);
    List<NhatKyXuatKho> findByNgayXuatBetween(LocalDateTime start, LocalDateTime end);
    List<NhatKyXuatKho> findByLyDoXuat(LyDoXuatKho lyDoXuat);
    List<NhatKyXuatKho> findByIdSuKienYTeLienQuan(Long idSuKienYTeLienQuan);
    List<NhatKyXuatKho> findByIdChienDichLienQuan(Long idChienDichLienQuan);
}
