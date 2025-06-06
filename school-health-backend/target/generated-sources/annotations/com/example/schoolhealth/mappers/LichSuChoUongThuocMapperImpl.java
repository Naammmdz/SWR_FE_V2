package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.LichSuChoUongThuocDto;
import com.example.schoolhealth.models.LichSuChoUongThuoc;
import com.example.schoolhealth.models.YeuCauGuiThuoc;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-06T04:02:34+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Ubuntu)"
)
@Component
public class LichSuChoUongThuocMapperImpl implements LichSuChoUongThuocMapper {

    @Override
    public LichSuChoUongThuocDto lichSuChoUongThuocToLichSuChoUongThuocDto(LichSuChoUongThuoc lichSuChoUongThuoc) {
        if ( lichSuChoUongThuoc == null ) {
            return null;
        }

        LichSuChoUongThuocDto lichSuChoUongThuocDto = new LichSuChoUongThuocDto();

        lichSuChoUongThuocDto.setId( NguoiDungMapper.longIdToStringId( lichSuChoUongThuoc.getId() ) );
        lichSuChoUongThuocDto.setIdYeuCauGuiThuoc( NguoiDungMapper.longIdToStringId( lichSuChoUongThuocYeuCauGuiThuocId( lichSuChoUongThuoc ) ) );
        lichSuChoUongThuocDto.setIdYTaChoUong( NguoiDungMapper.longIdToStringId( lichSuChoUongThuoc.getIdYTaChoUong() ) );
        lichSuChoUongThuocDto.setThoiGianKeHoach( NguoiDungMapper.localDateTimeToString( lichSuChoUongThuoc.getThoiGianKeHoach() ) );
        lichSuChoUongThuocDto.setThoiGianThucTe( NguoiDungMapper.localDateTimeToString( lichSuChoUongThuoc.getThoiGianThucTe() ) );
        lichSuChoUongThuocDto.setGhiChuYTa( lichSuChoUongThuoc.getGhiChuYTa() );
        lichSuChoUongThuocDto.setTrangThai( lichSuChoUongThuoc.getTrangThai() );

        return lichSuChoUongThuocDto;
    }

    @Override
    public LichSuChoUongThuoc lichSuChoUongThuocDtoToLichSuChoUongThuoc(LichSuChoUongThuocDto lichSuChoUongThuocDto) {
        if ( lichSuChoUongThuocDto == null ) {
            return null;
        }

        LichSuChoUongThuoc lichSuChoUongThuoc = new LichSuChoUongThuoc();

        lichSuChoUongThuoc.setId( NguoiDungMapper.stringIdToLongId( lichSuChoUongThuocDto.getId() ) );
        lichSuChoUongThuoc.setIdYTaChoUong( NguoiDungMapper.stringIdToLongId( lichSuChoUongThuocDto.getIdYTaChoUong() ) );
        lichSuChoUongThuoc.setThoiGianKeHoach( NguoiDungMapper.stringToLocalDateTime( lichSuChoUongThuocDto.getThoiGianKeHoach() ) );
        lichSuChoUongThuoc.setThoiGianThucTe( NguoiDungMapper.stringToLocalDateTime( lichSuChoUongThuocDto.getThoiGianThucTe() ) );
        lichSuChoUongThuoc.setGhiChuYTa( lichSuChoUongThuocDto.getGhiChuYTa() );
        lichSuChoUongThuoc.setTrangThai( lichSuChoUongThuocDto.getTrangThai() );

        return lichSuChoUongThuoc;
    }

    private Long lichSuChoUongThuocYeuCauGuiThuocId(LichSuChoUongThuoc lichSuChoUongThuoc) {
        if ( lichSuChoUongThuoc == null ) {
            return null;
        }
        YeuCauGuiThuoc yeuCauGuiThuoc = lichSuChoUongThuoc.getYeuCauGuiThuoc();
        if ( yeuCauGuiThuoc == null ) {
            return null;
        }
        Long id = yeuCauGuiThuoc.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
