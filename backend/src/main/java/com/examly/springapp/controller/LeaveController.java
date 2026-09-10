package com.examly.springapp.controller;

import com.examly.springapp.dto.LeaveApplicationDTO;
import com.examly.springapp.service.LeaveService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@Tag(name = "Leave Management", description = "Submit, view pending, approve, and manage leave applications")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @PostMapping
    @Operation(summary = "Apply for leave", description = "Create a new leave application in the DB")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Leave application submitted successfully")
    public ResponseEntity<LeaveApplicationDTO> applyLeave(@RequestBody LeaveApplicationDTO dto) {
        LeaveApplicationDTO created = leaveService.applyLeave(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/pending")
    @Operation(summary = "Get pending leave applications", description = "Retrieve list of all pending leave requests awaiting approval")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Pending leave applications retrieved successfully")
    public ResponseEntity<List<LeaveApplicationDTO>> getPendingLeaves() {
        List<LeaveApplicationDTO> pending = leaveService.getPendingLeaves();
        return ResponseEntity.ok(pending);
    }

    @PutMapping("/{id}/approve")
    @Operation(summary = "Approve leave application", description = "Approve leave request and update leave status in DB")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Leave application approved successfully")
    public ResponseEntity<LeaveApplicationDTO> approveLeave(@PathVariable Long id, @RequestParam(name = "approverId", required = false) Long approverId) {
        LeaveApplicationDTO approved = leaveService.approveLeave(id, approverId);
        return ResponseEntity.ok(approved);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete leave application", description = "Delete a leave application by ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Leave application deleted successfully")
    public ResponseEntity<java.util.Map<String, String>> deleteLeave(@PathVariable Long id) {
        leaveService.deleteLeave(id);
        return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Record deleted successfully."));
    }

    @GetMapping
    @Operation(summary = "Get all leave applications", description = "Retrieve all leave applications from DB")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Leave applications retrieved successfully")
    public ResponseEntity<List<LeaveApplicationDTO>> getAllLeaves() {
        List<LeaveApplicationDTO> leaves = leaveService.getAllLeaves();
        return ResponseEntity.ok(leaves);
    }
}

