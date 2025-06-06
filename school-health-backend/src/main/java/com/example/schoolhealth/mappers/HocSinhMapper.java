package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.HocSinhDto;
import com.example.schoolhealth.models.HocSinh;
import com.example.schoolhealth.models.GioiTinh; // Import GioiTinh
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {NguoiDungMapper.class}) // NguoiDungMapper for Long/String ID conversions
public interface HocSinhMapper {

    HocSinhMapper INSTANCE = Mappers.getMapper(HocSinhMapper.class);

    @Mapping(source = "id", target = "id", qualifiedByName = "longIdToStringId")
    @Mapping(source = "ngaySinh", target = "ngaySinh", qualifiedByName = "localDateToString")
    @Mapping(source = "idNguoiGiamHoChinh", target = "idNguoiGiamHoChinh", qualifiedByName = "longIdToStringId")
    @Mapping(source = "cacNguoiGiamHoKhacIds", target = "cacNguoiGiamHoKhacIds", qualifiedByName = "longListToStringList")
    @Mapping(source = "idHoSoSucKhoe", target = "idHoSoSucKhoe", qualifiedByName = "longIdToStringId")
    HocSinhDto hocSinhToHocSinhDto(HocSinh hocSinh);

    @Mapping(source = "id", target = "id", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "ngaySinh", target = "ngaySinh", qualifiedByName = "stringToLocalDate")
    @Mapping(source = "idNguoiGiamHoChinh", target = "idNguoiGiamHoChinh", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "cacNguoiGiamHoKhacIds", target = "cacNguoiGiamHoKhacIds", qualifiedByName = "stringListToLongList")
    @Mapping(source = "idHoSoSucKhoe", target = "idHoSoSucKhoe", qualifiedByName = "stringIdToLongId")
    HocSinh hocSinhDtoToHocSinh(HocSinhDto hocSinhDto);

    // Delegate Long/String ID conversion to NguoiDungMapper's static methods if they are public
    // Or define them here if preferred (as NguoiDungMapper might not be the most logical place for generic conversion)
    // For this example, let's assume NguoiDungMapper.longIdToStringId and stringIdToLongId are accessible.
    // If not, they would be:
    /*
    @Named("longIdToStringId")
    default String longIdToStringId(Long id) {
        return id != null ? String.valueOf(id) : null;
    }

    @Named("stringIdToLongId")
    default Long stringIdToLongId(String id) {
        return id != null ? Long.parseLong(id) : null;
    }
    */

    @Named("localDateToString")
    default String localDateToString(LocalDate date) {
        return date != null ? date.format(DateTimeFormatter.ISO_LOCAL_DATE) : null;
    }

    @Named("stringToLocalDate")
    default LocalDate stringToLocalDate(String dateString) {
        return dateString != null ? LocalDate.parse(dateString, DateTimeFormatter.ISO_LOCAL_DATE) : null;
    }

    @Named("longListToStringList")
    default List<String> longListToStringList(List<Long> longList) {
        if (longList == null) return null;
        return longList.stream().map(String::valueOf).collect(Collectors.toList());
    }

    @Named("stringListToLongList")
    default List<Long> stringListToLongList(List<String> stringList) {
        if (stringList == null) return null;
        return stringList.stream().map(Long::parseLong).collect(Collectors.toList());
    }
}
