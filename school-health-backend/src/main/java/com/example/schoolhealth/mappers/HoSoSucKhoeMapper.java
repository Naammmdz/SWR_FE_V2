package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.ChiTietLucDto;
import com.example.schoolhealth.dtos.HoSoSucKhoeDto;
import com.example.schoolhealth.dtos.ThongTinTiemChungDto;
import com.example.schoolhealth.models.ChiTietLuc;
import com.example.schoolhealth.models.HoSoSucKhoe;
import com.example.schoolhealth.models.ThongTinTiemChung;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring", uses = {NguoiDungMapper.class, HocSinhMapper.class})
public interface HoSoSucKhoeMapper {

    HoSoSucKhoeMapper INSTANCE = Mappers.getMapper(HoSoSucKhoeMapper.class);

    // --- ChiTietLuc Mapping ---
    // Frontend uses matTrai/matPhai, backend uses trai/phai.
    @Mapping(source = "trai", target = "matTrai")
    @Mapping(source = "phai", target = "matPhai")
    @Mapping(source = "ngayKham", target = "ngayKham", qualifiedByName = "localDateToString")
    ChiTietLucDto chiTietLucToChiTietLucDto(ChiTietLuc chiTietLuc);

    @Mapping(source = "matTrai", target = "trai")
    @Mapping(source = "matPhai", target = "phai")
    @Mapping(source = "ngayKham", target = "ngayKham", qualifiedByName = "stringToLocalDate")
    ChiTietLuc chiTietLucDtoToChiTietLuc(ChiTietLucDto chiTietLucDto);

    // --- ThongTinTiemChung Mapping ---
    @Mapping(source = "id", target = "id", qualifiedByName = "longIdToStringId")
    @Mapping(source = "ngayTiem", target = "ngayTiem", qualifiedByName = "localDateToString")
    ThongTinTiemChungDto thongTinTiemChungToThongTinTiemChungDto(ThongTinTiemChung thongTinTiemChung);

    @Mapping(source = "id", target = "id", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "ngayTiem", target = "ngayTiem", qualifiedByName = "stringToLocalDate")
    @Mapping(target = "hoSoSucKhoe", ignore = true) // Avoid circular dependency / let service handle this
    ThongTinTiemChung thongTinTiemChungDtoToThongTinTiemChung(ThongTinTiemChungDto thongTinTiemChungDto);

    List<ThongTinTiemChungDto> thongTinTiemChungListToDtoList(List<ThongTinTiemChung> list);
    List<ThongTinTiemChung> thongTinTiemChungDtoListToEntityList(List<ThongTinTiemChungDto> list);


    // --- HoSoSucKhoe Mapping ---
    @Mapping(source = "id", target = "id", qualifiedByName = "longIdToStringId")
    @Mapping(source = "idHocSinh", target = "idHocSinh", qualifiedByName = "longIdToStringId")
    @Mapping(source = "idNguoiCapNhatCuoi", target = "idNguoiCapNhatCuoi", qualifiedByName = "longIdToStringId")
    @Mapping(source = "ngayCapNhatCuoi", target = "ngayCapNhatCuoi", qualifiedByName = "localDateTimeToString")
    HoSoSucKhoeDto hoSoSucKhoeToHoSoSucKhoeDto(HoSoSucKhoe hoSoSucKhoe);

    @Mapping(source = "id", target = "id", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "idHocSinh", target = "idHocSinh", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "idNguoiCapNhatCuoi", target = "idNguoiCapNhatCuoi", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "ngayCapNhatCuoi", target = "ngayCapNhatCuoi", ignore = true) // Let @PrePersist/@PreUpdate handle this
    HoSoSucKhoe hoSoSucKhoeDtoToHoSoSucKhoe(HoSoSucKhoeDto hoSoSucKhoeDto);

    // --- Date Time Helper Methods (can be in a central util or here if specific) ---
    // NguoiDungMapper.longIdToStringId etc. are used via `uses` attribute
    // HocSinhMapper provides localDateToString and stringToLocalDate
    // NguoiDungMapper provides localDateTimeToString
    // These are now removed to avoid ambiguity and rely on mappers in 'uses' clause.
}
