package com.examly.springapp.dto;

import com.examly.springapp.model.AppraisalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppraisalDTO {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private Integer cycleYear;
    private BigDecimal selfRating;
    private BigDecimal managerRating;
    private BigDecimal finalRating;
    private BigDecimal incrementPercentage;
    private AppraisalStatus status;

    public AppraisalDTO() {
    }

    public AppraisalDTO(Long id, Long employeeId, String employeeName, Integer cycleYear, BigDecimal selfRating, BigDecimal managerRating, BigDecimal finalRating, BigDecimal incrementPercentage, AppraisalStatus status) {
        this.id = id;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.cycleYear = cycleYear;
        this.selfRating = selfRating;
        this.managerRating = managerRating;
        this.finalRating = finalRating;
        this.incrementPercentage = incrementPercentage;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

    public Integer getCycleYear() { return cycleYear; }
    public void setCycleYear(Integer cycleYear) { this.cycleYear = cycleYear; }

    public BigDecimal getSelfRating() { return selfRating; }
    public void setSelfRating(BigDecimal selfRating) { this.selfRating = selfRating; }

    public BigDecimal getManagerRating() { return managerRating; }
    public void setManagerRating(BigDecimal managerRating) { this.managerRating = managerRating; }

    public BigDecimal getFinalRating() { return finalRating; }
    public void setFinalRating(BigDecimal finalRating) { this.finalRating = finalRating; }

    public BigDecimal getIncrementPercentage() { return incrementPercentage; }
    public void setIncrementPercentage(BigDecimal incrementPercentage) { this.incrementPercentage = incrementPercentage; }

    public AppraisalStatus getStatus() { return status; }
    public void setStatus(AppraisalStatus status) { this.status = status; }

    public static AppraisalDTOBuilder builder() { return new AppraisalDTOBuilder(); }

    public static class AppraisalDTOBuilder {
        private Long id;
        private Long employeeId;
        private String employeeName;
        private Integer cycleYear;
        private BigDecimal selfRating;
        private BigDecimal managerRating;
        private BigDecimal finalRating;
        private BigDecimal incrementPercentage;
        private AppraisalStatus status;

        public AppraisalDTOBuilder id(Long id) { this.id = id; return this; }
        public AppraisalDTOBuilder employeeId(Long employeeId) { this.employeeId = employeeId; return this; }
        public AppraisalDTOBuilder employeeName(String employeeName) { this.employeeName = employeeName; return this; }
        public AppraisalDTOBuilder cycleYear(Integer cycleYear) { this.cycleYear = cycleYear; return this; }
        public AppraisalDTOBuilder selfRating(BigDecimal selfRating) { this.selfRating = selfRating; return this; }
        public AppraisalDTOBuilder managerRating(BigDecimal managerRating) { this.managerRating = managerRating; return this; }
        public AppraisalDTOBuilder finalRating(BigDecimal finalRating) { this.finalRating = finalRating; return this; }
        public AppraisalDTOBuilder incrementPercentage(BigDecimal incrementPercentage) { this.incrementPercentage = incrementPercentage; return this; }
        public AppraisalDTOBuilder status(AppraisalStatus status) { this.status = status; return this; }

        public AppraisalDTO build() {
            return new AppraisalDTO(id, employeeId, employeeName, cycleYear, selfRating, managerRating, finalRating, incrementPercentage, status);
        }
    }
}
