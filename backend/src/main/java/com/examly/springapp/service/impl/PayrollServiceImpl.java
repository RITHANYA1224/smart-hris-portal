package com.examly.springapp.service.impl;

import com.examly.springapp.dto.PayrollDTO;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.Employee;
import com.examly.springapp.model.Payroll;
import com.examly.springapp.model.PayrollStatus;
import com.examly.springapp.repository.EmployeeRepository;
import com.examly.springapp.repository.PayrollRepository;
import com.examly.springapp.service.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PayrollServiceImpl implements PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;

    public PayrollServiceImpl(PayrollRepository payrollRepository, EmployeeRepository employeeRepository) {
        this.payrollRepository = payrollRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<PayrollDTO> runPayroll() {
        List<Employee> employees = employeeRepository.findAll();
        List<Payroll> processedPayrolls = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (Employee emp : employees) {
            BigDecimal gross = BigDecimal.valueOf(75000.00); // Default base CTC gross
            BigDecimal pf = gross.multiply(BigDecimal.valueOf(0.12)).setScale(2, RoundingMode.HALF_UP);
            BigDecimal esi = gross.multiply(BigDecimal.valueOf(0.0075)).setScale(2, RoundingMode.HALF_UP);
            BigDecimal tds = gross.multiply(BigDecimal.valueOf(0.10)).setScale(2, RoundingMode.HALF_UP);
            BigDecimal netPay = gross.subtract(pf.add(esi).add(tds)).setScale(2, RoundingMode.HALF_UP);

            Payroll payroll = Payroll.builder()
                    .employee(emp)
                    .payPeriod(today.withDayOfMonth(today.lengthOfMonth()))
                    .gross(gross)
                    .pfEmployee(pf)
                    .esiEmployee(esi)
                    .tds(tds)
                    .netPay(netPay)
                    .status(PayrollStatus.PROCESSED)
                    .build();

            processedPayrolls.add(payrollRepository.save(payroll));
        }

        return processedPayrolls.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public PayrollDTO getPayslip(Long employeeId, int month) {
        Payroll payroll = payrollRepository.findByEmployeeIdAndMonth(employeeId, month)
                .orElseThrow(() -> new ResourceNotFoundException("Payslip not found for employee ID: " + employeeId + " and month: " + month));
        return mapToDTO(payroll);
    }

    @Override
    public PayrollDTO createPayroll(PayrollDTO dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + dto.getEmployeeId()));

        BigDecimal gross = dto.getGross() != null ? dto.getGross() : BigDecimal.ZERO;
        BigDecimal pf = dto.getPfEmployee() != null ? dto.getPfEmployee() : gross.multiply(BigDecimal.valueOf(0.12)).setScale(2, RoundingMode.HALF_UP);
        BigDecimal esi = dto.getEsiEmployee() != null ? dto.getEsiEmployee() : gross.multiply(BigDecimal.valueOf(0.0075)).setScale(2, RoundingMode.HALF_UP);
        BigDecimal tds = dto.getTds() != null ? dto.getTds() : gross.multiply(BigDecimal.valueOf(0.10)).setScale(2, RoundingMode.HALF_UP);
        BigDecimal netPay = gross.subtract(pf.add(esi).add(tds)).setScale(2, RoundingMode.HALF_UP);

        Payroll payroll = Payroll.builder()
                .employee(employee)
                .payPeriod(dto.getPayPeriod() != null ? dto.getPayPeriod() : LocalDate.now())
                .gross(gross)
                .pfEmployee(pf)
                .esiEmployee(esi)
                .tds(tds)
                .netPay(netPay)
                .status(dto.getStatus() != null ? dto.getStatus() : PayrollStatus.PROCESSED)
                .build();

        Payroll saved = payrollRepository.save(payroll);
        return mapToDTO(saved);
    }

    @Override
    public List<PayrollDTO> getAllPayroll() {
        return payrollRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePayroll(Long id) {
        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll record not found with id: " + id));
        payrollRepository.delete(payroll);
    }


    private PayrollDTO mapToDTO(Payroll payroll) {
        return PayrollDTO.builder()
                .id(payroll.getId())
                .employeeId(payroll.getEmployee().getId())
                .employeeName(payroll.getEmployee().getName())
                .payPeriod(payroll.getPayPeriod())
                .gross(payroll.getGross())
                .pfEmployee(payroll.getPfEmployee())
                .esiEmployee(payroll.getEsiEmployee())
                .tds(payroll.getTds())
                .netPay(payroll.getNetPay())
                .status(payroll.getStatus())
                .build();
    }
}
