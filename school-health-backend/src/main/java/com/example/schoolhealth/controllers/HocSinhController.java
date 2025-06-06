package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.HocSinhDto;
import com.example.schoolhealth.services.HocSinhService;
import com.example.schoolhealth.mappers.NguoiDungMapper; // For ID conversion
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/students") // Changed from /hocsinhs to /students for more standard REST naming
public class HocSinhController {

    private final HocSinhService hocSinhService;

    @Autowired
    public HocSinhController(HocSinhService hocSinhService) {
        this.hocSinhService = hocSinhService;
    }

    @PostMapping
    public ResponseEntity<HocSinhDto> createHocSinh(@Valid @RequestBody HocSinhDto hocSinhDto) {
        HocSinhDto createdHocSinh = hocSinhService.createHocSinh(hocSinhDto);
        return new ResponseEntity<>(createdHocSinh, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<HocSinhDto>> getAllHocSinh(
            @PageableDefault(size = 10, sort = "hoTen") Pageable pageable) {
        Page<HocSinhDto> hocSinhPage = hocSinhService.getAllHocSinh(pageable);
        return ResponseEntity.ok(hocSinhPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HocSinhDto> getHocSinhById(@PathVariable String id) {
        Long hocSinhId = NguoiDungMapper.stringIdToLongId(id); // Use NguoiDungMapper for consistent ID conversion
        HocSinhDto hocSinhDto = hocSinhService.getHocSinhById(hocSinhId);
        return ResponseEntity.ok(hocSinhDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HocSinhDto> updateHocSinh(@PathVariable String id, @Valid @RequestBody HocSinhDto hocSinhDto) {
        Long hocSinhId = NguoiDungMapper.stringIdToLongId(id);
        HocSinhDto updatedHocSinh = hocSinhService.updateHocSinh(hocSinhId, hocSinhDto);
        return ResponseEntity.ok(updatedHocSinh);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHocSinh(@PathVariable String id) {
        Long hocSinhId = NguoiDungMapper.stringIdToLongId(id);
        hocSinhService.deleteHocSinh(hocSinhId);
        return ResponseEntity.noContent().build();
    }
}
