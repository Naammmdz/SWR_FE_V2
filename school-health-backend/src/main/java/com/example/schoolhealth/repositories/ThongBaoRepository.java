package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.ThongBao;
import com.example.schoolhealth.models.LoaiThongBao;
import com.example.schoolhealth.models.TrangThaiDocThongBao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongBaoRepository extends JpaRepository<ThongBao, Long> {
    // Find by recipient and read status, with pagination
    Page<ThongBao> findByIdNguoiNhanAndTrangThaiDocOrderByThoiGianGuiDesc(Long idNguoiNhan, TrangThaiDocThongBao trangThaiDoc, Pageable pageable);

    // Find by recipient, with pagination
    Page<ThongBao> findByIdNguoiNhanOrderByThoiGianGuiDesc(Long idNguoiNhan, Pageable pageable);

    // Find by recipient and type, with pagination
    Page<ThongBao> findByIdNguoiNhanAndLoaiThongBaoOrderByThoiGianGuiDesc(Long idNguoiNhan, LoaiThongBao loaiThongBao, Pageable pageable);

    // Count unread notifications for a recipient
    long countByIdNguoiNhanAndTrangThaiDoc(Long idNguoiNhan, TrangThaiDocThongBao trangThaiDoc);
}
