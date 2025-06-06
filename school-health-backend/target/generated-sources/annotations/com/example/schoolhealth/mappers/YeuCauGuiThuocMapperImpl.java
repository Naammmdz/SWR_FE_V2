package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.LichSuChoUongThuocDto;
import com.example.schoolhealth.dtos.YeuCauGuiThuocDto;
import com.example.schoolhealth.models.LichSuChoUongThuoc;
import com.example.schoolhealth.models.YeuCauGuiThuoc;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-06T04:02:34+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Ubuntu)"
)
@Component
public class YeuCauGuiThuocMapperImpl implements YeuCauGuiThuocMapper {

    @Autowired
    private LichSuChoUongThuocMapper lichSuChoUongThuocMapper;

    @Override
    public YeuCauGuiThuocDto yeuCauGuiThuocToYeuCauGuiThuocDto(YeuCauGuiThuoc yeuCauGuiThuoc) {
        if ( yeuCauGuiThuoc == null ) {
            return null;
        }

        YeuCauGuiThuocDto yeuCauGuiThuocDto = new YeuCauGuiThuocDto();

        yeuCauGuiThuocDto.setId( NguoiDungMapper.longIdToStringId( yeuCauGuiThuoc.getId() ) );
        yeuCauGuiThuocDto.setIdHocSinh( NguoiDungMapper.longIdToStringId( yeuCauGuiThuoc.getIdHocSinh() ) );
        yeuCauGuiThuocDto.setIdPhuHuynhGui( NguoiDungMapper.longIdToStringId( yeuCauGuiThuoc.getIdPhuHuynhGui() ) );
        yeuCauGuiThuocDto.setIdYTaXuLy( NguoiDungMapper.longIdToStringId( yeuCauGuiThuoc.getIdYTaXuLy() ) );
        yeuCauGuiThuocDto.setThoiGianKeHoachUong( localDateTimeListToStringList( yeuCauGuiThuoc.getThoiGianKeHoachUong() ) );
        yeuCauGuiThuocDto.setNgayTao( NguoiDungMapper.localDateTimeToString( yeuCauGuiThuoc.getNgayTao() ) );
        yeuCauGuiThuocDto.setNgayCapNhat( NguoiDungMapper.localDateTimeToString( yeuCauGuiThuoc.getNgayCapNhat() ) );
        yeuCauGuiThuocDto.setTenThuoc( yeuCauGuiThuoc.getTenThuoc() );
        yeuCauGuiThuocDto.setHamLuong( yeuCauGuiThuoc.getHamLuong() );
        yeuCauGuiThuocDto.setDonViTinh( yeuCauGuiThuoc.getDonViTinh() );
        yeuCauGuiThuocDto.setSoLuongMoiLanUong( yeuCauGuiThuoc.getSoLuongMoiLanUong() );
        yeuCauGuiThuocDto.setDonViUong( yeuCauGuiThuoc.getDonViUong() );
        yeuCauGuiThuocDto.setDuongDung( yeuCauGuiThuoc.getDuongDung() );
        yeuCauGuiThuocDto.setHuongDanSuDung( yeuCauGuiThuoc.getHuongDanSuDung() );
        yeuCauGuiThuocDto.setLichSuUongThuoc( lichSuChoUongThuocListToLichSuChoUongThuocDtoList( yeuCauGuiThuoc.getLichSuUongThuoc() ) );
        yeuCauGuiThuocDto.setDonThuocUrl( yeuCauGuiThuoc.getDonThuocUrl() );
        yeuCauGuiThuocDto.setGhiChuPhuHuynh( yeuCauGuiThuoc.getGhiChuPhuHuynh() );
        yeuCauGuiThuocDto.setLienHeKhanCap( yeuCauGuiThuoc.getLienHeKhanCap() );
        yeuCauGuiThuocDto.setTrangThai( yeuCauGuiThuoc.getTrangThai() );
        yeuCauGuiThuocDto.setLyDoHuyHoacTuChoi( yeuCauGuiThuoc.getLyDoHuyHoacTuChoi() );

        return yeuCauGuiThuocDto;
    }

