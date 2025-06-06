package com.example.schoolhealth.mappers;

import com.example.schoolhealth.dtos.ChiTietLucDto;
import com.example.schoolhealth.dtos.HoSoSucKhoeDto;
import com.example.schoolhealth.dtos.ThongTinTiemChungDto;
import com.example.schoolhealth.models.ChiTietLuc;
import com.example.schoolhealth.models.HoSoSucKhoe;
import com.example.schoolhealth.models.ThongTinTiemChung;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-06T04:02:35+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Ubuntu)"
)
@Component
public class HoSoSucKhoeMapperImpl implements HoSoSucKhoeMapper {

    @Autowired
    private HocSinhMapper hocSinhMapper;

    @Override
    public ChiTietLucDto chiTietLucToChiTietLucDto(ChiTietLuc chiTietLuc) {
        if ( chiTietLuc == null ) {
            return null;
        }

        ChiTietLucDto chiTietLucDto = new ChiTietLucDto();

        chiTietLucDto.setMatTrai( chiTietLuc.getTrai() );
        chiTietLucDto.setMatPhai( chiTietLuc.getPhai() );
        chiTietLucDto.setNgayKham( hocSinhMapper.localDateToString( chiTietLuc.getNgayKham() ) );
        chiTietLucDto.setGhiChu( chiTietLuc.getGhiChu() );

        return chiTietLucDto;
    }

    @Override
    public ChiTietLuc chiTietLucDtoToChiTietLuc(ChiTietLucDto chiTietLucDto) {
        if ( chiTietLucDto == null ) {
            return null;
        }

        ChiTietLuc chiTietLuc = new ChiTietLuc();

        chiTietLuc.setTrai( chiTietLucDto.getMatTrai() );
        chiTietLuc.setPhai( chiTietLucDto.getMatPhai() );
        chiTietLuc.setNgayKham( hocSinhMapper.stringToLocalDate( chiTietLucDto.getNgayKham() ) );
        chiTietLuc.setGhiChu( chiTietLucDto.getGhiChu() );

        return chiTietLuc;
    }

    @Override
    public ThongTinTiemChungDto thongTinTiemChungToThongTinTiemChungDto(ThongTinTiemChung thongTinTiemChung) {
        if ( thongTinTiemChung == null ) {
            return null;
        }

        ThongTinTiemChungDto thongTinTiemChungDto = new ThongTinTiemChungDto();

        thongTinTiemChungDto.setId( NguoiDungMapper.longIdToStringId( thongTinTiemChung.getId() ) );
        thongTinTiemChungDto.setNgayTiem( hocSinhMapper.localDateToString( thongTinTiemChung.getNgayTiem() ) );
        thongTinTiemChungDto.setTenVaccine( thongTinTiemChung.getTenVaccine() );
        thongTinTiemChungDto.setLieuLuong( thongTinTiemChung.getLieuLuong() );
        thongTinTiemChungDto.setGhiChu( thongTinTiemChung.getGhiChu() );

        return thongTinTiemChungDto;
    }

    @Override
    public ThongTinTiemChung thongTinTiemChungDtoToThongTinTiemChung(ThongTinTiemChungDto thongTinTiemChungDto) {
        if ( thongTinTiemChungDto == null ) {
            return null;
        }

        ThongTinTiemChung thongTinTiemChung = new ThongTinTiemChung();

        thongTinTiemChung.setId( NguoiDungMapper.stringIdToLongId( thongTinTiemChungDto.getId() ) );
        thongTinTiemChung.setNgayTiem( hocSinhMapper.stringToLocalDate( thongTinTiemChungDto.getNgayTiem() ) );
        thongTinTiemChung.setTenVaccine( thongTinTiemChungDto.getTenVaccine() );
        thongTinTiemChung.setLieuLuong( thongTinTiemChungDto.getLieuLuong() );
        thongTinTiemChung.setGhiChu( thongTinTiemChungDto.getGhiChu() );

        return thongTinTiemChung;
    }

    @Override
    public List<ThongTinTiemChungDto> thongTinTiemChungListToDtoList(List<ThongTinTiemChung> list) {
        if ( list == null ) {
            return null;
        }

        List<ThongTinTiemChungDto> list1 = new ArrayList<ThongTinTiemChungDto>( list.size() );
        for ( ThongTinTiemChung thongTinTiemChung : list ) {
            list1.add( thongTinTiemChungToThongTinTiemChungDto( thongTinTiemChung ) );
        }

        return list1;
    }

