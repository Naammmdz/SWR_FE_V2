package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.SanPhamDaSuDungDto;
import com.example.schoolhealth.dtos.SuKienYTeDto;
import com.example.schoolhealth.models.SanPhamDaSuDung;
import com.example.schoolhealth.models.SuKienYTe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring", uses = {NguoiDungMapper.class}) // NguoiDungMapper for ID and DateTime conversions
public interface SuKienYTeMapper {

    SuKienYTeMapper INSTANCE = Mappers.getMapper(SuKienYTeMapper.class);

    // --- SanPhamDaSuDung Mapping ---
    // Frontend DTO has idSanPham (for idThuoc/idVatTu), tenSanPham (for tenThuoc/tenVatTu)
    // Entity SanPhamDaSuDung now has idSanPham and tenSanPham.
    SanPhamDaSuDungDto sanPhamDaSuDungToSanPhamDaSuDungDto(SanPhamDaSuDung sanPhamDaSuDung);
    SanPhamDaSuDung sanPhamDaSuDungDtoToSanPhamDaSuDung(SanPhamDaSuDungDto sanPhamDaSuDungDto);

    List<SanPhamDaSuDungDto> sanPhamDaSuDungListToDtoList(List<SanPhamDaSuDung> list);
    List<SanPhamDaSuDung> sanPhamDaSuDungDtoListToEntityList(List<SanPhamDaSuDungDto> list);

    // --- SuKienYTe Mapping ---
    @Mapping(source = "id", target = "id", qualifiedByName = "longIdToStringId")
    @Mapping(source = "idHocSinh", target = "idHocSinh", qualifiedByName = "longIdToStringId")
    @Mapping(source = "idYTaGhiNhan", target = "idYTaGhiNhan", qualifiedByName = "longIdToStringId")
    @Mapping(source = "idYeuCauGuiThuocLienQuan", target = "idYeuCauGuiThuocLienQuan", qualifiedByName = "longIdToStringId")
    @Mapping(source = "thoiGianXayRa", target = "thoiGianXayRa", qualifiedByName = "localDateTimeToString")
    @Mapping(source = "thoiGianThongBaoPhuHuynh", target = "thoiGianThongBaoPhuHuynh", qualifiedByName = "localDateTimeToString")
    @Mapping(source = "ngayTao", target = "ngayTao", qualifiedByName = "localDateTimeToString")
    @Mapping(source = "ngayCapNhat", target = "ngayCapNhat", qualifiedByName = "localDateTimeToString")
    SuKienYTeDto suKienYTeToSuKienYTeDto(SuKienYTe suKienYTe);

    @Mapping(source = "id", target = "id", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "idHocSinh", target = "idHocSinh", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "idYTaGhiNhan", target = "idYTaGhiNhan", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "idYeuCauGuiThuocLienQuan", target = "idYeuCauGuiThuocLienQuan", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "thoiGianXayRa", target = "thoiGianXayRa", qualifiedByName = "stringToLocalDateTime")
    @Mapping(source = "thoiGianThongBaoPhuHuynh", target = "thoiGianThongBaoPhuHuynh", qualifiedByName = "stringToLocalDateTime")
    @Mapping(target = "ngayTao", ignore = true) // Handled by @PrePersist
    @Mapping(target = "ngayCapNhat", ignore = true) // Handled by @PrePersist/@PreUpdate
    SuKienYTe suKienYTeDtoToSuKienYTe(SuKienYTeDto suKienYTeDto);

    // DateTime conversion methods are expected to be in NguoiDungMapper
}
