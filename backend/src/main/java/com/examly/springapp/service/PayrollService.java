package com.examly.springapp.service;

import com.examly.springapp.dto.PayrollDTO;
import java.util.List;

public interface PayrollService {
    List<PayrollDTO> runPayroll();
    PayrollDTO getPayslip(Long employeeId, int month);
    PayrollDTO createPayroll(PayrollDTO dto);
    List<PayrollDTO> getAllPayroll();
    void deletePayroll(Long id);
}

