package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.YeuCauGuiThuocDto;
import com.example.schoolhealth.services.YeuCauGuiThuocService;
import com.example.schoolhealth.mappers.NguoiDungMapper; // For ID conversion
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/medication-requests") // RESTful endpoint name
public class YeuCauGuiThuocController {

    private final YeuCauGuiThuocService yeuCauGuiThuocService;

    @Autowired
    public YeuCauGuiThuocController(YeuCauGuiThuocService yeuCauGuiThuocService) {
        this.yeuCauGuiThuocService = yeuCauGuiThuocService;
    }

    @PostMapping
    public ResponseEntity<YeuCauGuiThuocDto> createYeuCauGuiThuoc(@Valid @RequestBody YeuCauGuiThuocDto yeuCauGuiThuocDto) {
        YeuCauGuiThuocDto createdYeuCau = yeuCauGuiThuocService.createYeuCauGuiThuoc(yeuCauGuiThuocDto);
        return new ResponseEntity<>(createdYeuCau, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<YeuCauGuiThuocDto>> getAllYeuCauGuiThuoc(
            @PageableDefault(size = 10, sort = "ngayTao") Pageable pageable) {
        Page<YeuCauGuiThuocDto> page = yeuCauGuiThuocService.getAllYeuCauGuiThuoc(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<YeuCauGuiThuocDto> getYeuCauGuiThuocById(@PathVariable String id) {
        Long requestId = NguoiDungMapper.stringIdToLongId(id);
        YeuCauGuiThuocDto dto = yeuCauGuiThuocService.getYeuCauGuiThuocById(requestId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<Page<YeuCauGuiThuocDto>> getYeuCauGuiThuocByStudentId(
            @PathVariable String studentId,
            @PageableDefault(size = 10, sort = "ngayTao") Pageable pageable) {
        Long hocSinhId = NguoiDungMapper.stringIdToLongId(studentId);
        Page<YeuCauGuiThuocDto> page = yeuCauGuiThuocService.getYeuCauGuiThuocByHocSinhId(hocSinhId, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<Page<YeuCauGuiThuocDto>> getYeuCauGuiThuocByParentId(
            @PathVariable String parentId,
            @PageableDefault(size = 10, sort = "ngayTao") Pageable pageable) {
        Long phuHuynhId = NguoiDungMapper.stringIdToLongId(parentId);
        Page<YeuCauGuiThuocDto> page = yeuCauGuiThuocService.getYeuCauGuiThuocByPhuHuynhId(phuHuynhId, pageable);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    public ResponseEntity<YeuCauGuiThuocDto> updateYeuCauGuiThuoc(@PathVariable String id, @Valid @RequestBody YeuCauGuiThuocDto yeuCauGuiThuocDto) {
        Long requestId = NguoiDungMapper.stringIdToLongId(id);
        YeuCauGuiThuocDto updatedYeuCau = yeuCauGuiThuocService.updateYeuCauGuiThuoc(requestId, yeuCauGuiThuocDto);
        return ResponseEntity.ok(updatedYeuCau);
    }

    @PatchMapping("/{id}/status") // Using PATCH for partial update (status change)
    public ResponseEntity<YeuCauGuiThuocDto> updateTrangThaiYeuCau(
            @PathVariable String id,
            @RequestBody Map<String, String> payload) {
        Long requestId = NguoiDungMapper.stringIdToLongId(id);
        String trangThai = payload.get("trangThai");
        String lyDo = payload.get("lyDo");
        String idYTaXuLyStr = payload.get("idYTaXuLy");
        Long idYTaXuLy = (idYTaXuLyStr != null) ? NguoiDungMapper.stringIdToLongId(idYTaXuLyStr) : null;

        YeuCauGuiThuocDto updatedYeuCau = yeuCauGuiThuocService.updateTrangThaiYeuCau(requestId, trangThai, lyDo, idYTaXuLy);
        return ResponseEntity.ok(updatedYeuCau);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteYeuCauGuiThuoc(@PathVariable String id) {
        Long requestId = NguoiDungMapper.stringIdToLongId(id);
        yeuCauGuiThuocService.deleteYeuCauGuiThuoc(requestId);
        return ResponseEntity.noContent().build();
    }
}
