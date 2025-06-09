package com.example.schoolhealth.dtos;

import lombok.Data;
import java.time.LocalDate;

@Data
public class StudentDTO {
    private String id;
    private String hoTen; // fullName
    private String maHocSinh; // studentCode
    private String ngaySinh; // dateOfBirth (ISO date string)
    private String gioiTinh; // gender
    private String lop; // className
    private Long idTruongHoc; // schoolId
    private Long idNguoiGiamHoChinh; // parentId
    private String[] cacNguoiGiamHoKhacIds; // other guardian IDs (if any)
    private String idHoSoSucKhoe; // healthRecordId
    private String anhDaiDienUrl; // profile picture URL
    private String ghiChu; // notes
}
