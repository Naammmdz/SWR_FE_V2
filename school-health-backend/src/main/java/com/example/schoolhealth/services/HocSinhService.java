package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.HocSinhDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HocSinhService {
    HocSinhDto createHocSinh(HocSinhDto hocSinhDto);
    Page<HocSinhDto> getAllHocSinh(Pageable pageable);
    HocSinhDto getHocSinhById(Long id);
    HocSinhDto updateHocSinh(Long id, HocSinhDto hocSinhDto);
    void deleteHocSinh(Long id);
}
