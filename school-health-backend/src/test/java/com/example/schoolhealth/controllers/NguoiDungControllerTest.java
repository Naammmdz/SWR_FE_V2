package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.NguoiDungDto;
import com.example.schoolhealth.dtos.ThongTinCaNhanDto;
import com.example.schoolhealth.models.VaiTroNguoiDung;
import com.example.schoolhealth.models.TrangThaiNguoiDung;
import com.example.schoolhealth.services.NguoiDungService;
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
import com.example.schoolhealth.config.SecurityConfig; // Import SecurityConfig
import com.example.schoolhealth.mappers.NguoiDungMapper; // Needed for ID conversion

import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(NguoiDungController.class)
@Import(SecurityConfig.class) // Import SecurityConfig to satisfy dependency
class NguoiDungControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NguoiDungService nguoiDungService;

    // NguoiDungMapper is used for static ID conversion in controller, so it doesn't need to be a mock bean
    // unless we want to test its interaction specifically within the controller scope.
    // For this setup, static access is fine.

    @Autowired
    private ObjectMapper objectMapper;

    private NguoiDungDto nguoiDungDto;
    private ThongTinCaNhanDto thongTinCaNhanDto;

    @BeforeEach
    void setUp() {
        thongTinCaNhanDto = new ThongTinCaNhanDto("Test User", "test@example.com", "123456789", "123 Test St");
        nguoiDungDto = new NguoiDungDto("1", "testuser", "password", VaiTroNguoiDung.Y_TA, thongTinCaNhanDto, "school1", LocalDateTime.now().toString(), TrangThaiNguoiDung.HOAT_DONG);
    }

    @Test
    void createNguoiDung_shouldReturnCreated() throws Exception {
        when(nguoiDungService.createNguoiDung(any(NguoiDungDto.class))).thenReturn(nguoiDungDto);

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(nguoiDungDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.tenDangNhap").value("testuser"));
    }

    @Test
    void getAllNguoiDung_shouldReturnPageOfNguoiDung() throws Exception {
        Page<NguoiDungDto> page = new PageImpl<>(Collections.singletonList(nguoiDungDto), PageRequest.of(0, 10), 1);
        when(nguoiDungService.getAllNguoiDung(any(PageRequest.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/users?page=0&size=10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].tenDangNhap").value("testuser"));
    }

    @Test
    void getNguoiDungById_shouldReturnNguoiDungDto() throws Exception {
        when(nguoiDungService.getNguoiDungById(eq(1L))).thenReturn(nguoiDungDto);

        mockMvc.perform(get("/api/v1/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"));
    }

    @Test
    void updateNguoiDung_shouldReturnUpdatedNguoiDungDto() throws Exception {
        NguoiDungDto updatedDto = new NguoiDungDto("1", "updateduser", "newpassword", VaiTroNguoiDung.ADMIN, thongTinCaNhanDto, "school2", LocalDateTime.now().toString(), TrangThaiNguoiDung.KHOA);
        when(nguoiDungService.updateNguoiDung(eq(1L), any(NguoiDungDto.class))).thenReturn(updatedDto);

        mockMvc.perform(put("/api/v1/users/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tenDangNhap").value("updateduser"));
    }

    @Test
    void deleteNguoiDung_shouldReturnNoContent() throws Exception {
        doNothing().when(nguoiDungService).deleteNguoiDung(eq(1L));

        mockMvc.perform(delete("/api/v1/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}
