package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.HocSinhDto;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.mappers.HocSinhMapper;
import com.example.schoolhealth.mappers.NguoiDungMapper; // For static ID methods if used by mapper directly
import com.example.schoolhealth.models.GioiTinh;
import com.example.schoolhealth.models.HocSinh;
import com.example.schoolhealth.repositories.HocSinhRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HocSinhServiceImplTest {

    @Mock
    private HocSinhRepository hocSinhRepository;

    // Use @Spy for mappers if you need to mock some methods but use real implementation for others
    // or if they have complex internal logic. For simple mappers, @Mock is often enough.
    // Here, HocSinhMapper uses NguoiDungMapper.class, so ensure that is handled.
    // We can mock the NguoiDungMapper static methods via HocSinhMapper if it calls them.
    // Or, since HocSinhMapper itself defines the conversion methods using @Named, we can mock those.
    @Mock // Changed to @Mock as we will mock its direct methods.
    private HocSinhMapper hocSinhMapper;


    @InjectMocks
    private HocSinhServiceImpl hocSinhService;

    private HocSinh hocSinh;
    private HocSinhDto hocSinhDto;

    @BeforeEach
    void setUp() {
        hocSinh = new HocSinh(
                1L, "Nguyen Van A", "HS001", LocalDate.of(2010, 5, 15),
                GioiTinh.NAM, "5A", "TRUONG001", 100L,
                List.of(101L, 102L), 200L, "avatar.png", "Ghi chu hoc sinh"
        );

        hocSinhDto = new HocSinhDto(
                "1", "Nguyen Van A", "HS001", "2010-05-15",
                GioiTinh.NAM, "5A", "TRUONG001", "100",
                List.of("101", "102"), "200", "avatar.png", "Ghi chu hoc sinh"
        );
    }

    @Test
    void createHocSinh_shouldSaveAndReturnHocSinhDto() {
        // Arrange
        // When hocSinhMapper.hocSinhDtoToHocSinh is called, it should return our 'hocSinh' entity (with ID potentially null for creation)
        HocSinh hocSinhToSave = new HocSinh(); // Simulate the object before saving (ID is null)
        hocSinhToSave.setHoTen(hocSinhDto.getHoTen()); // Set other fields as needed for the test

        when(hocSinhMapper.hocSinhDtoToHocSinh(any(HocSinhDto.class))).thenReturn(hocSinhToSave);
        when(hocSinhRepository.save(any(HocSinh.class))).thenReturn(hocSinh); // After save, it has an ID
        when(hocSinhMapper.hocSinhToHocSinhDto(any(HocSinh.class))).thenReturn(hocSinhDto);


        // Act
        HocSinhDto result = hocSinhService.createHocSinh(hocSinhDto);

        // Assert
        assertNotNull(result);
        assertEquals(hocSinhDto.getHoTen(), result.getHoTen());
        verify(hocSinhRepository, times(1)).save(hocSinhToSave);
        assertEquals(null, hocSinhToSave.getId(), "ID should be null before saving for create operation");
    }

    @Test
    void getAllHocSinh_shouldReturnPageOfHocSinhDto() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<HocSinh> page = new PageImpl<>(Collections.singletonList(hocSinh), pageable, 1);

        when(hocSinhRepository.findAll(pageable)).thenReturn(page);
        when(hocSinhMapper.hocSinhToHocSinhDto(any(HocSinh.class))).thenReturn(hocSinhDto);

        Page<HocSinhDto> result = hocSinhService.getAllHocSinh(pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(hocSinhDto.getHoTen(), result.getContent().get(0).getHoTen());
        verify(hocSinhRepository, times(1)).findAll(pageable);
    }

    @Test
    void getHocSinhById_whenHocSinhExists_shouldReturnHocSinhDto() {
        when(hocSinhRepository.findById(1L)).thenReturn(Optional.of(hocSinh));
        when(hocSinhMapper.hocSinhToHocSinhDto(any(HocSinh.class))).thenReturn(hocSinhDto);

        HocSinhDto result = hocSinhService.getHocSinhById(1L);

        assertNotNull(result);
        assertEquals(hocSinhDto.getId(), result.getId());
        verify(hocSinhRepository, times(1)).findById(1L);
    }

    @Test
    void getHocSinhById_whenHocSinhNotExists_shouldThrowResourceNotFoundException() {
        when(hocSinhRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> hocSinhService.getHocSinhById(1L));
        verify(hocSinhRepository, times(1)).findById(1L);
    }

    @Test
    void updateHocSinh_whenHocSinhExists_shouldUpdateAndReturnHocSinhDto() {
        HocSinhDto updatedInfo = new HocSinhDto(
            "1", "Tran Thi B", "HS002", "2011-06-20",
            GioiTinh.NU, "6B", "TRUONG002", "103",
            List.of("104"), "201", "new_avatar.png", "Updated Ghi chu"
        );

        HocSinh existingHocSinhSpy = spy(hocSinh); // Use a spy to verify setters are called

        when(hocSinhRepository.findById(1L)).thenReturn(Optional.of(existingHocSinhSpy));

        // Mock behavior of mapper instance methods if they are called via INSTANCE
        // These are default methods on the interface, so they are part of the instance
        when(hocSinhMapper.stringToLocalDate(updatedInfo.getNgaySinh())).thenReturn(LocalDate.parse(updatedInfo.getNgaySinh()));
        when(hocSinhMapper.stringListToLongList(updatedInfo.getCacNguoiGiamHoKhacIds())).thenReturn(updatedInfo.getCacNguoiGiamHoKhacIds().stream().map(Long::parseLong).collect(Collectors.toList()));
        // idNguoiGiamHoChinh and idHoSoSucKhoe use NguoiDungMapper's static methods, which are not mocked here directly but assumed to work.
        // If NguoiDungMapper was injected into HocSinhMapper, that would be different.

        when(hocSinhRepository.save(any(HocSinh.class))).thenReturn(existingHocSinhSpy);
        when(hocSinhMapper.hocSinhToHocSinhDto(any(HocSinh.class))).thenReturn(updatedInfo);


        HocSinhDto result = hocSinhService.updateHocSinh(1L, updatedInfo);

        assertNotNull(result);
        assertEquals(updatedInfo.getHoTen(), result.getHoTen());
        verify(hocSinhRepository, times(1)).findById(1L);
        verify(hocSinhRepository, times(1)).save(existingHocSinhSpy);

        // Verify fields were set on the 'existingHocSinhSpy' entity before save
        verify(existingHocSinhSpy).setHoTen(updatedInfo.getHoTen());
        verify(existingHocSinhSpy).setNgaySinh(LocalDate.parse(updatedInfo.getNgaySinh()));
        // NguoiDungMapper.stringIdToLongId is static, so we can't verify interaction on a mock of NguoiDungMapper here without more setup.
        // We trust the direct calls to NguoiDungMapper.stringIdToLongId() work as they are static.
    }


    @Test
    void updateHocSinh_whenHocSinhNotExists_shouldThrowResourceNotFoundException() {
        when(hocSinhRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> hocSinhService.updateHocSinh(1L, hocSinhDto));
        verify(hocSinhRepository, times(1)).findById(1L);
        verify(hocSinhRepository, never()).save(any(HocSinh.class));
    }

    @Test
    void deleteHocSinh_whenHocSinhExists_shouldDeleteHocSinh() {
        when(hocSinhRepository.existsById(1L)).thenReturn(true);
        doNothing().when(hocSinhRepository).deleteById(1L);

        hocSinhService.deleteHocSinh(1L);

        verify(hocSinhRepository, times(1)).existsById(1L);
        verify(hocSinhRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteHocSinh_whenHocSinhNotExists_shouldThrowResourceNotFoundException() {
        when(hocSinhRepository.existsById(1L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> hocSinhService.deleteHocSinh(1L));
        verify(hocSinhRepository, times(1)).existsById(1L);
        verify(hocSinhRepository, never()).deleteById(1L);
    }
}
