package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.SuKienYTeDto;
import com.example.schoolhealth.exceptions.BadRequestException;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.mappers.NguoiDungMapper;
import com.example.schoolhealth.mappers.SuKienYTeMapper;
import com.example.schoolhealth.models.SuKienYTe;
import com.example.schoolhealth.models.YeuCauGuiThuoc; // For validating YeuCauGuiThuocLienQuan
import com.example.schoolhealth.repositories.HocSinhRepository;
import com.example.schoolhealth.repositories.NguoiDungRepository;
import com.example.schoolhealth.repositories.SuKienYTeRepository;
import com.example.schoolhealth.repositories.YeuCauGuiThuocRepository; // For validating YeuCauGuiThuocLienQuan
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter; // Added for parsing/formatting

@Service
@Transactional
public class SuKienYTeServiceImpl implements SuKienYTeService {

    private final SuKienYTeRepository suKienYTeRepository;
    private final HocSinhRepository hocSinhRepository;
    private final NguoiDungRepository nguoiDungRepository;
    private final YeuCauGuiThuocRepository yeuCauGuiThuocRepository;
    private final SuKienYTeMapper suKienYTeMapper;

    @Autowired
    public SuKienYTeServiceImpl(SuKienYTeRepository suKienYTeRepository,
                                HocSinhRepository hocSinhRepository,
                                NguoiDungRepository nguoiDungRepository,
                                YeuCauGuiThuocRepository yeuCauGuiThuocRepository,
                                SuKienYTeMapper suKienYTeMapper) {
        this.suKienYTeRepository = suKienYTeRepository;
        this.hocSinhRepository = hocSinhRepository;
        this.nguoiDungRepository = nguoiDungRepository;
        this.yeuCauGuiThuocRepository = yeuCauGuiThuocRepository;
        this.suKienYTeMapper = suKienYTeMapper;
    }

