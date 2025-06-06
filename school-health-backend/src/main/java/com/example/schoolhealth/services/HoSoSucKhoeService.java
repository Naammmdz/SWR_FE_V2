package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.HoSoSucKhoeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable; // In case we need a list endpoint later

public interface HoSoSucKhoeService {
    HoSoSucKhoeDto createHoSoSucKhoe(HoSoSucKhoeDto hoSoSucKhoeDto);
    HoSoSucKhoeDto getHoSoSucKhoeById(Long id);
    HoSoSucKhoeDto getHoSoSucKhoeByHocSinhId(Long hocSinhId); // More common retrieval method
    HoSoSucKhoeDto updateHoSoSucKhoe(Long id, HoSoSucKhoeDto hoSoSucKhoeDto);
    void deleteHoSoSucKhoe(Long id); // Or disable/archive
    Page<HoSoSucKhoeDto> getAllHoSoSucKhoe(Pageable pageable); // Added for completeness
}
