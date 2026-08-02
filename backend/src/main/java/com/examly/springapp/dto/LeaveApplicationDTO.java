package com.examly.springapp.dto;

import com.examly.springapp.model.LeaveStatus;
import com.examly.springapp.model.LeaveType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveApplicationDTO {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private LeaveType leaveType;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String reason;
    private LeaveStatus status;
    private Long approvedById;
    private String approvedByName;

    public LeaveApplicationDTO() {
    }

    public LeaveApplicationDTO(Long id, Long employeeId, String employeeName, LeaveType leaveType, LocalDate fromDate, LocalDate toDate, String reason, LeaveStatus status, Long approvedById, String approvedByName) {
        this.id = id;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.leaveType = leaveType;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.reason = reason;
        this.status = status;
        this.approvedById = approvedById;
        this.approvedByName = approvedByName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

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

    public Long getApprovedById() { return approvedById; }
    public void setApprovedById(Long approvedById) { this.approvedById = approvedById; }

    public String getApprovedByName() { return approvedByName; }
    public void setApprovedByName(String approvedByName) { this.approvedByName = approvedByName; }

    public static LeaveApplicationDTOBuilder builder() { return new LeaveApplicationDTOBuilder(); }

    public static class LeaveApplicationDTOBuilder {
        private Long id;
        private Long employeeId;
        private String employeeName;
        private LeaveType leaveType;
        private LocalDate fromDate;
        private LocalDate toDate;
        private String reason;
        private LeaveStatus status;
        private Long approvedById;
        private String approvedByName;

        public LeaveApplicationDTOBuilder id(Long id) { this.id = id; return this; }
        public LeaveApplicationDTOBuilder employeeId(Long employeeId) { this.employeeId = employeeId; return this; }
        public LeaveApplicationDTOBuilder employeeName(String employeeName) { this.employeeName = employeeName; return this; }
        public LeaveApplicationDTOBuilder leaveType(LeaveType leaveType) { this.leaveType = leaveType; return this; }
        public LeaveApplicationDTOBuilder fromDate(LocalDate fromDate) { this.fromDate = fromDate; return this; }
        public LeaveApplicationDTOBuilder toDate(LocalDate toDate) { this.toDate = toDate; return this; }
        public LeaveApplicationDTOBuilder reason(String reason) { this.reason = reason; return this; }
        public LeaveApplicationDTOBuilder status(LeaveStatus status) { this.status = status; return this; }
        public LeaveApplicationDTOBuilder approvedById(Long approvedById) { this.approvedById = approvedById; return this; }
        public LeaveApplicationDTOBuilder approvedByName(String approvedByName) { this.approvedByName = approvedByName; return this; }

        public LeaveApplicationDTO build() {
            return new LeaveApplicationDTO(id, employeeId, employeeName, leaveType, fromDate, toDate, reason, status, approvedById, approvedByName);
        }
    }
}
