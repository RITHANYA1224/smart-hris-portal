package com.examly.springapp.controller;

import com.examly.springapp.dto.AppraisalDTO;
import com.examly.springapp.service.ComplianceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Tag(name = "Statutory Compliance & Analytics", description = "PF/ESI statutory filings, appraisals initiation, and headcount attrition analytics")
public class ComplianceController {

    private final ComplianceService complianceService;

    public ComplianceController(ComplianceService complianceService) {
        this.complianceService = complianceService;
    }

    @GetMapping("/statutory/pf-challan")
    @Operation(summary = "Get PF Challan report", description = "Generate monthly Provident Fund (PF) ECR challan report")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "PF Challan report retrieved successfully")
    public ResponseEntity<Map<String, Object>> getPfChallan() {
        Map<String, Object> report = complianceService.getPfChallan();
        return ResponseEntity.ok(report);
    }

    @GetMapping("/statutory/esi-return")
    @Operation(summary = "Get ESI Return report", description = "Generate monthly Employee State Insurance (ESI) return summary")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "ESI Return report retrieved successfully")
    public ResponseEntity<Map<String, Object>> getEsiReturn() {
        Map<String, Object> report = complianceService.getEsiReturn();
        return ResponseEntity.ok(report);
    }

    @PostMapping("/appraisals/start")
    @Operation(summary = "Start appraisal cycle", description = "Initiate annual performance appraisal cycle for all employees in DB")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Appraisal cycle started successfully")
    public ResponseEntity<List<AppraisalDTO>> startAppraisals(@RequestParam(name = "cycleYear", required = false) Integer cycleYear) {
        List<AppraisalDTO> appraisals = complianceService.startAppraisals(cycleYear);
        return ResponseEntity.ok(appraisals);
    }

    @GetMapping("/analytics/attrition")
    @Operation(summary = "Get attrition analytics", description = "Retrieve headcount metrics, separation analytics, and attrition rates")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Attrition analytics retrieved successfully")
    public ResponseEntity<Map<String, Object>> getAttritionAnalytics() {
        Map<String, Object> analytics = complianceService.getAttritionAnalytics();
        return ResponseEntity.ok(analytics);
    }
}

