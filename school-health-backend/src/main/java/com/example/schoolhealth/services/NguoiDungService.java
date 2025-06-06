package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.NguoiDungDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NguoiDungService {
    NguoiDungDto createNguoiDung(NguoiDungDto nguoiDungDto);
    Page<NguoiDungDto> getAllNguoiDung(Pageable pageable);
    NguoiDungDto getNguoiDungById(Long id);
    NguoiDungDto updateNguoiDung(Long id, NguoiDungDto nguoiDungDto);
    void deleteNguoiDung(Long id);
}
