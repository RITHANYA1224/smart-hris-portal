package com.examly.springapp.repository;

import com.examly.springapp.model.Appraisal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppraisalRepository extends JpaRepository<Appraisal, Long> {
    List<Appraisal> findByEmployeeId(Long employeeId);
    Optional<Appraisal> findByEmployeeIdAndCycleYear(Long employeeId, Integer cycleYear);
}
