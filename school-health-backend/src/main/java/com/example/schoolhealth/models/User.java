package com.example.schoolhealth.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "users") // Assuming a table name, adjust if necessary
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username; // Example field

    @OneToMany(mappedBy = "parent")
    private List<Student> students; // Bidirectional relationship
}
