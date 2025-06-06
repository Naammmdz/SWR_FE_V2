package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.SuKienYTeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SuKienYTeService {
    SuKienYTeDto createSuKienYTe(SuKienYTeDto suKienYTeDto);
    Page<SuKienYTeDto> getAllSuKienYTe(Pageable pageable);
    Page<SuKienYTeDto> getSuKienYTeByHocSinhId(Long hocSinhId, Pageable pageable);
    SuKienYTeDto getSuKienYTeById(Long id);
    SuKienYTeDto updateSuKienYTe(Long id, SuKienYTeDto suKienYTeDto);
    void deleteSuKienYTe(Long id);
}
