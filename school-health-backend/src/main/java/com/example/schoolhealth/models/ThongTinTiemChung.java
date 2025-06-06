package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "thong_tin_tiem_chung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThongTinTiemChung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tenVaccine;
    private LocalDate ngayTiem;
    private String lieuLuong;
    private String ghiChu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ho_so_suc_khoe_id", nullable = false)
    private HoSoSucKhoe hoSoSucKhoe;
}
