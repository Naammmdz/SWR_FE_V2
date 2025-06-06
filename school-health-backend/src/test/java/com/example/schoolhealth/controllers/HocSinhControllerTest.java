package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.HocSinhDto;
import com.example.schoolhealth.models.GioiTinh;
import com.example.schoolhealth.services.HocSinhService;
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

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HocSinhController.class)
@Import(SecurityConfig.class) // Import SecurityConfig to satisfy dependency for Spring Security components
class HocSinhControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HocSinhService hocSinhService;

    @Autowired
    private ObjectMapper objectMapper;

    private HocSinhDto hocSinhDto;

    @BeforeEach
    void setUp() {
        hocSinhDto = new HocSinhDto(
                "1", "Nguyen Van A", "HS001", "2010-05-15",
                GioiTinh.NAM, "5A", "TRUONG001", "100",
                List.of("101", "102"), "200", "avatar.png", "Ghi chu hoc sinh"
        );
    }

    @Test
    void createHocSinh_shouldReturnCreated() throws Exception {
        when(hocSinhService.createHocSinh(any(HocSinhDto.class))).thenReturn(hocSinhDto);

        mockMvc.perform(post("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(hocSinhDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.hoTen").value(hocSinhDto.getHoTen()));
    }

    @Test
    void getAllHocSinh_shouldReturnPageOfHocSinh() throws Exception {
        Page<HocSinhDto> page = new PageImpl<>(Collections.singletonList(hocSinhDto), PageRequest.of(0, 10), 1);
        when(hocSinhService.getAllHocSinh(any(PageRequest.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/students?page=0&size=10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].hoTen").value(hocSinhDto.getHoTen()));
    }

    @Test
    void getHocSinhById_shouldReturnHocSinhDto() throws Exception {
        // NguoiDungMapper.stringIdToLongId("1") will be called in controller, service expects Long
        when(hocSinhService.getHocSinhById(eq(1L))).thenReturn(hocSinhDto);

        mockMvc.perform(get("/api/v1/students/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"));
    }

    @Test
    void updateHocSinh_shouldReturnUpdatedHocSinhDto() throws Exception {
        HocSinhDto updatedDto = new HocSinhDto(
            "1", "Tran Thi B", "HS002", "2011-06-20",
            GioiTinh.NU, "6B", "TRUONG002", "103",
            List.of("104"), "201", "new_avatar.png", "Updated Ghi chu"
        );
        when(hocSinhService.updateHocSinh(eq(1L), any(HocSinhDto.class))).thenReturn(updatedDto);

        mockMvc.perform(put("/api/v1/students/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.hoTen").value(updatedDto.getHoTen()));
    }

    @Test
    void deleteHocSinh_shouldReturnNoContent() throws Exception {
        doNothing().when(hocSinhService).deleteHocSinh(eq(1L));

        mockMvc.perform(delete("/api/v1/students/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}
