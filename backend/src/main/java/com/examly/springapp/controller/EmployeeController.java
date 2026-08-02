package com.examly.springapp.controller;

import com.examly.springapp.dto.EmployeeDTO;
import com.examly.springapp.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Tag(name = "Employee Management", description = "CRUD operations, org chart, search, and lifecycle management for employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    @Operation(summary = "Create employee record", description = "Create a new employee record. Validates name, phone number, and unique constraints, persisting changes in the DB.")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Employee created successfully")
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO dto) {
        EmployeeDTO created = employeeService.createEmployee(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employee by ID", description = "Fetch employee details by record ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Employee retrieved successfully")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
        EmployeeDTO dto = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update employee record", description = "Update existing employee record details in the DB")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Employee updated successfully")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO dto) {
        EmployeeDTO updated = employeeService.updateEmployee(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete employee record", description = "Delete an employee record by ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Employee deleted successfully")
    public ResponseEntity<java.util.Map<String, String>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Record deleted successfully."));
    }

    @GetMapping("/org-chart")
    @Operation(summary = "Get organization chart", description = "Retrieve operational reporting hierarchy structure for all employees")
    public ResponseEntity<List<EmployeeDTO>> getOrgChart() {
        List<EmployeeDTO> orgChart = employeeService.getOrgChart();
        return ResponseEntity.ok(orgChart);
    }

    @GetMapping("/search")
    @Operation(summary = "Search employees", description = "Search employees by name, email, or designation")
    public ResponseEntity<List<EmployeeDTO>> searchEmployees(@RequestParam(name = "q", required = false) String query) {
        List<EmployeeDTO> results = employeeService.searchEmployees(query);
        return ResponseEntity.ok(results);
    }

    @GetMapping
    @Operation(summary = "Get all employees", description = "Fetch complete list of employees from DB")
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
}

