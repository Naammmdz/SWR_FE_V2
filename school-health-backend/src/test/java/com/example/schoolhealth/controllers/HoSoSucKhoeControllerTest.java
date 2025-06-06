package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.HoSoSucKhoeDto;
import com.example.schoolhealth.dtos.ChiTietLucDto;
import com.example.schoolhealth.dtos.ThongTinTiemChungDto;
import com.example.schoolhealth.models.NhomMau;
import com.example.schoolhealth.services.HoSoSucKhoeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.example.schoolhealth.config.SecurityConfig;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HoSoSucKhoeController.class)
@Import(SecurityConfig.class)
class HoSoSucKhoeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HoSoSucKhoeService hoSoSucKhoeService;

    @Autowired
    private ObjectMapper objectMapper;

    private HoSoSucKhoeDto hoSoSucKhoeDto;

    @BeforeEach
    void setUp() {
        ChiTietLucDto thiLuc = new ChiTietLucDto("10/10", "10/10", "2023-01-01", "Good");
        ThongTinTiemChungDto tiemChung = new ThongTinTiemChungDto("1", "Vaccine A", "2023-02-01", "1ml", "None");
        hoSoSucKhoeDto = new HoSoSucKhoeDto(
            "1", "100", NhomMau.O_PLUS, List.of("Pollen"), List.of("Asthma"),
            "None", thiLuc, thiLuc, List.of(tiemChung), // Using thiLuc for thinhLuc for simplicity in test setup
            "N/A", LocalDateTime.now().toString(), "200"
        );
    }

    @Test
    void createHoSoSucKhoe_validInput_returnsCreated() throws Exception {
        when(hoSoSucKhoeService.createHoSoSucKhoe(any(HoSoSucKhoeDto.class))).thenReturn(hoSoSucKhoeDto);

        mockMvc.perform(post("/api/v1/health-records")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(hoSoSucKhoeDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.idHocSinh").value(hoSoSucKhoeDto.getIdHocSinh()));
    }

    @Test
    void getHoSoSucKhoeById_exists_returnsOk() throws Exception {
        // NguoiDungMapper.stringIdToLongId("1") will be called in controller -> 1L
        when(hoSoSucKhoeService.getHoSoSucKhoeById(eq(1L))).thenReturn(hoSoSucKhoeDto);

        mockMvc.perform(get("/api/v1/health-records/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"));
    }

    @Test
    void getHoSoSucKhoeByStudentId_exists_returnsOk() throws Exception {
        // NguoiDungMapper.stringIdToLongId("100") is called in controller -> 100L
        when(hoSoSucKhoeService.getHoSoSucKhoeByHocSinhId(eq(100L))).thenReturn(hoSoSucKhoeDto);

        mockMvc.perform(get("/api/v1/health-records/student/100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.idHocSinh").value("100"));
    }

    @Test
    void getAllHoSoSucKhoe_returnsPage() throws Exception {
        Page<HoSoSucKhoeDto> page = new PageImpl<>(Collections.singletonList(hoSoSucKhoeDto), PageRequest.of(0,10),1);
        when(hoSoSucKhoeService.getAllHoSoSucKhoe(any(PageRequest.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/health-records?page=0&size=10"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content[0].id").value("1"));
    }

    @Test
    void updateHoSoSucKhoe_validInput_returnsOk() throws Exception {
        when(hoSoSucKhoeService.updateHoSoSucKhoe(eq(1L), any(HoSoSucKhoeDto.class))).thenReturn(hoSoSucKhoeDto);

        mockMvc.perform(put("/api/v1/health-records/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(hoSoSucKhoeDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"));
    }

    @Test
    void deleteHoSoSucKhoe_exists_returnsNoContent() throws Exception {
        doNothing().when(hoSoSucKhoeService).deleteHoSoSucKhoe(eq(1L));

        mockMvc.perform(delete("/api/v1/health-records/1"))
                .andExpect(status().isNoContent());
    }
}
