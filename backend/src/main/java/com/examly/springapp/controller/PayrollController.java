package com.examly.springapp.controller;

import com.examly.springapp.dto.PayrollDTO;
import com.examly.springapp.service.PayrollService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payroll")
@RequiredArgsConstructor
@Tag(name = "Payroll Management", description = "Run monthly payroll with CTC breakdown, statutory deductions, and generate payslips")
public class PayrollController {

    private final PayrollService payrollService;

    public PayrollController(PayrollService payrollService) {
        this.payrollService = payrollService;
    }

    @PostMapping("/run")
    @Operation(summary = "Run payroll batch processing", description = "Calculate and process monthly salary payouts for all active employees and update DB")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Payroll batch run processed successfully")
    public ResponseEntity<List<PayrollDTO>> runPayroll() {
        List<PayrollDTO> result = payrollService.runPayroll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{empId}/payslip/{month}")
    @Operation(summary = "Get employee payslip", description = "Fetch monthly payslip breakdown for employee ID and specified month")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Payslip fetched successfully")
    public ResponseEntity<PayrollDTO> getPayslip(@PathVariable Long empId, @PathVariable int month) {
        PayrollDTO payslip = payrollService.getPayslip(empId, month);
        return ResponseEntity.ok(payslip);
    }

    @PostMapping
    @Operation(summary = "Create custom payroll entry", description = "Persist single payroll record in DB")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Payroll entry created successfully")
    public ResponseEntity<PayrollDTO> createPayroll(@RequestBody PayrollDTO dto) {
        PayrollDTO created = payrollService.createPayroll(dto);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete payroll record", description = "Delete a payroll record by ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Payroll record deleted successfully")
    public ResponseEntity<java.util.Map<String, String>> deletePayroll(@PathVariable Long id) {
        payrollService.deletePayroll(id);
        return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Record deleted successfully."));
    }

    @GetMapping
    @Operation(summary = "Get all payroll records", description = "Fetch all generated payroll records from DB")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Payroll records fetched successfully")
    public ResponseEntity<List<PayrollDTO>> getAllPayroll() {
        List<PayrollDTO> list = payrollService.getAllPayroll();
        return ResponseEntity.ok(list);
    }
}

