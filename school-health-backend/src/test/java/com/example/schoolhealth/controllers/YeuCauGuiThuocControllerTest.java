package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.YeuCauGuiThuocDto;
import com.example.schoolhealth.models.TrangThaiYeuCauThuoc;
import com.example.schoolhealth.services.YeuCauGuiThuocService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(YeuCauGuiThuocController.class)
@Import(SecurityConfig.class)
class YeuCauGuiThuocControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private YeuCauGuiThuocService yeuCauGuiThuocService;
    @Autowired
    private ObjectMapper objectMapper;

    private YeuCauGuiThuocDto yeuCauDto;

    @BeforeEach
    void setUp() {
        yeuCauDto = new YeuCauGuiThuocDto(
            "1", "100", "200", "Thuoc A", "10mg", "vien", 1.0, "vien", "uong", // Numeric string IDs
            "Ngay 1 lan", List.of(LocalDateTime.now().plusHours(1).toString()), Collections.emptyList(),
            null, "Ghi chu PH", "0909090909", TrangThaiYeuCauThuoc.MOI_TAO,
            null, null, LocalDateTime.now().toString(), LocalDateTime.now().toString()
        );
    }

    @Test
    void createYeuCauGuiThuoc_returnsCreated() throws Exception {
        when(yeuCauGuiThuocService.createYeuCauGuiThuoc(any(YeuCauGuiThuocDto.class))).thenReturn(yeuCauDto);
        mockMvc.perform(post("/api/v1/medication-requests")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(yeuCauDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(yeuCauDto.getId())); // DTO ID is already "1"
    }

    @Test
    void getYeuCauGuiThuocById_returnsOk() throws Exception {
        when(yeuCauGuiThuocService.getYeuCauGuiThuocById(eq(1L))).thenReturn(yeuCauDto);
        mockMvc.perform(get("/api/v1/medication-requests/1")) // Use numeric string in path
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"));
    }

    @Test
    void updateTrangThaiYeuCau_returnsOk() throws Exception {
        Map<String, String> payload = new HashMap<>();
        payload.put("trangThai", "DA_XAC_NHAN_TRUONG");
        payload.put("idYTaXuLy", "300"); // Numeric string for ID

        YeuCauGuiThuocDto updatedDto = new YeuCauGuiThuocDto();
        updatedDto.setId(yeuCauDto.getId()); // id is "1"
        updatedDto.setTrangThai(TrangThaiYeuCauThuoc.DA_XAC_NHAN_TRUONG);
        updatedDto.setIdYTaXuLy("300");


        when(yeuCauGuiThuocService.updateTrangThaiYeuCau(eq(1L), eq("DA_XAC_NHAN_TRUONG"), any(), eq(300L))).thenReturn(updatedDto);

        mockMvc.perform(patch("/api/v1/medication-requests/1/status") // Use numeric string in path
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.trangThai").value("DA_XAC_NHAN_TRUONG"));
    }
}
