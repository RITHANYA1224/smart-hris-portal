package com.examly.springapp.service.impl;

import com.examly.springapp.dto.LeaveApplicationDTO;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.Employee;
import com.examly.springapp.model.LeaveApplication;
import com.examly.springapp.model.LeaveStatus;
import com.examly.springapp.repository.EmployeeRepository;
import com.examly.springapp.repository.LeaveApplicationRepository;
import com.examly.springapp.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveApplicationRepository leaveApplicationRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveServiceImpl(LeaveApplicationRepository leaveApplicationRepository, EmployeeRepository employeeRepository) {
        this.leaveApplicationRepository = leaveApplicationRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public LeaveApplicationDTO applyLeave(LeaveApplicationDTO dto) {
        Employee employee = null;

        if (dto.getEmployeeId() != null && dto.getEmployeeId() > 0) {
            employee = employeeRepository.findById(dto.getEmployeeId()).orElse(null);
        }

        if (employee == null && dto.getEmployeeName() != null && !dto.getEmployeeName().isBlank()) {
            List<Employee> matches = employeeRepository.searchEmployees(dto.getEmployeeName());
            if (!matches.isEmpty()) {
                employee = matches.get(0);
            }
        }

        if (employee == null) {
            employee = employeeRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + dto.getEmployeeId()));
        }

        LeaveApplication leave = LeaveApplication.builder()
                .employee(employee)
                .leaveType(dto.getLeaveType() != null ? dto.getLeaveType() : com.examly.springapp.model.LeaveType.CASUAL)
                .fromDate(dto.getFromDate())
                .toDate(dto.getToDate())
                .reason(dto.getReason())
                .status(LeaveStatus.PENDING)
                .build();

        LeaveApplication saved = leaveApplicationRepository.save(leave);
        return mapToDTO(saved);
    }


    @Override
    public List<LeaveApplicationDTO> getPendingLeaves() {
        return leaveApplicationRepository.findByStatus(LeaveStatus.PENDING).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LeaveApplicationDTO approveLeave(Long id, Long approverId) {
        LeaveApplication leave = leaveApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave application not found with id: " + id));

        if (approverId != null) {
            Employee approver = employeeRepository.findById(approverId)
                    .orElse(null);
            leave.setApprovedBy(approver);
        }
        leave.setStatus(LeaveStatus.APPROVED);

        LeaveApplication updated = leaveApplicationRepository.save(leave);
        return mapToDTO(updated);
    }

    @Override
    public List<LeaveApplicationDTO> getAllLeaves() {
        return leaveApplicationRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteLeave(Long id) {
        LeaveApplication leave = leaveApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave application not found with id: " + id));
        leaveApplicationRepository.delete(leave);
    }


    private LeaveApplicationDTO mapToDTO(LeaveApplication leave) {
        return LeaveApplicationDTO.builder()
                .id(leave.getId())
                .employeeId(leave.getEmployee().getId())
                .employeeName(leave.getEmployee().getName())
                .leaveType(leave.getLeaveType())
                .fromDate(leave.getFromDate())
                .toDate(leave.getToDate())
                .reason(leave.getReason())
                .status(leave.getStatus())
                .approvedById(leave.getApprovedBy() != null ? leave.getApprovedBy().getId() : null)
                .approvedByName(leave.getApprovedBy() != null ? leave.getApprovedBy().getName() : null)
                .build();
    }
}
