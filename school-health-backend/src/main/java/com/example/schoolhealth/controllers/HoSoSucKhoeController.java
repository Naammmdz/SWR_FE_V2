package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.HoSoSucKhoeDto;
import com.example.schoolhealth.services.HoSoSucKhoeService;
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
@RequestMapping("/api/v1/health-records")
public class HoSoSucKhoeController {

    private final HoSoSucKhoeService hoSoSucKhoeService;

    @Autowired
    public HoSoSucKhoeController(HoSoSucKhoeService hoSoSucKhoeService) {
        this.hoSoSucKhoeService = hoSoSucKhoeService;
    }

    @PostMapping
    public ResponseEntity<HoSoSucKhoeDto> createHoSoSucKhoe(@Valid @RequestBody HoSoSucKhoeDto hoSoSucKhoeDto) {
        HoSoSucKhoeDto createdHoSo = hoSoSucKhoeService.createHoSoSucKhoe(hoSoSucKhoeDto);
        return new ResponseEntity<>(createdHoSo, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HoSoSucKhoeDto> getHoSoSucKhoeById(@PathVariable String id) {
        Long recordId = NguoiDungMapper.stringIdToLongId(id);
        HoSoSucKhoeDto hoSoSucKhoeDto = hoSoSucKhoeService.getHoSoSucKhoeById(recordId);
        return ResponseEntity.ok(hoSoSucKhoeDto);
    }

    @GetMapping("/student/{studentId}") // Endpoint to get health record by student ID
    public ResponseEntity<HoSoSucKhoeDto> getHoSoSucKhoeByStudentId(@PathVariable String studentId) {
        Long hocSinhId = NguoiDungMapper.stringIdToLongId(studentId);
        HoSoSucKhoeDto hoSoSucKhoeDto = hoSoSucKhoeService.getHoSoSucKhoeByHocSinhId(hocSinhId);
        return ResponseEntity.ok(hoSoSucKhoeDto);
    }

    @GetMapping
    public ResponseEntity<Page<HoSoSucKhoeDto>> getAllHoSoSucKhoe(
            @PageableDefault(size = 10, sort = "ngayCapNhatCuoi") Pageable pageable) {
        Page<HoSoSucKhoeDto> page = hoSoSucKhoeService.getAllHoSoSucKhoe(pageable);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HoSoSucKhoeDto> updateHoSoSucKhoe(@PathVariable String id, @Valid @RequestBody HoSoSucKhoeDto hoSoSucKhoeDto) {
        Long recordId = NguoiDungMapper.stringIdToLongId(id);
        // It might be good to ensure hoSoSucKhoeDto.getId() is consistent with path variable 'id' if it's part of DTO,
        // or that hoSoSucKhoeDto.getIdHocSinh() is not being changed if it's immutable post-creation.
        // For now, the service handles the update logic based on the 'id' path variable.
        HoSoSucKhoeDto updatedHoSo = hoSoSucKhoeService.updateHoSoSucKhoe(recordId, hoSoSucKhoeDto);
        return ResponseEntity.ok(updatedHoSo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHoSoSucKhoe(@PathVariable String id) {
        Long recordId = NguoiDungMapper.stringIdToLongId(id);
        hoSoSucKhoeService.deleteHoSoSucKhoe(recordId);
        return ResponseEntity.noContent().build();
    }
}
