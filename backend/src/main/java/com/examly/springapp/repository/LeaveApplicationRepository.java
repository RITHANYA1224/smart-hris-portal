package com.examly.springapp.repository;

import com.examly.springapp.model.LeaveApplication;
import com.examly.springapp.model.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveApplicationRepository extends JpaRepository<LeaveApplication, Long> {
    List<LeaveApplication> findByStatus(LeaveStatus status);
    List<LeaveApplication> findByEmployeeId(Long employeeId);
}
