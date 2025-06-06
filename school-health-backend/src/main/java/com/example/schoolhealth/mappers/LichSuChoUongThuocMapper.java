package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.LichSuChoUongThuocDto;
import com.example.schoolhealth.models.LichSuChoUongThuoc;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring", uses = {NguoiDungMapper.class}) // For ID conversions
public interface LichSuChoUongThuocMapper {

    LichSuChoUongThuocMapper INSTANCE = Mappers.getMapper(LichSuChoUongThuocMapper.class);

    @Mapping(source = "id", target = "id", qualifiedByName = "longIdToStringId")
    @Mapping(source = "yeuCauGuiThuoc.id", target = "idYeuCauGuiThuoc", qualifiedByName = "longIdToStringId")
    @Mapping(source = "idYTaChoUong", target = "idYTaChoUong", qualifiedByName = "longIdToStringId")
    @Mapping(source = "thoiGianKeHoach", target = "thoiGianKeHoach", qualifiedByName = "localDateTimeToString")
    @Mapping(source = "thoiGianThucTe", target = "thoiGianThucTe", qualifiedByName = "localDateTimeToString")
    LichSuChoUongThuocDto lichSuChoUongThuocToLichSuChoUongThuocDto(LichSuChoUongThuoc lichSuChoUongThuoc);

    @Mapping(source = "id", target = "id", qualifiedByName = "stringIdToLongId")
    @Mapping(target = "yeuCauGuiThuoc", ignore = true) // Let service handle parent relationship
    @Mapping(source = "idYTaChoUong", target = "idYTaChoUong", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "thoiGianKeHoach", target = "thoiGianKeHoach", qualifiedByName = "stringToLocalDateTime")
    @Mapping(source = "thoiGianThucTe", target = "thoiGianThucTe", qualifiedByName = "stringToLocalDateTime")
    LichSuChoUongThuoc lichSuChoUongThuocDtoToLichSuChoUongThuoc(LichSuChoUongThuocDto lichSuChoUongThuocDto);

    // Helper methods for date/time are delegated to NguoiDungMapper via the 'uses' attribute.
}
