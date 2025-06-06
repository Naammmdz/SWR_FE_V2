package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.LichSuChoUongThuocDto;
import com.example.schoolhealth.dtos.YeuCauGuiThuocDto;
import com.example.schoolhealth.exceptions.BadRequestException;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.mappers.NguoiDungMapper;
import com.example.schoolhealth.mappers.YeuCauGuiThuocMapper;
import com.example.schoolhealth.mappers.LichSuChoUongThuocMapper; // Added for clarity, though accessed via YeuCauGuiThuocMapper.INSTANCE.uses()...
import com.example.schoolhealth.models.LichSuChoUongThuoc;
import com.example.schoolhealth.models.TrangThaiYeuCauThuoc;
import com.example.schoolhealth.models.YeuCauGuiThuoc;
import com.example.schoolhealth.repositories.HocSinhRepository;
import com.example.schoolhealth.repositories.NguoiDungRepository;
import com.example.schoolhealth.repositories.YeuCauGuiThuocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class YeuCauGuiThuocServiceImpl implements YeuCauGuiThuocService {

    private final YeuCauGuiThuocRepository yeuCauGuiThuocRepository;
    private final HocSinhRepository hocSinhRepository;
    private final NguoiDungRepository nguoiDungRepository;
    private final YeuCauGuiThuocMapper yeuCauGuiThuocMapper;
    private final LichSuChoUongThuocMapper lichSuChoUongThuocMapper; // Inject directly

    @Autowired
    public YeuCauGuiThuocServiceImpl(YeuCauGuiThuocRepository yeuCauGuiThuocRepository,
                                     HocSinhRepository hocSinhRepository,
                                     NguoiDungRepository nguoiDungRepository,
                                     YeuCauGuiThuocMapper yeuCauGuiThuocMapper,
                                     LichSuChoUongThuocMapper lichSuChoUongThuocMapper) { // Inject
        this.yeuCauGuiThuocRepository = yeuCauGuiThuocRepository;
        this.hocSinhRepository = hocSinhRepository;
        this.nguoiDungRepository = nguoiDungRepository;
        this.yeuCauGuiThuocMapper = yeuCauGuiThuocMapper;
        this.lichSuChoUongThuocMapper = lichSuChoUongThuocMapper; // Assign
    }

    @Override
    public YeuCauGuiThuocDto createYeuCauGuiThuoc(YeuCauGuiThuocDto yeuCauGuiThuocDto) {
        Long hocSinhId = NguoiDungMapper.stringIdToLongId(yeuCauGuiThuocDto.getIdHocSinh());
        if (!hocSinhRepository.existsById(hocSinhId)) {
            throw new BadRequestException("HocSinh not found with id: " + hocSinhId);
        }

        Long phuHuynhId = NguoiDungMapper.stringIdToLongId(yeuCauGuiThuocDto.getIdPhuHuynhGui());
        if (!nguoiDungRepository.existsById(phuHuynhId)) {
            // TODO: Check if user is PHU_HUYNH role
            throw new BadRequestException("NguoiDung (PhuHuynh) not found with id: " + phuHuynhId);
        }

        YeuCauGuiThuoc yeuCau = yeuCauGuiThuocMapper.yeuCauGuiThuocDtoToYeuCauGuiThuoc(yeuCauGuiThuocDto);
        yeuCau.setId(null); // Ensure ID is null for creation

        if (yeuCauGuiThuocDto.getTrangThai() == null) {
             yeuCau.setTrangThai(TrangThaiYeuCauThuoc.MOI_TAO);
        } else {
            yeuCau.setTrangThai(yeuCauGuiThuocDto.getTrangThai());
        }

        if (yeuCauGuiThuocDto.getLichSuUongThuoc() != null && !yeuCauGuiThuocDto.getLichSuUongThuoc().isEmpty()) {
             List<LichSuChoUongThuoc> lichSuEntities = yeuCauGuiThuocDto.getLichSuUongThuoc().stream()
                .map(dto -> {
                    // Use injected lichSuChoUongThuocMapper directly
                    LichSuChoUongThuoc lsEntity = lichSuChoUongThuocMapper.lichSuChoUongThuocDtoToLichSuChoUongThuoc(dto);
                    lsEntity.setYeuCauGuiThuoc(yeuCau);
                    return lsEntity;
                })
                .collect(Collectors.toList());
            yeuCau.setLichSuUongThuoc(lichSuEntities);
        } else {
            List<LichSuChoUongThuoc> generatedLichSu = new ArrayList<>();
            if (yeuCau.getThoiGianKeHoachUong() != null) {
                for (java.time.LocalDateTime keHoach : yeuCau.getThoiGianKeHoachUong()) {
                    LichSuChoUongThuoc ls = new LichSuChoUongThuoc();
                    ls.setThoiGianKeHoach(keHoach);
                    ls.setTrangThai(com.example.schoolhealth.models.TrangThaiLichSuUongThuoc.CHUA_DEN_GIO);
                    ls.setYeuCauGuiThuoc(yeuCau);
                    generatedLichSu.add(ls);
                }
            }
            yeuCau.setLichSuUongThuoc(generatedLichSu);
        }

        YeuCauGuiThuoc savedYeuCau = yeuCauGuiThuocRepository.save(yeuCau);
        return yeuCauGuiThuocMapper.yeuCauGuiThuocToYeuCauGuiThuocDto(savedYeuCau);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<YeuCauGuiThuocDto> getAllYeuCauGuiThuoc(Pageable pageable) {
        return yeuCauGuiThuocRepository.findAll(pageable)
                .map(yeuCauGuiThuocMapper::yeuCauGuiThuocToYeuCauGuiThuocDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<YeuCauGuiThuocDto> getYeuCauGuiThuocByHocSinhId(Long hocSinhId, Pageable pageable) {
        return yeuCauGuiThuocRepository.findByIdHocSinh(hocSinhId, pageable)
                .map(yeuCauGuiThuocMapper::yeuCauGuiThuocToYeuCauGuiThuocDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<YeuCauGuiThuocDto> getYeuCauGuiThuocByPhuHuynhId(Long phuHuynhId, Pageable pageable) {
        return yeuCauGuiThuocRepository.findByIdPhuHuynhGui(phuHuynhId, pageable)
                .map(yeuCauGuiThuocMapper::yeuCauGuiThuocToYeuCauGuiThuocDto);
    }

    @Override
    @Transactional(readOnly = true)
    public YeuCauGuiThuocDto getYeuCauGuiThuocById(Long id) {
        YeuCauGuiThuoc yeuCau = yeuCauGuiThuocRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("YeuCauGuiThuoc not found with id: " + id));
        return yeuCauGuiThuocMapper.yeuCauGuiThuocToYeuCauGuiThuocDto(yeuCau);
    }

    @Override
    public YeuCauGuiThuocDto updateYeuCauGuiThuoc(Long id, YeuCauGuiThuocDto yeuCauGuiThuocDto) {
        YeuCauGuiThuoc existingYeuCau = yeuCauGuiThuocRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("YeuCauGuiThuoc not found with id: " + id));

        existingYeuCau.setTenThuoc(yeuCauGuiThuocDto.getTenThuoc());
        existingYeuCau.setHamLuong(yeuCauGuiThuocDto.getHamLuong());
        existingYeuCau.setDonViTinh(yeuCauGuiThuocDto.getDonViTinh());
        existingYeuCau.setSoLuongMoiLanUong(yeuCauGuiThuocDto.getSoLuongMoiLanUong());
        existingYeuCau.setDonViUong(yeuCauGuiThuocDto.getDonViUong());
        existingYeuCau.setDuongDung(yeuCauGuiThuocDto.getDuongDung());
        existingYeuCau.setHuongDanSuDung(yeuCauGuiThuocDto.getHuongDanSuDung());
        existingYeuCau.setDonThuocUrl(yeuCauGuiThuocDto.getDonThuocUrl());
        existingYeuCau.setGhiChuPhuHuynh(yeuCauGuiThuocDto.getGhiChuPhuHuynh());
        existingYeuCau.setLienHeKhanCap(yeuCauGuiThuocDto.getLienHeKhanCap());

        if (yeuCauGuiThuocDto.getThoiGianKeHoachUong() != null &&
            (existingYeuCau.getTrangThai() == TrangThaiYeuCauThuoc.MOI_TAO || existingYeuCau.getTrangThai() == TrangThaiYeuCauThuoc.DA_XAC_NHAN_TRUONG) ) {

            existingYeuCau.setThoiGianKeHoachUong(
                yeuCauGuiThuocMapper.stringListToLocalDateTimeList(yeuCauGuiThuocDto.getThoiGianKeHoachUong()) // Use injected mapper
            );
            existingYeuCau.getLichSuUongThuoc().clear();
             List<LichSuChoUongThuoc> generatedLichSu = new ArrayList<>();
            if (existingYeuCau.getThoiGianKeHoachUong() != null) {
                for (java.time.LocalDateTime keHoach : existingYeuCau.getThoiGianKeHoachUong()) {
                    LichSuChoUongThuoc ls = new LichSuChoUongThuoc();
                    ls.setThoiGianKeHoach(keHoach);
                    ls.setTrangThai(com.example.schoolhealth.models.TrangThaiLichSuUongThuoc.CHUA_DEN_GIO);
                    ls.setYeuCauGuiThuoc(existingYeuCau);
                    generatedLichSu.add(ls);
                }
            }
            existingYeuCau.getLichSuUongThuoc().addAll(generatedLichSu);
        }

        if(yeuCauGuiThuocDto.getIdYTaXuLy() != null) {
            Long idYTa = NguoiDungMapper.stringIdToLongId(yeuCauGuiThuocDto.getIdYTaXuLy());
            if (!nguoiDungRepository.existsById(idYTa)) {
                 throw new BadRequestException("NguoiDung (YTa) not found with id: " + idYTa);
            }
            existingYeuCau.setIdYTaXuLy(idYTa);
        }
        existingYeuCau.setLyDoHuyHoacTuChoi(yeuCauGuiThuocDto.getLyDoHuyHoacTuChoi());
        if(yeuCauGuiThuocDto.getTrangThai() != null) {
            existingYeuCau.setTrangThai(yeuCauGuiThuocDto.getTrangThai());
        }

        YeuCauGuiThuoc updatedYeuCau = yeuCauGuiThuocRepository.save(existingYeuCau);
        return yeuCauGuiThuocMapper.yeuCauGuiThuocToYeuCauGuiThuocDto(updatedYeuCau);
    }

    @Override
    public YeuCauGuiThuocDto updateTrangThaiYeuCau(Long id, String trangThaiValue, String lyDo, Long idYTaXuLy) {
        YeuCauGuiThuoc yeuCau = yeuCauGuiThuocRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("YeuCauGuiThuoc not found with id: " + id));

        TrangThaiYeuCauThuoc newTrangThai;
        try {
            newTrangThai = TrangThaiYeuCauThuoc.valueOf(trangThaiValue.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid TrangThaiYeuCauThuoc value: " + trangThaiValue);
        }

        yeuCau.setTrangThai(newTrangThai);
        if (lyDo != null && !lyDo.isEmpty()) {
            yeuCau.setLyDoHuyHoacTuChoi(lyDo);
        }
        if (idYTaXuLy != null) {
             if (!nguoiDungRepository.existsById(idYTaXuLy)) {
                 throw new BadRequestException("NguoiDung (YTa) not found with id: " + idYTaXuLy);
            }
            yeuCau.setIdYTaXuLy(idYTaXuLy);
        }

        YeuCauGuiThuoc updatedYeuCau = yeuCauGuiThuocRepository.save(yeuCau);
        return yeuCauGuiThuocMapper.yeuCauGuiThuocToYeuCauGuiThuocDto(updatedYeuCau);
    }

    @Override
    public void deleteYeuCauGuiThuoc(Long id) {
        if (!yeuCauGuiThuocRepository.existsById(id)) {
            throw new ResourceNotFoundException("YeuCauGuiThuoc not found with id: " + id);
        }
        yeuCauGuiThuocRepository.deleteById(id);
    }
}
