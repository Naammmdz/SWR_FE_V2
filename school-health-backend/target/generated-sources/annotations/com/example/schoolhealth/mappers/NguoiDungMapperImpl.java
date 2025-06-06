package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.NguoiDungDto;
import com.example.schoolhealth.dtos.ThongTinCaNhanDto;
import com.example.schoolhealth.models.NguoiDung;
import com.example.schoolhealth.models.ThongTinCaNhan;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-06T03:09:35+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Ubuntu)"
)
@Component
public class NguoiDungMapperImpl implements NguoiDungMapper {

    @Override
    public ThongTinCaNhanDto thongTinCaNhanToThongTinCaNhanDto(ThongTinCaNhan thongTinCaNhan) {
        if ( thongTinCaNhan == null ) {
            return null;
        }

        ThongTinCaNhanDto thongTinCaNhanDto = new ThongTinCaNhanDto();

        thongTinCaNhanDto.setHoTen( thongTinCaNhan.getHoTen() );
        thongTinCaNhanDto.setEmail( thongTinCaNhan.getEmail() );
        thongTinCaNhanDto.setSoDienThoai( thongTinCaNhan.getSoDienThoai() );
        thongTinCaNhanDto.setDiaChi( thongTinCaNhan.getDiaChi() );

        return thongTinCaNhanDto;
    }

    @Override
    public ThongTinCaNhan thongTinCaNhanDtoToThongTinCaNhan(ThongTinCaNhanDto thongTinCaNhanDto) {
        if ( thongTinCaNhanDto == null ) {
            return null;
        }

        ThongTinCaNhan thongTinCaNhan = new ThongTinCaNhan();

        thongTinCaNhan.setHoTen( thongTinCaNhanDto.getHoTen() );
        thongTinCaNhan.setEmail( thongTinCaNhanDto.getEmail() );
        thongTinCaNhan.setSoDienThoai( thongTinCaNhanDto.getSoDienThoai() );
        thongTinCaNhan.setDiaChi( thongTinCaNhanDto.getDiaChi() );

        return thongTinCaNhan;
    }

    @Override
    public NguoiDungDto nguoiDungToNguoiDungDto(NguoiDung nguoiDung) {
        if ( nguoiDung == null ) {
            return null;
        }

        NguoiDungDto nguoiDungDto = new NguoiDungDto();

        nguoiDungDto.setId( NguoiDungMapper.longIdToStringId( nguoiDung.getId() ) );
        nguoiDungDto.setNgayTao( NguoiDungMapper.localDateTimeToString( nguoiDung.getNgayTao() ) );
        nguoiDungDto.setTenDangNhap( nguoiDung.getTenDangNhap() );
        nguoiDungDto.setVaiTro( nguoiDung.getVaiTro() );
        nguoiDungDto.setThongTinCaNhan( thongTinCaNhanToThongTinCaNhanDto( nguoiDung.getThongTinCaNhan() ) );
        nguoiDungDto.setIdTruongHoc( nguoiDung.getIdTruongHoc() );
        nguoiDungDto.setTrangThai( nguoiDung.getTrangThai() );

        return nguoiDungDto;
    }

    @Override
    public NguoiDung nguoiDungDtoToNguoiDung(NguoiDungDto nguoiDungDto) {
        if ( nguoiDungDto == null ) {
            return null;
        }

        NguoiDung nguoiDung = new NguoiDung();

        nguoiDung.setId( NguoiDungMapper.stringIdToLongId( nguoiDungDto.getId() ) );
        nguoiDung.setTenDangNhap( nguoiDungDto.getTenDangNhap() );
        nguoiDung.setVaiTro( nguoiDungDto.getVaiTro() );
        nguoiDung.setThongTinCaNhan( thongTinCaNhanDtoToThongTinCaNhan( nguoiDungDto.getThongTinCaNhan() ) );
        nguoiDung.setIdTruongHoc( nguoiDungDto.getIdTruongHoc() );
        nguoiDung.setTrangThai( nguoiDungDto.getTrangThai() );

        return nguoiDung;
    }
}
