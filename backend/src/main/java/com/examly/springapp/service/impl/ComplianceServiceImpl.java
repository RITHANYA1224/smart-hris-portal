package com.examly.springapp.service.impl;

import com.examly.springapp.dto.AppraisalDTO;
import com.examly.springapp.model.Appraisal;
import com.examly.springapp.model.AppraisalStatus;
import com.examly.springapp.model.Employee;
import com.examly.springapp.model.EmployeeStatus;
import com.examly.springapp.model.Payroll;
import com.examly.springapp.repository.AppraisalRepository;
import com.examly.springapp.repository.EmployeeRepository;
import com.examly.springapp.repository.PayrollRepository;
import com.examly.springapp.service.ComplianceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ComplianceServiceImpl implements ComplianceService {

    private final PayrollRepository payrollRepository;
    private final AppraisalRepository appraisalRepository;
    private final EmployeeRepository employeeRepository;

    public ComplianceServiceImpl(PayrollRepository payrollRepository, AppraisalRepository appraisalRepository, EmployeeRepository employeeRepository) {
        this.payrollRepository = payrollRepository;
        this.appraisalRepository = appraisalRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Map<String, Object> getPfChallan() {
        List<Payroll> payrolls = payrollRepository.findAll();
        BigDecimal totalPf = payrolls.stream()
                .map(Payroll::getPfEmployee)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> response = new HashMap<>();
        response.put("period", LocalDate.now().toString());
        response.put("totalEmployees", payrolls.size());
        response.put("totalPfContribution", totalPf);
        response.put("status", "READY_FOR_SUBMISSION");
        return response;
    }

    @Override
    public Map<String, Object> getEsiReturn() {
        List<Payroll> payrolls = payrollRepository.findAll();
        BigDecimal totalEsi = payrolls.stream()
                .map(Payroll::getEsiEmployee)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> response = new HashMap<>();
        response.put("period", LocalDate.now().toString());
        response.put("totalEmployees", payrolls.size());
        response.put("totalEsiContribution", totalEsi);
        response.put("status", "READY_FOR_SUBMISSION");
        return response;
    }

    @Override
    public List<AppraisalDTO> startAppraisals(Integer cycleYear) {
        int year = (cycleYear != null) ? cycleYear : LocalDate.now().getYear();
        List<Employee> employees = employeeRepository.findAll();
        List<Appraisal> createdAppraisals = new ArrayList<>();

        for (Employee emp : employees) {
            Optional<Appraisal> existing = appraisalRepository.findByEmployeeIdAndCycleYear(emp.getId(), year);
            if (existing.isEmpty()) {
                Appraisal appraisal = Appraisal.builder()
                        .employee(emp)
                        .cycleYear(year)
                        .status(AppraisalStatus.SELF_REVIEW)
                        .build();
                createdAppraisals.add(appraisalRepository.save(appraisal));
            } else {
                createdAppraisals.add(existing.get());
            }
        }

        return createdAppraisals.stream()
                .map(a -> AppraisalDTO.builder()
                        .id(a.getId())
                        .employeeId(a.getEmployee().getId())
                        .employeeName(a.getEmployee().getName())
                        .cycleYear(a.getCycleYear())
                        .selfRating(a.getSelfRating())
                        .managerRating(a.getManagerRating())
                        .finalRating(a.getFinalRating())
                        .incrementPercentage(a.getIncrementPercentage())
                        .status(a.getStatus())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getAttritionAnalytics() {
        List<Employee> employees = employeeRepository.findAll();
        long totalCount = employees.size();
        long separatedCount = employees.stream().filter(e -> e.getStatus() == EmployeeStatus.SEPARATED).count();
        long activeCount = employees.stream().filter(e -> e.getStatus() == EmployeeStatus.ACTIVE).count();
        long noticeCount = employees.stream().filter(e -> e.getStatus() == EmployeeStatus.ON_NOTICE).count();

        double attritionRate = totalCount > 0 ? ((double) separatedCount / totalCount) * 100.0 : 0.0;

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalHeadcount", totalCount);
        analytics.put("activeCount", activeCount);
        analytics.put("noticePeriodCount", noticeCount);
        analytics.put("separatedCount", separatedCount);
        analytics.put("attritionRatePercentage", Math.round(attritionRate * 100.0) / 100.0);
        return analytics;
    }
}
