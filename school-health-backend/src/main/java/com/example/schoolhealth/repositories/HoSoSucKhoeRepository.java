package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.HoSoSucKhoe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HoSoSucKhoeRepository extends JpaRepository<HoSoSucKhoe, Long> {
    Optional<HoSoSucKhoe> findByIdHocSinh(Long idHocSinh);
}
