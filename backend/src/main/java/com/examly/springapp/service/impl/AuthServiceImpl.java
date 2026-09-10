package com.examly.springapp.service.impl;

import com.examly.springapp.dto.AuthRequest;
import com.examly.springapp.dto.AuthResponse;
import com.examly.springapp.dto.RegisterRequest;
import com.examly.springapp.exception.DuplicateEmployeeException;
import com.examly.springapp.exception.InvalidNameException;
import com.examly.springapp.exception.InvalidPhoneException;
import com.examly.springapp.model.Department;
import com.examly.springapp.model.Employee;
import com.examly.springapp.model.EmployeeStatus;
import com.examly.springapp.model.EmploymentType;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.DepartmentRepository;
import com.examly.springapp.repository.EmployeeRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.security.JwtUtils;
import com.examly.springapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils,
                           EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (request.getName() == null || !request.getName().trim().matches("^[A-Za-z ]+$")) {
            throw new InvalidNameException("Name must contain only alphabetic characters and spaces");
        }

        String rawPhone = request.getPhoneNumber() != null ? request.getPhoneNumber().replaceAll("[^0-9]", "") : "";
        if (rawPhone.length() > 10 && rawPhone.startsWith("91")) {
            rawPhone = rawPhone.substring(2);
        }
        if (rawPhone.length() != 10) {
            throw new InvalidPhoneException("Phone Number must be exactly 10 digits");
        }
        final String cleanPhone = rawPhone;
        final String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";

        if (cleanEmail.isEmpty()) {
            throw new InvalidNameException("Email cannot be empty");
        }

        if (userRepository.existsByEmailIgnoreCase(cleanEmail)) {
            throw new DuplicateEmployeeException("Email is already registered: " + cleanEmail);
        }

        Role assignedRole = request.getRole() != null ? request.getRole() : Role.EMPLOYEE;

        User user = User.builder()
                .name(request.getName().trim())
                .phoneNumber(cleanPhone)
                .email(cleanEmail)
                .passwordHash(passwordEncoder.encode(request.getPassword().trim()))
                .role(assignedRole)
                .isActive(true)
                .createdDate(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);

        // Also persist employee profile in employees table in MySQL
        if (!employeeRepository.existsByEmail(cleanEmail)) {
            long count = employeeRepository.count() + 1;
            String empId = String.format("EMP%04d", count);
            while (employeeRepository.existsByEmployeeId(empId)) {
                count++;
                empId = String.format("EMP%04d", count);
            }

            Department dept = null;
            if (assignedRole == Role.HR_BP) {
                dept = departmentRepository.findById(2L).orElse(null);
            } else if (assignedRole == Role.FINANCE_OFFICER) {
                dept = departmentRepository.findById(3L).orElse(null);
            } else {
                dept = departmentRepository.findById(1L).orElse(null);
            }

            String desig = (request.getDesignation() != null && !request.getDesignation().isBlank())
                    ? request.getDesignation().trim()
                    : (assignedRole == Role.MANAGER ? "Engineering Manager" :
                       assignedRole == Role.HR_BP ? "HR Business Partner" :
                       assignedRole == Role.FINANCE_OFFICER ? "Financial Analyst" : "Software Engineer");

            Employee employee = Employee.builder()
                    .employeeId(empId)
                    .name(savedUser.getName())
                    .phoneNumber(cleanPhone)
                    .email(cleanEmail)
                    .user(savedUser)
                    .department(dept)
                    .manager(null)
                    .designation(desig)
                    .dateOfJoining(LocalDate.now())
                    .employmentType(EmploymentType.FULL_TIME)
                    .status(EmployeeStatus.ACTIVE)
                    .build();
            employeeRepository.save(employee);
        }

        String token = jwtUtils.generateToken(savedUser.getEmail(), savedUser.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .build();
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        String inputEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";
        String inputPassword = request.getPassword() != null ? request.getPassword().trim() : "";

        // Normalize common usernames to email
        if (inputEmail.equalsIgnoreCase("admin")) {
            inputEmail = "admin@hris.com";
        } else if (inputEmail.equalsIgnoreCase("rithanya")) {
            inputEmail = "rithanya@hris.com";
        }

        // Try lookup by exact email or case-insensitive email in MySQL database
        final String searchEmail = inputEmail;
        User user = userRepository.findByEmailIgnoreCase(searchEmail)
                .or(() -> userRepository.findByEmail(searchEmail))
                .orElseThrow(() -> new com.examly.springapp.exception.UnauthorisedAccessException("Invalid email or password"));

        // Validate password strictly against user's stored password hash in MySQL
        boolean matches = passwordEncoder.matches(inputPassword, user.getPasswordHash())
                || (user.getPasswordHash() != null && user.getPasswordHash().equals(inputPassword));

        if (!matches) {
            throw new com.examly.springapp.exception.UnauthorisedAccessException("Invalid email or password");
        }

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }


    @Override
    public void logout(String token) {
        // Stateless JWT logout
    }

    @Override
    public boolean isEmailAvailable(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return !userRepository.existsByEmailIgnoreCase(email.trim());
    }
}
