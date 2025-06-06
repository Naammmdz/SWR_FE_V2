package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.HocSinhDto;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.mappers.HocSinhMapper;
import com.example.schoolhealth.mappers.NguoiDungMapper; // Added import
import com.example.schoolhealth.models.HocSinh;
import com.example.schoolhealth.repositories.HocSinhRepository;
// Potentially NguoiDungRepository to validate existence of NguoiGiamHoChinh if strict validation is needed
// import com.example.schoolhealth.repositories.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class HocSinhServiceImpl implements HocSinhService {

    private final HocSinhRepository hocSinhRepository;
    private final HocSinhMapper hocSinhMapper;
    // private final NguoiDungRepository nguoiDungRepository; // If checking guardian existence

    @Autowired
    public HocSinhServiceImpl(HocSinhRepository hocSinhRepository, HocSinhMapper hocSinhMapper) {
        this.hocSinhRepository = hocSinhRepository;
        this.hocSinhMapper = hocSinhMapper;
    }

    @Override
    public HocSinhDto createHocSinh(HocSinhDto hocSinhDto) {
        // Optional: Validate existence of idNguoiGiamHoChinh
        // Long idNguoiGiamHoChinh = hocSinhMapper.INSTANCE.stringIdToLongId(hocSinhDto.getIdNguoiGiamHoChinh());
        // if (!nguoiDungRepository.existsById(idNguoiGiamHoChinh)) {
        //     throw new BadRequestException("NguoiGiamHoChinh not found with id: " + hocSinhDto.getIdNguoiGiamHoChinh());
        // }
        HocSinh hocSinh = hocSinhMapper.hocSinhDtoToHocSinh(hocSinhDto);
        // Ensure ID is null for creation to allow auto-generation
        hocSinh.setId(null);
        HocSinh savedHocSinh = hocSinhRepository.save(hocSinh);
        return hocSinhMapper.hocSinhToHocSinhDto(savedHocSinh);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<HocSinhDto> getAllHocSinh(Pageable pageable) {
        return hocSinhRepository.findAll(pageable)
                .map(hocSinhMapper::hocSinhToHocSinhDto);
    }

    @Override
    @Transactional(readOnly = true)
    public HocSinhDto getHocSinhById(Long id) {
        HocSinh hocSinh = hocSinhRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HocSinh not found with id: " + id));
        return hocSinhMapper.hocSinhToHocSinhDto(hocSinh);
    }

    @Override
    public HocSinhDto updateHocSinh(Long id, HocSinhDto hocSinhDto) {
        HocSinh existingHocSinh = hocSinhRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HocSinh not found with id: " + id));

        // Map DTO fields to existing entity, HocSinhMapper can assist here if configured for updates
        // For simplicity, direct field setting:
        existingHocSinh.setHoTen(hocSinhDto.getHoTen());
        existingHocSinh.setMaHocSinh(hocSinhDto.getMaHocSinh());
        existingHocSinh.setNgaySinh(hocSinhMapper.stringToLocalDate(hocSinhDto.getNgaySinh())); // Use injected mapper
        existingHocSinh.setGioiTinh(hocSinhDto.getGioiTinh());
        existingHocSinh.setLop(hocSinhDto.getLop());
        existingHocSinh.setIdTruongHoc(hocSinhDto.getIdTruongHoc());

        // Optional: Validate existence of idNguoiGiamHoChinh
        Long idNguoiGiamHoChinh = NguoiDungMapper.stringIdToLongId(hocSinhDto.getIdNguoiGiamHoChinh());
        existingHocSinh.setIdNguoiGiamHoChinh(idNguoiGiamHoChinh);

        existingHocSinh.setCacNguoiGiamHoKhacIds(hocSinhMapper.stringListToLongList(hocSinhDto.getCacNguoiGiamHoKhacIds())); // Use injected mapper

        if (hocSinhDto.getIdHoSoSucKhoe() != null) {
            existingHocSinh.setIdHoSoSucKhoe(NguoiDungMapper.stringIdToLongId(hocSinhDto.getIdHoSoSucKhoe()));
        } else {
            existingHocSinh.setIdHoSoSucKhoe(null);
        }

        existingHocSinh.setAnhDaiDienUrl(hocSinhDto.getAnhDaiDienUrl());
        existingHocSinh.setGhiChu(hocSinhDto.getGhiChu());

        HocSinh updatedHocSinh = hocSinhRepository.save(existingHocSinh);
        return hocSinhMapper.hocSinhToHocSinhDto(updatedHocSinh);
    }

    @Override
    public void deleteHocSinh(Long id) {
        if (!hocSinhRepository.existsById(id)) {
            throw new ResourceNotFoundException("HocSinh not found with id: " + id);
        }
        hocSinhRepository.deleteById(id);
    }
}
