package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.SanPhamDaSuDungDto;
import com.example.schoolhealth.dtos.SuKienYTeDto;
import com.example.schoolhealth.models.SanPhamDaSuDung;
import com.example.schoolhealth.models.SuKienYTe;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-06T04:02:34+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Ubuntu)"
)
@Component
public class SuKienYTeMapperImpl implements SuKienYTeMapper {

    @Override
    public SanPhamDaSuDungDto sanPhamDaSuDungToSanPhamDaSuDungDto(SanPhamDaSuDung sanPhamDaSuDung) {
        if ( sanPhamDaSuDung == null ) {
            return null;
        }

        SanPhamDaSuDungDto sanPhamDaSuDungDto = new SanPhamDaSuDungDto();

        sanPhamDaSuDungDto.setIdSanPham( sanPhamDaSuDung.getIdSanPham() );
        sanPhamDaSuDungDto.setTenSanPham( sanPhamDaSuDung.getTenSanPham() );
        sanPhamDaSuDungDto.setSoLuong( sanPhamDaSuDung.getSoLuong() );
        sanPhamDaSuDungDto.setDonVi( sanPhamDaSuDung.getDonVi() );

        return sanPhamDaSuDungDto;
    }

    @Override
    public SanPhamDaSuDung sanPhamDaSuDungDtoToSanPhamDaSuDung(SanPhamDaSuDungDto sanPhamDaSuDungDto) {
        if ( sanPhamDaSuDungDto == null ) {
            return null;
        }

        SanPhamDaSuDung sanPhamDaSuDung = new SanPhamDaSuDung();

        sanPhamDaSuDung.setIdSanPham( sanPhamDaSuDungDto.getIdSanPham() );
        sanPhamDaSuDung.setTenSanPham( sanPhamDaSuDungDto.getTenSanPham() );
        sanPhamDaSuDung.setSoLuong( sanPhamDaSuDungDto.getSoLuong() );
        sanPhamDaSuDung.setDonVi( sanPhamDaSuDungDto.getDonVi() );

        return sanPhamDaSuDung;
    }

    @Override
    public List<SanPhamDaSuDungDto> sanPhamDaSuDungListToDtoList(List<SanPhamDaSuDung> list) {
        if ( list == null ) {
            return null;
        }

        List<SanPhamDaSuDungDto> list1 = new ArrayList<SanPhamDaSuDungDto>( list.size() );
        for ( SanPhamDaSuDung sanPhamDaSuDung : list ) {
            list1.add( sanPhamDaSuDungToSanPhamDaSuDungDto( sanPhamDaSuDung ) );
        }

        return list1;
    }

    @Override
    public List<SanPhamDaSuDung> sanPhamDaSuDungDtoListToEntityList(List<SanPhamDaSuDungDto> list) {
        if ( list == null ) {
            return null;
        }

        List<SanPhamDaSuDung> list1 = new ArrayList<SanPhamDaSuDung>( list.size() );
        for ( SanPhamDaSuDungDto sanPhamDaSuDungDto : list ) {
            list1.add( sanPhamDaSuDungDtoToSanPhamDaSuDung( sanPhamDaSuDungDto ) );
        }

        return list1;
    }

