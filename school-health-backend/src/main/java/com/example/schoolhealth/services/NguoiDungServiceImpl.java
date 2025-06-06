package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.NguoiDungDto;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.mappers.NguoiDungMapper;
import com.example.schoolhealth.models.NguoiDung;
import com.example.schoolhealth.repositories.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class NguoiDungServiceImpl implements NguoiDungService {

    private final NguoiDungRepository nguoiDungRepository;
    private final NguoiDungMapper nguoiDungMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public NguoiDungServiceImpl(NguoiDungRepository nguoiDungRepository,
                                NguoiDungMapper nguoiDungMapper,
                                PasswordEncoder passwordEncoder) {
        this.nguoiDungRepository = nguoiDungRepository;
        this.nguoiDungMapper = nguoiDungMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public NguoiDungDto createNguoiDung(NguoiDungDto nguoiDungDto) {
        NguoiDung nguoiDung = nguoiDungMapper.nguoiDungDtoToNguoiDung(nguoiDungDto);
        if (nguoiDungDto.getPassword() != null && !nguoiDungDto.getPassword().isEmpty()) {
            nguoiDung.setMatKhauHash(passwordEncoder.encode(nguoiDungDto.getPassword()));
        }
        // ngayTao is set by @PrePersist in the entity
        NguoiDung savedNguoiDung = nguoiDungRepository.save(nguoiDung);
        return nguoiDungMapper.nguoiDungToNguoiDungDto(savedNguoiDung);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NguoiDungDto> getAllNguoiDung(Pageable pageable) {
        return nguoiDungRepository.findAll(pageable)
                .map(nguoiDungMapper::nguoiDungToNguoiDungDto);
    }

    @Override
    @Transactional(readOnly = true)
    public NguoiDungDto getNguoiDungById(Long id) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NguoiDung not found with id: " + id));
        return nguoiDungMapper.nguoiDungToNguoiDungDto(nguoiDung);
    }

    @Override
    public NguoiDungDto updateNguoiDung(Long id, NguoiDungDto nguoiDungDto) {
        NguoiDung existingNguoiDung = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NguoiDung not found with id: " + id));

        // Update properties from DTO
        existingNguoiDung.setTenDangNhap(nguoiDungDto.getTenDangNhap());
        existingNguoiDung.setVaiTro(nguoiDungDto.getVaiTro());
        existingNguoiDung.setThongTinCaNhan(nguoiDungMapper.thongTinCaNhanDtoToThongTinCaNhan(nguoiDungDto.getThongTinCaNhan()));
        existingNguoiDung.setIdTruongHoc(nguoiDungDto.getIdTruongHoc());
        existingNguoiDung.setTrangThai(nguoiDungDto.getTrangThai());

        if (nguoiDungDto.getPassword() != null && !nguoiDungDto.getPassword().isEmpty()) {
            existingNguoiDung.setMatKhauHash(passwordEncoder.encode(nguoiDungDto.getPassword()));
        }

        NguoiDung updatedNguoiDung = nguoiDungRepository.save(existingNguoiDung);
        return nguoiDungMapper.nguoiDungToNguoiDungDto(updatedNguoiDung);
    }

    @Override
    public void deleteNguoiDung(Long id) {
        if (!nguoiDungRepository.existsById(id)) {
            throw new ResourceNotFoundException("NguoiDung not found with id: " + id);
        }
        nguoiDungRepository.deleteById(id);
    }
}
