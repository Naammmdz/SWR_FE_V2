package com.example.schoolhealth.controllers;

import com.example.schoolhealth.dtos.NguoiDungDto;
import com.example.schoolhealth.services.NguoiDungService;
import com.example.schoolhealth.mappers.NguoiDungMapper; // For ID conversion if needed, or handle in service
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class NguoiDungController {

    private final NguoiDungService nguoiDungService;

    @Autowired
    public NguoiDungController(NguoiDungService nguoiDungService) {
        this.nguoiDungService = nguoiDungService;
    }

    @PostMapping
    public ResponseEntity<NguoiDungDto> createNguoiDung(@Valid @RequestBody NguoiDungDto nguoiDungDto) {
        NguoiDungDto createdNguoiDung = nguoiDungService.createNguoiDung(nguoiDungDto);
        return new ResponseEntity<>(createdNguoiDung, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<NguoiDungDto>> getAllNguoiDung(@PageableDefault(size = 10, sort = "tenDangNhap") Pageable pageable) {
        Page<NguoiDungDto> nguoiDungPage = nguoiDungService.getAllNguoiDung(pageable);
        return ResponseEntity.ok(nguoiDungPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NguoiDungDto> getNguoiDungById(@PathVariable String id) {
        // Assuming service expects Long, convert String ID from path to Long
        Long nguoiDungId = NguoiDungMapper.stringIdToLongId(id);
        NguoiDungDto nguoiDungDto = nguoiDungService.getNguoiDungById(nguoiDungId);
        return ResponseEntity.ok(nguoiDungDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NguoiDungDto> updateNguoiDung(@PathVariable String id, @Valid @RequestBody NguoiDungDto nguoiDungDto) {
        Long nguoiDungId = NguoiDungMapper.stringIdToLongId(id);
        NguoiDungDto updatedNguoiDung = nguoiDungService.updateNguoiDung(nguoiDungId, nguoiDungDto);
        return ResponseEntity.ok(updatedNguoiDung);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNguoiDung(@PathVariable String id) {
        Long nguoiDungId = NguoiDungMapper.stringIdToLongId(id);
        nguoiDungService.deleteNguoiDung(nguoiDungId);
        return ResponseEntity.noContent().build();
    }
}
