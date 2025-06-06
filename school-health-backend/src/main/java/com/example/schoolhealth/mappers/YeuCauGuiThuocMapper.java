package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.YeuCauGuiThuocDto;
import com.example.schoolhealth.models.YeuCauGuiThuoc;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {NguoiDungMapper.class, LichSuChoUongThuocMapper.class})
public interface YeuCauGuiThuocMapper {

    YeuCauGuiThuocMapper INSTANCE = Mappers.getMapper(YeuCauGuiThuocMapper.class);

    @Mapping(source = "id", target = "id", qualifiedByName = "longIdToStringId")
    @Mapping(source = "idHocSinh", target = "idHocSinh", qualifiedByName = "longIdToStringId")
    @Mapping(source = "idPhuHuynhGui", target = "idPhuHuynhGui", qualifiedByName = "longIdToStringId")
    @Mapping(source = "idYTaXuLy", target = "idYTaXuLy", qualifiedByName = "longIdToStringId")
    @Mapping(source = "thoiGianKeHoachUong", target = "thoiGianKeHoachUong", qualifiedByName = "localDateTimeListToStringList")
    @Mapping(source = "ngayTao", target = "ngayTao", qualifiedByName = "localDateTimeToString")
    @Mapping(source = "ngayCapNhat", target = "ngayCapNhat", qualifiedByName = "localDateTimeToString")
    // lichSuUongThuoc is handled by LichSuChoUongThuocMapper in `uses`
    YeuCauGuiThuocDto yeuCauGuiThuocToYeuCauGuiThuocDto(YeuCauGuiThuoc yeuCauGuiThuoc);

    @Mapping(source = "id", target = "id", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "idHocSinh", target = "idHocSinh", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "idPhuHuynhGui", target = "idPhuHuynhGui", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "idYTaXuLy", target = "idYTaXuLy", qualifiedByName = "stringIdToLongId")
    @Mapping(source = "thoiGianKeHoachUong", target = "thoiGianKeHoachUong", qualifiedByName = "stringListToLocalDateTimeList")
    @Mapping(target = "ngayTao", ignore = true) // Handled by @PrePersist
    @Mapping(target = "ngayCapNhat", ignore = true) // Handled by @PrePersist/@PreUpdate
    // lichSuUongThuoc is handled by LichSuChoUongThuocMapper in `uses`
    YeuCauGuiThuoc yeuCauGuiThuocDtoToYeuCauGuiThuoc(YeuCauGuiThuocDto yeuCauGuiThuocDto);

    @Named("localDateTimeListToStringList")
    default List<String> localDateTimeListToStringList(List<LocalDateTime> list) {
        if (list == null) return null;
        return list.stream()
            .map(dt -> dt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
            .collect(Collectors.toList());
    }

    @Named("stringListToLocalDateTimeList")
    default List<LocalDateTime> stringListToLocalDateTimeList(List<String> list) {
        if (list == null) return null;
        return list.stream()
            .map(s -> LocalDateTime.parse(s, DateTimeFormatter.ISO_LOCAL_DATE_TIME))
            .collect(Collectors.toList());
    }

    // localDateTimeToString and stringToLocalDateTime are already in LichSuChoUongThuocMapper or NguoiDungMapper (if centralized)
    // If LichSuChoUongThuocMapper is in `uses`, its public @Named methods are available.
    // Naming them uniquely or ensuring only one mapper in `uses` provides them can avoid ambiguity.
    // For now, assuming LichSuChoUongThuocMapper provides these if needed by YeuCauGuiThuoc mapping directly.
}
