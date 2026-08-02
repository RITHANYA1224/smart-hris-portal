package com.examly.springapp.service;

import com.examly.springapp.dto.EmployeeDTO;
import java.util.List;

public interface EmployeeService {
    EmployeeDTO createEmployee(EmployeeDTO dto);
    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO updateEmployee(Long id, EmployeeDTO dto);
    List<EmployeeDTO> getOrgChart();
    List<EmployeeDTO> searchEmployees(String query);
    List<EmployeeDTO> getAllEmployees();
    void deleteEmployee(Long id);
}

