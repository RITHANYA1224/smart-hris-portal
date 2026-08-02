package com.examly.springapp.repository;

import com.examly.springapp.model.EmployeeSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, EmployeeSkill.EmployeeSkillId> {
    List<EmployeeSkill> findByEmployeeId(Long employeeId);
}
