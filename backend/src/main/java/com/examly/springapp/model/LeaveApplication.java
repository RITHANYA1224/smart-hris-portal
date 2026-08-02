package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "leave_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Enumerated(EnumType.STRING)
    @Column(name = "leave_type", nullable = false)
    private LeaveType leaveType;

    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @Column(name = "to_date", nullable = false)
    private LocalDate toDate;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private LeaveStatus status = LeaveStatus.PENDING;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "approved_by")
    private Employee approvedBy;

    public LeaveApplication() {
    }

    public LeaveApplication(Long id, Employee employee, LeaveType leaveType, LocalDate fromDate, LocalDate toDate, String reason, LeaveStatus status, Employee approvedBy) {
        this.id = id;
        this.employee = employee;
        this.leaveType = leaveType;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.reason = reason;
        this.status = status != null ? status : LeaveStatus.PENDING;
        this.approvedBy = approvedBy;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public LeaveType getLeaveType() { return leaveType; }
    public void setLeaveType(LeaveType leaveType) { this.leaveType = leaveType; }

    public LocalDate getFromDate() { return fromDate; }
    public void setFromDate(LocalDate fromDate) { this.fromDate = fromDate; }

    public LocalDate getToDate() { return toDate; }
    public void setToDate(LocalDate toDate) { this.toDate = toDate; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public LeaveStatus getStatus() { return status; }
    public void setStatus(LeaveStatus status) { this.status = status; }

    public Employee getApprovedBy() { return approvedBy; }
    public void setApprovedBy(Employee approvedBy) { this.approvedBy = approvedBy; }

    public static LeaveApplicationBuilder builder() { return new LeaveApplicationBuilder(); }

    public static class LeaveApplicationBuilder {
        private Long id;
        private Employee employee;
        private LeaveType leaveType;
        private LocalDate fromDate;
        private LocalDate toDate;
        private String reason;
        private LeaveStatus status = LeaveStatus.PENDING;
        private Employee approvedBy;

        public LeaveApplicationBuilder id(Long id) { this.id = id; return this; }
        public LeaveApplicationBuilder employee(Employee employee) { this.employee = employee; return this; }
        public LeaveApplicationBuilder leaveType(LeaveType leaveType) { this.leaveType = leaveType; return this; }
        public LeaveApplicationBuilder fromDate(LocalDate fromDate) { this.fromDate = fromDate; return this; }
        public LeaveApplicationBuilder toDate(LocalDate toDate) { this.toDate = toDate; return this; }
        public LeaveApplicationBuilder reason(String reason) { this.reason = reason; return this; }
        public LeaveApplicationBuilder status(LeaveStatus status) { this.status = status; return this; }
        public LeaveApplicationBuilder approvedBy(Employee approvedBy) { this.approvedBy = approvedBy; return this; }

        public LeaveApplication build() {
            return new LeaveApplication(id, employee, leaveType, fromDate, toDate, reason, status, approvedBy);
        }
    }
}
