package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.SuKienYTeDto;
import com.example.schoolhealth.services.SuKienYTeService;
import com.example.schoolhealth.mappers.NguoiDungMapper; // For ID conversion
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort; // Added import for Sort
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/medical-incidents") // RESTful endpoint name
public class SuKienYTeController {

    private final SuKienYTeService suKienYTeService;

    @Autowired
    public SuKienYTeController(SuKienYTeService suKienYTeService) {
        this.suKienYTeService = suKienYTeService;
    }

    @PostMapping
    public ResponseEntity<SuKienYTeDto> createSuKienYTe(@Valid @RequestBody SuKienYTeDto suKienYTeDto) {
        SuKienYTeDto createdSuKien = suKienYTeService.createSuKienYTe(suKienYTeDto);
        return new ResponseEntity<>(createdSuKien, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<SuKienYTeDto>> getAllSuKienYTe(
            @PageableDefault(size = 10, sort = "thoiGianXayRa", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<SuKienYTeDto> page = suKienYTeService.getAllSuKienYTe(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuKienYTeDto> getSuKienYTeById(@PathVariable String id) {
        Long incidentId = NguoiDungMapper.stringIdToLongId(id);
        SuKienYTeDto dto = suKienYTeService.getSuKienYTeById(incidentId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<Page<SuKienYTeDto>> getSuKienYTeByStudentId(
            @PathVariable String studentId,
            @PageableDefault(size = 10, sort = "thoiGianXayRa", direction = Sort.Direction.DESC) Pageable pageable) {
        Long hocSinhId = NguoiDungMapper.stringIdToLongId(studentId);
        Page<SuKienYTeDto> page = suKienYTeService.getSuKienYTeByHocSinhId(hocSinhId, pageable);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuKienYTeDto> updateSuKienYTe(@PathVariable String id, @Valid @RequestBody SuKienYTeDto suKienYTeDto) {
        Long incidentId = NguoiDungMapper.stringIdToLongId(id);
        SuKienYTeDto updatedSuKien = suKienYTeService.updateSuKienYTe(incidentId, suKienYTeDto);
        return ResponseEntity.ok(updatedSuKien);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSuKienYTe(@PathVariable String id) {
        Long incidentId = NguoiDungMapper.stringIdToLongId(id);
        suKienYTeService.deleteSuKienYTe(incidentId);
        return ResponseEntity.noContent().build();
    }
}
