package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_id", nullable = false, unique = true, length = 20)
    private String employeeId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "phone_number", nullable = false, length = 10)
    private String phoneNumber;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "manager_id")
    private Employee manager;

    @Column(nullable = false, length = 100)
    private String designation;

    @Column(name = "date_of_joining", nullable = false)
    private LocalDate dateOfJoining;

    @Enumerated(EnumType.STRING)
    @Column(name = "employment_type", nullable = false)
    private EmploymentType employmentType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmployeeStatus status;

    public Employee() {
    }

    public Employee(Long id, String employeeId, String name, String phoneNumber, String email, User user, Department department, Employee manager, String designation, LocalDate dateOfJoining, EmploymentType employmentType, EmployeeStatus status) {
        this.id = id;
        this.employeeId = employeeId;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.user = user;
        this.department = department;
        this.manager = manager;
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

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    public Employee getManager() { return manager; }
    public void setManager(Employee manager) { this.manager = manager; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public LocalDate getDateOfJoining() { return dateOfJoining; }
    public void setDateOfJoining(LocalDate dateOfJoining) { this.dateOfJoining = dateOfJoining; }

    public EmploymentType getEmploymentType() { return employmentType; }
    public void setEmploymentType(EmploymentType employmentType) { this.employmentType = employmentType; }

    public EmployeeStatus getStatus() { return status; }
    public void setStatus(EmployeeStatus status) { this.status = status; }

    public static EmployeeBuilder builder() { return new EmployeeBuilder(); }

    public static class EmployeeBuilder {
        private Long id;
        private String employeeId;
        private String name;
        private String phoneNumber;
        private String email;
        private User user;
        private Department department;
        private Employee manager;
        private String designation;
        private LocalDate dateOfJoining;
        private EmploymentType employmentType;
        private EmployeeStatus status;

        public EmployeeBuilder id(Long id) { this.id = id; return this; }
        public EmployeeBuilder employeeId(String employeeId) { this.employeeId = employeeId; return this; }
        public EmployeeBuilder name(String name) { this.name = name; return this; }
        public EmployeeBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public EmployeeBuilder email(String email) { this.email = email; return this; }
        public EmployeeBuilder user(User user) { this.user = user; return this; }
        public EmployeeBuilder department(Department department) { this.department = department; return this; }
        public EmployeeBuilder manager(Employee manager) { this.manager = manager; return this; }
        public EmployeeBuilder designation(String designation) { this.designation = designation; return this; }
        public EmployeeBuilder dateOfJoining(LocalDate dateOfJoining) { this.dateOfJoining = dateOfJoining; return this; }
        public EmployeeBuilder employmentType(EmploymentType employmentType) { this.employmentType = employmentType; return this; }
        public EmployeeBuilder status(EmployeeStatus status) { this.status = status; return this; }

        public Employee build() {
            return new Employee(id, employeeId, name, phoneNumber, email, user, department, manager, designation, dateOfJoining, employmentType, status);
        }
    }
}
