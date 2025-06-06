package com.example.schoolhealth.services;

import com.example.schoolhealth.dtos.LichSuChoUongThuocDto;
import com.example.schoolhealth.dtos.YeuCauGuiThuocDto;
import com.example.schoolhealth.exceptions.BadRequestException;
import com.example.schoolhealth.exceptions.ResourceNotFoundException;
import com.example.schoolhealth.mappers.LichSuChoUongThuocMapper;
import com.example.schoolhealth.mappers.NguoiDungMapper;
import com.example.schoolhealth.mappers.YeuCauGuiThuocMapper;
import com.example.schoolhealth.models.*;
import com.example.schoolhealth.repositories.HocSinhRepository;
import com.example.schoolhealth.repositories.NguoiDungRepository;
import com.example.schoolhealth.repositories.YeuCauGuiThuocRepository;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class YeuCauGuiThuocServiceImplTest {

    @Mock
    private YeuCauGuiThuocRepository yeuCauGuiThuocRepository;
    @Mock
    private HocSinhRepository hocSinhRepository;
    @Mock
    private NguoiDungRepository nguoiDungRepository;
    @Mock
    private YeuCauGuiThuocMapper yeuCauGuiThuocMapper;
    @Mock
    private LichSuChoUongThuocMapper lichSuChoUongThuocMapper;

    @InjectMocks
    private YeuCauGuiThuocServiceImpl yeuCauGuiThuocService;

    private YeuCauGuiThuoc yeuCauEntity;
    private YeuCauGuiThuocDto yeuCauDto;
    private LichSuChoUongThuocDto lichSuDto;
    private LichSuChoUongThuoc lichSuEntity;

    @BeforeEach
    void setUp() {
        lichSuDto = new LichSuChoUongThuocDto("1", "1", LocalDateTime.now().plusHours(1).toString(), null, "10", "Ghi chu LS", TrangThaiLichSuUongThuoc.CHUA_DEN_GIO);
        yeuCauDto = new YeuCauGuiThuocDto(
                "1", "100", "200", "Thuoc A", "10mg", "vien", 1.0, "vien", "uong",
                "Ngay 1 lan", List.of(LocalDateTime.now().plusHours(1).toString()), List.of(lichSuDto),
                null, "Ghi chu PH", "0909090909", TrangThaiYeuCauThuoc.MOI_TAO,
                null, null, LocalDateTime.now().toString(), LocalDateTime.now().toString()
        );

        lichSuEntity = new LichSuChoUongThuoc(1L, LocalDateTime.now().plusHours(1), null, 10L, "Ghi chu LS", TrangThaiLichSuUongThuoc.CHUA_DEN_GIO, null);
        yeuCauEntity = new YeuCauGuiThuoc(
            1L, 100L, 200L, "Thuoc A", "10mg", "vien", 1.0, "vien", "uong", "Ngay 1 lan",
            List.of(LocalDateTime.now().plusHours(1)), new ArrayList<>(),
            null, "Ghi chu PH", "0909090909", TrangThaiYeuCauThuoc.MOI_TAO,
            null, null, LocalDateTime.now(), LocalDateTime.now()
        );
        lichSuEntity.setYeuCauGuiThuoc(yeuCauEntity);
        yeuCauEntity.setLichSuUongThuoc(List.of(lichSuEntity));
    }

    @Test
    void createYeuCauGuiThuoc_success_autoGeneratesLichSu() {
        YeuCauGuiThuocDto inputDto = new YeuCauGuiThuocDto(
                null, "100", "200", "Thuoc B", "5mg", "goi", 1.0, "goi", "uong", // Use numeric strings for IDs
                "Ngay 2 lan", List.of(LocalDateTime.now().plusHours(2).toString(), LocalDateTime.now().plusHours(8).toString()),
                null,
                null, "Ghi chu PH 2", "0808080808", TrangThaiYeuCauThuoc.MOI_TAO,
                null, null, null, null
        );
        YeuCauGuiThuoc mappedEntityNoId = new YeuCauGuiThuoc();
        mappedEntityNoId.setIdHocSinh(100L);
        mappedEntityNoId.setIdPhuHuynhGui(200L);
        // Simulate the list of LocalDateTime being mapped by YeuCauGuiThuocMapper
        mappedEntityNoId.setThoiGianKeHoachUong(
            inputDto.getThoiGianKeHoachUong().stream()
                .map(s -> NguoiDungMapper.stringToLocalDateTime(s)) // Assuming NguoiDungMapper has this static method
                .collect(Collectors.toList())
        );
        mappedEntityNoId.setTrangThai(inputDto.getTrangThai());


        YeuCauGuiThuoc savedEntityWithId = new YeuCauGuiThuoc();
        savedEntityWithId.setId(2L);
        // Simulate what the service would set if LichSuUongThuoc was null in DTO
         List<LichSuChoUongThuoc> generatedLichSuInternal = new ArrayList<>();
            if (mappedEntityNoId.getThoiGianKeHoachUong() != null) {
                for (java.time.LocalDateTime keHoach : mappedEntityNoId.getThoiGianKeHoachUong()) {
                    LichSuChoUongThuoc ls = new LichSuChoUongThuoc();
                    ls.setThoiGianKeHoach(keHoach);
                    ls.setTrangThai(com.example.schoolhealth.models.TrangThaiLichSuUongThuoc.CHUA_DEN_GIO);
                    ls.setYeuCauGuiThuoc(mappedEntityNoId); // Set back reference to the entity being saved
                    generatedLichSuInternal.add(ls);
                }
            }
        savedEntityWithId.setLichSuUongThuoc(generatedLichSuInternal);


        when(hocSinhRepository.existsById(100L)).thenReturn(true);
        when(nguoiDungRepository.existsById(200L)).thenReturn(true);
        when(yeuCauGuiThuocMapper.yeuCauGuiThuocDtoToYeuCauGuiThuoc(any(YeuCauGuiThuocDto.class))).thenReturn(mappedEntityNoId);
        when(yeuCauGuiThuocRepository.save(any(YeuCauGuiThuoc.class))).thenReturn(savedEntityWithId);

        // For the return DTO, make sure its lichSuUongThuoc reflects the generated ones
        YeuCauGuiThuocDto returnDto = new YeuCauGuiThuocDto(); // Simplified for this test
        returnDto.setId("2");
        returnDto.setLichSuUongThuoc(
            savedEntityWithId.getLichSuUongThuoc().stream()
            .map(lichSu -> new LichSuChoUongThuocDto(null, "2", lichSu.getThoiGianKeHoach().toString(), null, null, null, lichSu.getTrangThai()))
            .collect(Collectors.toList())
        );

        when(yeuCauGuiThuocMapper.yeuCauGuiThuocToYeuCauGuiThuocDto(any(YeuCauGuiThuoc.class))).thenReturn(returnDto);

        ArgumentCaptor<YeuCauGuiThuoc> captor = ArgumentCaptor.forClass(YeuCauGuiThuoc.class);

        YeuCauGuiThuocDto result = yeuCauGuiThuocService.createYeuCauGuiThuoc(inputDto);

        assertNotNull(result);
        verify(yeuCauGuiThuocRepository).save(captor.capture());
        YeuCauGuiThuoc capturedYeuCau = captor.getValue();
        assertNull(capturedYeuCau.getId());
        assertNotNull(capturedYeuCau.getLichSuUongThuoc());
        assertEquals(2, capturedYeuCau.getLichSuUongThuoc().size());
        assertEquals(TrangThaiLichSuUongThuoc.CHUA_DEN_GIO, capturedYeuCau.getLichSuUongThuoc().get(0).getTrangThai());
    }

    @Test
    void createYeuCauGuiThuoc_hocSinhNotFound_throwsBadRequest() {
        when(hocSinhRepository.existsById(NguoiDungMapper.stringIdToLongId(yeuCauDto.getIdHocSinh()))).thenReturn(false);
        assertThrows(BadRequestException.class, () -> yeuCauGuiThuocService.createYeuCauGuiThuoc(yeuCauDto));
    }

    @Test
    void createYeuCauGuiThuoc_phuHuynhNotFound_throwsBadRequest() {
        when(hocSinhRepository.existsById(NguoiDungMapper.stringIdToLongId(yeuCauDto.getIdHocSinh()))).thenReturn(true);
        when(nguoiDungRepository.existsById(NguoiDungMapper.stringIdToLongId(yeuCauDto.getIdPhuHuynhGui()))).thenReturn(false);
        assertThrows(BadRequestException.class, () -> yeuCauGuiThuocService.createYeuCauGuiThuoc(yeuCauDto));
    }


    @Test
    void getYeuCauGuiThuocById_exists_returnsDto() {
        when(yeuCauGuiThuocRepository.findById(1L)).thenReturn(Optional.of(yeuCauEntity));
        when(yeuCauGuiThuocMapper.yeuCauGuiThuocToYeuCauGuiThuocDto(yeuCauEntity)).thenReturn(yeuCauDto);
        YeuCauGuiThuocDto result = yeuCauGuiThuocService.getYeuCauGuiThuocById(1L);
        assertNotNull(result);
        assertEquals(yeuCauDto.getId(), result.getId());
    }

    @Test
    void updateTrangThaiYeuCau_success() {
        when(yeuCauGuiThuocRepository.findById(1L)).thenReturn(Optional.of(yeuCauEntity));
        when(nguoiDungRepository.existsById(anyLong())).thenReturn(true);
        when(yeuCauGuiThuocRepository.save(any(YeuCauGuiThuoc.class))).thenReturn(yeuCauEntity);
        when(yeuCauGuiThuocMapper.yeuCauGuiThuocToYeuCauGuiThuocDto(yeuCauEntity)).thenReturn(yeuCauDto);

        YeuCauGuiThuocDto result = yeuCauGuiThuocService.updateTrangThaiYeuCau(1L, "DA_XAC_NHAN_TRUONG", null, 300L);

        assertNotNull(result);
        verify(yeuCauGuiThuocRepository).save(yeuCauEntity);
        assertEquals(TrangThaiYeuCauThuoc.DA_XAC_NHAN_TRUONG, yeuCauEntity.getTrangThai());
        assertEquals(300L, yeuCauEntity.getIdYTaXuLy());
    }

    @Test
    void updateTrangThaiYeuCau_invalidStatus_throwsBadRequest() {
        when(yeuCauGuiThuocRepository.findById(1L)).thenReturn(Optional.of(yeuCauEntity));
        assertThrows(BadRequestException.class, () -> yeuCauGuiThuocService.updateTrangThaiYeuCau(1L, "INVALID_STATUS", null, null));
    }
}
