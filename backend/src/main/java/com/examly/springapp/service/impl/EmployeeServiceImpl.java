package com.examly.springapp.service.impl;

import com.examly.springapp.dto.EmployeeDTO;
import com.examly.springapp.exception.DuplicateEmployeeException;
import com.examly.springapp.exception.InvalidNameException;
import com.examly.springapp.exception.InvalidPhoneException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.Department;
import com.examly.springapp.model.Employee;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.DepartmentRepository;
import com.examly.springapp.repository.EmployeeRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository, UserRepository userRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }

    private void validateEmployeeData(EmployeeDTO dto, boolean isCreate, Long existingId) {
        if (dto.getName() == null || !dto.getName().matches("^[A-Za-z ]+$")) {
            throw new InvalidNameException("Name must contain only alphabetic characters and spaces");
        }

        if (dto.getPhoneNumber() == null || !dto.getPhoneNumber().matches("^[0-9]{10}$")) {
            throw new InvalidPhoneException("Phone Number must be exactly 10 digits");
        }

        if (isCreate) {
            if (dto.getEmployeeId() != null && employeeRepository.existsByEmployeeId(dto.getEmployeeId())) {
                throw new DuplicateEmployeeException("Employee ID already exists: " + dto.getEmployeeId());
            }
            if (dto.getEmail() != null && employeeRepository.existsByEmail(dto.getEmail())) {
                throw new DuplicateEmployeeException("Employee with email already exists: " + dto.getEmail());
            }
        } else {
            employeeRepository.findByEmployeeId(dto.getEmployeeId())
                    .ifPresent(e -> {
                        if (!e.getId().equals(existingId)) {
                            throw new DuplicateEmployeeException("Employee ID already exists: " + dto.getEmployeeId());
                        }
                    });
            employeeRepository.findByEmail(dto.getEmail())
                    .ifPresent(e -> {
                        if (!e.getId().equals(existingId)) {
                            throw new DuplicateEmployeeException("Employee with email already exists: " + dto.getEmail());
                        }
                    });
        }
    }

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO dto) {
        validateEmployeeData(dto, true, null);

        Department dept = null;
        if (dto.getDepartmentId() != null) {
            dept = departmentRepository.findById(dto.getDepartmentId())
                    .orElse(null);
        }

        Employee manager = null;
        if (dto.getManagerId() != null) {
            manager = employeeRepository.findById(dto.getManagerId())
                    .orElse(null);
        }

        User user = null;
        if (dto.getUserId() != null) {
            user = userRepository.findById(dto.getUserId())
                    .orElse(null);
        }

        Employee employee = Employee.builder()
                .employeeId(dto.getEmployeeId() != null ? dto.getEmployeeId() : "EMP" + System.currentTimeMillis())
                .name(dto.getName())
                .phoneNumber(dto.getPhoneNumber())
                .email(dto.getEmail())
                .user(user)
                .department(dept)
                .manager(manager)
                .designation(dto.getDesignation())
                .dateOfJoining(dto.getDateOfJoining())
                .employmentType(dto.getEmploymentType())
                .status(dto.getStatus())
                .build();

        Employee saved = employeeRepository.save(employee);
        return mapToDTO(saved);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return mapToDTO(employee);
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        validateEmployeeData(dto, false, id);

        if (dto.getName() != null) employee.setName(dto.getName());
        if (dto.getPhoneNumber() != null) employee.setPhoneNumber(dto.getPhoneNumber());
        if (dto.getEmail() != null) employee.setEmail(dto.getEmail());
        if (dto.getDesignation() != null) employee.setDesignation(dto.getDesignation());
        if (dto.getDateOfJoining() != null) employee.setDateOfJoining(dto.getDateOfJoining());
        if (dto.getEmploymentType() != null) employee.setEmploymentType(dto.getEmploymentType());
        if (dto.getStatus() != null) employee.setStatus(dto.getStatus());

        if (dto.getDepartmentId() != null) {
            Department dept = departmentRepository.findById(dto.getDepartmentId()).orElse(null);
            employee.setDepartment(dept);
        }

        if (dto.getManagerId() != null) {
            Employee manager = employeeRepository.findById(dto.getManagerId()).orElse(null);
            employee.setManager(manager);
        }

        Employee updated = employeeRepository.save(employee);
        return mapToDTO(updated);
    }

    @Override
    public List<EmployeeDTO> getOrgChart() {
        return employeeRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDTO> searchEmployees(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllEmployees();
        }
        return employeeRepository.searchEmployees(query).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        employeeRepository.delete(employee);
    }


    private EmployeeDTO mapToDTO(Employee emp) {
        return EmployeeDTO.builder()
                .id(emp.getId())
                .employeeId(emp.getEmployeeId())
                .name(emp.getName())
                .phoneNumber(emp.getPhoneNumber())
                .email(emp.getEmail())
                .userId(emp.getUser() != null ? emp.getUser().getId() : null)
                .departmentId(emp.getDepartment() != null ? emp.getDepartment().getDeptId() : null)
                .departmentName(emp.getDepartment() != null ? emp.getDepartment().getDeptName() : null)
                .managerId(emp.getManager() != null ? emp.getManager().getId() : null)
                .managerName(emp.getManager() != null ? emp.getManager().getName() : null)
                .designation(emp.getDesignation())
                .dateOfJoining(emp.getDateOfJoining())
                .employmentType(emp.getEmploymentType())
                .status(emp.getStatus())
                .build();
    }
}
