package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.HoSoSucKhoeDto;
import com.example.schoolhealth.dtos.ThongTinTiemChungDto;
import com.example.schoolhealth.exceptions.BadRequestException;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.mappers.HoSoSucKhoeMapper;
import com.example.schoolhealth.mappers.NguoiDungMapper;
import com.example.schoolhealth.models.HoSoSucKhoe;
import com.example.schoolhealth.models.ThongTinTiemChung;
import com.example.schoolhealth.repositories.HoSoSucKhoeRepository;
import com.example.schoolhealth.repositories.HocSinhRepository;
import com.example.schoolhealth.repositories.NguoiDungRepository;
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
public class HoSoSucKhoeServiceImpl implements HoSoSucKhoeService {

    private final HoSoSucKhoeRepository hoSoSucKhoeRepository;
    private final HocSinhRepository hocSinhRepository; // To validate HocSinh existence
    private final NguoiDungRepository nguoiDungRepository; // To validate NguoiCapNhat existence
    private final HoSoSucKhoeMapper hoSoSucKhoeMapper;

    @Autowired
    public HoSoSucKhoeServiceImpl(HoSoSucKhoeRepository hoSoSucKhoeRepository,
                                  HocSinhRepository hocSinhRepository,
                                  NguoiDungRepository nguoiDungRepository,
                                  HoSoSucKhoeMapper hoSoSucKhoeMapper) {
        this.hoSoSucKhoeRepository = hoSoSucKhoeRepository;
        this.hocSinhRepository = hocSinhRepository;
        this.nguoiDungRepository = nguoiDungRepository;
        this.hoSoSucKhoeMapper = hoSoSucKhoeMapper;
    }

    @Override
    public HoSoSucKhoeDto createHoSoSucKhoe(HoSoSucKhoeDto hoSoSucKhoeDto) {
        Long hocSinhId = NguoiDungMapper.stringIdToLongId(hoSoSucKhoeDto.getIdHocSinh());
        if (!hocSinhRepository.existsById(hocSinhId)) {
            throw new BadRequestException("HocSinh not found with id: " + hocSinhId);
        }
        // Check if HoSoSucKhoe already exists for this HocSinh
        if (hoSoSucKhoeRepository.existsByIdHocSinh(hocSinhId)) {
            throw new BadRequestException("HoSoSucKhoe already exists for HocSinh id: " + hocSinhId);
        }

        Long idNguoiCapNhatCuoi = NguoiDungMapper.stringIdToLongId(hoSoSucKhoeDto.getIdNguoiCapNhatCuoi());
        if (!nguoiDungRepository.existsById(idNguoiCapNhatCuoi)) {
            throw new BadRequestException("NguoiDung (updater) not found with id: " + idNguoiCapNhatCuoi);
        }

        HoSoSucKhoe hoSoSucKhoe = hoSoSucKhoeMapper.hoSoSucKhoeDtoToHoSoSucKhoe(hoSoSucKhoeDto);
        hoSoSucKhoe.setId(null); // Ensure ID is null for creation

        // Handle ThongTinTiemChung mapping and setting bi-directional relationship
        if (hoSoSucKhoeDto.getTiemChung() != null) {
            List<ThongTinTiemChung> tiemChungEntities = new ArrayList<>();
            for (ThongTinTiemChungDto dto : hoSoSucKhoeDto.getTiemChung()) {
                ThongTinTiemChung entity = hoSoSucKhoeMapper.thongTinTiemChungDtoToThongTinTiemChung(dto);
                entity.setHoSoSucKhoe(hoSoSucKhoe); // Set back reference
                tiemChungEntities.add(entity);
            }
            hoSoSucKhoe.setTiemChung(tiemChungEntities);
        } else {
            hoSoSucKhoe.setTiemChung(new ArrayList<>());
        }

        // @PrePersist in entity handles ngayCapNhatCuoi
        HoSoSucKhoe savedHoSo = hoSoSucKhoeRepository.save(hoSoSucKhoe);
        return hoSoSucKhoeMapper.hoSoSucKhoeToHoSoSucKhoeDto(savedHoSo);
    }