    @Override
    public SuKienYTeDto createSuKienYTe(SuKienYTeDto suKienYTeDto) {
        Long hocSinhId = NguoiDungMapper.stringIdToLongId(suKienYTeDto.getIdHocSinh());
        if (!hocSinhRepository.existsById(hocSinhId)) {
            throw new BadRequestException("HocSinh not found with id: " + hocSinhId);
        }

        Long idYTaGhiNhan = NguoiDungMapper.stringIdToLongId(suKienYTeDto.getIdYTaGhiNhan());
        if (!nguoiDungRepository.existsById(idYTaGhiNhan)) {
            // TODO: Check if user is Y_TA role
            throw new BadRequestException("NguoiDung (YTaGhiNhan) not found with id: " + idYTaGhiNhan);
        }

        if (suKienYTeDto.getIdYeuCauGuiThuocLienQuan() != null && !suKienYTeDto.getIdYeuCauGuiThuocLienQuan().isEmpty()) {
            Long idYeuCau = NguoiDungMapper.stringIdToLongId(suKienYTeDto.getIdYeuCauGuiThuocLienQuan());
            if (!yeuCauGuiThuocRepository.existsById(idYeuCau)) {
                throw new BadRequestException("YeuCauGuiThuocLienQuan not found with id: " + idYeuCau);
            }
        }

        // Logic for daThongBaoPhuHuynh and thoiGianThongBaoPhuHuynh consistency
        if (Boolean.TRUE.equals(suKienYTeDto.getDaThongBaoPhuHuynh()) && (suKienYTeDto.getThoiGianThongBaoPhuHuynh() == null || suKienYTeDto.getThoiGianThongBaoPhuHuynh().isEmpty())) {
            suKienYTeDto.setThoiGianThongBaoPhuHuynh(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        } else if (Boolean.FALSE.equals(suKienYTeDto.getDaThongBaoPhuHuynh())) {
            suKienYTeDto.setThoiGianThongBaoPhuHuynh(null);
        }


        SuKienYTe suKien = suKienYTeMapper.suKienYTeDtoToSuKienYTe(suKienYTeDto);
        suKien.setId(null); // Ensure ID is null for creation

        // ngayTao and ngayCapNhat are handled by @PrePersist
        SuKienYTe savedSuKien = suKienYTeRepository.save(suKien);
        return suKienYTeMapper.suKienYTeToSuKienYTeDto(savedSuKien);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SuKienYTeDto> getAllSuKienYTe(Pageable pageable) {
        return suKienYTeRepository.findAll(pageable)
                .map(suKienYTeMapper::suKienYTeToSuKienYTeDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SuKienYTeDto> getSuKienYTeByHocSinhId(Long hocSinhId, Pageable pageable) {
        return suKienYTeRepository.findByIdHocSinh(hocSinhId, pageable)
                .map(suKienYTeMapper::suKienYTeToSuKienYTeDto);
    }

    @Override
    @Transactional(readOnly = true)
    public SuKienYTeDto getSuKienYTeById(Long id) {
        SuKienYTe suKien = suKienYTeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SuKienYTe not found with id: " + id));
        return suKienYTeMapper.suKienYTeToSuKienYTeDto(suKien);
    }

    @Override
    public SuKienYTeDto updateSuKienYTe(Long id, SuKienYTeDto suKienYTeDto) {
        SuKienYTe existingSuKien = suKienYTeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SuKienYTe not found with id: " + id));

        Long idYTaGhiNhan = NguoiDungMapper.stringIdToLongId(suKienYTeDto.getIdYTaGhiNhan());
        if (!nguoiDungRepository.existsById(idYTaGhiNhan)) {
             throw new BadRequestException("NguoiDung (YTaGhiNhan) not found with id: " + idYTaGhiNhan);
        }
        existingSuKien.setIdYTaGhiNhan(idYTaGhiNhan);

        if (suKienYTeDto.getIdYeuCauGuiThuocLienQuan() != null && !suKienYTeDto.getIdYeuCauGuiThuocLienQuan().isEmpty()) {
            Long idYeuCau = NguoiDungMapper.stringIdToLongId(suKienYTeDto.getIdYeuCauGuiThuocLienQuan());
            if (!yeuCauGuiThuocRepository.existsById(idYeuCau)) {
                throw new BadRequestException("YeuCauGuiThuocLienQuan not found with id: " + idYeuCau);
            }
            existingSuKien.setIdYeuCauGuiThuocLienQuan(idYeuCau);
        } else {
            existingSuKien.setIdYeuCauGuiThuocLienQuan(null);
        }

        if (Boolean.TRUE.equals(suKienYTeDto.getDaThongBaoPhuHuynh()) && (suKienYTeDto.getThoiGianThongBaoPhuHuynh() == null || suKienYTeDto.getThoiGianThongBaoPhuHuynh().isEmpty())) {
            existingSuKien.setThoiGianThongBaoPhuHuynh(LocalDateTime.now());
        } else if (Boolean.FALSE.equals(suKienYTeDto.getDaThongBaoPhuHuynh())) {
            existingSuKien.setThoiGianThongBaoPhuHuynh(null);
        } else if (suKienYTeDto.getThoiGianThongBaoPhuHuynh() != null && !suKienYTeDto.getThoiGianThongBaoPhuHuynh().isEmpty()) {
             existingSuKien.setThoiGianThongBaoPhuHuynh(NguoiDungMapper.stringToLocalDateTime(suKienYTeDto.getThoiGianThongBaoPhuHuynh()));
        }
        existingSuKien.setDaThongBaoPhuHuynh(Boolean.TRUE.equals(suKienYTeDto.getDaThongBaoPhuHuynh()));

        SuKienYTe mappedUpdates = suKienYTeMapper.suKienYTeDtoToSuKienYTe(suKienYTeDto);
        existingSuKien.setThoiGianXayRa(mappedUpdates.getThoiGianXayRa());
        existingSuKien.setDiaDiemXayRa(mappedUpdates.getDiaDiemXayRa());
        existingSuKien.setLoaiSuCo(mappedUpdates.getLoaiSuCo());
        existingSuKien.setMucDoNghiemTrong(mappedUpdates.getMucDoNghiemTrong());
        existingSuKien.setMoTaChiTiet(mappedUpdates.getMoTaChiTiet());
        existingSuKien.setBienPhapXuLyBanDau(mappedUpdates.getBienPhapXuLyBanDau());
        existingSuKien.setTinhTrangHocSinhSauXuLy(mappedUpdates.getTinhTrangHocSinhSauXuLy());
        existingSuKien.setGhiChuThemCuaYTa(mappedUpdates.getGhiChuThemCuaYTa());

        if (mappedUpdates.getThuocDaSuDung() != null) {
            existingSuKien.getThuocDaSuDung().clear();
            existingSuKien.getThuocDaSuDung().addAll(mappedUpdates.getThuocDaSuDung());
        } else {
            existingSuKien.getThuocDaSuDung().clear();
        }
        if (mappedUpdates.getVatTuDaSuDung() != null) {
            existingSuKien.getVatTuDaSuDung().clear();
            existingSuKien.getVatTuDaSuDung().addAll(mappedUpdates.getVatTuDaSuDung());
        } else {
            existingSuKien.getVatTuDaSuDung().clear();
        }

        SuKienYTe updatedSuKien = suKienYTeRepository.save(existingSuKien);
        return suKienYTeMapper.suKienYTeToSuKienYTeDto(updatedSuKien);
    }

    @Override
    public void deleteSuKienYTe(Long id) {
        if (!suKienYTeRepository.existsById(id)) {
            throw new ResourceNotFoundException("SuKienYTe not found with id: " + id);
        }
        suKienYTeRepository.deleteById(id);
    }
}