    @Override
    public List<ThongTinTiemChung> thongTinTiemChungDtoListToEntityList(List<ThongTinTiemChungDto> list) {
        if ( list == null ) {
            return null;
        }

        List<ThongTinTiemChung> list1 = new ArrayList<ThongTinTiemChung>( list.size() );
        for ( ThongTinTiemChungDto thongTinTiemChungDto : list ) {
            list1.add( thongTinTiemChungDtoToThongTinTiemChung( thongTinTiemChungDto ) );
        }

        return list1;
    }

    @Override
    public HoSoSucKhoeDto hoSoSucKhoeToHoSoSucKhoeDto(HoSoSucKhoe hoSoSucKhoe) {
        if ( hoSoSucKhoe == null ) {
            return null;
        }

        HoSoSucKhoeDto hoSoSucKhoeDto = new HoSoSucKhoeDto();

        hoSoSucKhoeDto.setId( NguoiDungMapper.longIdToStringId( hoSoSucKhoe.getId() ) );
        hoSoSucKhoeDto.setIdHocSinh( NguoiDungMapper.longIdToStringId( hoSoSucKhoe.getIdHocSinh() ) );
        hoSoSucKhoeDto.setIdNguoiCapNhatCuoi( NguoiDungMapper.longIdToStringId( hoSoSucKhoe.getIdNguoiCapNhatCuoi() ) );
        hoSoSucKhoeDto.setNgayCapNhatCuoi( NguoiDungMapper.localDateTimeToString( hoSoSucKhoe.getNgayCapNhatCuoi() ) );
        hoSoSucKhoeDto.setNhomMau( hoSoSucKhoe.getNhomMau() );
        List<String> list = hoSoSucKhoe.getDiUng();
        if ( list != null ) {
            hoSoSucKhoeDto.setDiUng( new ArrayList<String>( list ) );
        }
        List<String> list1 = hoSoSucKhoe.getBenhManTinh();
        if ( list1 != null ) {
            hoSoSucKhoeDto.setBenhManTinh( new ArrayList<String>( list1 ) );
        }
        hoSoSucKhoeDto.setTienSuDieuTri( hoSoSucKhoe.getTienSuDieuTri() );
        hoSoSucKhoeDto.setThiLuc( chiTietLucToChiTietLucDto( hoSoSucKhoe.getThiLuc() ) );
        hoSoSucKhoeDto.setThinhLuc( chiTietLucToChiTietLucDto( hoSoSucKhoe.getThinhLuc() ) );
        hoSoSucKhoeDto.setTiemChung( thongTinTiemChungListToDtoList( hoSoSucKhoe.getTiemChung() ) );
        hoSoSucKhoeDto.setGhiChuKhac( hoSoSucKhoe.getGhiChuKhac() );

        return hoSoSucKhoeDto;
    }

    @Override
    public HoSoSucKhoe hoSoSucKhoeDtoToHoSoSucKhoe(HoSoSucKhoeDto hoSoSucKhoeDto) {
        if ( hoSoSucKhoeDto == null ) {
            return null;
        }

        HoSoSucKhoe hoSoSucKhoe = new HoSoSucKhoe();

        hoSoSucKhoe.setId( NguoiDungMapper.stringIdToLongId( hoSoSucKhoeDto.getId() ) );
        hoSoSucKhoe.setIdHocSinh( NguoiDungMapper.stringIdToLongId( hoSoSucKhoeDto.getIdHocSinh() ) );
        hoSoSucKhoe.setIdNguoiCapNhatCuoi( NguoiDungMapper.stringIdToLongId( hoSoSucKhoeDto.getIdNguoiCapNhatCuoi() ) );
        hoSoSucKhoe.setNhomMau( hoSoSucKhoeDto.getNhomMau() );
        List<String> list = hoSoSucKhoeDto.getDiUng();
        if ( list != null ) {
            hoSoSucKhoe.setDiUng( new ArrayList<String>( list ) );
        }
        List<String> list1 = hoSoSucKhoeDto.getBenhManTinh();
        if ( list1 != null ) {
            hoSoSucKhoe.setBenhManTinh( new ArrayList<String>( list1 ) );
        }
        hoSoSucKhoe.setTienSuDieuTri( hoSoSucKhoeDto.getTienSuDieuTri() );
        hoSoSucKhoe.setThiLuc( chiTietLucDtoToChiTietLuc( hoSoSucKhoeDto.getThiLuc() ) );
        hoSoSucKhoe.setThinhLuc( chiTietLucDtoToChiTietLuc( hoSoSucKhoeDto.getThinhLuc() ) );
        hoSoSucKhoe.setTiemChung( thongTinTiemChungDtoListToEntityList( hoSoSucKhoeDto.getTiemChung() ) );
        hoSoSucKhoe.setGhiChuKhac( hoSoSucKhoeDto.getGhiChuKhac() );

        return hoSoSucKhoe;
    }
}