    @Override
    @Transactional(readOnly = true)
    public HoSoSucKhoeDto getHoSoSucKhoeById(Long id) {
        HoSoSucKhoe hoSoSucKhoe = hoSoSucKhoeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HoSoSucKhoe not found with id: " + id));
        return hoSoSucKhoeMapper.hoSoSucKhoeToHoSoSucKhoeDto(hoSoSucKhoe);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<HoSoSucKhoeDto> getAllHoSoSucKhoe(Pageable pageable) {
        return hoSoSucKhoeRepository.findAll(pageable)
            .map(hoSoSucKhoeMapper::hoSoSucKhoeToHoSoSucKhoeDto);
    }

    @Override
    @Transactional(readOnly = true)
    public HoSoSucKhoeDto getHoSoSucKhoeByHocSinhId(Long hocSinhId) {
        HoSoSucKhoe hoSoSucKhoe = hoSoSucKhoeRepository.findByIdHocSinh(hocSinhId)
                .orElseThrow(() -> new ResourceNotFoundException("HoSoSucKhoe not found for HocSinh id: " + hocSinhId));
        return hoSoSucKhoeMapper.hoSoSucKhoeToHoSoSucKhoeDto(hoSoSucKhoe);
    }

    @Override
    public HoSoSucKhoeDto updateHoSoSucKhoe(Long id, HoSoSucKhoeDto hoSoSucKhoeDto) {
        HoSoSucKhoe existingHoSo = hoSoSucKhoeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HoSoSucKhoe not found with id: " + id));

        Long idNguoiCapNhatCuoi = NguoiDungMapper.stringIdToLongId(hoSoSucKhoeDto.getIdNguoiCapNhatCuoi());
        if (!nguoiDungRepository.existsById(idNguoiCapNhatCuoi)) {
            throw new BadRequestException("NguoiDung (updater) not found with id: " + idNguoiCapNhatCuoi);
        }
        existingHoSo.setIdNguoiCapNhatCuoi(idNguoiCapNhatCuoi);

        // Update basic fields
        existingHoSo.setNhomMau(hoSoSucKhoeDto.getNhomMau());
        existingHoSo.setDiUng(hoSoSucKhoeDto.getDiUng());
        existingHoSo.setBenhManTinh(hoSoSucKhoeDto.getBenhManTinh());
        existingHoSo.setTienSuDieuTri(hoSoSucKhoeDto.getTienSuDieuTri());
        existingHoSo.setGhiChuKhac(hoSoSucKhoeDto.getGhiChuKhac());

        if (hoSoSucKhoeDto.getThiLuc() != null) {
            existingHoSo.setThiLuc(hoSoSucKhoeMapper.chiTietLucDtoToChiTietLuc(hoSoSucKhoeDto.getThiLuc()));
        } else {
            existingHoSo.setThiLuc(null);
        }

        if (hoSoSucKhoeDto.getThinhLuc() != null) {
            existingHoSo.setThinhLuc(hoSoSucKhoeMapper.chiTietLucDtoToChiTietLuc(hoSoSucKhoeDto.getThinhLuc()));
        } else {
            existingHoSo.setThinhLuc(null);
        }

        // Handle ThongTinTiemChung updates (complex: add, remove, update existing)
        // For simplicity, this example replaces the entire collection.
        // A more robust implementation would handle individual item changes.
        existingHoSo.getTiemChung().clear(); // Clear existing collection
        if (hoSoSucKhoeDto.getTiemChung() != null) {
            List<ThongTinTiemChung> updatedTiemChungList = hoSoSucKhoeDto.getTiemChung().stream()
                .map(dto -> {
                    ThongTinTiemChung entity = hoSoSucKhoeMapper.thongTinTiemChungDtoToThongTinTiemChung(dto);
                    entity.setHoSoSucKhoe(existingHoSo); // Set back reference
                    return entity;
                })
                .collect(Collectors.toList());
            existingHoSo.getTiemChung().addAll(updatedTiemChungList);
        }

        // @PreUpdate in entity handles ngayCapNhatCuoi
        HoSoSucKhoe updatedHoSo = hoSoSucKhoeRepository.save(existingHoSo);
        return hoSoSucKhoeMapper.hoSoSucKhoeToHoSoSucKhoeDto(updatedHoSo);
    }

    @Override
    public void deleteHoSoSucKhoe(Long id) {
        if (!hoSoSucKhoeRepository.existsById(id)) {
            throw new ResourceNotFoundException("HoSoSucKhoe not found with id: " + id);
        }
        // Consider implications: what happens to HocSinh.idHoSoSucKhoe?
        // Potentially set HocSinh.idHoSoSucKhoe to null before deleting.
        // HocSinh hocSinh = hocSinhRepository.findByHoSoSucKhoeId(id); // Need custom query
        // if (hocSinh != null) {
        //    hocSinh.setIdHoSoSucKhoe(null);
        //    hocSinhRepository.save(hocSinh);
        // }
        hoSoSucKhoeRepository.deleteById(id);
    }
}