    @Override
    public YeuCauGuiThuoc yeuCauGuiThuocDtoToYeuCauGuiThuoc(YeuCauGuiThuocDto yeuCauGuiThuocDto) {
        if ( yeuCauGuiThuocDto == null ) {
            return null;
        }

        YeuCauGuiThuoc yeuCauGuiThuoc = new YeuCauGuiThuoc();

        yeuCauGuiThuoc.setId( NguoiDungMapper.stringIdToLongId( yeuCauGuiThuocDto.getId() ) );
        yeuCauGuiThuoc.setIdHocSinh( NguoiDungMapper.stringIdToLongId( yeuCauGuiThuocDto.getIdHocSinh() ) );
        yeuCauGuiThuoc.setIdPhuHuynhGui( NguoiDungMapper.stringIdToLongId( yeuCauGuiThuocDto.getIdPhuHuynhGui() ) );
        yeuCauGuiThuoc.setIdYTaXuLy( NguoiDungMapper.stringIdToLongId( yeuCauGuiThuocDto.getIdYTaXuLy() ) );
        yeuCauGuiThuoc.setThoiGianKeHoachUong( stringListToLocalDateTimeList( yeuCauGuiThuocDto.getThoiGianKeHoachUong() ) );
        yeuCauGuiThuoc.setTenThuoc( yeuCauGuiThuocDto.getTenThuoc() );
        yeuCauGuiThuoc.setHamLuong( yeuCauGuiThuocDto.getHamLuong() );
        yeuCauGuiThuoc.setDonViTinh( yeuCauGuiThuocDto.getDonViTinh() );
        yeuCauGuiThuoc.setSoLuongMoiLanUong( yeuCauGuiThuocDto.getSoLuongMoiLanUong() );
        yeuCauGuiThuoc.setDonViUong( yeuCauGuiThuocDto.getDonViUong() );
        yeuCauGuiThuoc.setDuongDung( yeuCauGuiThuocDto.getDuongDung() );
        yeuCauGuiThuoc.setHuongDanSuDung( yeuCauGuiThuocDto.getHuongDanSuDung() );
        yeuCauGuiThuoc.setLichSuUongThuoc( lichSuChoUongThuocDtoListToLichSuChoUongThuocList( yeuCauGuiThuocDto.getLichSuUongThuoc() ) );
        yeuCauGuiThuoc.setDonThuocUrl( yeuCauGuiThuocDto.getDonThuocUrl() );
        yeuCauGuiThuoc.setGhiChuPhuHuynh( yeuCauGuiThuocDto.getGhiChuPhuHuynh() );
        yeuCauGuiThuoc.setLienHeKhanCap( yeuCauGuiThuocDto.getLienHeKhanCap() );
        yeuCauGuiThuoc.setTrangThai( yeuCauGuiThuocDto.getTrangThai() );
        yeuCauGuiThuoc.setLyDoHuyHoacTuChoi( yeuCauGuiThuocDto.getLyDoHuyHoacTuChoi() );

        return yeuCauGuiThuoc;
    }

    protected List<LichSuChoUongThuocDto> lichSuChoUongThuocListToLichSuChoUongThuocDtoList(List<LichSuChoUongThuoc> list) {
        if ( list == null ) {
            return null;
        }

        List<LichSuChoUongThuocDto> list1 = new ArrayList<LichSuChoUongThuocDto>( list.size() );
        for ( LichSuChoUongThuoc lichSuChoUongThuoc : list ) {
            list1.add( lichSuChoUongThuocMapper.lichSuChoUongThuocToLichSuChoUongThuocDto( lichSuChoUongThuoc ) );
        }

        return list1;
    }

    protected List<LichSuChoUongThuoc> lichSuChoUongThuocDtoListToLichSuChoUongThuocList(List<LichSuChoUongThuocDto> list) {
        if ( list == null ) {
            return null;
        }

        List<LichSuChoUongThuoc> list1 = new ArrayList<LichSuChoUongThuoc>( list.size() );
        for ( LichSuChoUongThuocDto lichSuChoUongThuocDto : list ) {
            list1.add( lichSuChoUongThuocMapper.lichSuChoUongThuocDtoToLichSuChoUongThuoc( lichSuChoUongThuocDto ) );
        }

        return list1;
    }
}
