package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.HocSinhDto;
import com.example.schoolhealth.models.HocSinh;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-06T04:02:34+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Ubuntu)"
)
@Component
public class HocSinhMapperImpl implements HocSinhMapper {

    @Override
    public HocSinhDto hocSinhToHocSinhDto(HocSinh hocSinh) {
        if ( hocSinh == null ) {
            return null;
        }

        HocSinhDto hocSinhDto = new HocSinhDto();

        hocSinhDto.setId( NguoiDungMapper.longIdToStringId( hocSinh.getId() ) );
        hocSinhDto.setNgaySinh( localDateToString( hocSinh.getNgaySinh() ) );
        hocSinhDto.setIdNguoiGiamHoChinh( NguoiDungMapper.longIdToStringId( hocSinh.getIdNguoiGiamHoChinh() ) );
        hocSinhDto.setCacNguoiGiamHoKhacIds( longListToStringList( hocSinh.getCacNguoiGiamHoKhacIds() ) );
        hocSinhDto.setIdHoSoSucKhoe( NguoiDungMapper.longIdToStringId( hocSinh.getIdHoSoSucKhoe() ) );
        hocSinhDto.setHoTen( hocSinh.getHoTen() );
        hocSinhDto.setMaHocSinh( hocSinh.getMaHocSinh() );
        hocSinhDto.setGioiTinh( hocSinh.getGioiTinh() );
        hocSinhDto.setLop( hocSinh.getLop() );
        hocSinhDto.setIdTruongHoc( hocSinh.getIdTruongHoc() );
        hocSinhDto.setAnhDaiDienUrl( hocSinh.getAnhDaiDienUrl() );
        hocSinhDto.setGhiChu( hocSinh.getGhiChu() );

        return hocSinhDto;
    }

    @Override
    public HocSinh hocSinhDtoToHocSinh(HocSinhDto hocSinhDto) {
        if ( hocSinhDto == null ) {
            return null;
        }

        HocSinh hocSinh = new HocSinh();

        hocSinh.setId( NguoiDungMapper.stringIdToLongId( hocSinhDto.getId() ) );
        hocSinh.setNgaySinh( stringToLocalDate( hocSinhDto.getNgaySinh() ) );
        hocSinh.setIdNguoiGiamHoChinh( NguoiDungMapper.stringIdToLongId( hocSinhDto.getIdNguoiGiamHoChinh() ) );
        hocSinh.setCacNguoiGiamHoKhacIds( stringListToLongList( hocSinhDto.getCacNguoiGiamHoKhacIds() ) );
        hocSinh.setIdHoSoSucKhoe( NguoiDungMapper.stringIdToLongId( hocSinhDto.getIdHoSoSucKhoe() ) );
        hocSinh.setHoTen( hocSinhDto.getHoTen() );
        hocSinh.setMaHocSinh( hocSinhDto.getMaHocSinh() );
        hocSinh.setGioiTinh( hocSinhDto.getGioiTinh() );
        hocSinh.setLop( hocSinhDto.getLop() );
        hocSinh.setIdTruongHoc( hocSinhDto.getIdTruongHoc() );
        hocSinh.setAnhDaiDienUrl( hocSinhDto.getAnhDaiDienUrl() );
        hocSinh.setGhiChu( hocSinhDto.getGhiChu() );

        return hocSinh;
    }
}
