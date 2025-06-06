package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.ChiTietLucDto;
import com.example.schoolhealth.dtos.HoSoSucKhoeDto;
import com.example.schoolhealth.dtos.ThongTinTiemChungDto;
import com.example.schoolhealth.exceptions.BadRequestException;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.mappers.HoSoSucKhoeMapper;
import com.example.schoolhealth.mappers.NguoiDungMapper;
import com.example.schoolhealth.models.*;
import com.example.schoolhealth.repositories.HoSoSucKhoeRepository;
import com.example.schoolhealth.repositories.HocSinhRepository;
import com.example.schoolhealth.repositories.NguoiDungRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HoSoSucKhoeServiceImplTest {

    @Mock
    private HoSoSucKhoeRepository hoSoSucKhoeRepository;
    @Mock
    private HocSinhRepository hocSinhRepository;
    @Mock
    private NguoiDungRepository nguoiDungRepository;
    @Mock
    private HoSoSucKhoeMapper hoSoSucKhoeMapper;

    @InjectMocks
    private HoSoSucKhoeServiceImpl hoSoSucKhoeService;

    private HoSoSucKhoe hoSoSucKhoe;
    private HoSoSucKhoeDto hoSoSucKhoeDto;
    private ChiTietLucDto thiLucDto, thinhLucDto;
    private ChiTietLuc thiLucEntity, thinhLucEntity;
    private ThongTinTiemChungDto tiemChungDto;
    private ThongTinTiemChung tiemChungEntity;

    @BeforeEach
    void setUp() {
        thiLucDto = new ChiTietLucDto("10/10", "10/10", "2023-01-01", "Thi luc tot");
        thinhLucDto = new ChiTietLucDto("Tot", "Tot", "2023-01-01", "Thinh luc tot");
        tiemChungDto = new ThongTinTiemChungDto("1", "Vaccine A", "2023-02-01", "1ml", "Ghi chu tiem");

        thiLucEntity = new ChiTietLuc("10/10", "10/10", LocalDate.parse("2023-01-01"), "Thi luc tot");
        thinhLucEntity = new ChiTietLuc("Tot", "Tot", LocalDate.parse("2023-01-01"), "Thinh luc tot");
        tiemChungEntity = new ThongTinTiemChung(1L, "Vaccine A", LocalDate.parse("2023-02-01"), "1ml", "Ghi chu tiem", null);

        hoSoSucKhoeDto = new HoSoSucKhoeDto(
                "1", "100", NhomMau.A_PLUS, List.of("Di ung 1"), List.of("Benh 1"),
                "Tien su", thiLucDto, thinhLucDto, List.of(tiemChungDto),
                "Ghi chu khac", LocalDateTime.now().toString(), "200"
        );

        hoSoSucKhoe = new HoSoSucKhoe(
                1L, 100L, NhomMau.A_PLUS, List.of("Di ung 1"), List.of("Benh 1"),
                "Tien su", thiLucEntity, thinhLucEntity, new ArrayList<>(),
                "Ghi chu khac", LocalDateTime.now(), 200L
        );
        tiemChungEntity.setHoSoSucKhoe(hoSoSucKhoe); // Link back for bi-directional consistency
        hoSoSucKhoe.setTiemChung(new ArrayList<>(List.of(tiemChungEntity))); // Ensure the list is mutable for service logic
    }

    @Test
    void createHoSoSucKhoe_success() {
        HoSoSucKhoe hoSoSucKhoeInput = new HoSoSucKhoe(); // This is what mapper returns before ID is set
        hoSoSucKhoeInput.setIdHocSinh(100L);
        hoSoSucKhoeInput.setIdNguoiCapNhatCuoi(200L);
        // Assume other fields are mapped by hoSoSucKhoeMapper.hoSoSucKhoeDtoToHoSoSucKhoe

        when(hocSinhRepository.existsById(100L)).thenReturn(true);
        when(hoSoSucKhoeRepository.existsByIdHocSinh(100L)).thenReturn(false);
        when(nguoiDungRepository.existsById(200L)).thenReturn(true);
        when(hoSoSucKhoeMapper.hoSoSucKhoeDtoToHoSoSucKhoe(any(HoSoSucKhoeDto.class))).thenReturn(hoSoSucKhoeInput);
        when(hoSoSucKhoeMapper.thongTinTiemChungDtoToThongTinTiemChung(any(ThongTinTiemChungDto.class))).thenReturn(new ThongTinTiemChung());
        when(hoSoSucKhoeRepository.save(any(HoSoSucKhoe.class))).thenReturn(hoSoSucKhoe); // Return the fully populated entity
        when(hoSoSucKhoeMapper.hoSoSucKhoeToHoSoSucKhoeDto(any(HoSoSucKhoe.class))).thenReturn(hoSoSucKhoeDto);

        HoSoSucKhoeDto result = hoSoSucKhoeService.createHoSoSucKhoe(hoSoSucKhoeDto);

        assertNotNull(result);
        assertEquals(hoSoSucKhoeDto.getIdHocSinh(), result.getIdHocSinh());

        ArgumentCaptor<HoSoSucKhoe> hoSoSucKhoeCaptor = ArgumentCaptor.forClass(HoSoSucKhoe.class);
        verify(hoSoSucKhoeRepository).save(hoSoSucKhoeCaptor.capture());
        assertNull(hoSoSucKhoeCaptor.getValue().getId(), "ID should be null before saving for create operation");
        // Verify that tiemChung entities had their back-reference set
        assertFalse(hoSoSucKhoeCaptor.getValue().getTiemChung().isEmpty());
        assertEquals(hoSoSucKhoeCaptor.getValue(), hoSoSucKhoeCaptor.getValue().getTiemChung().get(0).getHoSoSucKhoe());
    }

    @Test
    void createHoSoSucKhoe_hocSinhNotFound_throwsBadRequest() {
        when(hocSinhRepository.existsById(NguoiDungMapper.stringIdToLongId(hoSoSucKhoeDto.getIdHocSinh()))).thenReturn(false);
        assertThrows(BadRequestException.class, () -> hoSoSucKhoeService.createHoSoSucKhoe(hoSoSucKhoeDto));
    }

    @Test
    void createHoSoSucKhoe_alreadyExists_throwsBadRequest() {
        when(hocSinhRepository.existsById(NguoiDungMapper.stringIdToLongId(hoSoSucKhoeDto.getIdHocSinh()))).thenReturn(true);
        when(hoSoSucKhoeRepository.existsByIdHocSinh(NguoiDungMapper.stringIdToLongId(hoSoSucKhoeDto.getIdHocSinh()))).thenReturn(true);
        assertThrows(BadRequestException.class, () -> hoSoSucKhoeService.createHoSoSucKhoe(hoSoSucKhoeDto));
    }

    @Test
    void getHoSoSucKhoeById_exists_returnsDto() {
        when(hoSoSucKhoeRepository.findById(1L)).thenReturn(Optional.of(hoSoSucKhoe));
        when(hoSoSucKhoeMapper.hoSoSucKhoeToHoSoSucKhoeDto(hoSoSucKhoe)).thenReturn(hoSoSucKhoeDto);
        HoSoSucKhoeDto result = hoSoSucKhoeService.getHoSoSucKhoeById(1L);
        assertNotNull(result);
        assertEquals(hoSoSucKhoeDto.getId(), result.getId());
    }

    @Test
    void getHoSoSucKhoeById_notFound_throwsResourceNotFound() {
        when(hoSoSucKhoeRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> hoSoSucKhoeService.getHoSoSucKhoeById(1L));
    }

    @Test
    void getHoSoSucKhoeByHocSinhId_exists_returnsDto() {
        when(hoSoSucKhoeRepository.findByIdHocSinh(100L)).thenReturn(Optional.of(hoSoSucKhoe));
        when(hoSoSucKhoeMapper.hoSoSucKhoeToHoSoSucKhoeDto(hoSoSucKhoe)).thenReturn(hoSoSucKhoeDto);
        HoSoSucKhoeDto result = hoSoSucKhoeService.getHoSoSucKhoeByHocSinhId(100L);
        assertNotNull(result);
        assertEquals(hoSoSucKhoeDto.getIdHocSinh(), "100");
    }

    @Test
    void getAllHoSoSucKhoe_shouldReturnPage() {
        Pageable pageable = PageRequest.of(0, 10);
        List<HoSoSucKhoe> list = Collections.singletonList(hoSoSucKhoe);
        Page<HoSoSucKhoe> page = new PageImpl<>(list, pageable, list.size());
        when(hoSoSucKhoeRepository.findAll(pageable)).thenReturn(page);
        when(hoSoSucKhoeMapper.hoSoSucKhoeToHoSoSucKhoeDto(any(HoSoSucKhoe.class))).thenReturn(hoSoSucKhoeDto);

        Page<HoSoSucKhoeDto> result = hoSoSucKhoeService.getAllHoSoSucKhoe(pageable);
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
    }


    @Test
    void updateHoSoSucKhoe_success() {
        HoSoSucKhoeDto updatedInfo = new HoSoSucKhoeDto(
            "1", "100", NhomMau.B_PLUS, List.of("New Allergy"), List.of("New Condition"),
            "New History", thiLucDto, thinhLucDto, List.of(tiemChungDto),
            "New Notes", LocalDateTime.now().toString(), "201" // Different updater
        );

        HoSoSucKhoe existingHoSoSucKhoeSpy = spy(hoSoSucKhoe);

        when(hoSoSucKhoeRepository.findById(1L)).thenReturn(Optional.of(existingHoSoSucKhoeSpy));
        when(nguoiDungRepository.existsById(NguoiDungMapper.stringIdToLongId(updatedInfo.getIdNguoiCapNhatCuoi()))).thenReturn(true);

        when(hoSoSucKhoeMapper.chiTietLucDtoToChiTietLuc(any(ChiTietLucDto.class))).thenReturn(new ChiTietLuc());
        when(hoSoSucKhoeMapper.thongTinTiemChungDtoToThongTinTiemChung(any(ThongTinTiemChungDto.class)))
            .thenAnswer(invocation -> {
                ThongTinTiemChungDto dto = invocation.getArgument(0);
                ThongTinTiemChung entity = new ThongTinTiemChung();
                entity.setTenVaccine(dto.getTenVaccine());
                return entity;
            });

        when(hoSoSucKhoeRepository.save(any(HoSoSucKhoe.class))).thenReturn(existingHoSoSucKhoeSpy);
        when(hoSoSucKhoeMapper.hoSoSucKhoeToHoSoSucKhoeDto(any(HoSoSucKhoe.class))).thenReturn(updatedInfo);

        HoSoSucKhoeDto result = hoSoSucKhoeService.updateHoSoSucKhoe(1L, updatedInfo);

        assertNotNull(result);
        assertEquals(updatedInfo.getNhomMau(), result.getNhomMau());
        verify(existingHoSoSucKhoeSpy).setNhomMau(updatedInfo.getNhomMau());
        verify(hoSoSucKhoeRepository).save(existingHoSoSucKhoeSpy);
        assertEquals(201L, existingHoSoSucKhoeSpy.getIdNguoiCapNhatCuoi());
    }

    @Test
    void updateHoSoSucKhoe_whenHoSoSucKhoeNotExists_shouldThrowResourceNotFoundException() {
        when(hoSoSucKhoeRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> hoSoSucKhoeService.updateHoSoSucKhoe(1L, hoSoSucKhoeDto));
        verify(hoSoSucKhoeRepository, times(1)).findById(1L);
        verify(hoSoSucKhoeRepository, never()).save(any(HoSoSucKhoe.class));
    }

    @Test
    void deleteHoSoSucKhoe_whenHoSoSucKhoeExists_shouldDeleteHoSoSucKhoe() {
        when(hoSoSucKhoeRepository.existsById(1L)).thenReturn(true);
        doNothing().when(hoSoSucKhoeRepository).deleteById(1L);
        hoSoSucKhoeService.deleteHoSoSucKhoe(1L);
        verify(hoSoSucKhoeRepository).deleteById(1L);
    }

    @Test
    void deleteHoSoSucKhoe_whenHoSoSucKhoeNotExists_shouldThrowResourceNotFoundException() {
        when(hoSoSucKhoeRepository.existsById(1L)).thenReturn(false);
        assertThrows(ResourceNotFoundException.class, () -> hoSoSucKhoeService.deleteHoSoSucKhoe(1L));
        verify(hoSoSucKhoeRepository, times(1)).existsById(1L);
        verify(hoSoSucKhoeRepository, never()).deleteById(1L);
    }
}
