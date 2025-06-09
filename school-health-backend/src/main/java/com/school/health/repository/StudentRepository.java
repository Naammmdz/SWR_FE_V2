package com.school.health.repository;

import com.school.health.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    List<Student> findByParentId(Integer parentId);
    List<Student> findByIsActiveTrue();
}
