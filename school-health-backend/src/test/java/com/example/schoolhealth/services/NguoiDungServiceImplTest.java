package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.NguoiDungDto;
import com.example.schoolhealth.dtos.ThongTinCaNhanDto;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.mappers.NguoiDungMapper;
import com.example.schoolhealth.models.NguoiDung;
import com.example.schoolhealth.models.ThongTinCaNhan;
import com.example.schoolhealth.models.VaiTroNguoiDung;
import com.example.schoolhealth.models.TrangThaiNguoiDung;
import com.example.schoolhealth.repositories.NguoiDungRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NguoiDungServiceImplTest {

    @Mock
    private NguoiDungRepository nguoiDungRepository;

    @Mock
    private NguoiDungMapper nguoiDungMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private NguoiDungServiceImpl nguoiDungService;

    private NguoiDung nguoiDung;
    private NguoiDungDto nguoiDungDto;
    private ThongTinCaNhan thongTinCaNhan;
    private ThongTinCaNhanDto thongTinCaNhanDto;


    @BeforeEach
    void setUp() {
        thongTinCaNhan = new ThongTinCaNhan("Test User", "test@example.com", "123456789", "123 Test St");
        nguoiDung = new NguoiDung(1L, "testuser", "hashedpassword", VaiTroNguoiDung.Y_TA, thongTinCaNhan, "school1", LocalDateTime.now(), TrangThaiNguoiDung.HOAT_DONG);

        thongTinCaNhanDto = new ThongTinCaNhanDto("Test User", "test@example.com", "123456789", "123 Test St");
        nguoiDungDto = new NguoiDungDto("1", "testuser", "password", VaiTroNguoiDung.Y_TA, thongTinCaNhanDto, "school1", LocalDateTime.now().toString(), TrangThaiNguoiDung.HOAT_DONG);
    }

    @Test
    void createNguoiDung_shouldSaveAndReturnNguoiDungDto() {
        when(nguoiDungMapper.nguoiDungDtoToNguoiDung(any(NguoiDungDto.class))).thenReturn(nguoiDung);
        when(passwordEncoder.encode(anyString())).thenReturn("hashedpassword");
        when(nguoiDungRepository.save(any(NguoiDung.class))).thenReturn(nguoiDung);
        when(nguoiDungMapper.nguoiDungToNguoiDungDto(any(NguoiDung.class))).thenReturn(nguoiDungDto);

        NguoiDungDto result = nguoiDungService.createNguoiDung(nguoiDungDto);

        assertNotNull(result);
        assertEquals("testuser", result.getTenDangNhap());
        verify(nguoiDungRepository, times(1)).save(nguoiDung);
        verify(passwordEncoder, times(1)).encode("password");
    }

    @Test
    void getAllNguoiDung_shouldReturnPageOfNguoiDungDto() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<NguoiDung> page = new PageImpl<>(Collections.singletonList(nguoiDung), pageable, 1);

        when(nguoiDungRepository.findAll(pageable)).thenReturn(page);
        when(nguoiDungMapper.nguoiDungToNguoiDungDto(any(NguoiDung.class))).thenReturn(nguoiDungDto);

        Page<NguoiDungDto> result = nguoiDungService.getAllNguoiDung(pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("testuser", result.getContent().get(0).getTenDangNhap());
        verify(nguoiDungRepository, times(1)).findAll(pageable);
    }

    @Test
    void getNguoiDungById_whenNguoiDungExists_shouldReturnNguoiDungDto() {
        when(nguoiDungRepository.findById(1L)).thenReturn(Optional.of(nguoiDung));
        when(nguoiDungMapper.nguoiDungToNguoiDungDto(any(NguoiDung.class))).thenReturn(nguoiDungDto);

        NguoiDungDto result = nguoiDungService.getNguoiDungById(1L);

        assertNotNull(result);
        assertEquals("1", result.getId());
        verify(nguoiDungRepository, times(1)).findById(1L);
    }

    @Test
    void getNguoiDungById_whenNguoiDungNotExists_shouldThrowResourceNotFoundException() {
        when(nguoiDungRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> nguoiDungService.getNguoiDungById(1L));
        verify(nguoiDungRepository, times(1)).findById(1L);
    }

    @Test
    void updateNguoiDung_whenNguoiDungExists_shouldUpdateAndReturnNguoiDungDto() {
        NguoiDungDto updatedDto = new NguoiDungDto("1", "updateduser", "newpassword", VaiTroNguoiDung.ADMIN, thongTinCaNhanDto, "school2", LocalDateTime.now().toString(), TrangThaiNguoiDung.KHOA);

        when(nguoiDungRepository.findById(1L)).thenReturn(Optional.of(nguoiDung));
        when(passwordEncoder.encode(anyString())).thenReturn("newhashedpassword");
        when(nguoiDungRepository.save(any(NguoiDung.class))).thenReturn(nguoiDung); // Assume save returns updated entity
        when(nguoiDungMapper.nguoiDungToNguoiDungDto(any(NguoiDung.class))).thenReturn(updatedDto);
        when(nguoiDungMapper.thongTinCaNhanDtoToThongTinCaNhan(any(ThongTinCaNhanDto.class))).thenReturn(thongTinCaNhan);


        NguoiDungDto result = nguoiDungService.updateNguoiDung(1L, updatedDto);

        assertNotNull(result);
        assertEquals("updateduser", result.getTenDangNhap());
        assertEquals(VaiTroNguoiDung.ADMIN, result.getVaiTro());
        verify(nguoiDungRepository, times(1)).findById(1L);
        verify(nguoiDungRepository, times(1)).save(nguoiDung);
        verify(passwordEncoder, times(1)).encode("newpassword");
    }

    @Test
    void updateNguoiDung_whenPasswordIsNull_shouldNotEncodePassword() {
        NguoiDungDto updatedDtoNoPassword = new NguoiDungDto("1", "updateduser", null, VaiTroNguoiDung.ADMIN, thongTinCaNhanDto, "school2", LocalDateTime.now().toString(), TrangThaiNguoiDung.KHOA);
        updatedDtoNoPassword.setPassword(null); // Explicitly set password to null

        when(nguoiDungRepository.findById(1L)).thenReturn(Optional.of(nguoiDung));
        when(nguoiDungRepository.save(any(NguoiDung.class))).thenReturn(nguoiDung);
        when(nguoiDungMapper.nguoiDungToNguoiDungDto(any(NguoiDung.class))).thenReturn(updatedDtoNoPassword);
        when(nguoiDungMapper.thongTinCaNhanDtoToThongTinCaNhan(any(ThongTinCaNhanDto.class))).thenReturn(thongTinCaNhan);


        nguoiDungService.updateNguoiDung(1L, updatedDtoNoPassword);

        verify(passwordEncoder, never()).encode(anyString());
        verify(nguoiDungRepository, times(1)).save(nguoiDung);
    }


    @Test
    void updateNguoiDung_whenNguoiDungNotExists_shouldThrowResourceNotFoundException() {
        when(nguoiDungRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> nguoiDungService.updateNguoiDung(1L, nguoiDungDto));
        verify(nguoiDungRepository, times(1)).findById(1L);
        verify(nguoiDungRepository, never()).save(any(NguoiDung.class));
    }

    @Test
    void deleteNguoiDung_whenNguoiDungExists_shouldDeleteNguoiDung() {
        when(nguoiDungRepository.existsById(1L)).thenReturn(true);
        doNothing().when(nguoiDungRepository).deleteById(1L);

        nguoiDungService.deleteNguoiDung(1L);

        verify(nguoiDungRepository, times(1)).existsById(1L);
        verify(nguoiDungRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteNguoiDung_whenNguoiDungNotExists_shouldThrowResourceNotFoundException() {
        when(nguoiDungRepository.existsById(1L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> nguoiDungService.deleteNguoiDung(1L));
        verify(nguoiDungRepository, times(1)).existsById(1L);
        verify(nguoiDungRepository, never()).deleteById(1L);
    }
}
