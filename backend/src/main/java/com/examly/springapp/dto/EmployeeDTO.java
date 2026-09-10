package com.examly.springapp.dto;

import com.examly.springapp.model.EmployeeStatus;
import com.examly.springapp.model.EmploymentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
public class EmployeeDTO {
    private Long id;
    private String employeeId;
    private String name;
    private String phoneNumber;
    private String email;
    private Long userId;
    private Long departmentId;
    private String departmentName;
    private Long managerId;
    private String managerName;
    private String designation;
    private LocalDate dateOfJoining;
    private EmploymentType employmentType;
    private EmployeeStatus status;

    public EmployeeDTO() {
    }

    public EmployeeDTO(Long id, String employeeId, String name, String phoneNumber, String email, Long userId, Long departmentId, String departmentName, Long managerId, String managerName, String designation, LocalDate dateOfJoining, EmploymentType employmentType, EmployeeStatus status) {
        this.id = id;
        this.employeeId = employeeId;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.userId = userId;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.managerId = managerId;
        this.managerName = managerName;
        this.designation = designation;
        this.dateOfJoining = dateOfJoining;
        this.employmentType = employmentType;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public Long getManagerId() { return managerId; }
    public void setManagerId(Long managerId) { this.managerId = managerId; }

    public String getManagerName() { return managerName; }
    public void setManagerName(String managerName) { this.managerName = managerName; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public LocalDate getDateOfJoining() { return dateOfJoining; }
    public void setDateOfJoining(LocalDate dateOfJoining) { this.dateOfJoining = dateOfJoining; }

    public EmploymentType getEmploymentType() { return employmentType; }
    public void setEmploymentType(EmploymentType employmentType) { this.employmentType = employmentType; }

    public EmployeeStatus getStatus() { return status; }
    public void setStatus(EmployeeStatus status) { this.status = status; }

    public static EmployeeDTOBuilder builder() { return new EmployeeDTOBuilder(); }

    public static class EmployeeDTOBuilder {
        private Long id;
        private String employeeId;
        private String name;
        private String phoneNumber;
        private String email;
        private Long userId;
        private Long departmentId;
        private String departmentName;
        private Long managerId;
        private String managerName;
        private String designation;
        private LocalDate dateOfJoining;
        private EmploymentType employmentType;
        private EmployeeStatus status;

        public EmployeeDTOBuilder id(Long id) { this.id = id; return this; }
        public EmployeeDTOBuilder employeeId(String employeeId) { this.employeeId = employeeId; return this; }
        public EmployeeDTOBuilder name(String name) { this.name = name; return this; }
        public EmployeeDTOBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public EmployeeDTOBuilder email(String email) { this.email = email; return this; }
        public EmployeeDTOBuilder userId(Long userId) { this.userId = userId; return this; }
        public EmployeeDTOBuilder departmentId(Long departmentId) { this.departmentId = departmentId; return this; }
        public EmployeeDTOBuilder departmentName(String departmentName) { this.departmentName = departmentName; return this; }
        public EmployeeDTOBuilder managerId(Long managerId) { this.managerId = managerId; return this; }
        public EmployeeDTOBuilder managerName(String managerName) { this.managerName = managerName; return this; }
        public EmployeeDTOBuilder designation(String designation) { this.designation = designation; return this; }
        public EmployeeDTOBuilder dateOfJoining(LocalDate dateOfJoining) { this.dateOfJoining = dateOfJoining; return this; }
        public EmployeeDTOBuilder employmentType(EmploymentType employmentType) { this.employmentType = employmentType; return this; }
        public EmployeeDTOBuilder status(EmployeeStatus status) { this.status = status; return this; }

        public EmployeeDTO build() {
            return new EmployeeDTO(id, employeeId, name, phoneNumber, email, userId, departmentId, departmentName, managerId, managerName, designation, dateOfJoining, employmentType, status);
        }
    }
}
