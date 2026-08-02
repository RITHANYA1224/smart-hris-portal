package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "appraisals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appraisal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "cycle_year", nullable = false)
    private Integer cycleYear;

    @Column(name = "self_rating", precision = 3, scale = 2)
    private BigDecimal selfRating;

    @Column(name = "manager_rating", precision = 3, scale = 2)
    private BigDecimal managerRating;

    @Column(name = "final_rating", precision = 3, scale = 2)
    private BigDecimal finalRating;

    @Column(name = "increment_percentage", precision = 5, scale = 2)
    private BigDecimal incrementPercentage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private AppraisalStatus status = AppraisalStatus.SELF_REVIEW;

    public Appraisal() {
    }

    public Appraisal(Long id, Employee employee, Integer cycleYear, BigDecimal selfRating, BigDecimal managerRating, BigDecimal finalRating, BigDecimal incrementPercentage, AppraisalStatus status) {
        this.id = id;
        this.employee = employee;
        this.cycleYear = cycleYear;
        this.selfRating = selfRating;
        this.managerRating = managerRating;
        this.finalRating = finalRating;
        this.incrementPercentage = incrementPercentage;
        this.status = status != null ? status : AppraisalStatus.SELF_REVIEW;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

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

    public static AppraisalBuilder builder() { return new AppraisalBuilder(); }

    public static class AppraisalBuilder {
        private Long id;
        private Employee employee;
        private Integer cycleYear;
        private BigDecimal selfRating;
        private BigDecimal managerRating;
        private BigDecimal finalRating;
        private BigDecimal incrementPercentage;
        private AppraisalStatus status = AppraisalStatus.SELF_REVIEW;

        public AppraisalBuilder id(Long id) { this.id = id; return this; }
        public AppraisalBuilder employee(Employee employee) { this.employee = employee; return this; }
        public AppraisalBuilder cycleYear(Integer cycleYear) { this.cycleYear = cycleYear; return this; }
        public AppraisalBuilder selfRating(BigDecimal selfRating) { this.selfRating = selfRating; return this; }
        public AppraisalBuilder managerRating(BigDecimal managerRating) { this.managerRating = managerRating; return this; }
        public AppraisalBuilder finalRating(BigDecimal finalRating) { this.finalRating = finalRating; return this; }
        public AppraisalBuilder incrementPercentage(BigDecimal incrementPercentage) { this.incrementPercentage = incrementPercentage; return this; }
        public AppraisalBuilder status(AppraisalStatus status) { this.status = status; return this; }

        public Appraisal build() {
            return new Appraisal(id, employee, cycleYear, selfRating, managerRating, finalRating, incrementPercentage, status);
        }
    }
}
