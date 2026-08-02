package com.examly.springapp.repository;

import com.examly.springapp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmployeeId(String employeeId);
    Optional<Employee> findByEmail(String email);
    Boolean existsByEmployeeId(String employeeId);
    Boolean existsByEmail(String email);

    List<Employee> findByManagerId(Long managerId);

    @Query("SELECT e FROM Employee e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(e.email) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(e.designation) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Employee> searchEmployees(@Param("query") String query);
}
