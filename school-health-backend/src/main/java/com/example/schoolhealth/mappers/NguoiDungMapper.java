package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.NguoiDungDto;
import com.example.schoolhealth.dtos.ThongTinCaNhanDto;
import com.example.schoolhealth.models.NguoiDung;
import com.example.schoolhealth.models.ThongTinCaNhan;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface NguoiDungMapper {

    NguoiDungMapper INSTANCE = Mappers.getMapper(NguoiDungMapper.class);

    // --- ThongTinCaNhan Mapping ---
    ThongTinCaNhanDto thongTinCaNhanToThongTinCaNhanDto(ThongTinCaNhan thongTinCaNhan);
    ThongTinCaNhan thongTinCaNhanDtoToThongTinCaNhan(ThongTinCaNhanDto thongTinCaNhanDto);

    // --- NguoiDung Mapping ---
    @Mapping(source = "id", target = "id", qualifiedByName = "longIdToStringId")
    @Mapping(source = "ngayTao", target = "ngayTao", qualifiedByName = "localDateTimeToString")
    @Mapping(target = "password", ignore = true) // Exclude password when mapping from Entity to DTO
    NguoiDungDto nguoiDungToNguoiDungDto(NguoiDung nguoiDung);

    @Mapping(source = "id", target = "id", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "ngayTao", target = "ngayTao", ignore = true) // Let service handle ngayTao on creation
    @Mapping(target = "matKhauHash", ignore = true) // Let service handle password hashing
    NguoiDung nguoiDungDtoToNguoiDung(NguoiDungDto nguoiDungDto);

    @Named("longIdToStringId")
    public static String longIdToStringId(Long id) {
        return id != null ? String.valueOf(id) : null;
    }

    @Named("stringIdToLongId")
    public static Long stringIdToLongId(String id) {
        return id != null ? Long.parseLong(id) : null;
    }

    @Named("localDateTimeToString")
    public static String localDateTimeToString(LocalDateTime date) {
        return date != null ? date.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }
}
