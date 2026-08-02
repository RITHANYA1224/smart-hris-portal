package com.examly.springapp.repository;

import com.examly.springapp.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    List<Payroll> findByEmployeeId(Long employeeId);

    @Query("SELECT p FROM Payroll p WHERE p.employee.id = :employeeId AND FUNCTION('MONTH', p.payPeriod) = :month")
    Optional<Payroll> findByEmployeeIdAndMonth(@Param("employeeId") Long employeeId, @Param("month") int month);
}