    @Override
    public SuKienYTeDto suKienYTeToSuKienYTeDto(SuKienYTe suKienYTe) {
        if ( suKienYTe == null ) {
            return null;
        }

        SuKienYTeDto suKienYTeDto = new SuKienYTeDto();

        suKienYTeDto.setId( NguoiDungMapper.longIdToStringId( suKienYTe.getId() ) );
        suKienYTeDto.setIdHocSinh( NguoiDungMapper.longIdToStringId( suKienYTe.getIdHocSinh() ) );
        suKienYTeDto.setIdYTaGhiNhan( NguoiDungMapper.longIdToStringId( suKienYTe.getIdYTaGhiNhan() ) );
        suKienYTeDto.setIdYeuCauGuiThuocLienQuan( NguoiDungMapper.longIdToStringId( suKienYTe.getIdYeuCauGuiThuocLienQuan() ) );
        suKienYTeDto.setThoiGianXayRa( NguoiDungMapper.localDateTimeToString( suKienYTe.getThoiGianXayRa() ) );
        suKienYTeDto.setThoiGianThongBaoPhuHuynh( NguoiDungMapper.localDateTimeToString( suKienYTe.getThoiGianThongBaoPhuHuynh() ) );
        suKienYTeDto.setNgayTao( NguoiDungMapper.localDateTimeToString( suKienYTe.getNgayTao() ) );
        suKienYTeDto.setNgayCapNhat( NguoiDungMapper.localDateTimeToString( suKienYTe.getNgayCapNhat() ) );
        suKienYTeDto.setDiaDiemXayRa( suKienYTe.getDiaDiemXayRa() );
        suKienYTeDto.setLoaiSuCo( suKienYTe.getLoaiSuCo() );
        suKienYTeDto.setMucDoNghiemTrong( suKienYTe.getMucDoNghiemTrong() );
        suKienYTeDto.setMoTaChiTiet( suKienYTe.getMoTaChiTiet() );
        suKienYTeDto.setBienPhapXuLyBanDau( suKienYTe.getBienPhapXuLyBanDau() );
        suKienYTeDto.setThuocDaSuDung( sanPhamDaSuDungListToDtoList( suKienYTe.getThuocDaSuDung() ) );
        suKienYTeDto.setVatTuDaSuDung( sanPhamDaSuDungListToDtoList( suKienYTe.getVatTuDaSuDung() ) );
        suKienYTeDto.setTinhTrangHocSinhSauXuLy( suKienYTe.getTinhTrangHocSinhSauXuLy() );
        suKienYTeDto.setDaThongBaoPhuHuynh( suKienYTe.isDaThongBaoPhuHuynh() );
        suKienYTeDto.setGhiChuThemCuaYTa( suKienYTe.getGhiChuThemCuaYTa() );

        return suKienYTeDto;
    }

    @Override
    public SuKienYTe suKienYTeDtoToSuKienYTe(SuKienYTeDto suKienYTeDto) {
        if ( suKienYTeDto == null ) {
            return null;
        }

        SuKienYTe suKienYTe = new SuKienYTe();

        suKienYTe.setId( NguoiDungMapper.stringIdToLongId( suKienYTeDto.getId() ) );
        suKienYTe.setIdHocSinh( NguoiDungMapper.stringIdToLongId( suKienYTeDto.getIdHocSinh() ) );
        suKienYTe.setIdYTaGhiNhan( NguoiDungMapper.stringIdToLongId( suKienYTeDto.getIdYTaGhiNhan() ) );
        suKienYTe.setIdYeuCauGuiThuocLienQuan( NguoiDungMapper.stringIdToLongId( suKienYTeDto.getIdYeuCauGuiThuocLienQuan() ) );
        suKienYTe.setThoiGianXayRa( NguoiDungMapper.stringToLocalDateTime( suKienYTeDto.getThoiGianXayRa() ) );
        suKienYTe.setThoiGianThongBaoPhuHuynh( NguoiDungMapper.stringToLocalDateTime( suKienYTeDto.getThoiGianThongBaoPhuHuynh() ) );
        suKienYTe.setDiaDiemXayRa( suKienYTeDto.getDiaDiemXayRa() );
        suKienYTe.setLoaiSuCo( suKienYTeDto.getLoaiSuCo() );
        suKienYTe.setMucDoNghiemTrong( suKienYTeDto.getMucDoNghiemTrong() );
        suKienYTe.setMoTaChiTiet( suKienYTeDto.getMoTaChiTiet() );
        suKienYTe.setBienPhapXuLyBanDau( suKienYTeDto.getBienPhapXuLyBanDau() );
        suKienYTe.setThuocDaSuDung( sanPhamDaSuDungDtoListToEntityList( suKienYTeDto.getThuocDaSuDung() ) );
        suKienYTe.setVatTuDaSuDung( sanPhamDaSuDungDtoListToEntityList( suKienYTeDto.getVatTuDaSuDung() ) );
        suKienYTe.setTinhTrangHocSinhSauXuLy( suKienYTeDto.getTinhTrangHocSinhSauXuLy() );
        if ( suKienYTeDto.getDaThongBaoPhuHuynh() != null ) {
            suKienYTe.setDaThongBaoPhuHuynh( suKienYTeDto.getDaThongBaoPhuHuynh() );
        }
        suKienYTe.setGhiChuThemCuaYTa( suKienYTeDto.getGhiChuThemCuaYTa() );

        return suKienYTe;
    }
}
